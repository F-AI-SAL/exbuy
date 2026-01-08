'use client';
import { useState, useRef, useEffect } from 'react';
import { TruckIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

type Shipment = {
  id: string;
  status: string;
  date: string;
  location: string;
};

export default function ShippingList() {
  const [open, setOpen] = useState(false);
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  // Connect WebSocket on mount
  useEffect(() => {
    const ws = new WebSocket('wss://your-backend.example.com/ws/shipments');

    ws.onopen = () => {
      console.log('✅ WebSocket connected');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        // Expecting { id, status, date, location }
        setShipments((prev) => {
          // Update if exists, else add new
          const idx = prev.findIndex((s) => s.id === data.id);
          if (idx !== -1) {
            const updated = [...prev];
            updated[idx] = data;
            return updated;
          }
          return [...prev, data];
        });
      } catch (err) {
        console.error('❌ Invalid WS message', err);
      }
    };

    ws.onclose = () => {
      console.log('⚠️ WebSocket disconnected');
    };

    return () => ws.close();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown with Esc key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  const count = shipments.length;

  const stepIndex = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 0;
      case 'in transit':
        return 1;
      case 'delivered':
        return 2;
      default:
        return 0;
    }
  };

  const steps = ['Pending', 'In Transit', 'Delivered'];

  return (
    <div className="relative" ref={ref}>
      {/* Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative flex items-center gap-1 px-3 py-2 rounded-lg border 
                   bg-white dark:bg-zinc-900 dark:border-zinc-700 
                   hover:bg-blue-50 dark:hover:bg-zinc-800 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   transition-all duration-300 shadow-sm"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="shipments-menu"
      >
        <TruckIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        {open ? (
          <ChevronUpIcon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
        ) : (
          <ChevronDownIcon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
        )}
        {count > 0 && (
          <span
            className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-600 to-purple-600 
                         text-white text-xs font-bold rounded-full px-1.5 shadow-md animate-bump"
          >
            {count}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div
          id="shipments-menu"
          role="menu"
          className="absolute right-0 z-30 mt-3 w-[28rem] rounded-xl border 
                     bg-white dark:bg-zinc-900 dark:border-zinc-700 
                     shadow-2xl animate-fadeIn origin-top-right scale-95"
        >
          <div
            className="p-3 text-sm font-semibold border-b dark:border-zinc-700 
                          text-gray-800 dark:text-gray-200"
          >
            Shipments ({count})
          </div>
          <ul className="max-h-80 overflow-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-zinc-700 p-3 space-y-5">
            {shipments.length === 0 ? (
              <li className="text-sm text-gray-500 dark:text-gray-400 text-center">
                🚚 No shipments found
              </li>
            ) : (
              shipments.map((s) => {
                const currentStep = stepIndex(s.status);
                return (
                  <li
                    key={s.id}
                    className="rounded-lg p-3 hover:bg-blue-50 dark:hover:bg-zinc-800 transition"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900 dark:text-gray-100">{s.id}</span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300">
                        {s.status}
                      </span>
                    </div>

                    {/* Stepper tracker */}
                    <div className="flex items-center justify-between">
                      {steps.map((step, idx) => (
                        <div key={step} className="flex-1 flex items-center">
                          <div
                            className={`h-3 w-3 rounded-full ${
                              idx <= currentStep ? 'bg-blue-600' : 'bg-gray-300 dark:bg-zinc-700'
                            }`}
                          />
                          {idx < steps.length - 1 && (
                            <div
                              className={`flex-1 h-0.5 ${
                                idx < currentStep ? 'bg-blue-600' : 'bg-gray-300 dark:bg-zinc-700'
                              }`}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-gray-600 dark:text-gray-400">
                      {steps.map((step) => (
                        <span key={step}>{step}</span>
                      ))}
                    </div>

                    {/* Progress bar */}
                    <div className="mt-2 h-2 w-full bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-2 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500"
                        style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                      />
                    </div>

                    {/* Extra info */}
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                      {s.date} • {s.location}
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
