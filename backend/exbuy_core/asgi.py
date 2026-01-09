"""
ASGI config for exbuy_core project.

This file exposes the ASGI callable as a module-level variable named ``application``.
It supports both HTTP and WebSocket via Django Channels.
"""

import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack

# ✅ Ensure DJANGO_SETTINGS_MODULE is set
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "exbuy_core.settings")

# Django’s default ASGI application (for HTTP requests)
django_asgi_app = get_asgi_application()

# ✅ Try importing websocket routes safely
websocket_urlpatterns = []
try:
    from shipments.routing import websocket_urlpatterns as shipments_ws
    websocket_urlpatterns = shipments_ws
except ImportError:
    # If shipments app not present, keep empty list
    websocket_urlpatterns = []

# ✅ Channels ProtocolTypeRouter: routes HTTP + WebSocket
application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": AuthMiddlewareStack(
        URLRouter(websocket_urlpatterns)
    ),
})
