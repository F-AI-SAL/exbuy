# backend/orders/serializers.py
from rest_framework import serializers
from .models import Order, OrderItem
import random

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ["name", "price", "qty"]

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ["order_id", "address", "city", "postal_code", "payment_method", "total", "items"]

    def create(self, validated_data):
        items_data = validated_data.pop("items")
        # ✅ Generate enterprise‑grade order ID
        validated_data["order_id"] = "ORD" + str(random.randint(100000, 999999))
        order = Order.objects.create(**validated_data)
        for item in items_data:
            OrderItem.objects.create(order=order, **item)
        return order
