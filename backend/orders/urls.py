# backend/orders/urls.py
from django.urls import path
from .views import OrderCreateView

urlpatterns = [
    path("place/", OrderCreateView.as_view(), name="order-place"),
]
