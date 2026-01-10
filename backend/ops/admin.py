from django.contrib import admin

from .models import AuditLog


@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    list_display = ("action", "resource", "actor", "request_id", "created_at")
    search_fields = ("action", "resource", "request_id")
