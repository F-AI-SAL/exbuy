'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';

interface Feature {
  title: string;
  link: string;
  icon: keyof typeof icons;
  desc?: string; // tooltip text
}

const icons: Record<string, string> = {
  grid: '📦',
  quote: '🧾',
  show: '🎪',
  star: '⭐',
};

export default function FeatureIcons() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api('/').then((d) => {
      setFeatures(d.features || []);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-xl p-6 bg-gray-200 dark:bg-zinc-800 animate-pulse h-24">
            <div className="h-6 w-1/2 bg-gray-300 dark:bg-zinc-700 rounded mb-2"></div>
            <div className="h-4 w-1/3 bg-gray-300 dark:bg-zinc-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="w-full px-6 py-10">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Our Expertise</h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <Link
            key={i}
            href={f.link}
            className="group relative flex flex-col items-center justify-center rounded-xl border border-gray-200 dark:border-zinc-700 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-6 shadow-sm hover:shadow-xl transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
          >
            {/* Icon */}
            <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
              {icons[f.icon] || '✨'}
            </div>

            {/* Title */}
            <span className="mt-3 text-sm font-medium group-hover:text-yellow-300 transition-colors">
              {f.title}
            </span>

            {/* Tooltip */}
            {f.desc && (
              <div className="absolute bottom-full mb-2 hidden group-hover:block px-3 py-1 rounded-lg bg-black/80 text-white text-xs whitespace-nowrap shadow-lg">
                {f.desc}
              </div>
            )}

            {/* Animated gradient background overlay */}
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient-x" />
          </Link>
        ))}
      </div>
    </section>
  );
}
