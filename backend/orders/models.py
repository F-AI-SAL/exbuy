from django.db import models
from django.core.validators import MinValueValidator
from django.utils import timezone
import uuid


class Order(models.Model):
    order_id = models.UUIDField(
        default=uuid.uuid4,   # ✅ প্রতিটি row এ আলাদা UUID বসবে
        unique=True,
        db_index=True,
        editable=False,
        help_text="Unique order identifier (UUID)"
    )
    customer_name = models.CharField(max_length=100, blank=True)

    # ✅ Defaults added for migration safety
    address = models.CharField(
        max_length=255,
        default="N/A",
        help_text="Customer address"
    )
    city = models.CharField(max_length=100, default="N/A")
    postal_code = models.CharField(max_length=20, default="0000")

    class PaymentMethod(models.TextChoices):
        CASH = "cash", "Cash"
        CARD = "card", "Card"
        BKASH = "bkash", "bKash"
        NAGAD = "nagad", "Nagad"

    payment_method = models.CharField(
        max_length=20,
        choices=PaymentMethod.choices,
        default=PaymentMethod.CASH,
        help_text="Payment method used by customer"
    )

    class Status(models.TextChoices):
        PENDING = "pending", "Pending"
        PAID = "paid", "Paid"
        SHIPPED = "shipped", "Shipped"
        CANCELLED = "cancelled", "Cancelled"

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING,
        help_text="Current order status"
    )

    total = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)],
        help_text="Total order amount, must be non-negative"
    )

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Order {self.order_id} - {self.customer_name} [{self.status}]"


class OrderItem(models.Model):
    order = models.ForeignKey(
        Order,
        related_name="items",
        on_delete=models.CASCADE,
        help_text="Parent order this item belongs to"
    )
    name = models.CharField(max_length=100)
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)],
        help_text="Unit price of the item"
    )
    qty = models.PositiveIntegerField(
        validators=[MinValueValidator(1)],
        help_text="Quantity of this item"
    )

    def subtotal(self):
        return self.price * self.qty

    def __str__(self):
        return f"{self.name} (x{self.qty}) for Order {self.order.order_id}"
