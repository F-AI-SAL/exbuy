'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function CalculatorPage() {
  const [form, setForm] = useState({
    orderType: 'buy-ship',
    from: 'China',
    to: 'Bangladesh',
    postalCode: '',
    category: '',
    weight: 0,
    length: '',
    width: '',
    height: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  return (
    <main className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 rounded-2xl shadow-xl">
      {/* Title */}
      <h1 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white text-center">
        🚀 Shipping Cost Calculator
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
        Get instant shipping estimates with ExBuy — Fast, Secure & Budget‑Friendly
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Order Type */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Order Type *
          </label>
          <select
            value={form.orderType}
            onChange={(e) => setForm({ ...form, orderType: e.target.value })}
            className="w-full border rounded-lg px-4 py-3 bg-white dark:bg-zinc-800 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500"
          >
            <option value="buy-ship">Buy And Ship For Me</option>
            <option value="ship-only">Only Ship For Me</option>
          </select>
        </div>

        {/* From & To */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              From *
            </label>
            <input
              type="text"
              value={form.from}
              readOnly
              className="w-full border rounded-lg px-4 py-3 bg-gray-50 dark:bg-zinc-800 dark:border-zinc-700"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              To *
            </label>
            <input
              type="text"
              value={form.to}
              readOnly
              className="w-full border rounded-lg px-4 py-3 bg-gray-50 dark:bg-zinc-800 dark:border-zinc-700"
            />
            <input
              type="text"
              placeholder="Postal code / Zip code of your destination"
              value={form.postalCode}
              onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
              className="w-full mt-3 border rounded-lg px-4 py-3 bg-white dark:bg-zinc-800 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Product Category */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Product Category *
          </label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full border rounded-lg px-4 py-3 bg-white dark:bg-zinc-800 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select your product category</option>
            <option value="regular">Contains regular</option>
            <option value="fragile">Fragile</option>
            <option value="electronics">Electronics</option>
          </select>
        </div>

        {/* Weight + Dimensions */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Weight *
            </label>
            <input
              type="number"
              value={form.weight}
              onChange={(e) => setForm({ ...form, weight: Number(e.target.value) })}
              className="w-full border rounded-lg px-4 py-3 bg-white dark:bg-zinc-800 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-xs text-gray-500">Kg</span>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Dimensions (CBM)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Length"
                value={form.length}
                onChange={(e) => setForm({ ...form, length: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-zinc-800 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Width"
                value={form.width}
                onChange={(e) => setForm({ ...form, width: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-zinc-800 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Height"
                value={form.height}
                onChange={(e) => setForm({ ...form, height: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-zinc-800 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <span className="text-xs text-gray-500">Cm</span>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition flex items-center justify-center"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              Calculating...
            </span>
          ) : (
            'Get Shipping Rate'
          )}
        </button>
      </form>

      {/* Success Message */}
      {success && (
        <div className="mt-6 p-4 rounded-lg bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-center font-semibold">
          ✅ Shipping rate calculated successfully! You’ll get the best deals tailored for you.
        </div>
      )}

      {/* International Flow */}
      <div className="mt-10 flex items-center justify-around">
        <div className="flex flex-col items-center">
          <Image src="/icons/seller.svg" alt="Seller" width={50} height={50} />
          <span className="text-sm mt-2 font-medium">Seller</span>
        </div>
        <div className="flex flex-col items-center">
          <Image src="/icons/source_warehouse.svg" alt="China Warehouse" width={50} height={50} />
          <span className="text-sm mt-2 font-medium">China Warehouse</span>
        </div>
        <div className="flex flex-col items-center">
          <Image src="/icons/delivery.svg" alt="Doorstep Delivery" width={50} height={50} />
          <span className="text-sm mt-2 font-medium">Doorstep Delivery</span>
        </div>
      </div>
    </main>
  );
}
