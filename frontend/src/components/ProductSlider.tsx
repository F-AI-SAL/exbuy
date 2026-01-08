'use client';

import { useEffect, useRef, useState } from 'react';
import { api } from '@/lib/api';
import ProductCard from './ProductCard';

interface Product {
  id: string | number;
  name: string;
  price: number;
  image?: string;
  tag?: string;
}

export default function ProductCarousel({ endpoint, title }: { endpoint: string; title: string }) {
  const [items, setItems] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setLoading(true);
    api(endpoint)
      .then((d) => setItems(d.results || []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [endpoint]);

  // Auto-scroll logic
  useEffect(() => {
    if (!items.length) return;

    const startAutoScroll = () => {
      if (!carouselRef.current) return;
      intervalRef.current = setInterval(() => {
        const el = carouselRef.current;
        if (!el) return; // ✅ guard inside callback

        el.scrollBy({ left: 220, behavior: 'smooth' });
        // Loop back to start
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth) {
          el.scrollTo({ left: 0, behavior: 'smooth' });
        }
      }, 3000);
    };

    startAutoScroll();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [items]);

  // Pause on hover
  const handleMouseEnter = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    if (!carouselRef.current) return;
    intervalRef.current = setInterval(() => {
      const el = carouselRef.current;
      if (!el) return; // ✅ guard inside callback

      el.scrollBy({ left: 220, behavior: 'smooth' });
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }, 3000);
  };

  return (
    <section className="space-y-4">
      {/* Section header */}
      <h2
        className="text-xl md:text-2xl font-extrabold text-transparent bg-clip-text 
                   bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
      >
        {title}
      </h2>

      {/* Error state */}
      {error && (
        <div className="rounded-md bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 p-3">
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="w-48 h-64 rounded-xl bg-gray-200 dark:bg-zinc-800 animate-pulse shrink-0"
            />
          ))}
        </div>
      )}

      {/* Carousel */}
      {!loading && (
        <div
          ref={carouselRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory 
                     scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-zinc-700"
        >
          {items.length > 0 ? (
            items.map((p) => (
              <div key={p.id} className="snap-start shrink-0 w-56">
                <ProductCard name={p.name} price={p.price} image={p.image} tag={p.tag} />
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-500 dark:text-gray-400 px-2 py-4">
              No items available
            </div>
          )}
        </div>
      )}
    </section>
  );
}