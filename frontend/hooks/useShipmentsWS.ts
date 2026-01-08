'use client';
import { useEffect, useRef, useState } from 'react';

interface Shipment {
  id: string | number;
  [key: string]: any;
}

export function useShipmentsWS(url: string) {
  const [items, setItems] = useState<Shipment[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimer = useRef<any>(null);
  const heartbeatRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;

    const connect = () => {
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('✅ Connected to shipments WS');
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
          console.error('⚠️ Invalid WS message:', err);
        }
      };

      ws.onerror = () => {
        console.error('⚠️ WebSocket connection failed', { url });
      };

      ws.onclose = () => {
        if (heartbeatRef.current) clearInterval(heartbeatRef.current);
        if (isMounted) {
          reconnectTimer.current = setTimeout(connect, 5000);
        }
      };
    };

    connect();

    return () => {
      isMounted = false;
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      if (heartbeatRef.current) clearInterval(heartbeatRef.current);
      wsRef.current?.close();
    };
  }, [url]);

  return { items };
}
