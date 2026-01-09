# backend/orders/admin.py
from django.contrib import admin
from django.utils.html import format_html
from .models import Order, OrderItem


# ---------------------------
# Inline for Order Items
# ---------------------------
class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    fields = ("name", "price", "qty", "subtotal_display")
    readonly_fields = ("subtotal_display",)

    def subtotal_display(self, obj):
        return obj.subtotal()
    subtotal_display.short_description = "Subtotal"


# ---------------------------
# Custom Admin Actions
# ---------------------------
def mark_as_paid(modeladmin, request, queryset):
    queryset.update(status=Order.Status.PAID)
    modeladmin.message_user(request, f"{queryset.count()} orders marked as Paid.")
mark_as_paid.short_description = "Mark selected orders as Paid"

def mark_as_shipped(modeladmin, request, queryset):
    queryset.update(status=Order.Status.SHIPPED)
    modeladmin.message_user(request, f"{queryset.count()} orders marked as Shipped.")
mark_as_shipped.short_description = "Mark selected orders as Shipped"

def mark_as_cancelled(modeladmin, request, queryset):
    queryset.update(status=Order.Status.CANCELLED)
    modeladmin.message_user(request, f"{queryset.count()} orders marked as Cancelled.")
mark_as_cancelled.short_description = "Mark selected orders as Cancelled"


# ---------------------------
# Order Admin
# ---------------------------
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        "order_id",
        "customer_name",
        "city",
        "payment_method",
        "colored_status",
        "colored_total",   # ✅ gradient badge for total
        "created_at",
    )
    list_filter = ("payment_method", "status", "city", "created_at")
    search_fields = ("order_id", "customer_name", "address", "city", "postal_code")
    ordering = ("-created_at",)
    date_hierarchy = "created_at"

    inlines = [OrderItemInline]
    readonly_fields = ("created_at", "updated_at")

    actions = [mark_as_paid, mark_as_shipped, mark_as_cancelled]

    # ---------------------------
    # Colored Status Badge
    # ---------------------------
    def colored_status(self, obj):
        color_map = {
            Order.Status.PENDING: "orange",
            Order.Status.PAID: "green",
            Order.Status.SHIPPED: "blue",
            Order.Status.CANCELLED: "red",
        }
        color = color_map.get(obj.status, "gray")
        return format_html(
            '<span style="color: white; background-color: {}; '
            'padding: 3px 8px; border-radius: 8px; font-weight: bold;">{}</span>',
            color,
            obj.get_status_display(),
        )
    colored_status.short_description = "Status"

    # ---------------------------
    # Gradient Badge for Total
    # ---------------------------
    def colored_total(self, obj):
        amount = obj.total or 0

        if amount < 1000:
            bg_color = "#b2fab4"  # light green
        elif amount < 5000:
            bg_color = "#4caf50"  # medium green
        elif amount < 10000:
            bg_color = "#2e7d32"  # dark green
        else:
            bg_color = "#1b5e20"  # very dark green (high priority)

        return format_html(
            '<span style="color: white; background-color: {}; '
            'padding: 3px 8px; border-radius: 8px; font-weight: bold;">৳{}</span>',
            bg_color,
            amount,
        )
    colored_total.short_description = "Total Amount"


# ---------------------------
# OrderItem Admin (optional standalone)
# ---------------------------
@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ("order", "name", "price", "qty", "subtotal_display")
    search_fields = ("name", "order__order_id")
    list_filter = ("order__status", "order__payment_method")

    def subtotal_display(self, obj):
        return obj.subtotal()
    subtotal_display.short_description = "Subtotal"
