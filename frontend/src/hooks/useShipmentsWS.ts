'use client';
import { useEffect, useRef, useState } from 'react';

export interface Shipment {
  id: string | number;
  status: string;
  [key: string]: any;
}

function normalizeWsUrl(url: string) {
  if (!url) return '';
  if (typeof window === 'undefined') return url;
  const isSecure = window.location.protocol === 'https:';
  if (isSecure && url.startsWith('ws://') && !url.includes('localhost')) {
    return url.replace('ws://', 'wss://');
  }
  return url;
}

export default function useShipmentsWS(url?: string) {
  const [items, setItems] = useState<Shipment[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimer = useRef<NodeJS.Timeout | null>(null);
  const heartbeatRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!url) return;
    let isMounted = true;
    const targetUrl = normalizeWsUrl(url);

    const connect = () => {
      if (process.env.NODE_ENV === 'development') {
        console.log('Trying to connect WebSocket:', targetUrl);
      }
      const ws = new WebSocket(targetUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        if (process.env.NODE_ENV === 'development') {
          console.log('Connected to shipments WS:', targetUrl);
        }
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
          if (process.env.NODE_ENV === 'development') {
            console.warn('Failed to parse WS message:', err, evt.data);
          }
        }
      };

      ws.onerror = (event) => {
        if (process.env.NODE_ENV === 'development') {
          console.warn('WebSocket error occurred:', {
            url: targetUrl,
            readyState: ws.readyState,
            event,
          });
        }
      };

      ws.onclose = (evt) => {
        if (process.env.NODE_ENV === 'development') {
          console.warn('Disconnected from shipments WS', {
            code: evt.code,
            reason: evt.reason,
            wasClean: evt.wasClean,
          });
        }
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
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [url]);

  return items;
}
