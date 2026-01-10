'use client';
import useShipmentsWS from '@/hooks/useShipmentsWS';
import { useState } from 'react';
import Link from 'next/link';
import DashboardSidebar from '@/components/dashboard/Sidebar';

const statusTabs = [
  { key: 'all', label: 'All', count: 1 },
  { key: 'toBeConfirmed', label: 'To Be Confirmed', count: 0 },
  { key: 'warehouse', label: 'At Warehouse', count: 0 },
  { key: 'way', label: 'Way to Destination', count: 0 },
  { key: 'received', label: 'Received', count: 0 },
  { key: 'courier', label: 'At Courier', count: 0 },
  { key: 'completed', label: 'Completed', count: 0 },
  { key: 'cancelled', label: 'Cancelled', count: 1 },
];

export default function ShipmentsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [sortOption, setSortOption] = useState('newest');
  const wsUrl = process.env.NEXT_PUBLIC_SHIPMENTS_WS_URL || '';
  const items = useShipmentsWS(wsUrl);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const totalShipments = 2;
  const totalPages = Math.ceil(totalShipments / pageSize);

  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, totalShipments);

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <DashboardSidebar />
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">My Shipments</h1>

          <div className="flex flex-wrap gap-2 border-b dark:border-zinc-700 mb-6">
            {statusTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 text-sm font-medium rounded-t-md transition-all ${
                  activeTab === tab.key
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow'
                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {tab.label}
                <span
                  className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${
                    activeTab === tab.key
                      ? 'bg-white text-blue-600'
                      : 'bg-gray-200 dark:bg-zinc-700 dark:text-gray-200'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <div className="rounded-lg border bg-white dark:bg-zinc-900 dark:border-zinc-700 p-4 shadow mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Keyword
                </label>
                <input
                  type="text"
                  placeholder="Search by product number, tracking, order number, title"
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

            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex gap-3">
                <button className="px-3 py-2 text-sm rounded-md border bg-gray-100 dark:bg-zinc-800 dark:border-zinc-700 hover:bg-gray-200 dark:hover:bg-zinc-700">
                  Expand Filters
                </button>
                <button className="px-3 py-2 text-sm rounded-md border bg-gray-100 dark:bg-zinc-800 dark:border-zinc-700 hover:bg-gray-200 dark:hover:bg-zinc-700">
                  Reset all
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
                  </select>
                </div>

                <div>
                  <label className="text-sm text-gray-700 dark:text-gray-300 mr-2">
                    Shipments per page:
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

          <div className="space-y-6">
            {items.map((s) => (
              <div
                key={s.id}
                className="rounded-lg border bg-white dark:bg-zinc-900 dark:border-zinc-700 shadow"
              >
                <div className="flex justify-between  items-center border-b dark:border-zinc-700 p-4">
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    Order: <span className="font-medium">{s.id}</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{s.updated_at}</div>
                </div>
                <div className="p-4 space-y-4">
                  <div className="text-sm text-gray-700 dark:text-gray-300">Status: {s.status}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Tracking: {s.tracking}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <div className="text-sm font-semibold mb-2">Warehouse Address</div>
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Name: Yin guosong | Mobile: +8613724883163
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Address: Guangzhou, Guangdong, China
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300">Shipping mark: MVN/DDGS</div>
          </div>

          <div className="mt-4">
            <div className="text-sm font-semibold mb-2">Shipping Info</div>
            <div className="text-sm text-gray-700 dark:text-gray-300">
              cargo - By air | Company: ExBuy Global Shipping | Cost: 1150/kg
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300">Status: Shipping cancelled</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Tracking: 773340965348757</div>
          </div>

          <div className="flex gap-3 mt-4">
            <Link
              href="/shipments/SAP2523878525/details"
              className="px-3 py-2 text-sm rounded-md border bg-gray-100 dark:bg-zinc-800 
                         dark:border-zinc-700 hover:bg-gray-200 dark:hover:bg-zinc-700"
            >
              View Details
            </Link>
            <button className="px-3 py-2 text-sm rounded-md border bg-red-600 text-white hover:bg-red-700">
              Cancel Shipment
            </button>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Showing {startIndex}-{endIndex} of {totalShipments} shipments
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-700 dark:text-gray-300">Shipments per page:</label>
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

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-3 py-2 text-sm rounded-md border bg-gray-100 dark:bg-zinc-800 
                       dark:border-zinc-700 hover:bg-gray-200 dark:hover:bg-zinc-700 disabled:opacity-50"
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
                className="px-3 py-2 text-sm rounded-md border bg-gray-100 dark:bg-zinc-800 
                       dark:border-zinc-700 hover:bg-gray-200 dark:hover:bg-zinc-700 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
