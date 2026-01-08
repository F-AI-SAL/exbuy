# backend/accounts/views.py
from django.contrib.auth import authenticate, login, logout
from rest_framework import status, viewsets, generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.db.models import Q

from .models import User
from .serializers import UserSerializer, CreateUserSerializer
from .permissions import AdminOrReadOnly


@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    """
    ✅ Login API
    - Accepts username + password
    - Returns user data if valid
    """
    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response(
            {"error": "Username and password required"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    user = authenticate(request, username=username, password=password)
    if not user:
        return Response(
            {"error": "Invalid credentials"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    login(request, user)
    return Response(
        {"message": "✅ Logged in successfully", "user": UserSerializer(user).data},
        status=status.HTTP_200_OK,
    )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout_view(request):
    """
    ✅ Logout API
    """
    logout(request)
    return Response({"message": "✅ Logged out successfully"}, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me_view(request):
    """
    ✅ Current user profile
    """
    return Response(UserSerializer(request.user).data, status=status.HTTP_200_OK)


class SignupView(generics.CreateAPIView):
    """
    ✅ Signup API
    - Uses CreateUserSerializer
    - Public access
    """
    serializer_class = CreateUserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(
                {
                    "message": "✅ User registered successfully",
                    "user": UserSerializer(user).data,
                },
                status=status.HTTP_201_CREATED,
            )
        return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class UserViewSet(viewsets.ModelViewSet):
    """
    ✅ User Management
    - Admin: full CRUD
    - Authenticated non-admin: read-only
    """
    queryset = User.objects.all().order_by("-date_joined")
    permission_classes = [AdminOrReadOnly]

    def get_serializer_class(self):
        if self.action == "create":
            return CreateUserSerializer
        return UserSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        search = self.request.query_params.get("search")
        if search:
            qs = qs.filter(
                Q(username__icontains=search)
                | Q(email__icontains=search)
                | Q(phone__icontains=search)
            )
        return qs

    ordering_fields = ["date_joined", "username", "email", "phone"]
    search_fields = ["username", "email", "phone"]
