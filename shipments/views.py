from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .serializers import ShippingCalculateSerializer


class ShippingCalculateView(APIView):
    """
    Shipping cost calculator endpoint.
    ✅ Only logged-in users (JWT authenticated) can access.
    """

    # Require JWT authentication
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ShippingCalculateSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data

            # ✅ Placeholder calculation logic (replace with real business rules later)
            base_cost = 100
            weight_factor = data["weight"] * 50
            dimension_factor = (data.get("width", 0) + data.get("height", 0)) * 2

            estimated_cost = base_cost + weight_factor + dimension_factor

            return Response(
                {"cost": round(estimated_cost, 2)},
                status=status.HTTP_200_OK,
            )

        # If validation fails, return errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
