'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AuthModal from '../components/AuthModal';
import {
  FaShippingFast,
  FaFileInvoice,
  FaHeadset,
  FaCalculator,
  FaCamera,
  FaVideo,
  FaHeart,
  FaShoePrints,
  FaCouch,
  FaMobileAlt,
  FaTshirt,
} from 'react-icons/fa';

export default function Page() {
  const [openModal, setOpenModal] = useState(false);
  const [countdown, setCountdown] = useState('02:10:41:04');

  const handleSensitiveClick = () => setOpenModal(true);

  const actions = [
    { label: 'Ship For Me Request', icon: <FaShippingFast />, type: 'modal' },
    { label: 'Request for Quotations', icon: <FaFileInvoice />, type: 'modal' },
    { label: 'Talk to Expert', icon: <FaHeadset />, type: 'modal' },
    { label: 'Cost Calculator', icon: <FaCalculator />, type: 'link', href: '/calculator' },
    { label: 'ExBuy Lens', icon: <FaCamera />, type: 'link', href: '/lens' },
    { label: 'ExBuy Live', icon: <FaVideo />, type: 'link', href: '/live' },
    { label: 'Wishlist', icon: <FaHeart />, type: 'link', href: '/wishlist' },
  ];

  const categories = [
    { label: 'Shoes', icon: <FaShoePrints /> },
    { label: 'Jackets', icon: <FaTshirt /> },
    { label: 'Furniture', icon: <FaCouch /> },
    { label: 'Gadgets', icon: <FaMobileAlt /> },
  ];

  // Auto-scroll effect (optional)
  useEffect(() => {
    const container = document.getElementById('actions-carousel');
    if (!container) return;
    let scrollAmount = 0;
    const interval = setInterval(() => {
      scrollAmount += 2;
      container.scrollLeft = scrollAmount;
      if (scrollAmount >= container.scrollWidth - container.clientWidth) {
        scrollAmount = 0;
      }
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="px-6 py-12">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 text-white rounded-2xl shadow-xl p-12 text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
          Sea Shipping Deals
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Up To <span className="font-extrabold text-yellow-300">20% OFF</span>
        </p>
        <p className="text-xs italic mb-6">*T&C Apply</p>
        {/* Explore Deals button scrolls to categories */}
        <a
          href="#categories-section"
          className="inline-block px-6 py-3 rounded-lg bg-yellow-400 text-black font-semibold shadow hover:bg-yellow-500 transition"
        >
          Explore Deals →
        </a>
      </section>

      {/* Top Categories + Our Expertise side by side */}
      <section id="categories-section" className="mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Top Categories */}
          <div>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-8 text-center lg:text-left">
              Top Categories
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {categories.map((cat) => (
                <div
                  key={cat.label}
                  className="flex flex-col items-center justify-center p-6 rounded-xl shadow-md bg-white dark:bg-zinc-900 hover:shadow-lg hover:scale-105 transition"
                >
                  <div className="text-3xl text-blue-600 dark:text-blue-400 mb-2">{cat.icon}</div>
                  <span className="text-sm font-semibold text-black dark:text-white">{cat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Our Expertise */}
          <div>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-8 text-center lg:text-left">
              Our Expertise
            </h2>
            <div
              id="actions-carousel"
              className="flex flex-row flex-wrap justify-center lg:justify-start gap-4 overflow-x-auto scroll-snap-x scroll-snap-mandatory"
            >
              {actions.map((action) =>
                action.type === 'modal' ? (
                  <button
                    key={action.label}
                    onClick={handleSensitiveClick}
                    className="flex flex-col items-center justify-center w-32 h-32 rounded-xl shadow-md bg-gradient-to-br from-white to-gray-100 dark:from-zinc-900 dark:to-zinc-800 hover:shadow-lg hover:scale-105 transition shrink-0 scroll-snap-align-start"
                  >
                    <div className="text-2xl text-indigo-600 dark:text-indigo-400 mb-2">{action.icon}</div>
                    <span className="text-sm font-medium text-black dark:text-white text-center">
                      {action.label}
                    </span>
                  </button>
                ) : (
                  <Link key={action.label} href={action.href || '#'}>
                    <button className="flex flex-col items-center justify-center w-32 h-32 rounded-xl shadow-md bg-gradient-to-br from-white to-gray-100 dark:from-zinc-900 dark:to-zinc-800 hover:shadow-lg hover:scale-105 transition shrink-0 scroll-snap-align-start">
                      <div className="text-2xl text-indigo-600 dark:text-indigo-400 mb-2">{action.icon}</div>
                      <span className="text-sm font-medium text-black dark:text-white text-center">
                        {action.label}
                      </span>
                    </button>
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Offer */}
      <section className="text-center mb-16">
        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">New Year Offer!</h2>
        <div className="inline-block px-6 py-4 rounded-xl bg-red-100 dark:bg-red-900 shadow">
          <p className="text-3xl font-extrabold text-red-600 dark:text-red-400 mb-2 tracking-widest">
            {countdown}
          </p>
        </div>
        <div className="mt-4">
          <Link
            href="/offers"
            className="text-sm font-semibold text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
          >
            Find your best deal for new year →
          </Link>
        </div>
      </section>

      {/* Modal */}
      <AuthModal open={openModal} onClose={() => setOpenModal(false)} />
    </main>
  );
}
