from django.db import models
from orders.models import Order
from merchants.models import Merchant

class CODLedger(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    collected_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    verified = models.BooleanField(default=False)

class Settlement(models.Model):
    merchant = models.ForeignKey(Merchant, on_delete=models.CASCADE)
    from_date = models.DateField()
    to_date = models.DateField()
    total_payout = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    status = models.CharField(max_length=20, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)


# Create your models here.
