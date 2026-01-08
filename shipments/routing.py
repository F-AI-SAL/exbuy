# BACKEND/shipments/routing.py
"""
WebSocket routing configuration for the shipments app.
Defines URL patterns that map WebSocket connections to their consumers.
"""

from django.urls import path
from .consumers import ShipmentConsumer

# ✅ Use `path` instead of `re_path` for cleaner, modern URL definitions
websocket_urlpatterns = [
    path("ws/shipments/", ShipmentConsumer.as_asgi()),
]
