'use client';
import { useState, useRef, useEffect } from 'react';
import { NOTIFICATIONS } from '@/lib/config';
import { BellIcon } from '@heroicons/react/24/outline';

interface Notification {
  id: string | number;
  text: string;
}

export default function Notifications() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

  const count = NOTIFICATIONS.length;

  return (
    <div className="relative" ref={ref}>
      {/* Notification button with badge */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative flex items-center justify-center px-3 py-2 rounded-lg border 
                   bg-white dark:bg-zinc-900 dark:border-zinc-700 
                   hover:bg-blue-50 dark:hover:bg-zinc-800 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   transition-all duration-300 shadow-sm"
        title="Notifications"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="notifications-menu"
      >
        <BellIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        {count > 0 && (
          <span
            className="absolute -top-1 -right-1 bg-gradient-to-r from-red-600 to-pink-600 
                       text-white text-xs font-bold rounded-full px-1.5 shadow-md"
          >
            {count}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div
          id="notifications-menu"
          role="menu"
          className="absolute right-0 z-30 mt-3 w-80 rounded-xl border 
                     bg-white dark:bg-zinc-900 dark:border-zinc-700 
                     shadow-2xl animate-fadeIn transform origin-top-right scale-95"
        >
          {/* Header */}
          <div
            className="p-3 text-sm font-semibold border-b dark:border-zinc-700 
                       text-gray-800 dark:text-gray-200"
          >
            Notifications ({count})
          </div>

          {/* List */}
          <ul
            className="max-h-64 overflow-auto scrollbar-thin 
                       scrollbar-thumb-gray-300 dark:scrollbar-thumb-zinc-700"
          >
            {count === 0 ? (
              <li className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                🔔 No new notifications
              </li>
            ) : (
              (NOTIFICATIONS as Notification[]).map((n) => (
                <li
                  key={n.id}
                  className="px-3 py-3 text-sm rounded-lg 
                             hover:bg-blue-50 dark:hover:bg-zinc-800 
                             focus:bg-blue-100 dark:focus:bg-zinc-700 
                             transition-colors cursor-pointer"
                >
                  {n.text}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
