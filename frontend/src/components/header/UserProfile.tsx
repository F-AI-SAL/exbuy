// frontend/src/components/header/UserProfile.tsx
'use client';
import { useState, useEffect, useRef } from 'react';
import { useUser } from '@/lib/useUser';
import Link from 'next/link';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { Transition } from '@headlessui/react';
import { logout } from '@/utils/logout'; // ✅ Import logout helper

function initialsFrom(user: { firstName?: string; email?: string }) {
  if (user.firstName) return user.firstName.charAt(0).toUpperCase();
  if (user.email) return user.email.charAt(0).toUpperCase();
  return 'U';
}

export default function UserProfile() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const label = user?.firstName ?? (user?.email ? user.email.split('@')[0] : 'User');

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

  return (
    <div className="relative" ref={ref}>
      {/* Profile button */}
      <button
        onClick={() => setOpen(!open)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="user-menu"
        className="flex items-center gap-2 px-3 py-2 rounded-lg border 
                   bg-white dark:bg-zinc-900 dark:border-zinc-700 
                   hover:bg-blue-50 dark:hover:bg-zinc-800 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   transition-all duration-300 shadow-sm"
      >
        {user?.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={label}
            className="h-9 w-9 rounded-full object-cover ring-2 ring-blue-500/30"
          />
        ) : (
          <div
            className="h-9 w-9 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 
                          text-white flex items-center justify-center font-semibold ring-2 ring-blue-500/30"
          >
            {initialsFrom({ firstName: user?.firstName, email: user?.email })}
          </div>
        )}
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate max-w-[120px]">
          {label}
        </span>
        {open ? (
          <ChevronUpIcon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
        ) : (
          <ChevronDownIcon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
        )}
      </button>

      {/* Dropdown menu */}
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
          id="user-menu"
          role="menu"
          className="absolute right-0 mt-2 w-48 rounded-lg border 
                     bg-white dark:bg-zinc-900 dark:border-zinc-700 
                     shadow-xl origin-top-right z-30"
        >
          <ul className="py-2">
            <li>
              <Link
                href="/account"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 
                           hover:bg-blue-50 dark:hover:bg-zinc-800 transition-colors"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 
                           hover:bg-blue-50 dark:hover:bg-zinc-800 transition-colors"
              >
                Settings
              </Link>
            </li>
            <li>
              {/* ✅ Logout now calls helper */}
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 
                           hover:bg-red-50 dark:hover:bg-zinc-800 transition-colors font-semibold text-red-600"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  );
}