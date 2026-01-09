# backend/accounts/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet,
    login_view,
    logout_view,
    me_view,
    SignupView,   # ✅ polished signup view added
)

# ✅ Router for user management
router = DefaultRouter()
router.register(r"users", UserViewSet, basename="user")

urlpatterns = [
    # ✅ Auth endpoints
    path("auth/login/", login_view, name="login"),
    path("auth/logout/", logout_view, name="logout"),
    path("auth/me/", me_view, name="me"),
    path("auth/signup/", SignupView.as_view(), name="signup"),

    # ✅ User management endpoints (CRUD via router)
    path("", include(router.urls)),
]
