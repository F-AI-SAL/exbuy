'use client';

import { useState } from 'react';
import { FaHeart, FaStar } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface Review {
  user: string;
  comment: string;
}

interface ProductCardProps {
  name: string;
  price: number;
  image?: string;
  tag?: string;
  rating?: number;
  stock?: number;
  images?: string[];
  reviews?: Review[];
}

export default function ProductCard({
  name,
  price,
  image,
  tag,
  rating = 0,
  stock = 0,
  images = [],
  reviews = [],
}: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const router = useRouter();

  const handleAddToCart = () => alert(`Added ${name} to cart`);
  const handleBuyNow = () => router.push('/checkout');
  const toggleWishlist = () => setWishlisted(!wishlisted);
  const formatPrice = (amount: number) => `৳${amount.toLocaleString('en-BD')}`;

  return (
    <div className="group relative flex flex-col items-center justify-between p-6 rounded-xl shadow-lg bg-white dark:bg-zinc-900 hover:shadow-xl transition-transform duration-300 hover:scale-105 w-full">
      {/* Product Image */}
      <div className="relative w-32 h-32 mb-4 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={name}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <span className="text-3xl">📦</span>
        )}

        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => setQuickViewOpen(true)}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold shadow hover:opacity-90"
          >
            Quick View →
          </button>
        </div>
      </div>

      {/* Product Info */}
      <span className="text-lg font-semibold text-black dark:text-white mb-1 text-center">
        {name}
      </span>
      <span className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">{formatPrice(price)}</span>

      {/* Rating */}
      <div className="flex mb-2">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`h-4 w-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-zinc-600'}`}
          />
        ))}
      </div>

      {/* Stock */}
      <span
        className={`text-xs font-semibold mb-3 ${stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
      >
        {stock > 0 ? `In Stock (${stock})` : 'Out of Stock'}
      </span>

      {/* Tag */}
      {tag && (
        <span
          className={`text-xs px-2 py-1 mb-3 rounded-full font-semibold ${tag.toLowerCase() === 'sale' ? 'bg-red-600 text-white' : tag.toLowerCase() === 'new' ? 'bg-green-600 text-white' : 'bg-black text-white dark:bg-white dark:text-black'}`}
        >
          {tag}
        </span>
      )}

      {/* CTA Buttons */}
      <div className="flex gap-3 mt-2">
        <button
          onClick={handleAddToCart}
          disabled={stock <= 0}
          className={`px-4 py-2 rounded text-sm font-semibold ${stock > 0 ? 'bg-black text-white dark:bg-white dark:text-black hover:opacity-90' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          Add to Cart
        </button>

        <button
          onClick={handleBuyNow}
          disabled={stock <= 0}
          className={`px-4 py-2 rounded text-sm font-semibold ${stock > 0 ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          Buy Now
        </button>

        <button
          onClick={toggleWishlist}
          className="p-2 rounded-full border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <FaHeart
            className={`text-lg transition-transform ${wishlisted ? 'text-red-600 scale-110' : 'text-zinc-500 dark:text-zinc-400'}`}
          />
        </button>
      </div>

      {/* Quick View Modal */}
      {quickViewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-2xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setQuickViewOpen(false)}
              className="absolute top-3 right-3 text-zinc-500 hover:text-black dark:hover:text-white"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">{name}</h2>

            {/* Carousel */}
            <div className="relative w-full h-56 overflow-hidden rounded-lg mb-4">
              <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
              >
                {(images.length ? images : [image || '/placeholder.png']).map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`${name} ${idx + 1}`}
                    className="w-full h-56 object-cover flex-shrink-0"
                  />
                ))}
              </div>

              <button
                onClick={() => setCarouselIndex((i) => (i > 0 ? i - 1 : (images.length || 1) - 1))}
                className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/70 dark:bg-zinc-800 p-2 rounded-full shadow"
              >
                ‹
              </button>
              <button
                onClick={() => setCarouselIndex((i) => (i + 1) % (images.length || 1))}
                className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/70 dark:bg-zinc-800 p-2 rounded-full shadow"
              >
                ›
              </button>
            </div>

            {/* Reviews */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2">Customer Reviews</h3>
              <ul className="space-y-2 max-h-32 overflow-y-auto">
                {reviews.length ? (
                  reviews.map((r, idx) => (
                    <li
                      key={idx}
                      className="text-xs border-b border-zinc-200 dark:border-zinc-700 pb-1"
                    >
                      <span className="font-semibold">{r.user}</span>: {r.comment}
                    </li>
                  ))
                ) : (
                  <li className="text-xs text-zinc-500">No reviews yet.</li>
                )}
              </ul>
            </div>

            {/* Modal CTAs */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={stock <= 0}
                className="px-4 py-2 rounded bg-black text-white dark:bg-white dark:text-black text-sm font-semibold hover:opacity-90"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={stock <= 0}
                className="px-4 py-2 rounded bg-green-600 text-white text-sm font-semibold hover:bg-green-700"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
