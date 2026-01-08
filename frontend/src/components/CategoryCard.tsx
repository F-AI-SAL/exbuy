'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface CategoryCardProps {
  name: string;
  href: string;
  icon?: ReactNode; // optional icon
  image?: string; // optional background image
  badge?: string; // e.g. "New", "Sale"
}

export default function CategoryCard({ name, href, icon, image, badge }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col items-center justify-center rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
    >
      {/* Background image */}
      {image && (
        <img src={image} alt={name} className="absolute inset-0 h-full w-full object-cover" />
      )}

      {/* Overlay for readability */}
      {image && <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />}

      {/* Badge */}
      {badge && (
        <span className="absolute top-3 right-3 px-2 py-1 text-xs font-semibold rounded-full bg-red-500 text-white shadow">
          {badge}
        </span>
      )}

      {/* Icon container (if no image, show icon prominently) */}
      {!image && icon && (
        <div className="flex items-center justify-center h-14 w-14 rounded-full bg-blue-50 dark:bg-zinc-800 text-2xl group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      )}

      {/* Name */}
      <span
        className={`relative mt-4 text-sm font-semibold ${
          image ? 'text-white drop-shadow-md' : 'text-gray-800 dark:text-gray-200'
        } group-hover:text-blue-300 transition-colors`}
      >
        {name}
      </span>

      {/* Hover CTA overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all">
          Shop Now
          <ArrowRightIcon className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
        </span>
      </div>
    </Link>
  );
}
