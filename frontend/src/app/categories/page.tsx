// frontend/src/app/categories/page.tsx
'use client';

import Link from 'next/link';
import {
  FaTshirt,
  FaHome,
  FaBolt,
  FaChild,
  FaLeaf,
  FaHammer,
  FaIndustry,
  FaCar,
  FaFootballBall,
  FaBriefcase,
  FaSolarPanel,
} from 'react-icons/fa';

export default function CategoriesPage() {
  const categories = [
    {
      name: 'Fashion & Personal Style',
      icon: FaTshirt,
      href: '/categories/fashion',
    },
    {
      name: 'Home & Lifestyle',
      icon: FaHome,
      href: '/categories/home-lifestyle',
    },
    {
      name: 'Electrical & Electronics',
      icon: FaBolt,
      href: '/categories/electronics',
    },
    {
      name: 'Family, Kids & Daily Care',
      icon: FaChild,
      href: '/categories/family-care',
    },
    {
      name: 'Agriculture & Food Industry',
      icon: FaLeaf,
      href: '/categories/agriculture-food',
    },
    {
      name: 'Construction & Engineering',
      icon: FaHammer,
      href: '/categories/construction',
    },
    {
      name: 'Industrial & Manufacturing',
      icon: FaIndustry,
      href: '/categories/industrial',
    },
    {
      name: 'Automotive & Transportation',
      icon: FaCar,
      href: '/categories/automotive',
    },
    {
      name: 'Sports, Leisure & Recreation',
      icon: FaFootballBall,
      href: '/categories/sports',
    },
    {
      name: 'Business, Packaging & Office',
      icon: FaBriefcase,
      href: '/categories/business-office',
    },
    {
      name: 'Energy & Sustainability',
      icon: FaSolarPanel,
      href: '/categories/energy',
    },
  ];

  return (
    <main className="px-6 py-16 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm mb-6 text-zinc-600 dark:text-zinc-400">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>›</li>
          <li className="font-semibold text-black dark:text-white">Categories</li>
        </ol>
      </nav>

      {/* Page Title */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-black dark:text-white mb-8">
        Browse Categories
      </h1>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        {categories.map((c) => (
          <div
            key={c.name}
            className="flex flex-col items-center justify-center p-6 rounded-xl shadow-lg bg-white dark:bg-zinc-900 hover:shadow-xl hover:scale-105 transition w-full"
          >
            <div className="text-3xl text-blue-600 mb-3">
              <c.icon />
            </div>
            <span className="text-lg font-semibold text-black dark:text-white mb-3">{c.name}</span>
            <Link
              href={c.href}
              className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Explore
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
