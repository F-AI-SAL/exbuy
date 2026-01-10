from django.conf import settings
from django.db import models


class AuditLog(models.Model):
    action = models.CharField(max_length=120)
    resource = models.CharField(max_length=120)
    request_id = models.CharField(max_length=64, blank=True, default="")
    actor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="audit_logs",
    )
    ip_address = models.CharField(max_length=45, blank=True, default="")
    user_agent = models.CharField(max_length=300, blank=True, default="")
    metadata = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f\"{self.action} {self.resource}\"
