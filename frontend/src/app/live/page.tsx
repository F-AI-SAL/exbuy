'use client';

import { useState, useEffect } from 'react';

export default function LivePage() {
  const sessions = [
    {
      id: 1,
      title: 'Smart Home Devices Demo',
      time: '2026-01-05T19:00:00',
      desc: 'Explore the latest smart home gadgets with live Q&A.',
    },
    {
      id: 2,
      title: 'Laptop Buying Guide',
      time: '2026-01-07T20:30:00',
      desc: 'Expert tips on choosing the right laptop for your needs.',
    },
    {
      id: 3,
      title: 'Fashion Trends 2026',
      time: '2026-01-10T18:00:00',
      desc: 'Discover the hottest fashion trends with live styling tips.',
    },
  ];

  const [countdowns, setCountdowns] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const interval = setInterval(() => {
      const newCountdowns: { [key: number]: string } = {};
      sessions.forEach((s) => {
        const eventTime = new Date(s.time).getTime();
        const now = new Date().getTime();
        const diff = eventTime - now;

        if (diff <= 0) {
          newCountdowns[s.id] = 'Live Now 🎥';
        } else {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((diff / (1000 * 60)) % 60);
          const seconds = Math.floor((diff / 1000) % 60);

          newCountdowns[s.id] = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
      });
      setCountdowns(newCountdowns);
    }, 1000);

    return () => clearInterval(interval);
  }, [sessions]);

  const handleRemindMe = (sessionTitle: string) => {
    console.log(`Reminder set for: ${sessionTitle}`);
    alert(`🔔 Reminder set for "${sessionTitle}"`);
  };

  return (
    <main className="px-6 py-16 max-w-3xl mx-auto text-center bg-gradient-to-br from-white via-green-50 to-green-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 rounded-2xl shadow-xl">
      {/* Header */}
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900 dark:text-white">ExBuy Live 📺</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-10 text-sm md:text-base">
        Join interactive live sessions, product demos, and expert talks.
      </p>

      {/* Upcoming Sessions */}
      <div className="space-y-6">
        {sessions.map((s) => (
          <div
            key={s.id}
            className="rounded-xl border bg-white dark:bg-zinc-900 dark:border-zinc-700 p-6 shadow-md hover:shadow-lg transition hover:scale-105 text-left"
          >
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{s.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {new Date(s.time).toLocaleString('en-BD', {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">{s.desc}</p>

            {/* Countdown Timer */}
            <p className="mt-3 text-sm font-semibold text-green-600 dark:text-green-400">
              {countdowns[s.id]}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-4">
              <button className="px-5 py-2 rounded-md bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition">
                ▶ Join Live
              </button>
              <button
                onClick={() => handleRemindMe(s.title)}
                className="px-5 py-2 rounded-md border bg-gray-100 dark:bg-zinc-800 dark:border-zinc-700 text-sm font-semibold hover:bg-gray-200 dark:hover:bg-zinc-700 transition"
              >
                🔔 Remind Me
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="mt-12 text-xs text-gray-500 dark:text-gray-400">
        <p>Powered by ExBuy Live Streaming Technology</p>
      </div>
    </main>
  );
}
