from rest_framework import generics, status
from rest_framework.response import Response
from .models import Order
from .serializers import OrderSerializer


class OrderListView(generics.ListAPIView):
    queryset = Order.objects.prefetch_related("items").order_by("-created_at")
    serializer_class = OrderSerializer


class OrderDetailView(generics.RetrieveAPIView):
    queryset = Order.objects.prefetch_related("items")
    serializer_class = OrderSerializer
    lookup_field = "order_id"


class OrderCreateView(generics.CreateAPIView):
    serializer_class = OrderSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
        return Response(
            {"order_id": str(order.order_id), "order_code": order.order_code},
            status=status.HTTP_201_CREATED,
        )