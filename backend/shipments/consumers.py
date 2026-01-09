# BACKEND/shipments/consumers.py
"""
ShipmentConsumer handles WebSocket connections for real-time shipment updates.
Supports group broadcasting, ping/pong health checks, and structured error handling.
"""

import logging
from typing import Any, Dict
from channels.generic.websocket import AsyncJsonWebsocketConsumer

logger = logging.getLogger(__name__)


class ShipmentConsumer(AsyncJsonWebsocketConsumer):
    group_name: str = "shipments_stream"

    async def connect(self) -> None:
        """
        Called when a client initiates a WebSocket connection.
        Adds the channel to the shipments group and sends a handshake message.
        """
        try:
            await self.channel_layer.group_add(self.group_name, self.channel_name)
            await self.accept()
            logger.info("✅ WebSocket connected: %s", self.channel_name)

            await self.send_json({
                "type": "connection",
                "status": "connected",
                "message": "Welcome to ExBuy Shipments stream"
            })
        except Exception as e:
            logger.exception("❌ Error on connect: %s", e)
            await self.close(code=1011)  # Internal error

    async def disconnect(self, close_code: int) -> None:
        """
        Called when the WebSocket disconnects.
        Removes the channel from the shipments group.
        """
        try:
            await self.channel_layer.group_discard(self.group_name, self.channel_name)
            logger.info("🔌 WebSocket disconnected: %s (code=%s)", self.channel_name, close_code)
        except Exception as e:
            logger.exception("❌ Error on disconnect: %s", e)

    async def receive_json(self, content: Dict[str, Any], **kwargs: Any) -> None:
        """
        Handle incoming JSON messages from client.
        Example: {"action": "ping"} → responds with {"type": "pong"}.
        """
        try:
            action = content.get("action")
            if action == "ping":
                await self.send_json({"type": "pong", "message": "alive"})
            else:
                await self.send_json({
                    "type": "error",
                    "message": f"Unknown action: {action}"
                })
        except Exception as e:
            logger.exception("❌ Error in receive_json: %s", e)
            await self.send_json({
                "type": "error",
                "message": "Internal server error"
            })

    async def shipment_update(self, event: Dict[str, Any]) -> None:
        """
        Called when group_send broadcasts a shipment update.
        Example event: {"type": "shipment_update", "data": {...}}
        """
        try:
            data = event.get("data", {})
            await self.send_json({
                "type": "shipment_update",
                "payload": data
            })
        except Exception as e:
            logger.exception("❌ Error sending shipment_update: %s", e)
            await self.send_json({
                "type": "error",
                "message": "Failed to send shipment update"
            })
