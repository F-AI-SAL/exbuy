'use client';
import { useState, useEffect, useRef } from 'react';
import { SERVICES } from '@/lib/config';
import {
  Squares2X2Icon,
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Transition } from '@headlessui/react';

export default function ServicesMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown with Esc key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* Services button */}
      <button
        aria-label="Toggle services menu"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="services-menu"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border 
                   bg-white dark:bg-zinc-900 dark:border-zinc-700 
                   hover:bg-blue-50 dark:hover:bg-zinc-800 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   transition-all duration-300 shadow-sm"
      >
        <Squares2X2Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        <span className="font-semibold text-gray-800 dark:text-white tracking-wide">Services</span>
        {open ? (
          <ChevronUpIcon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
        ) : (
          <ChevronDownIcon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
        )}
      </button>

      {/* Desktop dropdown with slide-down animation */}
      <Transition
        show={open}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 -translate-y-2 scale-95"
        enterTo="transform opacity-100 translate-y-0 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="transform opacity-100 translate-y-0 scale-100"
        leaveTo="transform opacity-0 -translate-y-2 scale-95"
      >
        <div
          id="services-menu"
          role="menu"
          className="hidden sm:block absolute right-0 z-30 mt-3 w-[32rem] rounded-xl border 
                     bg-white dark:bg-zinc-900 dark:border-zinc-700 
                     shadow-2xl p-5 origin-top-right"
        >
          {/* Services grid */}
          <div className="grid grid-cols-2 gap-4">
            {SERVICES.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                role="menuitem"
                tabIndex={0}
                className="flex items-start gap-3 rounded-lg p-3 
                           hover:bg-blue-50 dark:hover:bg-zinc-800 
                           focus:bg-blue-100 dark:focus:bg-zinc-700 
                           transition-all duration-200 group"
              >
                <img
                  src={s.icon}
                  alt={s.title}
                  className="h-8 w-8 object-contain flex-shrink-0 
                             group-hover:scale-110 transition-transform"
                />
                <div>
                  <div className="font-semibold text-gray-800 dark:text-white">{s.title}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">{s.subtitle}</div>
                </div>
              </Link>
            ))}
          </div>

          {/* Divider + Associate Services */}
          <div className="mt-5 border-t dark:border-zinc-700 pt-4">
            <div className="text-sm font-semibold text-gray-800 dark:text-white mb-3 uppercase tracking-wide">
              Associate Services
            </div>
            <ul className="grid grid-cols-2 gap-2">
              {['Ali2Bd', 'ExbuyDrop', 'bahrCart', 'ExbuyUp'].map((a) => (
                <li key={a}>
                  <Link
                    href={`/associates/${a.toLowerCase()}`}
                    className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 
                               hover:text-blue-600 dark:hover:text-blue-400 
                               transition-colors duration-200"
                  >
                    <img
                      src={`/icons/${a.toLowerCase()}.svg`}
                      alt={a}
                      className="h-4 w-4 object-contain"
                    />
                    {a}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Transition>

      {/* Mobile full-screen modal with slide-in */}
      <Transition show={open}>
        {/* Overlay */}
        <Transition.Child
          enter="transition-opacity ease-linear duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="sm:hidden fixed inset-0 z-40 bg-black bg-opacity-50" />
        </Transition.Child>

        {/* Sliding panel */}
        <Transition.Child
          enter="transform transition ease-in-out duration-300"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition ease-in-out duration-300"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div className="sm:hidden fixed inset-y-0 right-0 w-full bg-white dark:bg-zinc-900 shadow-xl p-6 overflow-y-auto z-50">
            {/* Close button */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Services</h2>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                <XMarkIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              </button>
            </div>

            {/* Services list */}
            <div className="space-y-4">
              {SERVICES.map((s) => (
                <Link
                  key={s.title}
                  href={s.href}
                  className="flex items-center gap-3 rounded-lg p-3 
                             hover:bg-blue-50 dark:hover:bg-zinc-800 
                             transition-all duration-200 group"
                >
                  <img
                    src={s.icon}
                    alt={s.title}
                    className="h-8 w-8 object-contain flex-shrink-0 
                               group-hover:scale-110 transition-transform"
                  />
                  <div>
                    <div className="font-semibold text-gray-800 dark:text-white">{s.title}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{s.subtitle}</div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Divider + Associate Services */}
            <div className="mt-6 border-t dark:border-zinc-700 pt-4">
              <div className="text-sm font-semibold text-gray-800 dark:text-white mb-3 uppercase tracking-wide">
                Associate Services
              </div>
              <ul className="space-y-2">
                {['Ali2Bd', 'ExbuyDrop', 'bahrCart', 'ExbuyUp'].map((a) => (
                  <li key={a}>
                    <Link
                      href={`/associates/${a.toLowerCase()}`}
                      className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 
                                 hover:text-blue-600 dark:hover:text-blue-400 
                                 transition-colors duration-200"
                    >
                      <img
                        src={`/icons/${a.toLowerCase()}.svg`}
                        alt={a}
                        className="h-4 w-4 object-contain"
                      />
                      {a}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Transition.Child>
      </Transition>
    </div>
  );
}
