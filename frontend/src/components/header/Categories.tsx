'use client';
import { useState, useEffect, useRef, ReactNode } from 'react';
import { CATEGORIES } from '@/lib/config';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import {
  ShoppingBagIcon,
  DevicePhoneMobileIcon,
  GiftIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

export default function Categories() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  // Example icon mapping (you can extend this)
  const iconMap: Record<string, ReactNode> = {
    Fashion: <SparklesIcon className="h-5 w-5 text-pink-500" />,
    Electronics: <DevicePhoneMobileIcon className="h-5 w-5 text-blue-500" />,
    Grocery: <ShoppingBagIcon className="h-5 w-5 text-green-500" />,
    Gifts: <GiftIcon className="h-5 w-5 text-purple-500" />,
  };

  return (
    <div
      className="relative"
      ref={ref}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="categories-menu"
        className="flex items-center gap-1 px-3 py-2 rounded-md border 
                   bg-white dark:bg-zinc-900 dark:border-zinc-700 
                   hover:bg-blue-50 dark:hover:bg-zinc-800 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   transition-all duration-300 shadow-sm"
      >
        <span className="font-medium text-gray-800 dark:text-gray-200">Categories</span>
        <ChevronDownIcon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
      </button>

      {open && (
        <div
          id="categories-menu"
          role="menu"
          className="absolute left-0 z-20 mt-2 w-[600px] rounded-lg border 
                     bg-white dark:bg-zinc-900 dark:border-zinc-700 
                     shadow-xl animate-fadeIn origin-top-left p-4 grid grid-cols-2 gap-4"
        >
          {CATEGORIES.map((c) => (
            <a
              key={c.href}
              href={c.href}
              role="menuitem"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm 
                         text-gray-700 dark:text-gray-200 
                         hover:bg-blue-50 dark:hover:bg-zinc-800 
                         focus:bg-blue-100 dark:focus:bg-zinc-700 
                         transition-colors"
            >
              {iconMap[c.label] ?? <ChevronDownIcon className="h-5 w-5 text-gray-400" />}
              <span>{c.label}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
