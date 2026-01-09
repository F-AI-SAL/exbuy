'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AuthModal from '../components/AuthModal';
import {
  FaCalculator,
  FaCamera,
  FaCouch,
  FaFileInvoice,
  FaHeadset,
  FaHeart,
  FaMobileAlt,
  FaShoePrints,
  FaShippingFast,
  FaTshirt,
  FaVideo,
} from 'react-icons/fa';

export default function Page() {
  const [openModal, setOpenModal] = useState(false);

  const categories = useMemo(
    () => [
      { label: 'Shoes', icon: <FaShoePrints />, href: '/categories' },
      { label: 'Jackets', icon: <FaTshirt />, href: '/categories' },
      { label: 'Furniture', icon: <FaCouch />, href: '/categories' },
      { label: 'Gadgets', icon: <FaMobileAlt />, href: '/categories' },
    ],
    []
  );

  const expertise = useMemo(
    () => [
      { label: 'Ship For Me Request', icon: <FaShippingFast />, type: 'modal' },
      { label: 'RFQ', icon: <FaFileInvoice />, type: 'modal' },
      { label: 'Talk to Expert', icon: <FaHeadset />, type: 'modal' },
      { label: 'Cost Calculator', icon: <FaCalculator />, type: 'link', href: '/calculator' },
      { label: 'ExBuy Lens', icon: <FaCamera />, type: 'link', href: '/lens' },
      { label: 'ExBuy Live', icon: <FaVideo />, type: 'link', href: '/live' },
      { label: 'Wishlist', icon: <FaHeart />, type: 'link', href: '/wishlist' },
    ],
    []
  );

  return (
    <div className="space-y-10">
      <section className="rounded-2xl bg-gradient-to-br from-[#214b7a] via-[#1f4a78] to-[#1b355b] p-6 text-white shadow-lg md:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
              Home Appliance Deal
            </div>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
              Home Appliance Deal
            </h1>
            <div className="mt-4 inline-flex items-center rounded bg-white px-4 py-2 text-xl font-bold text-red-600">
              Up To 50% OFF
            </div>
            <p className="mt-3 text-xs text-slate-200">T and C apply</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/categories"
                className="rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-emerald-950 shadow hover:bg-emerald-300"
              >
                Shop now
              </Link>
              <Link
                href="#browse"
                className="rounded-full border border-white/50 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                Browse categories
              </Link>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute -right-4 -top-6 h-28 w-28 rounded-full bg-white/10 blur-xl" />
            <div className="absolute -bottom-6 left-8 h-20 w-20 rounded-full bg-emerald-300/30 blur-lg" />
            <div className="grid w-full max-w-md grid-cols-2 gap-4">
              <div className="col-span-2 rounded-2xl bg-white/5 p-4">
                <Image
                  src="/hero-appliances.svg"
                  alt="Appliance collection"
                  width={520}
                  height={380}
                  className="w-full"
                  priority
                />
              </div>
              <div className="rounded-2xl bg-white/5 p-3">
                <Image
                  src="/appliance-grill.svg"
                  alt="Kitchen grill"
                  width={220}
                  height={180}
                  className="w-full"
                />
              </div>
              <div className="rounded-2xl bg-white/5 p-3">
                <Image
                  src="/appliance-blender.svg"
                  alt="Blender"
                  width={220}
                  height={180}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {[0, 1, 2, 3, 4].map((dot) => (
            <span
              key={dot}
              className={`h-2 w-2 rounded-full ${dot === 2 ? 'bg-white' : 'bg-white/40'}`}
            />
          ))}
        </div>
      </section>

      <section id="browse" className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-zinc-900">Top Categories</h2>
            <div className="flex items-center gap-2">
              <button className="rounded-full border border-zinc-200 px-3 py-1 text-sm text-zinc-500">
                <span className="sr-only">Previous</span>
                {'<'}
              </button>
              <button className="rounded-full border border-zinc-200 px-3 py-1 text-sm text-zinc-500">
                <span className="sr-only">Next</span>
                {'>'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {categories.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="flex flex-col items-center gap-3 rounded-xl border border-zinc-100 bg-white p-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  {cat.icon}
                </span>
                <span className="text-sm font-semibold text-zinc-800">{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-zinc-900">Our Expertise</h2>
            <Link href="/services" className="text-sm font-semibold text-emerald-700">
              See all
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {expertise.map((item) =>
              item.type === 'modal' ? (
                <button
                  key={item.label}
                  onClick={() => setOpenModal(true)}
                  className="flex flex-col items-center gap-3 rounded-xl border border-zinc-100 bg-white p-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    {item.icon}
                  </span>
                  <span className="text-xs font-semibold text-zinc-700">{item.label}</span>
                </button>
              ) : (
                <Link
                  key={item.label}
                  href={item.href || '#'}
                  className="flex flex-col items-center gap-3 rounded-xl border border-zinc-100 bg-white p-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    {item.icon}
                  </span>
                  <span className="text-xs font-semibold text-zinc-700">{item.label}</span>
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-white px-6 py-5 shadow-sm">
        <div>
          <h3 className="text-lg font-semibold text-zinc-900">New Year Offer!</h3>
          <p className="mt-1 text-sm text-zinc-500">Ends in 00:00:00:00</p>
        </div>
        <Link
          href="/offers"
          className="text-sm font-semibold text-emerald-700 hover:text-emerald-600"
        >
          Find your best deal for new year
        </Link>
      </section>

      <AuthModal open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
}