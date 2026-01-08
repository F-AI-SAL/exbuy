'use client';
import { useState, useRef, useEffect } from 'react';
import { useUser } from '@/lib/useUser';
import {
  UserCircleIcon,
  RectangleStackIcon,
  ShoppingBagIcon,
  TruckIcon,
  HeartIcon,
  WalletIcon,
  LifebuoyIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function AccountDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { user } = useUser();

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  const initials = user?.firstName
    ? user.firstName.charAt(0).toUpperCase()
    : user?.email
    ? user.email.charAt(0).toUpperCase()
    : 'U';

  // ✅ Safe access: cast to any to avoid TS error if 'purpose' not in UserInfo type
  const accountPurpose = (user as any)?.purpose ?? 'Self Order';

  return (
    <div className="relative" ref={ref}>
      {/* Account button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="px-3 py-2 rounded-md border bg-white dark:bg-zinc-900 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="account-menu"
      >
        {user?.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={user?.firstName ?? 'User'}
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center font-semibold">
            {initials}
          </div>
        )}
        <span className="hidden md:inline text-sm font-medium text-gray-800 dark:text-white">
          {user?.firstName ?? user?.email ?? 'Account'}
        </span>
        <UserCircleIcon className="h-5 w-5 text-gray-600 dark:text-gray-300 md:hidden" />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          id="account-menu"
          role="menu"
          className="absolute right-0 z-20 mt-2 w-64 rounded-lg border bg-white dark:bg-zinc-900 dark:border-zinc-700 shadow-xl transition-all duration-300"
        >
          {/* Profile header */}
          <div className="flex items-center gap-3 p-4 border-b dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 rounded-t-lg">
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user?.firstName ?? 'User'}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center text-lg font-semibold">
                {initials}
              </div>
            )}
            <div>
              <div className="font-medium text-gray-800 dark:text-white">
                {user?.firstName ?? user?.email ?? 'User'}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Purpose: {accountPurpose}
              </div>
            </div>
          </div>

          {/* Menu items */}
          <ul className="py-2 text-sm">
            <li>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 dark:hover:bg-zinc-800 transition-colors duration-200"
              >
                <RectangleStackIcon className="h-5 w-5 text-blue-500" />
                My Dashboard
              </Link>
            </li>

            <hr className="my-1 border-gray-200 dark:border-zinc-700" />

            <li>
              <Link
                href="/orders"
                className="flex items-center gap-2 px-4 py-2 hover:bg-green-50 dark:hover:bg-zinc-800"
              >
                <ShoppingBagIcon className="h-5 w-5 text-green-500" />
                My Orders
              </Link>
            </li>
            <li>
              <Link
                href="/shipments"
                className="flex items-center gap-2 px-4 py-2 hover:bg-purple-50 dark:hover:bg-zinc-800"
              >
                <TruckIcon className="h-5 w-5 text-purple-500" />
                My Shipments
              </Link>
            </li>

            <hr className="my-1 border-gray-200 dark:border-zinc-700" />

            <li>
              <Link
                href="/wishlist"
                className="flex items-center gap-2 px-4 py-2 hover:bg-pink-50 dark:hover:bg-zinc-800"
              >
                <HeartIcon className="h-5 w-5 text-pink-500" />
                Wishlist
              </Link>
            </li>
            <li>
              <Link
                href="/wallet"
                className="flex items-center gap-2 px-4 py-2 hover:bg-yellow-50 dark:hover:bg-zinc-800"
              >
                <WalletIcon className="h-5 w-5 text-yellow-500" />
                My Wallet
              </Link>
            </li>

            <hr className="my-1 border-gray-200 dark:border-zinc-700" />

            <li>
              <Link
                href="/support"
                className="flex items-center gap-2 px-4 py-2 hover:bg-indigo-50 dark:hover:bg-zinc-800"
              >
                <LifebuoyIcon className="h-5 w-5 text-indigo-500" />
                Support
              </Link>
            </li>
            <li>
              <Link
                href="/profile"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                <Cog6ToothIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                My Profile
              </Link>
            </li>

            <hr className="my-1 border-gray-200 dark:border-zinc-700" />

            <li>
              <button
                onClick={() => alert('Logging out…')}
                className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-red-50 dark:hover:bg-zinc-800 text-red-600 transition-colors duration-200 font-semibold"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 text-red-500" />
                Log Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
