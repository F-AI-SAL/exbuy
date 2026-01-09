from django.db import models
from orders.models import Order

class TrackingEvent(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="events")
    code = models.CharField(max_length=30)
    note = models.CharField(max_length=200, blank=True)
    ts = models.DateTimeField(auto_now_add=True)


# Create your models here.
