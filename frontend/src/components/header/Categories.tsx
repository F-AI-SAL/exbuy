'use client';
import { useState, useEffect, useMemo, useRef } from 'react';
import { CATEGORY_MENU } from '@/lib/config';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

export default function Categories() {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const activeCategory = useMemo(() => CATEGORY_MENU[activeIndex], [activeIndex]);

  return (
    <div
      className="relative"
      ref={ref}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="categories-menu"
        className="flex items-center gap-1 px-3 py-2 rounded-md border 
                   bg-white dark:bg-zinc-900 dark:border-zinc-700 
                   hover:bg-blue-50 dark:hover:bg-zinc-800 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   transition-all duration-300 shadow-sm"
      >
        <span className="font-medium text-gray-800 dark:text-gray-200">Categories</span>
        <ChevronDownIcon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
      </button>

      {open && (
        <div
          id="categories-menu"
          role="menu"
          className="absolute left-0 z-20 mt-2 w-[980px] rounded-2xl border border-slate-200
                     bg-white shadow-2xl animate-fadeIn origin-top-left"
        >
          <div className="grid grid-cols-[260px_240px_1fr] gap-0">
            <div className="max-h-[420px] overflow-y-auto border-r border-slate-100 p-3">
              {CATEGORY_MENU.map((category, index) => (
                <button
                  key={category.label}
                  type="button"
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                    activeIndex === index
                      ? 'bg-slate-100 text-slate-900'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
            <div className="border-r border-slate-100 p-4">
              <p className="text-sm font-semibold text-slate-900">
                {activeCategory.label}
              </p>
              <div className="mt-3 space-y-2">
                {activeCategory.subcategories.map((item) => (
                  <a
                    key={item}
                    href={activeCategory.href}
                    className="block rounded-md px-2 py-1 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-900">
                  {activeCategory.subcategories[0]}
                </p>
                <a
                  href={activeCategory.href}
                  className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                >
                  Explore more →
                </a>
              </div>
              <div className="mt-4 grid grid-cols-5 gap-3">
                {activeCategory.featured.map((item) => (
                  <a
                    key={item}
                    href={activeCategory.href}
                    className="group flex flex-col items-center gap-2 text-center"
                  >
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 p-2 text-[10px] font-semibold text-slate-500 shadow-sm group-hover:from-emerald-50 group-hover:to-emerald-100">
                      {item
                        .split(' ')
                        .slice(0, 2)
                        .map((word) => word[0])
                        .join('')}
                    </div>
                    <span className="text-[11px] text-slate-700">{item}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
