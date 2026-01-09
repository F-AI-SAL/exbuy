'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  AdjustmentsHorizontalIcon,
  ArrowDownTrayIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  FunnelIcon,
  ShoppingBagIcon,
  TruckIcon,
  WalletIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const statusTabs = [
  { key: 'all', label: 'All', count: 20 },
  { key: 'toPay', label: 'To Pay', count: 5 },
  { key: 'purchased', label: 'Purchased', count: 3 },
  { key: 'warehouse', label: 'At Warehouse', count: 0 },
  { key: 'way', label: 'Way to destination', count: 0 },
  { key: 'received', label: 'Received', count: 4 },
  { key: 'courier', label: 'At Courier', count: 0 },
  { key: 'completed', label: 'Completed', count: 6 },
  { key: 'refund', label: 'Refund', count: 3 },
  { key: 'cancelled', label: 'Cancelled', count: 2 },
];

const sidebarItems = [
  { label: 'Overview', href: '/dashboard' },
  { label: 'Buy & Ship for me', href: '/orders' },
  { label: 'My Orders', href: '/orders', active: true },
  { label: 'My Delivery', href: '/shipments' },
  { label: 'Ship for me', href: '/shipments' },
  { label: 'Action Needed', href: '/actions' },
  { label: 'RFQ Management', href: '/rfq' },
  { label: 'Wishlist', href: '/wishlist' },
  { label: 'Notification', href: '/notifications' },
  { label: 'My Wallet', href: '/wallet' },
  { label: 'Transactions', href: '/wallet' },
  { label: 'Refund', href: '/refunds' },
  { label: 'My Profile', href: '/profile' },
];

const orders = [
  {
    id: 'BJA2608600149',
    date: '08 Jan 2026',
    payment: 'Paid',
    status: 'Ready to Delivery',
    product: {
      name: 'DIY Crystal Glue with Refill Casting Set Ink Pen Oval Handwriting Pen Silicone Mold',
      number: 'PB012608E3E546',
      category: 'Bakeware',
      quantity: 11,
      weight: '0.039 kg',
      total: '?1001.82',
      image: '/hero-appliances.svg',
    },
    shipping: {
      country: 'Bangladesh',
      method: 'Cargo - By Air',
      company: 'MoveOn Global Shipping',
      cost: '740/Kg',
    },
  },
];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('all');

  const statusStyles = useMemo(
    () => ({
      paid: 'bg-emerald-100 text-emerald-700',
      pending: 'bg-amber-100 text-amber-700',
    }),
    []
  );

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <div className="rounded-2xl bg-emerald-50/60 p-4">
        <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
          <aside className="hidden rounded-2xl bg-white p-5 shadow-sm lg:block">
            <div className="border-b border-zinc-100 pb-4">
              <p className="text-xs text-zinc-500">Good Late Night!</p>
              <p className="text-sm font-semibold text-zinc-900">Md Faisal Al Islam</p>
            </div>
            <nav className="mt-4 flex flex-col gap-1 text-sm text-zinc-700">
              {sidebarItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 transition ${
                    item.active
                      ? 'bg-emerald-50 text-emerald-700 font-semibold'
                      : 'hover:bg-zinc-50'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRightIcon className="h-4 w-4 text-zinc-400" />
                </Link>
              ))}
            </nav>
          </aside>

          <section className="space-y-6">
            <div className="rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 p-4 text-white shadow-sm">
              <div className="flex items-center justify-between">
              <p className="text-lg font-semibold italic">
                  Turn Shopping Experience Into Dropshipping with ExBuyDrop
                </p>
                <button className="rounded-full bg-white/10 p-1">
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="rounded-2xl bg-emerald-50 p-3 text-sm text-emerald-900">
              Dont worry, your order history is safe! Find all your previous orders at
              https://legacy.exbuy.com.bd/
            </div>

            <div>
              <h1 className="text-xl font-semibold text-zinc-900">My Orders</h1>
              <div className="mt-4 flex flex-wrap gap-2 border-b border-zinc-200 pb-2 text-sm">
                {statusTabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`rounded-full px-3 py-2 text-sm ${
                      activeTab === tab.key
                        ? 'bg-emerald-50 text-emerald-700 font-semibold'
                        : 'text-zinc-600 hover:text-emerald-700'
                    }`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-500">Keyword</label>
                  <input
                    type="text"
                    placeholder="Search by product number, shipping provider, order number, title"
                    className="mt-2 w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-500">Product status</label>
                  <select className="mt-2 w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm">
                    <option>Please select a status</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-500">Payment status</label>
                  <select className="mt-2 w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm">
                    <option>Please select a status</option>
                  </select>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <FunnelIcon className="h-4 w-4" />
                  Expand Filters
                  <span className="text-red-500">Reset all</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 rounded-lg border border-zinc-200 px-3 py-2 text-sm">
                    <ArrowDownTrayIcon className="h-4 w-4" />
                    Export
                  </button>
                  <button className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">
                    Apply
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white shadow-sm">
              <div className="grid grid-cols-[24px_1fr_120px_120px] items-center gap-4 border-b border-zinc-100 bg-emerald-50/50 px-5 py-3 text-xs font-semibold text-zinc-600">
                <input type="checkbox" className="h-4 w-4" />
                <span>Product Description</span>
                <span>Shipping</span>
                <span>Action</span>
              </div>

              {orders.map((order) => (
                <div key={order.id} className="border-b border-zinc-100 px-5 py-4">
                  <div className="flex items-center justify-between text-sm text-zinc-600">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="h-4 w-4" />
                      <span className="font-semibold text-zinc-900">Order: {order.id}</span>
                      <span className="text-zinc-400">|</span>
                      <span>{order.date}</span>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        order.payment === 'Paid' ? statusStyles.paid : statusStyles.pending
                      }`}
                    >
                      {order.payment}
                    </span>
                  </div>

                  <div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_1fr_180px]">
                    <div className="flex gap-4">
                      <div className="h-20 w-20 overflow-hidden rounded-xl bg-zinc-100">
                        <Image
                          src={order.product.image}
                          alt={order.product.name}
                          width={80}
                          height={80}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="space-y-1 text-sm">
                        <p className="font-semibold text-zinc-900">{order.product.name}</p>
                        <p className="text-xs text-zinc-500">Product No: {order.product.number}</p>
                        <p className="text-xs text-zinc-500">Category: {order.product.category}</p>
                        <p className="text-xs text-zinc-500">Quantity: {order.product.quantity}</p>
                        <p className="text-xs text-zinc-500">Weight: {order.product.weight}</p>
                        <p className="text-xs font-semibold text-zinc-900">
                          Total price: {order.product.total}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-1 text-sm text-zinc-600">
                      <p className="flex items-center gap-2">
                        <ShoppingBagIcon className="h-4 w-4 text-emerald-500" />
                        Ship to: {order.shipping.country}
                      </p>
                      <p className="flex items-center gap-2">
                        <TruckIcon className="h-4 w-4 text-emerald-500" />
                        {order.shipping.method}
                      </p>
                      <p>Company: {order.shipping.company}</p>
                      <p>Cost: {order.shipping.cost}</p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button className="rounded-lg border border-zinc-200 px-3 py-2 text-sm">
                        View Details
                      </button>
                      <button className="rounded-lg border border-zinc-200 px-3 py-2 text-sm">
                        View Invoice
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
