from rest_framework import serializers

from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            "id",
            "slug",
            "name",
            "description",
            "price",
            "currency",
            "image_url",
            "stock_qty",
            "updated_at",
        ]
