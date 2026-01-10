'use client';
import { useState } from 'react';
import DashboardSidebar from '@/components/dashboard/Sidebar';

const balances = [
  { currency: '৳', label: 'BDT', available: 0, pending: 0, hold: 0 },
  { currency: '$', label: 'USD', available: 0, pending: 0, hold: 0 },
  { currency: 'AED', label: 'AED', available: 0, pending: 0, hold: 0 },
  { currency: '¥', label: 'CNY', available: 0, pending: 0, hold: 0 },
  { currency: '€', label: 'EUR', available: 0, pending: 0, hold: 0 },
  { currency: '₹', label: 'INR', available: 0, pending: 0, hold: 0 },
  { currency: '¥', label: 'JPY', available: 0, pending: 0, hold: 0 },
];

const transactions = [
  {
    id: 'WT102513918272',
    source: 'Buy And Ship',
    date: '13 October, 2025 - 12:32 AM',
    amount: '৳824.13',
    type: 'debit',
    status: 'available',
    description:
      'Source: Wallet transfer | Invoice no: INV102513E88D6D | Product no: PB102513983A22',
  },
  {
    id: 'WT082524473113',
    date: '24 August, 2025 - 11:16 AM',
    amount: '৳70.21',
    type: 'credit',
    status: 'available',
  },
  {
    id: 'WT082509D5E59C',
    date: '09 August, 2025 - 5:21 PM',
    amount: '৳70.21',
    type: 'debit',
    status: 'available',
  },
  {
    id: 'WT052529409955',
    source: 'Buy And Ship',
    date: '29 May, 2025 - 2:04 PM',
    amount: '৳823.95',
    type: 'credit',
    status: 'available',
    description:
      'Received refund amount: 823.95 BDT | Source: Product refund | Product no: PB022521112261',
  },
];

export default function WalletPage() {
  const [filterKeyword, setFilterKeyword] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterSource, setFilterSource] = useState('');

  const filteredTransactions = transactions.filter((t) => {
    return (
      (filterKeyword === '' || t.id.includes(filterKeyword)) &&
      (filterType === '' || t.type === filterType) &&
      (filterSource === '' || (t.source && t.source.includes(filterSource)))
    );
  });

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 bg-gradient-to-br from-white via-green-50 to-green-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 rounded-2xl shadow-xl">
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <DashboardSidebar />
        <div>
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">💰 My Balance</h1>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
        {balances.map((b) => (
          <div
            key={b.label}
            className="rounded-xl border bg-white dark:bg-zinc-900 dark:border-zinc-700 p-6 shadow-md hover:shadow-lg transition hover:scale-105"
          >
            <div className="text-lg font-semibold text-gray-800 dark:text-white">
              {b.label} Balance
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Available:{' '}
              <span className="font-bold text-green-600 dark:text-green-400">
                {b.currency} {b.available.toFixed(2)}
              </span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Pending:{' '}
              <span className="font-bold text-yellow-600 dark:text-yellow-400">
                {b.currency} {b.pending.toFixed(2)}
              </span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Hold:{' '}
              <span className="font-bold text-red-600 dark:text-red-400">
                {b.currency} {b.hold.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="rounded-xl border bg-white dark:bg-zinc-900 dark:border-zinc-700 p-6 shadow-md mb-10">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
          🔍 Transaction Filters
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter wallet transaction to filter"
            value={filterKeyword}
            onChange={(e) => setFilterKeyword(e.target.value)}
            className="w-full rounded-md border bg-white dark:bg-zinc-800 dark:border-zinc-700 px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full rounded-md border bg-white dark:bg-zinc-800 dark:border-zinc-700 px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select type</option>
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>
          <select
            value={filterSource}
            onChange={(e) => setFilterSource(e.target.value)}
            className="w-full rounded-md border bg-white dark:bg-zinc-800 dark:border-zinc-700 px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select source</option>
            <option value="Wallet transfer">Wallet transfer</option>
            <option value="Product refund">Product refund</option>
            <option value="Buy And Ship">Buy And Ship</option>
          </select>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => {
              setFilterKeyword('');
              setFilterType('');
              setFilterSource('');
            }}
            className="px-4 py-2 text-sm rounded-md border bg-gray-100 dark:bg-zinc-800 dark:border-zinc-700 hover:bg-gray-200 dark:hover:bg-zinc-700 transition"
          >
            Reset all
          </button>
          <button className="px-4 py-2 text-sm rounded-md bg-green-600 text-white hover:bg-green-700 transition">
            Apply Filters
          </button>
        </div>
      </div>

      {/* Transactions */}
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">📑 Transactions</h2>
      <div className="space-y-6">
        {filteredTransactions.map((t) => (
          <div
            key={t.id}
            className="rounded-xl border bg-white dark:bg-zinc-900 dark:border-zinc-700 p-6 shadow-md hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center border-b dark:border-zinc-700 pb-3 mb-3">
              <div className="text-sm font-medium text-gray-800 dark:text-white">
                Transaction ID: {t.id} {t.source && `(${t.source})`}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">{t.date}</div>
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300 mb-1">
              Amount:{' '}
              <span
                className={`font-bold ${
                  t.type === 'credit'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {t.amount}
              </span>{' '}
              ({t.type})
            </div>
            <div className="text-xs text-green-600 dark:text-green-400">Status: {t.status}</div>
            {t.description && (
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">{t.description}</div>
            )}
          </div>
        ))}
      </div>
        </div>
      </div>
    </main>
  );
}
