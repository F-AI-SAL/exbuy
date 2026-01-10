'use client';

import Link from 'next/link';
import {
  ClipboardDocumentCheckIcon,
  ExclamationTriangleIcon,
  HeartIcon,
  TicketIcon,
  WalletIcon,
  BanknotesIcon,
  TruckIcon,
  CheckCircleIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import DashboardSidebar from '@/components/dashboard/Sidebar';

export default function DashboardPage() {
  const overviewItems = [
    { label: 'Request For Quotation', href: '/rfq', icon: ClipboardDocumentCheckIcon },
    { label: 'Action Needed', href: '/actions', icon: ExclamationTriangleIcon },
    { label: 'My Wallet', href: '/wallet', icon: WalletIcon },
    { label: 'Wishlist', href: '/wishlist', icon: HeartIcon },
    { label: 'My Coupons', href: '/coupons', icon: TicketIcon },
  ];

  const buyShipOrders = [
    { label: 'To Pay', count: 5, icon: BanknotesIcon, color: 'bg-rose-100 text-rose-600' },
    { label: 'Ready to Shipping', count: 0, icon: TruckIcon, color: 'bg-sky-100 text-sky-600' },
    { label: 'Ready to Delivery', count: 4, icon: TruckIcon, color: 'bg-emerald-100 text-emerald-600' },
    { label: 'Completed', count: 6, icon: CheckCircleIcon, color: 'bg-green-100 text-green-600' },
  ];

  const shipForMeOrders = [
    { label: 'To Be Confirmed', count: 0, icon: ClockIcon, color: 'bg-amber-100 text-amber-600' },
    { label: 'Ready to Shipping', count: 0, icon: TruckIcon, color: 'bg-sky-100 text-sky-600' },
    { label: 'Ready to Delivery', count: 0, icon: TruckIcon, color: 'bg-indigo-100 text-indigo-600' },
    { label: 'Completed', count: 0, icon: CheckCircleIcon, color: 'bg-green-100 text-green-600' },
  ];

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <DashboardSidebar />
        <div className="space-y-10">
          <section>
            <h1 className="text-lg font-semibold text-zinc-900">Overview</h1>
            <div className="mt-5 grid grid-cols-2 gap-4 rounded-2xl bg-white p-6 shadow-sm sm:grid-cols-3 lg:grid-cols-5">
          {overviewItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-col items-center gap-3 rounded-xl p-4 text-center transition hover:bg-zinc-50"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-zinc-700">
                <item.icon className="h-6 w-6" />
              </span>
              <span className="text-sm font-semibold text-zinc-800">{item.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900">Buy and Ship for me Orders</h2>
          <Link href="/orders" className="text-sm font-semibold text-zinc-500 hover:text-emerald-600">
            View All Orders
          </Link>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {buyShipOrders.map((item) => (
            <div key={item.label} className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.color}`}>
                  <item.icon className="h-6 w-6" />
                </span>
                <span className="text-3xl font-semibold text-zinc-800">
                  {String(item.count).padStart(2, '0')}
                </span>
              </div>
              <p className="mt-4 text-sm font-semibold text-zinc-700">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900">Ship for me Orders</h2>
          <Link
            href="/shipments"
            className="text-sm font-semibold text-zinc-500 hover:text-emerald-600"
          >
            View All Shipment Orders
          </Link>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {shipForMeOrders.map((item) => (
            <div key={item.label} className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.color}`}>
                  <item.icon className="h-6 w-6" />
                </span>
                <span className="text-3xl font-semibold text-zinc-300">
                  {String(item.count).padStart(2, '0')}
                </span>
              </div>
              <p className="mt-4 text-sm font-semibold text-zinc-700">{item.label}</p>
            </div>
          ))}
        </div>
      </section>
        </div>
      </div>
    </main>
  );
}
