'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 px-2 py-1 rounded-lg 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 
                 transition-all duration-300 hover:bg-blue-50 dark:hover:bg-zinc-800"
      aria-label="ExBuy Home"
    >
      {/* Animated Logo image */}
      <Image
        src="/logo.svg"
        alt="ExBuy Logo"
        width={40}
        height={40}
        priority
        className="h-9 w-9 object-contain transform transition-transform duration-300 
                   hover:scale-110 hover:rotate-6"
      />

      {/* Brand name with animated gradient shimmer */}
      <span
        className="relative text-2xl font-bold tracking-tight 
                   bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 
                   bg-clip-text text-transparent animate-shimmer 
                   transition-colors duration-300"
      >
        ExBuy
      </span>
    </Link>
  );
}
