'use client';

import { useEffect, useState } from 'react';
import {
  Bars3Icon,
  BellIcon,
  ChevronDownIcon,
  HeartIcon,
  QuestionMarkCircleIcon,
  ShoppingCartIcon,
  Squares2X2Icon,
  UserCircleIcon,
  WalletIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from './header/SearchBar';
import { logout } from '@/utils/logout';

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

const services: MenuItem[] = [
  { name: 'Ship for Me', href: '/services/ship' },
  { name: 'Cost Calculator', href: '/calculator' },
  { name: 'ExBuy Lens', href: '/lens' },
  { name: 'ExBuy Live', href: '/live' },
];

const categoryItems: MenuItem[] = [
  { name: 'Fashion', href: '/categories' },
  { name: 'Home & Lifestyle', href: '/categories' },
  { name: 'Electronics', href: '/categories' },
  { name: 'Sports & Outdoors', href: '/categories' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const cartCount = 3;
  const wishlistCount = 5;
  const notificationsCount = 2;

  const accountMenu = [
    { name: 'My Dashboard', href: '/dashboard', icon: <Squares2X2Icon className="h-4 w-4" /> },
    { name: 'My Orders', href: '/orders', icon: <ShoppingCartIcon className="h-4 w-4" /> },
    { name: 'My Shipment', href: '/shipments', icon: <Bars3Icon className="h-4 w-4" /> },
    { name: 'Wishlist', href: '/wishlist', icon: <HeartIcon className="h-4 w-4" /> },
    { name: 'My Wallet', href: '/wallet', icon: <WalletIcon className="h-4 w-4" /> },
    { name: 'Support', href: '/support', icon: <QuestionMarkCircleIcon className="h-4 w-4" /> },
    { name: 'My Profile', href: '/profile', icon: <UserCircleIcon className="h-4 w-4" /> },
  ];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setAvatarOpen(false);
        setServicesOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className="w-full border-b border-zinc-200 bg-white shadow-sm">
      <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-green-500 to-lime-500" />

      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600">
              <Image
                src="/exbuy-logo.png"
                alt="ExBuy"
                width={32}
                height={32}
                className="h-8 w-8"
              />
            </span>
            <span className="text-lg font-extrabold tracking-tight text-zinc-900">ExBuy</span>
          </Link>

          <div className="relative hidden md:block">
            <button
              type="button"
              onClick={() => setCategoriesOpen((open) => !open)}
              className="flex items-center gap-1 rounded-full border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 hover:border-emerald-500 hover:text-emerald-700"
              aria-label="Categories"
              aria-expanded={categoriesOpen}
              aria-controls="categories-menu"
            >
              Categories
              <ChevronDownIcon className="h-4 w-4" />
            </button>
            {categoriesOpen && (
              <div
                id="categories-menu"
                className="absolute left-0 top-12 z-30 w-60 rounded-xl border border-zinc-200 bg-white p-2 shadow-lg"
                role="menu"
              >
                {categoryItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-emerald-50"
                    role="menuitem"
                    onClick={() => setCategoriesOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="hidden flex-1 items-center justify-center lg:flex">
          <SearchBar />
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <button
              type="button"
              onClick={() => setServicesOpen((open) => !open)}
              className="flex items-center gap-1 rounded-full border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 hover:border-emerald-500 hover:text-emerald-700"
              aria-expanded={servicesOpen}
              aria-controls="services-menu"
            >
              Services
              <ChevronDownIcon className="h-4 w-4" />
            </button>

            {servicesOpen && (
              <div
                id="services-menu"
                className="absolute right-0 mt-2 w-48 rounded-xl border border-zinc-200 bg-white p-2 shadow-lg"
                role="menu"
              >
                {services.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-emerald-50"
                    role="menuitem"
                    onClick={() => setServicesOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/wishlist" className="relative rounded-full p-2" aria-label="Wishlist">
            <HeartIcon className="h-6 w-6 text-zinc-800" />
            {wishlistCount > 0 && (
              <span className="absolute -right-1 -top-1 rounded-full bg-pink-600 px-1.5 py-0.5 text-xs font-bold text-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link
            href="/notifications"
            className="relative rounded-full p-2"
            aria-label="Notifications"
          >
            <BellIcon className="h-6 w-6 text-zinc-800" />
            {notificationsCount > 0 && (
              <span className="absolute -right-1 -top-1 rounded-full bg-amber-500 px-1.5 py-0.5 text-xs font-bold text-white">
                {notificationsCount}
              </span>
            )}
          </Link>

          <Link href="/cart" className="relative rounded-full p-2" aria-label="Cart">
            <ShoppingCartIcon className="h-6 w-6 text-zinc-800" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 rounded-full bg-emerald-600 px-1.5 py-0.5 text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          <div className="relative">
            <button
              onClick={() => setAvatarOpen(!avatarOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-zinc-100 text-sm font-semibold text-zinc-700"
              aria-label="Account menu"
              aria-controls="account-menu"
              aria-expanded={avatarOpen}
            >
              U
            </button>

            {avatarOpen && (
              <div
                id="account-menu"
                className="absolute right-0 mt-2 w-64 rounded-2xl border border-zinc-200 bg-white p-3 shadow-lg"
                role="menu"
              >
                <div className="border-b border-zinc-100 pb-3">
                  <p className="text-xs text-zinc-500">Welcome to ExBuy</p>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      U
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-zinc-900">Md Faisal Al Islam</p>
                      <span className="mt-1 inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                        Business
                      </span>
                    </div>
                  </div>
                </div>

                <div className="py-2">
                  {accountMenu.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-emerald-50"
                      role="menuitem"
                      onClick={() => setAvatarOpen(false)}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  ))}
                </div>

                <button
                  onClick={logout}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-100"
                >
                  <XMarkIcon className="h-4 w-4" />
                  Log out
                </button>
              </div>
            )}
          </div>

          <button
            className="md:hidden rounded-full p-2"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
          >
            <Bars3Icon className="h-6 w-6 text-zinc-800" />
          </button>
        </div>
      </div>

      <div className="px-4 pb-3 lg:hidden">
        <SearchBar />
      </div>

      {menuOpen && (
        <div id="mobile-menu" className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMenuOpen(false)} />

          <div className="absolute right-0 top-0 h-full w-2/3 bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-lg font-semibold text-zinc-900">Menu</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="rounded-full p-2"
                aria-label="Close menu"
              >
                <XMarkIcon className="h-6 w-6 text-zinc-800" />
              </button>
            </div>

            <nav className="flex flex-col gap-4 text-sm font-medium text-zinc-800">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-emerald-600"
                >
                  {item.name}
                </Link>
              ))}
              <Link href="/wishlist" onClick={() => setMenuOpen(false)} className="hover:text-emerald-600">
                Wishlist
              </Link>
              <Link
                href="/notifications"
                onClick={() => setMenuOpen(false)}
                className="hover:text-emerald-600"
              >
                Notifications
              </Link>
              <Link href="/cart" onClick={() => setMenuOpen(false)} className="hover:text-emerald-600">
                Cart
              </Link>
              <Link
                href="/account"
                onClick={() => setMenuOpen(false)}
                className="hover:text-emerald-600"
              >
                Account
              </Link>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  logout();
                }}
                className="text-left hover:text-emerald-600"
              >
                Logout
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
