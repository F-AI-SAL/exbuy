"""
URL configuration for exbuy_core project.
"""

from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from exbuy_core.views import analyst_choice, popular_products


def home(request):
    """Return a simple health check payload."""
    return JsonResponse(
        {
            "message": "Welcome to Exbuy API",
            "status": "running",
            "version": "1.0.0",
        }
    )


urlpatterns = [
    path("", home, name="home"),
    path("admin/", admin.site.urls),
    path("api/accounts/", include("accounts.urls")),
    path("api/merchants/", include("merchants.urls")),
    path("api/orders/", include("orders.urls")),
    path("api/products/", include("catalog.urls")),
    path("api/products/popular/", popular_products, name="popular_products"),
    path("api/products/analyst/", analyst_choice, name="analyst_choice"),
    path("api/shipments/", include("shipments.urls")),
    path("api/billing/", include("billing.urls")),
    path("api/tracking/", include("tracking.urls")),
    path("api/ops/", include("ops.urls")),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
    path("api/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
]
