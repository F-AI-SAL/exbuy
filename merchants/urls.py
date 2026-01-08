from rest_framework.routers import DefaultRouter
from .views import MerchantViewSet

# Router তৈরি করো
router = DefaultRouter()
router.register(r"merchants", MerchantViewSet, basename="merchant")

# শুধু router.urls ব্যবহার করো
urlpatterns = router.urls
