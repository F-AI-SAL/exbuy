import hashlib

from django.core.cache import cache
from django.http import HttpResponseNotModified
from django.shortcuts import get_object_or_404
from django.utils.http import http_date
from django.utils.timezone import is_naive, make_aware
from ratelimit.decorators import ratelimit
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from ops.models import AuditLog
from .models import Product
from .serializers import ProductSerializer


class ProductDetailView(APIView):
    permission_classes = [IsAuthenticated]

    @ratelimit(key="ip", rate="60/m", block=True)
    def get(self, request, slug):
        cache_key = f"product:detail:{slug}"
        cached = cache.get(cache_key)

        if cached:
            data = cached["data"]
            etag = cached["etag"]
            last_modified = cached["last_modified"]
        else:
            product = get_object_or_404(Product, slug=slug)
            data = ProductSerializer(product).data
            last_modified = product.updated_at
            if is_naive(last_modified):
                last_modified = make_aware(last_modified)
            etag_payload = f"{product.id}:{product.updated_at.timestamp()}"
            etag = f'W/"{hashlib.sha256(etag_payload.encode("utf-8")).hexdigest()}"'
            cache.set(cache_key, {"data": data, "etag": etag, "last_modified": last_modified}, 300)

        if_none_match = request.headers.get("If-None-Match")
        if_modified_since = request.headers.get("If-Modified-Since")

        if if_none_match == etag:
            return HttpResponseNotModified()

        if if_modified_since and http_date(last_modified.timestamp()) == if_modified_since:
            return HttpResponseNotModified()

        response = Response(data)
        response["ETag"] = etag
        response["Last-Modified"] = http_date(last_modified.timestamp())

        AuditLog.objects.create(
            action="product.view",
            resource=f"product:{slug}",
            request_id=getattr(request, "request_id", ""),
            actor=request.user if request.user.is_authenticated else None,
            ip_address=request.META.get("REMOTE_ADDR", ""),
            user_agent=request.META.get("HTTP_USER_AGENT", ""),
            metadata={"slug": slug},
        )

        return response
