from rest_framework import serializers
from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = [
            "name",
            "price",
            "qty",
            "product_no",
            "category",
            "weight",
            "image_url",
        ]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    status = serializers.CharField(source="order_status", required=False)

    class Meta:
        model = Order
        fields = [
            "order_id",
            "order_code",
            "customer_name",
            "status",
            "payment_status",
            "payment_method",
            "address",
            "city",
            "postal_code",
            "ship_to_country",
            "shipping_method",
            "shipping_company",
            "shipping_cost",
            "total",
            "created_at",
            "items",
        ]
        read_only_fields = ["order_id", "order_code", "created_at"]

    def create(self, validated_data):
        items_data = validated_data.pop("items", [])
        order = Order.objects.create(**validated_data)
        for item in items_data:
            OrderItem.objects.create(order=order, **item)
        return order