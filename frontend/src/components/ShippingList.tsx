'use client';
import { useShipmentsWS } from '@/hooks/useShipmentsWS';

export default function ShippingList() {
  const items = useShipmentsWS('ws://localhost:8000/ws/shipments/');

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Shipments ({items.length})</h2>
      <ul className="space-y-2">
        {items.map((s) => (
          <li key={s.id} className="flex justify-between border p-2 rounded">
            <span>{s.id}</span>
            <span className="text-sm text-gray-500">{s.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
('use client');

import { useShipmentsWS } from '@/hooks/useShipmentsWS';

interface Shipment {
  id: string | number;
  status: string;
}

export default function ShippingList() {
  const items: Shipment[] = useShipmentsWS('ws://localhost:8000/ws/shipments/');

  return (
    <section className="p-6 rounded-xl bg-white dark:bg-zinc-900 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-bold text-black dark:text-white">Shipments ({items.length})</h2>
        {/* Live indicator */}
        <span
          className="inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse"
          aria-hidden="true"
        />
      </div>

      {items.length === 0 ? (
        <div className="text-sm text-gray-500 dark:text-gray-400 italic">
          No shipments available.
        </div>
      ) : (
        <ul className="space-y-3" role="list">
          {items.map((s) => (
            <li
              key={s.id}
              className="flex justify-between items-center border border-gray-200 dark:border-zinc-700 rounded-lg p-3 hover:shadow-md transition"
            >
              <span className="font-medium text-gray-800 dark:text-gray-200">{s.id}</span>
              <span
                className={`text-xs px-2 py-1 rounded-full font-semibold ${
                  s.status.toLowerCase() === 'delivered'
                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'
                    : s.status.toLowerCase() === 'pending'
                      ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200'
                      : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                }`}
              >
                {s.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
