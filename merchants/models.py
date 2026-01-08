from django.db import models
from accounts.models import User

class Merchant(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={"role":"merchant"})
    company_name = models.CharField(max_length=120)
    cod_cycle_days = models.PositiveIntegerField(default=2)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self): return self.company_name


# Create your models here.
