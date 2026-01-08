from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.core.validators import RegexValidator
from django.db import transaction

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """✅ Read-only serializer for exposing user details safely."""

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "role",
            "phone",
            "is_active",
            "date_joined",
        ]
        read_only_fields = ["id", "date_joined", "is_active"]


class CreateUserSerializer(serializers.ModelSerializer):
    """✅ Serializer for creating new users with strong validation."""

    password = serializers.CharField(
        write_only=True,
        min_length=8,
        style={"input_type": "password"},
        help_text="Password must be at least 8 characters long."
    )

    email = serializers.EmailField(
        required=True,
        help_text="Valid email address required."
    )

    phone = serializers.CharField(
        required=False,
        validators=[
            RegexValidator(
                regex=r"^\+?\d{10,15}$",
                message="Phone number must be 10–15 digits, can start with +."
            )
        ],
        help_text="Optional phone number in international format."
    )

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "password",
            "first_name",
            "last_name",
            "role",
            "phone",
        ]

    def validate_email(self, value):
        """Ensure email is unique."""
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def validate_username(self, value):
        """Ensure username is unique."""
        if User.objects.filter(username__iexact=value).exists():
            raise serializers.ValidationError("This username is already taken.")
        return value

    def create(self, validated_data):
        """Atomic user creation with password hashing."""
        password = validated_data.pop("password")
        try:
            with transaction.atomic():
                user = User(**validated_data)
                user.set_password(password)
                user.is_active = True  # ✅ default active, can be changed by admin
                user.save()
            return user
        except Exception as e:
            raise serializers.ValidationError(
                {"detail": f"User creation failed: {str(e)}"}
            )
