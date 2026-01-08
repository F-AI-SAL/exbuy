'use client';

import { useState, useEffect } from 'react';
import {
  XMarkIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  HeartIcon,
  BellIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import { logout } from '@/utils/logout'; // ✅ Import logout helper

interface MenuItem {
  name: string;
  href: string;
}

const menuItems: MenuItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Categories', href: '/categories' },
  { name: 'RFQ', href: '/rfq' },
  { name: 'Shipping', href: '/shipping' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);

  // Example counts (later connect with store/state)
  const cartCount = 3;
  const wishlistCount = 5;
  const notificationsCount = 2;

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setSearchOpen(false);
        setAvatarOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black shadow-sm">
      {/* Gradient strip */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

      <div className="px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-black dark:text-white tracking-wide">ExBuy</span>
        </div>

        {/* Desktop Menu */}
        <nav
          className="hidden md:flex gap-6 text-sm font-medium text-zinc-700 dark:text-zinc-300"
          aria-label="Main navigation"
        >
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          {/* Search button */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Search"
            aria-controls="search-overlay"
            aria-expanded={searchOpen}
          >
            <MagnifyingGlassIcon className="h-6 w-6 text-black dark:text-white" />
          </button>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="relative p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Wishlist"
          >
            <HeartIcon className="h-6 w-6 text-black dark:text-white" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Notifications */}
          <Link
            href="/notifications"
            className="relative p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Notifications"
          >
            <BellIcon className="h-6 w-6 text-black dark:text-white" />
            {notificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                {notificationsCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Cart"
          >
            <ShoppingCartIcon className="h-6 w-6 text-black dark:text-white" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Account avatar */}
          <div className="relative">
            <button
              onClick={() => setAvatarOpen(!avatarOpen)}
              className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
              aria-label="Account menu"
              aria-controls="account-menu"
              aria-expanded={avatarOpen}
            >
              <Image
                src="/avatar.png"
                alt="Account"
                width={32}
                height={32}
                className="rounded-full border border-zinc-300 dark:border-zinc-700"
              />
            </button>

            {avatarOpen && (
              <div
                id="account-menu"
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 shadow-lg rounded-lg py-2 z-50"
                role="menu"
              >
                <Link
                  href="/account"
                  className="block px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  Profile
                </Link>
                <Link
                  href="/orders"
                  className="block px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  Orders
                </Link>
                <Link
                  href="/settings"
                  className="block px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  Settings
                </Link>
                {/* ✅ Logout button now calls helper */}
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-black dark:text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div id="mobile-menu" className="fixed inset-0 z-40 md:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setMenuOpen(false)}
          ></div>

          {/* Drawer */}
          <div className="absolute top-0 right-0 w-2/3 h-full bg-white dark:bg-zinc-900 shadow-xl p-6 transform transition-transform duration-300">
            {/* Close button */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-semibold text-black dark:text-white">Menu</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Close menu"
              >
                <XMarkIcon className="h-6 w-6 text-black dark:text-white" />
              </button>
            </div>

            {/* Menu items */}
            <nav className="flex flex-col gap-4 text-sm font-medium text-black dark:text-white">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/wishlist"
                onClick={() => setMenuOpen(false)}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                Wishlist
              </Link>
              <Link
                href="/notifications"
                onClick={() => setMenuOpen(false)}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                Notifications
              </Link>
              <Link
                href="/cart"
                onClick={() => setMenuOpen(false)}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                Cart
              </Link>
              <Link
                href="/account"
                onClick={() => setMenuOpen(false)}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                Account
              </Link>
              {/* ✅ Logout option in mobile menu */} <button onClick={() => { setMenuOpen(false); logout(); }} className="text-left hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200" > Logout </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}