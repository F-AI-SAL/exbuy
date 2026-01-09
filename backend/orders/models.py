from django.db import models
from django.core.validators import MinValueValidator
from django.utils import timezone
import uuid

from merchants.models import Merchant


def generate_order_code():
    return f"EX{uuid.uuid4().hex[:10].upper()}"


class Order(models.Model):
    order_id = models.UUIDField(
        default=uuid.uuid4,
        unique=True,
        db_index=True,
        editable=False,
        help_text="Unique order identifier (UUID)",
    )
    order_code = models.CharField(
        max_length=16,
        unique=True,
        default=generate_order_code,
        editable=False,
        help_text="Human friendly order code",
    )

    awb = models.CharField(max_length=20, unique=True, default="NA")
    receiver_name = models.CharField(max_length=120, default="N/A")
    delivery_address = models.TextField(default="N/A")
    phone = models.CharField(max_length=20, default="N/A")
    weight_kg = models.DecimalField(
        max_digits=6,
        decimal_places=2,
        default=0,
    )
    cod_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
    )

    class ServiceType(models.TextChoices):
        SAME_DAY = "same_day", "Same Day"
        NEXT_DAY = "next_day", "Next Day"
        INTERCITY = "intercity", "Intercity"

    service_type = models.CharField(
        max_length=20,
        choices=ServiceType.choices,
        default=ServiceType.NEXT_DAY,
    )

    status = models.CharField(max_length=30, default="created")

    merchant = models.ForeignKey(Merchant, on_delete=models.CASCADE)

    customer_name = models.CharField(max_length=100, blank=True, default="")
    address = models.CharField(max_length=255, default="N/A")
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
    )

    class OrderStatus(models.TextChoices):
        TO_PAY = "to_pay", "To Pay"
        PURCHASED = "purchased", "Purchased"
        WAREHOUSE = "warehouse", "At Warehouse"
        WAY = "way", "Way to destination"
        RECEIVED = "received", "Received"
        COURIER = "courier", "At Courier"
        COMPLETED = "completed", "Completed"
        REFUND = "refund", "Refund"
        CANCELLED = "cancelled", "Cancelled"

    order_status = models.CharField(
        max_length=20,
        choices=OrderStatus.choices,
        default=OrderStatus.TO_PAY,
    )

    class PaymentStatus(models.TextChoices):
        UNPAID = "unpaid", "Unpaid"
        PAID = "paid", "Paid"
        REFUNDED = "refunded", "Refunded"
        PARTIAL = "partial", "Partial"

    payment_status = models.CharField(
        max_length=20,
        choices=PaymentStatus.choices,
        default=PaymentStatus.UNPAID,
    )

    ship_to_country = models.CharField(max_length=80, default="Bangladesh")
    shipping_method = models.CharField(max_length=80, default="Cargo - By Air")
    shipping_company = models.CharField(max_length=120, default="ExBuy Global Shipping")
    shipping_cost = models.CharField(max_length=40, default="0/kg")

    total = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)],
        default=0,
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Order {self.order_code} - {self.customer_name} [{self.order_status}]"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name="items", on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)],
    )
    qty = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    product_no = models.CharField(max_length=40, blank=True, default="")
    category = models.CharField(max_length=80, blank=True, default="")
    weight = models.CharField(max_length=40, blank=True, default="")
    image_url = models.CharField(max_length=255, blank=True, default="")

    def subtotal(self):
        return self.price * self.qty

    def __str__(self):
        return f"{self.name} (x{self.qty}) for Order {self.order.order_code}"