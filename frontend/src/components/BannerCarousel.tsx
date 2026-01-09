'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { api } from '@/lib/api';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface Banner {
  id: string | number;
  title: string;
  subtitle?: string;
  image?: string;
  link: string;
  cta: string;
  products?: { src: string; alt: string }[];
}

const topCategories = [
  { name: 'Shoes', icon: '/icons/shoes.svg', href: '/categories/shoes' },
  { name: 'Jackets', icon: '/icons/jackets.svg', href: '/categories/jackets' },
  { name: 'Furniture', icon: '/icons/furniture.svg', href: '/categories/furniture' },
  { name: 'Gadgets', icon: '/icons/gadgets.svg', href: '/categories/gadgets' },
];

const expertise = [
  { name: 'Ship for Me Request', icon: '/icons/ship.svg', href: '/services/ship' },
  { name: 'RFQ', icon: '/icons/rfq.svg', href: '/services/rfq' },
  { name: 'Talk to the Expert', icon: '/icons/expert.svg', href: '/services/expert' },
  { name: 'Cost Calculator', icon: '/icons/calculator.svg', href: '/services/calculator' },
];

export default function BannerCarousel() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // helper functions
  const scrollToIndex = (index: number) => {
    if (containerRef.current) {
      const cardWidth = containerRef.current.clientWidth;
      containerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth',
      });
    }
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  };

  // ✅ autoplay logic inline (no handleNext dependency)
  useEffect(() => {
    if (!banners.length) return;
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      const newIndex = activeIndex === banners.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(newIndex);
      scrollToIndex(newIndex);
    }, 5000);
    return () => stopAutoplay();
  }, [banners, activeIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    const deltaX = touchStartX.current - touchEndX.current;
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        const newIndex = activeIndex === banners.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(newIndex);
        scrollToIndex(newIndex);
      } else {
        const newIndex = activeIndex === 0 ? banners.length - 1 : activeIndex - 1;
        setActiveIndex(newIndex);
        scrollToIndex(newIndex);
      }
    }
  };

  useEffect(() => {
    api('/').then((d) => {
      setBanners(d.banners || []);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex gap-4 overflow-x-hidden">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-full flex-shrink-0 rounded-xl p-6 bg-gray-200 dark:bg-zinc-800 animate-pulse h-56"
          >
            <div className="h-6 w-1/2 bg-gray-300 dark:bg-zinc-700 rounded mb-3"></div>
            <div className="h-4 w-1/3 bg-gray-300 dark:bg-zinc-700 rounded mb-2"></div>
            <div className="h-8 w-24 bg-gray-300 dark:bg-zinc-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!banners.length) return null;

  return (
    <section className="relative w-full">
      {/* Carousel */}
      <div
        aria-roledescription="carousel"
        aria-label="Promotional banners"
        onMouseEnter={stopAutoplay}
        onMouseLeave={() => {
          stopAutoplay();
          autoplayRef.current = setInterval(() => {
            const newIndex = activeIndex === banners.length - 1 ? 0 : activeIndex + 1;
            setActiveIndex(newIndex);
            scrollToIndex(newIndex);
          }, 5000);
        }}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') {
            const newIndex = activeIndex === 0 ? banners.length - 1 : activeIndex - 1;
            setActiveIndex(newIndex);
            scrollToIndex(newIndex);
          }
          if (e.key === 'ArrowRight') {
            const newIndex = activeIndex === banners.length - 1 ? 0 : activeIndex + 1;
            setActiveIndex(newIndex);
            scrollToIndex(newIndex);
          }
        }}
      >
        <div
          ref={containerRef}
          className="flex overflow-x-hidden snap-x snap-mandatory scroll-smooth"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {banners.map((b, i) => (
            <div
              key={b.id ?? i}
              className="w-full flex-shrink-0 snap-start p-6 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 text-white rounded-xl shadow-2xl transition-all duration-500 ease-out"
              aria-hidden={activeIndex !== i}
            >
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-2">{b.title}</h2>
                  {b.subtitle && <p className="text-sm text-gray-200 mb-3">{b.subtitle}</p>}
                  <div className="inline-block bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow mb-4">
                    Up to 50% OFF
                  </div>
                  <Link
                    href={b.link}
                    className="inline-block px-5 py-2 rounded-lg bg-white text-blue-700 font-semibold text-sm shadow hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                  >
                    {b.cta}
                  </Link>
                </div>

                {/* Product image grid */}
                {b.products && (
                  <div className="grid grid-cols-3 gap-4 flex-1">
                    {b.products.map((p, idx) => (
                      <Image
                        key={idx}
                        src={p.src}
                        alt={p.alt}
                        width={128}
                        height={128}
                        loading="lazy"
                        className="h-32 w-full object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

                {/* Arrows */}
        <button
          onClick={() => {
            const newIndex = activeIndex === 0 ? banners.length - 1 : activeIndex - 1;
            setActiveIndex(newIndex);
            scrollToIndex(newIndex);
          }}
          className="absolute top-1/2 left-3 -translate-y-1/2 p-3 rounded-full bg-white/80 dark:bg-zinc-800 shadow-lg hover:bg-white dark:hover:bg-zinc-700 transition focus:outline-none focus:ring-2 focus:ring-blue-600"
          aria-label="Previous banner"
        >
          <ChevronLeftIcon className="h-6 w-6 text-gray-800 dark:text-white" />
        </button>
        <button
          onClick={() => {
            const newIndex = activeIndex === banners.length - 1 ? 0 : activeIndex + 1;
            setActiveIndex(newIndex);
            scrollToIndex(newIndex);
          }}
          className="absolute top-1/2 right-3 -translate-y-1/2 p-3 rounded-full bg-white/80 dark:bg-zinc-800 shadow-lg hover:bg-white dark:hover:bg-zinc-700 transition focus:outline-none focus:ring-2 focus:ring-blue-600"
          aria-label="Next banner"
        >
          <ChevronRightIcon className="h-6 w-6 text-gray-800 dark:text-white" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveIndex(i);
                scrollToIndex(i);
              }}
              className={`w-3 h-3 rounded-full transition ${
                activeIndex === i
                  ? 'bg-blue-600 dark:bg-blue-400 scale-125 ring-2 ring-white/70'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
              }`}
              aria-label={`Go to banner ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Top Categories */}
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
        {topCategories.map((cat) => (
          <Link
            key={cat.name}
            href={cat.href}
            className="flex flex-col items-center justify-center p-4 rounded-xl bg-white dark:bg-zinc-800 shadow hover:shadow-lg transition group"
          >
            <Image
              src={cat.icon}
              alt={cat.name}
              width={40}
              height={40}
              className="h-10 w-10 mb-2 group-hover:scale-110 transition-transform"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>

      {/* Our Expertise */}
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
        {expertise.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow hover:shadow-xl transition group"
          >
            <Image
              src={item.icon}
              alt={item.name}
              width={40}
              height={40}
              className="h-10 w-10 mb-2 group-hover:scale-110 transition-transform"
            />
            <span className="text-sm font-semibold group-hover:text-yellow-300">
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
