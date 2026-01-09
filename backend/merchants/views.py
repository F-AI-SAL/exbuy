from rest_framework import viewsets, permissions
from .models import Merchant
from .serializers import MerchantSerializer

class MerchantViewSet(viewsets.ModelViewSet):
    queryset = Merchant.objects.all().order_by("-created_at")
    serializer_class = MerchantSerializer
    permission_classes = [permissions.IsAuthenticated]


# Create your views here.
