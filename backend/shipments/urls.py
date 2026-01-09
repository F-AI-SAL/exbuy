from django.urls import path
from .views import ShippingCalculateView

urlpatterns = [
    path("calculate/", ShippingCalculateView.as_view(), name="shipping-calculate"),
]
