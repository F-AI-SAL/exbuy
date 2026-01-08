'use client';

import Image from 'next/image';

export default function WishlistPage() {
  const wishlistItems = [
    { name: 'Gaming Console', price: '$399', img: '/images/console.png' },
    { name: 'DSLR Camera', price: '$799', img: '/images/camera.png' },
  ];

  return (
    <main className="px-6 py-16 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm mb-6 text-zinc-600 dark:text-zinc-400">
        <ol className="flex items-center space-x-2">
          <li>
            <a href="/" className="hover:underline">
              Home
            </a>
          </li>
          <li>›</li>
          <li className="font-semibold text-black dark:text-white">Wishlist</li>
        </ol>
      </nav>

      {/* Title */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-black dark:text-white">
          Your Wishlist ❤️
        </h1>
        <span className="text-sm px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
          {wishlistItems.length} items
        </span>
      </div>

      {/* Wishlist Items */}
      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {wishlistItems.map((item) => (
            <div
              key={item.name}
              className="flex flex-col items-center justify-between p-6 rounded-xl shadow-lg bg-white dark:bg-zinc-900 hover:shadow-xl hover:-translate-y-1 transition w-full"
            >
              {/* Product Image */}
              <div className="w-24 h-24 mb-4 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden">
                {item.img ? (
                  <Image
                    src={item.img}
                    alt={item.name}
                    width={96}
                    height={96}
                    className="object-contain"
                  />
                ) : (
                  <span className="text-3xl">🎁</span>
                )}
              </div>

              {/* Product Info */}
              <div className="text-center">
                <span className="block text-lg font-semibold text-black dark:text-white">
                  {item.name}
                </span>
                <span className="block text-sm text-zinc-600 dark:text-zinc-400">{item.price}</span>
              </div>

              {/* Actions */}
              <div className="mt-4 flex gap-3">
                <button className="px-4 py-2 rounded-md bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition">
                  Move to Cart
                </button>
                <button className="px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-32 h-32 mb-6 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 rounded-full">
            <span className="text-5xl">🛒</span>
          </div>
          <p className="text-lg font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
            Your wishlist is empty
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
            Browse products and add them to your wishlist.
          </p>
          <a
            href="/products"
            className="px-6 py-3 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 transition"
          >
            Explore Products
          </a>
        </div>
      )}
    </main>
  );
}
