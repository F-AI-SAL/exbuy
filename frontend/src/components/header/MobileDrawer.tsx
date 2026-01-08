'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CATEGORIES, SERVICES, NOTIFICATIONS, SHIPMENTS } from '@/lib/config';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline';

export default function MobileDrawer() {
  const [open, setOpen] = useState(false);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      {/* Hamburger button */}
      <button
        className="md:hidden px-3 py-2 rounded-md border bg-white dark:bg-zinc-900 
                   hover:bg-gray-50 dark:hover:bg-zinc-800 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <Bars3Icon className="h-6 w-6 text-gray-700 dark:text-gray-200" />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-80 transform 
                    bg-white dark:bg-zinc-900 shadow-2xl 
                    transition-transform duration-300 ease-in-out 
                    ${open ? 'translate-x-0' : '-translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Drawer header with Logo */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-zinc-700 p-4">
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center">
            <Image
              src="/exbuy-logo.png"
              alt="ExBuy Logo"
              width={140}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </Link>
          <button
            className="p-2 rounded-md border hover:bg-gray-50 dark:hover:bg-zinc-800 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <XMarkIcon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
          </button>
        </div>

        {/* Drawer content */}
        <div className="overflow-y-auto p-4 space-y-8">
          {/* Categories */}
          <section>
            <div className="mb-3 text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
              Categories
            </div>
            <ul className="space-y-2">
              {CATEGORIES.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2 
                               hover:bg-blue-50 dark:hover:bg-zinc-800 
                               focus:bg-blue-100 dark:focus:bg-zinc-700 
                               transition-colors"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Services */}
          <section>
            <div className="mb-3 text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
              Services
            </div>
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 
                               hover:bg-blue-50 dark:hover:bg-zinc-800 
                               focus:bg-blue-100 dark:focus:bg-zinc-700 
                               transition-colors"
                  >
                    <img src={s.icon} alt={s.title} className="h-6 w-6 object-contain" />
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {s.title}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{s.subtitle}</div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Notifications */}
          <section>
            <div className="mb-3 text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
              Notifications
            </div>
            <ul className="space-y-2">
              {NOTIFICATIONS.length === 0 ? (
                <li className="text-sm text-gray-500 dark:text-gray-400 px-3 py-2">
                  No new notifications
                </li>
              ) : (
                NOTIFICATIONS.map((n) => (
                  <li
                    key={n.id}
                    className="rounded-lg px-3 py-2 hover:bg-blue-50 dark:hover:bg-zinc-800 
                               focus:bg-blue-100 dark:focus:bg-zinc-700 transition-colors"
                  >
                    {n.text}
                  </li>
                ))
              )}
            </ul>
          </section>

          {/* Shipping */}
          <section>
            <div className="mb-3 text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
              Shipping
            </div>
            <ul className="space-y-2">
              {SHIPMENTS.length === 0 ? (
                <li className="text-sm text-gray-500 dark:text-gray-400 px-3 py-2">
                  No shipments found
                </li>
              ) : (
                SHIPMENTS.map((s) => (
                  <li
                    key={s.id}
                    className="flex justify-between rounded-lg px-3 py-2 
                               hover:bg-blue-50 dark:hover:bg-zinc-800 
                               focus:bg-blue-100 dark:focus:bg-zinc-700 transition-colors"
                  >
                    <span className="font-medium text-gray-900 dark:text-gray-100">{s.id}</span>
                    <span className="text-gray-600 dark:text-gray-400">{s.status}</span>
                  </li>
                ))
              )}
            </ul>
          </section>

          {/* Cart & Profile */}
          <section className="flex items-center gap-4">
            <Link
              href="/cart"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-lg border px-3 py-2 text-center 
                         hover:bg-blue-50 dark:hover:bg-zinc-800 
                         focus:bg-blue-100 dark:focus:bg-zinc-700 transition-colors"
            >
              🛒 Cart
            </Link>
            <Link
              href="/account"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-lg border px-3 py-2 text-center 
                         hover:bg-blue-50 dark:hover:bg-zinc-800 
                         focus:bg-blue-100 dark:focus:bg-zinc-700 transition-colors"
            >
              👤 Account
            </Link>
          </section>
        </div>
      </aside>
    </>
  );
}
