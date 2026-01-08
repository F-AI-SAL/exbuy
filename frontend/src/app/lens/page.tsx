'use client';

import { useState } from 'react';

export default function LensPage() {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      console.log('File dropped:', e.dataTransfer.files[0]);
      // এখানে তুমি backend এ পাঠাতে পারো বা preview দেখাতে পারো
    }
  };

  return (
    <main className="px-6 py-16 max-w-xl mx-auto text-center bg-gradient-to-br from-white via-green-50 to-green-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 rounded-2xl shadow-xl">
      {/* Header */}
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900 dark:text-white">ExBuy Lens 🔍</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-10 text-sm md:text-base">
        Search products instantly using images or live camera.
      </p>

      {/* Drag & Drop Upload Box */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-10 mb-8 transition ${
          dragActive
            ? 'border-green-600 bg-green-50 dark:bg-zinc-800'
            : 'border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900'
        }`}
      >
        <p className="text-gray-700 dark:text-gray-300 mb-4">Drag & drop your product image here</p>
        <label className="cursor-pointer px-6 py-3 rounded-lg bg-green-600 text-white font-semibold shadow-md hover:bg-green-700 transition inline-block">
          📤 Upload Image
          <input type="file" accept="image/*" className="hidden" />
        </label>
      </div>

      {/* Camera Button */}
      <button className="px-6 py-3 rounded-lg bg-green-600 text-white font-semibold shadow-md hover:bg-green-700 transition transform hover:scale-105">
        📸 Open Camera
      </button>

      {/* Footer Info */}
      <div className="mt-12 text-xs text-gray-500 dark:text-gray-400">
        <p>Powered by ExBuy AI Lens Technology</p>
      </div>
    </main>
  );
}
