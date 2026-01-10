import base64
import json
import os

from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import padding
from django.core.cache import cache
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from ops.models import AuditLog
from .models import Order
from .serializers import OrderSerializer


class OrderListView(generics.ListAPIView):
    queryset = Order.objects.prefetch_related("items").order_by("-created_at")
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]


class OrderDetailView(generics.RetrieveAPIView):
    queryset = Order.objects.prefetch_related("items")
    serializer_class = OrderSerializer
    lookup_field = "order_id"
    permission_classes = [IsAuthenticated]


class OrderCreateView(generics.CreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
        return Response(
            {"order_id": str(order.order_id), "order_code": order.order_code},
            status=status.HTTP_201_CREATED,
        )


class EncryptedOrderCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        idempotency_key = request.headers.get("Idempotency-Key", "").strip()
        if idempotency_key:
            cached_response = cache.get(f"idempotency:orders:{idempotency_key}")
            if cached_response:
                return Response(cached_response, status=status.HTTP_200_OK)

        payload_b64 = request.data.get("payload")
        if not payload_b64:
            return Response({"detail": "Missing payload."}, status=status.HTTP_400_BAD_REQUEST)

        private_key_pem = os.environ.get("ORDER_PAYLOAD_PRIVATE_KEY", "")
        if not private_key_pem:
            return Response({"detail": "Server key not configured."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        private_key = serialization.load_pem_private_key(
            private_key_pem.encode("utf-8"),
            password=None,
        )

        try:
            decrypted = private_key.decrypt(
                base64.b64decode(payload_b64),
                padding.OAEP(mgf=padding.MGF1(algorithm=hashes.SHA256()), algorithm=hashes.SHA256(), label=None),
            )
            data = json.loads(decrypted.decode("utf-8"))
        except (ValueError, json.JSONDecodeError) as exc:
            return Response({"detail": "Invalid encrypted payload.", "error": str(exc)}, status=status.HTTP_400_BAD_REQUEST)

        serializer = OrderSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        order = serializer.save()

        response_data = {"order_id": str(order.order_id), "order_code": order.order_code}
        if idempotency_key:
            cache.set(f"idempotency:orders:{idempotency_key}", response_data, 600)

        AuditLog.objects.create(
            action="order.create.encrypted",
            resource=f"order:{order.order_id}",
            request_id=getattr(request, "request_id", ""),
            actor=request.user if request.user.is_authenticated else None,
            ip_address=request.META.get("REMOTE_ADDR", ""),
            user_agent=request.META.get("HTTP_USER_AGENT", ""),
            metadata={"order_id": str(order.order_id)},
        )

        return Response(response_data, status=status.HTTP_201_CREATED)
