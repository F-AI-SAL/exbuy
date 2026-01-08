'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Notifications from './header/Notifications';
import ShippingList from './header/ShippingList';
import CartButton from './header/CartButton';
import MobileDrawer from './header/MobileDrawer';
import AccountDropdown from './header/AccountDropdown';
import SearchBar from './header/SearchBar';
import ServicesMenu from './header/ServicesMenu';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

type Category = { name: string; slug: string };

const categories: Category[] = [
  { name: 'Fashion & Personal Style', slug: 'fashion' },
  { name: 'Home & Lifestyle', slug: 'home-lifestyle' },
  { name: 'Electrical & Electronics', slug: 'electronics' },
  { name: 'Family, Kids & Daily Care', slug: 'family-care' },
  { name: 'Agriculture & Food Industry', slug: 'agriculture-food' },
  { name: 'Construction & Engineering', slug: 'construction' },
  { name: 'Industrial & Manufacturing', slug: 'industrial' },
  { name: 'Automotive & Transportation', slug: 'automotive' },
  { name: 'Sports, Leisure & Recreation', slug: 'sports' },
  { name: 'Business, Packaging & Office', slug: 'business-office' },
  { name: 'Energy & Sustainability', slug: 'energy' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // ✅ Stable deterministic ID to avoid hydration mismatch
  const menuId = 'categories-menu';

  // Reduced motion respect
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq?.matches ?? false);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq?.addEventListener?.('change', handler);
    return () => mq?.removeEventListener?.('change', handler);
  }, []);

  // Close on outside click
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!open) return;
      const target = e.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Hover intent (desktop)
  const onMouseEnter = () => {
    setHovering(true);
    setOpen(true);
  };
  const onMouseLeave = () => {
    setHovering(false);
    setTimeout(() => {
      if (!hovering) setOpen(false);
    }, 120);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0F172A]/80 backdrop-blur supports-[backdrop-filter]:bg-[#0F172A]/60 dark:bg-[#0F172A]/80 transition-colors">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between gap-3 py-3">
          {/* Left: Mobile drawer + Logo + Categories */}
          <div className="flex items-center gap-3">
            <MobileDrawer />

            {/* Brand */}
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/exbuy-logo.png"
                alt="ExBuy Logo"
                width={160}
                height={50}
                priority
                className="h-10 w-auto rounded-md bg-white/5 p-1 shadow-sm ring-1 ring-white/10 group-hover:scale-[1.02] transition-transform"
              />
              <span className="text-lg font-bold text-white tracking-wide group-hover:text-blue-300 transition-colors">
                ExBuy
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-2">
              {/* Categories button */}
              <div className="relative" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                <button
                  ref={buttonRef}
                  aria-haspopup="menu"
                  aria-expanded={open}
                  aria-controls={menuId}
                  onClick={() => setOpen((v) => !v)}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-200 hover:text-white rounded-lg hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                >
                  Categories
                  <ChevronDownIcon
                    className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Mega menu */}
                {open && (
                  <div
                    ref={menuRef}
                    id={menuId}
                    role="menu"
                    aria-labelledby={menuId}
                    className="absolute left-0 mt-2 w-[640px] rounded-xl shadow-2xl bg-[#0B1220] text-white border border-white/10 z-50"
                    style={{
                      transition: prefersReduced
                        ? undefined
                        : 'opacity 150ms ease, transform 150ms ease',
                      transform: 'translateY(0)',
                      opacity: 1,
                    }}
                  >
                    {/* Category grid */}
                    <div className="grid grid-cols-2 gap-1 p-2">
                      {categories.map((c) => (
                        <Link
                          key={c.slug}
                          href={`/categories/${c.slug}`}
                          role="menuitem"
                          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 focus:bg-white/10 focus:outline-none"
                          onClick={() => setOpen(false)}
                        >
                          <span className="inline-block h-2 w-2 rounded-full bg-blue-500" />
                          <span className="text-sm text-slate-200">{c.name}</span>
                        </Link>
                      ))}
                    </div>

                    {/* Footer strip */}
                    <div className="flex items-center justify-between px-3 py-2 border-t border-white/10">
                      <span className="text-xs text-slate-400">
                        Explore {categories.length} categories tailored for your business
                      </span>
                      <Link
                        href="/categories"
                        className="text-xs font-semibold text-blue-400 hover:text-blue-300"
                      >
                        View all →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Center: Search */}
          <div className="flex-1 max-w-2xl">
            <SearchBar />
          </div>

          {/* Right: Services + actions */}
          <div className="hidden md:flex items-center gap-3">
            <ServicesMenu />
            <Notifications />
            <ShippingList />
            <CartButton />
            <AccountDropdown />
          </div>

          {/* Mobile quick actions */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              href="/cart"
              className="relative px-3 py-2 rounded-md bg-white/10 text-white hover:bg-white/20 transition ring-1 ring-white/10"
              aria-label="Cart"
            >
              🛒
            </Link>
            <Link
              href="/account"
              className="relative px-3 py-2 rounded-md bg-white/10 text-white hover:bg-white/20 transition ring-1 ring-white/10"
              aria-label="Account"
            >
              👤
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
