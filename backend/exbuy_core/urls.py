"""
URL configuration for exbuy_core project.
"""

from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# âœ… Simple health check / root endpoint
def home(request):
    """Return a simple health check payload."""
    return JsonResponse({
        "message": "Welcome to Exbuy API",
        "status": "running",
        "version": "1.0.0"
    })

# âœ… Import your custom product views
from .views import popular_products, analyst_choice

urlpatterns = [
    # Root health check
    path("", home, name="home"),

    # Admin
    path("admin/", admin.site.urls),

    # Local apps
    path("api/accounts/", include("accounts.urls")),
    path("api/merchants/", include("merchants.urls")),
    path("api/orders/", include("orders.urls")),
    path("api/products/popular/", popular_products, name="popular_products"),
    path("api/products/analyst/", analyst_choice, name="analyst_choice"),
    path("api/shipments/", include("shipments.urls")),
    path("api/billing/", include("billing.urls")),
    path("api/tracking/", include("tracking.urls")),

    # âœ… JWT Authentication endpoints
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    # âœ… API schema & docs
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
    path("api/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
]
