from django.contrib import admin

from .models import Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "price", "currency", "stock_qty", "updated_at")
    search_fields = ("name", "slug")
