from django.urls import path

from .views import EncryptedOrderCreateView, OrderCreateView, OrderDetailView, OrderListView

urlpatterns = [
    path("", OrderListView.as_view(), name="order-list"),
    path("<uuid:order_id>/", OrderDetailView.as_view(), name="order-detail"),
    path("place/", OrderCreateView.as_view(), name="order-place"),
    path("place/encrypted/", EncryptedOrderCreateView.as_view(), name="order-place-encrypted"),
]
