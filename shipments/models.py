from django.db import models
from accounts.models import User
from orders.models import Order   # ✅ import Order, not Shipment

class OrderShipment(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    rider = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={"role": "rider"})
    assigned_at = models.DateTimeField(auto_now_add=True)
    route_seq = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"OrderShipment for Order {self.order.id}"   # ✅ properly indented

class ProofOfDelivery(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    otp = models.CharField(max_length=6)
    photo = models.ImageField(upload_to="pod/")
    delivered_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Proof of Delivery for Order {self.order.id}"   # ✅ properly indented