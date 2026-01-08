'use client';
import Link from 'next/link';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

type CartButtonProps = {
  count?: number; // optional prop, default 0
};

export default function CartButton({ count = 0 }: CartButtonProps) {
  const [animate, setAnimate] = useState(false);

  // Trigger animation when count changes
  useEffect(() => {
    if (count > 0) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 600);
      return () => clearTimeout(timer);
    }
  }, [count]);

  return (
    <Link
      href="/cart"
      className="relative flex items-center justify-center px-3 py-2 rounded-md border 
                 bg-white dark:bg-zinc-900 dark:border-zinc-700 
                 hover:bg-blue-50 dark:hover:bg-zinc-800 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 
                 transition-all duration-300 shadow-sm"
      title="Cart"
      aria-label="Cart"
    >
      <ShoppingCartIcon
        className={`h-6 w-6 text-gray-700 dark:text-gray-200 transition-transform 
                   ${animate ? 'animate-shake' : ''}`}
      />
      {count > 0 && (
        <span
          className={`absolute -top-1 -right-1 bg-gradient-to-r from-green-600 to-emerald-600 
                      text-white text-xs font-bold rounded-full px-1.5 shadow-md 
                      ${animate ? 'animate-pulse-glow' : ''}`}
        >
          {count}
        </span>
      )}
    </Link>
  );
}
