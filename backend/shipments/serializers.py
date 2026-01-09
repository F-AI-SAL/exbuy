from rest_framework import serializers


class ShippingCalculateSerializer(serializers.Serializer):
    """
    Serializer for shipping cost calculation.
    Validates all required fields and ensures proper data types.
    """

    ORDER_TYPE_CHOICES = ["buy_and_ship", "only_ship"]

    order_type = serializers.ChoiceField(
        choices=ORDER_TYPE_CHOICES,
        help_text="Choose 'buy_and_ship' or 'only_ship'."
    )
    from_country = serializers.CharField(
        max_length=100,
        help_text="Origin country name."
    )
    to_postal_code = serializers.CharField(
        max_length=20,
        help_text="Destination postal code."
    )
    category = serializers.CharField(
        max_length=100,
        help_text="Product category."
    )
    contains = serializers.CharField(
        max_length=100,
        help_text="Main item contained in shipment."
    )
    weight = serializers.FloatField(
        min_value=0.1,
        help_text="Weight in kilograms (must be > 0)."
    )
    width = serializers.FloatField(
        required=False,
        allow_null=True,
        min_value=0,
        help_text="Width in cm (optional)."
    )
    height = serializers.FloatField(
        required=False,
        allow_null=True,
        min_value=0,
        help_text="Height in cm (optional)."
    )

    def validate(self, data):
        """
        Custom validation for logical consistency.
        """
        if data["order_type"] == "only_ship" and not data.get("from_country"):
            raise serializers.ValidationError(
                {"from_country": "Origin country is required for 'only_ship' orders."}
            )

        if data["weight"] > 100:
            raise serializers.ValidationError(
                {"weight": "Weight cannot exceed 100 kg for standard shipping."}
            )

        return data
