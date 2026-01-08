'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

interface Card {
  title: string;
  desc: string;
  link: string;
  growth?: number; // optional growth percentage
}

interface Stats {
  merchants?: number;
  orders?: number;
}

export default function DashboardCards() {
  const [cards, setCards] = useState<Card[]>([]);
  const [stats, setStats] = useState<Stats>({});
  const [role, setRole] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [timeline, setTimeline] = useState<'7d' | 'month'>('7d');

  useEffect(() => {
    api('/').then((d) => {
      setCards(d.cards || []);
      setStats(d.stats || {});
      setRole(d.role || '');
      setLoading(false);
    });
  }, [timeline]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-xl p-6 bg-gray-200 dark:bg-zinc-800 animate-pulse h-32">
            <div className="h-6 w-1/2 bg-gray-300 dark:bg-zinc-700 rounded mb-3"></div>
            <div className="h-4 w-1/3 bg-gray-300 dark:bg-zinc-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="space-y-6">
      {/* Stats bar */}
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 font-medium">
          Role: {role || 'Guest'}
        </span>
        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200 font-medium">
          Merchants: {stats.merchants ?? 0}
        </span>
        <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200 font-medium">
          Orders: {stats.orders ?? 0}
        </span>

        {/* Timeline chips */}
        <div className="ml-auto flex gap-2">
          <button
            onClick={() => setTimeline('7d')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
              timeline === '7d'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-zinc-600'
            }`}
          >
            Last 7 days
          </button>
          <button
            onClick={() => setTimeline('month')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
              timeline === 'month'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-zinc-600'
            }`}
          >
            This month
          </button>
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, i) => {
          const growth = card.growth ?? 0;
          const isPositive = growth >= 0;
          return (
            <Link
              key={i}
              href={card.link}
              className="group relative rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6 shadow-sm hover:shadow-xl transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
            >
              {/* Gradient header strip */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-t-xl" />

              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {card.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{card.desc}</p>

              {/* Mini stats badge */}
              <div
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                  isPositive
                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'
                    : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
                }`}
              >
                {isPositive ? (
                  <ArrowUpIcon className="h-3 w-3" />
                ) : (
                  <ArrowDownIcon className="h-3 w-3" />
                )}
                {growth}%
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
