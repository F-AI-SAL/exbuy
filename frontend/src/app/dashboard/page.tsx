'use client';
import Link from 'next/link';
import Image from 'next/image';
import { RectangleStackIcon, HeartIcon, WalletIcon, TicketIcon } from '@heroicons/react/24/outline';

export default function DashboardPage() {
  const overviewItems = [
    {
      label: 'Request For Quotation',
      href: '/rfq',
      icon: RectangleStackIcon,
      count: 3,
    },
    {
      label: 'Action Needed',
      href: '/actions',
      icon: RectangleStackIcon,
      count: 2,
    },
    { label: 'My Wallet', href: '/wallet', icon: WalletIcon, count: 0 },
    { label: 'Wishlist', href: '/wishlist', icon: HeartIcon, count: 5 },
    { label: 'My Coupons', href: '/coupons', icon: TicketIcon, count: 1 },
  ];

  const buyShipOrders = [
    { label: 'To Pay', count: 5 },
    { label: 'Ready to Shipping', count: 0 },
    { label: 'Ready to Delivery', count: 4 },
    { label: 'Completed', count: 6 },
  ];

  const shipForMeOrders = [
    { label: 'To Be Confirmed', count: 0 },
    { label: 'Ready to Shipping', count: 0 },
    { label: 'Ready to Delivery', count: 0 },
    { label: 'Completed', count: 0 },
  ];

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 rounded-2xl shadow-xl">
      {/* Logo + Title */}
      <div className="flex items-center gap-3 mb-10 border-b pb-4 dark:border-zinc-700">
        <Image
          src="/exbuy-logo.png"
          alt="ExBuy Logo"
          width={48}
          height={48}
          className="h-12 w-12 object-contain rounded-md shadow-sm bg-gray-50 dark:bg-zinc-800 p-1"
        />
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">My Dashboard</h1>
      </div>

      {/* Overview Section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {overviewItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="relative flex flex-col items-center gap-3 rounded-xl border bg-white dark:bg-zinc-900 dark:border-zinc-700 p-6 text-center shadow-md hover:shadow-lg transition hover:scale-105"
            >
              {/* Icon + Badge */}
              <div className="relative">
                <item.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                {item.count > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
                    {item.count}
                  </span>
                )}
              </div>
              <div className="text-sm font-semibold text-gray-700 dark:text-white">
                {item.label}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Buy & Ship Orders */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
          Buy and Ship for Me Orders
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {buyShipOrders.map((item) => (
            <div
              key={item.label}
              className="relative rounded-xl border bg-white dark:bg-zinc-900 dark:border-zinc-700 p-6 text-center shadow-md hover:shadow-lg transition"
            >
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">{item.label}</div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {item.count}
              </div>
              {item.count > 0 && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
                  {item.count}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Ship for Me Orders */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
          Ship for Me Orders
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {shipForMeOrders.map((item) => (
            <div
              key={item.label}
              className="relative rounded-xl border bg-white dark:bg-zinc-900 dark:border-zinc-700 p-6 text-center shadow-md hover:shadow-lg transition"
            >
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">{item.label}</div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {item.count}
              </div>
              {item.count > 0 && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
                  {item.count}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* View All Links */}
      <div className="flex justify-end gap-6 mt-8">
        <Link
          href="/orders"
          className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          View All Orders
        </Link>
        <Link
          href="/shipments"
          className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          View All Shipment Orders
        </Link>
      </div>
    </main>
  );
}
