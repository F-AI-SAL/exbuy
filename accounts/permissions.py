# backend/accounts/permissions.py
from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and getattr(request.user, "role", None) == "admin"

class AdminOrReadOnly(BasePermission):
    """
    Admin: full access
    Others: read-only
    """
    def has_permission(self, request, view):
        role = getattr(request.user, "role", None)
        if request.method in SAFE_METHODS:
            return request.user.is_authenticated
        return request.user.is_authenticated and role == "admin"
