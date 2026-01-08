// frontend/scripts/testWebSocket.js
// Simple Node.js script to verify WebSocket handshake with backend

const WebSocket = require("ws");

// 👉 এখানে তোমার backend WebSocket URL বসাও
const WS_URL = process.env.WS_URL || "ws://127.0.0.1:8000/ws/shipments/";

console.log("🔗 Trying to connect to:", WS_URL);

const ws = new WebSocket(WS_URL);

ws.on("open", () => {
  console.log("✅ WebSocket handshake successful!");
  // Send a test ping
  ws.send(JSON.stringify({ type: "ping", message: "Hello from test script" }));
});

ws.on("message", (data) => {
  console.log("📩 Message received from server:", data.toString());
});

ws.on("error", (err) => {
  console.error("⚠️ WebSocket error:", err.message || err);
});

ws.on("close", (code, reason) => {
  console.warn("🔌 WebSocket closed:", { code, reason: reason.toString() });
});
