'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArrowPathIcon,
  BellIcon,
  ClipboardDocumentCheckIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  ShoppingBagIcon,
  TruckIcon,
  UserCircleIcon,
  WalletIcon,
} from '@heroicons/react/24/outline';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

const navItems = [
  { label: 'Overview', href: '/dashboard', icon: HomeIcon },
  { label: 'Buy & Ship for me', href: '/orders', icon: ShoppingBagIcon },
  { label: 'My Orders', href: '/orders', icon: ShoppingBagIcon },
  { label: 'My Shipments', href: '/shipments', icon: TruckIcon },
  { label: 'Ship for me', href: '/shipments', icon: TruckIcon },
  { label: 'Action Needed', href: '/actions', icon: ArrowPathIcon },
  { label: 'RFQ Management', href: '/rfq', icon: ClipboardDocumentCheckIcon },
  { label: 'Wishlist', href: '/wishlist', icon: ShoppingBagIcon },
  { label: 'Notification', href: '/notifications', icon: BellIcon },
  { label: 'My Wallet', href: '/wallet', icon: WalletIcon },
  { label: 'Transactions', href: '/wallet', icon: WalletIcon },
  { label: 'Refund', href: '/refunds', icon: ArrowPathIcon },
  { label: 'Support', href: '/support', icon: QuestionMarkCircleIcon },
  { label: 'My Profile', href: '/profile', icon: UserCircleIcon },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden rounded-2xl bg-white p-5 shadow-sm lg:block">
      <div className="border-b border-zinc-100 pb-4">
        <p className="text-xs text-zinc-500">Good Late Night!</p>
        <p className="text-sm font-semibold text-zinc-900">Md Faisal Al Islam</p>
      </div>
      <nav className="mt-4 flex flex-col gap-1 text-sm text-zinc-700">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center justify-between rounded-lg px-3 py-2 transition ${
                isActive
                  ? 'bg-emerald-50 text-emerald-700 font-semibold'
                  : 'hover:bg-zinc-50'
              }`}
            >
              <span className="flex items-center gap-2">
                <item.icon className="h-4 w-4 text-zinc-500" />
                {item.label}
              </span>
              <ChevronRightIcon className="h-4 w-4 text-zinc-300" />
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
