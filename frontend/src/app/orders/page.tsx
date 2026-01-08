'use client';
import { useState } from 'react';
import Link from 'next/link';

const statusTabs = [
  { key: 'all', label: 'All', count: 16 },
  { key: 'toPay', label: 'To Pay', count: 5 },
  { key: 'purchased', label: 'Purchased', count: 0 },
  { key: 'warehouse', label: 'At Warehouse', count: 0 },
  { key: 'way', label: 'Way to destination', count: 0 },
  { key: 'received', label: 'Received', count: 4 },
  { key: 'courier', label: 'At Courier', count: 0 },
  { key: 'completed', label: 'Completed', count: 6 },
  { key: 'refund', label: 'Refund', count: 3 },
  { key: 'cancelled', label: 'Cancelled', count: 2 },
];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [sortOption, setSortOption] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const totalOrders = 100; // demo total orders
  const totalPages = Math.ceil(totalOrders / pageSize);

  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, totalOrders);

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">My Orders</h1>

      {/* Status Tabs */}
      <div className="flex flex-wrap gap-2 border-b dark:border-zinc-700 mb-6">
        {statusTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm font-medium rounded-t-md transition ${
              activeTab === tab.key
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow'
                : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Filters + Sorting */}
      <div className="rounded-lg border bg-white dark:bg-zinc-900 dark:border-zinc-700 p-4 shadow mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Keyword
            </label>
            <input
              type="text"
              placeholder="Search by product number, shipping provider, order number, title"
              className="w-full rounded-md border bg-white dark:bg-zinc-800 dark:border-zinc-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Product status
            </label>
            <select className="w-full rounded-md border bg-white dark:bg-zinc-800 dark:border-zinc-700 px-3 py-2 text-sm">
              <option>Please select a status</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Payment status
            </label>
            <select className="w-full rounded-md border bg-white dark:bg-zinc-800 dark:border-zinc-700 px-3 py-2 text-sm">
              <option>Please select a status</option>
            </select>
          </div>
        </div>

        {/* Sorting + Page Size */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-3">
            <button className="px-3 py-2 text-sm rounded-md border bg-gray-100 dark:bg-zinc-800 dark:border-zinc-700 hover:bg-gray-200 dark:hover:bg-zinc-700">
              Expand Filters
            </button>
            <button className="px-3 py-2 text-sm rounded-md border bg-gray-100 dark:bg-zinc-800 dark:border-zinc-700 hover:bg-gray-200 dark:hover:bg-zinc-700">
              Reset all
            </button>
            <button className="px-3 py-2 text-sm rounded-md border bg-gray-100 dark:bg-zinc-800 dark:border-zinc-700 hover:bg-gray-200 dark:hover:bg-zinc-700">
              Export
            </button>
            <button className="px-3 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700">
              Apply
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div>
              <label className="text-sm text-gray-700 dark:text-gray-300 mr-2">Sort by:</label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="rounded-md border bg-white dark:bg-zinc-800 dark:border-zinc-700 px-3 py-2 text-sm"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="priceHigh">Price: High → Low</option>
                <option value="priceLow">Price: Low → High</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-700 dark:text-gray-300 mr-2">
                Orders per page:
              </label>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="rounded-md border bg-white dark:bg-zinc-800 dark:border-zinc-700 px-3 py-2 text-sm"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Example Order Card */}
      <div className="rounded-lg border bg-white dark:bg-zinc-900 dark:border-zinc-700 shadow mb-6">
        <div className="flex justify-between items-center border-b dark:border-zinc-700 p-4">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Order: <span className="font-medium">BDC2523107841</span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">23 Dec 2025</div>
        </div>
        <div className="p-4 space-y-4">
          <div className="text-sm font-semibold text-red-600">Pay Due (৳1970.00)</div>
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Cross-border hot Metal Microphone Robot Metal Microphone guitar with light home
            decoration
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Product No: PB1225236B534D | Category: Arts & Crafts Accessories | Quantity: 3 | Weight:
            0.3 kg
          </div>
          <div className="text-sm font-medium text-gray-800 dark:text-white">
            Total price: ৳1970.38 (Shipping charge will be included later)
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-4">
            <Link
              href="/orders/BDC2523107841/details"
              className="px-3 py-2 text-sm rounded-md border bg-gray-100 dark:bg-zinc-800 dark:border-zinc-700 hover:bg-gray-200 dark:hover:bg-zinc-700"
            >
              View Details
            </Link>
            <Link
              href="/orders/BDC2523107841/invoice"
              className="px-3 py-2 text-sm rounded-md border bg-gray-100 dark:bg-zinc-800 dark:border-zinc-700 hover:bg-gray-200 dark:hover:bg-zinc-700"
            ></Link>
            <button className="px-3 py-2 text-sm rounded-md border bg-red-600 text-white hover:bg-red-700">
              Cancel Order
            </button>
          </div>
        </div>
      </div>

      {/* Pagination + Page Size Selector + Range Indicator */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8">
        {/* Range Indicator */}
        <div className="text-sm text-gray-700 dark:text-gray-300">
          Showing {startIndex}–{endIndex} of {totalOrders} orders
        </div>

        {/* Page Size Selector */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700 dark:text-gray-300">Orders per page:</label>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1); // reset to first page when page size changes
            }}
            className="rounded-md border bg-white dark:bg-zinc-800 dark:border-zinc-700 px-3 py-2 text-sm"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-3 py-2 text-sm rounded-md border bg-gray-100 dark:bg-zinc-800 dark:border-zinc-700 hover:bg-gray-200 dark:hover:bg-zinc-700 disabled:opacity-50"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-2 text-sm rounded-md border transition ${
                currentPage === page
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-gray-100 dark:bg-zinc-800 dark:border-zinc-700 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-3 py-2 text-sm rounded-md border bg-gray-100 dark:bg-zinc-800 dark:border-zinc-700 hover:bg-gray-200 dark:hover:bg-zinc-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}
