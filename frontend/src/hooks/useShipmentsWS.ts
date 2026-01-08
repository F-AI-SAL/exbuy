'use client';
import { useEffect, useRef, useState } from 'react';

interface Shipment {
  id: string | number;
  [key: string]: any;
}

export default function useShipmentsWS(url: string) {
  const [items, setItems] = useState<Shipment[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimer = useRef<NodeJS.Timeout | null>(null);
  const heartbeatRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let isMounted = true;

    const connect = () => {
      console.log('🔗 Trying to connect WebSocket:', url);
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('✅ Connected to shipments WS:', url);
        // heartbeat ping every 30s
        heartbeatRef.current = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: 'ping' }));
          }
        }, 30000);
      };

      ws.onmessage = (evt) => {
        try {
          const data: Shipment = JSON.parse(evt.data);
          setItems((prev) => {
            const idx = prev.findIndex((x) => x.id === data.id);
            if (idx >= 0) {
              const next = [...prev];
              next[idx] = { ...next[idx], ...data };
              return next;
            }
            return [data, ...prev];
          });
        } catch (err) {
          console.error('⚠️ Failed to parse WS message:', err, evt.data);
        }
      };

      ws.onerror = (event) => {
        console.error('⚠️ WebSocket error occurred:', {
          url,
          readyState: ws.readyState,
          event,
        });
      };

      ws.onclose = (evt) => {
        console.warn('🔌 Disconnected from shipments WS', {
          code: evt.code,
          reason: evt.reason,
          wasClean: evt.wasClean,
        });
        if (heartbeatRef.current) clearInterval(heartbeatRef.current);
        if (isMounted) {
          reconnectTimer.current = setTimeout(connect, 5000); // auto reconnect
        }
      };
    };

    connect();

    return () => {
      isMounted = false;
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      if (heartbeatRef.current) clearInterval(heartbeatRef.current);
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [url]);

  return items;
}
