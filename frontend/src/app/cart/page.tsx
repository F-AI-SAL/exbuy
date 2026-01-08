'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<
    { id: number; name: string; price: number; qty: number; img?: string }[]
  >([]);

  // ✅ Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    } else {
      // Default demo items
      setCartItems([
        {
          id: 1,
          name: 'Smart TV',
          price: 49900,
          qty: 1,
          img: '/images/tv.png',
        },
        {
          id: 2,
          name: 'Laptop',
          price: 99900,
          qty: 2,
          img: '/images/laptop.png',
        },
      ]);
    }
  }, []);

  // ✅ Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const increaseQty = (id: number) => {
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item))
    );
  };

  const decreaseQty = (id: number) => {
    setCartItems((items) =>
      items.map((item) => (item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item))
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = cartItems.length > 0 ? 500 : 0;
  const total = subtotal + shipping;

  const formatPrice = (amount: number) => `৳${amount.toLocaleString('en-BD')}`;

  const handleCheckout = () => {
    alert('Proceeding to checkout... Cart saved!');
    // router.push("/checkout");
  };

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
          <li className="font-semibold text-black dark:text-white">Cart</li>
        </ol>
      </nav>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-black dark:text-white">
        Your Shopping Cart 🛒
      </h1>

      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-6">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-32 h-32 mb-6 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 rounded-full">
              <span className="text-5xl">🛒</span>
            </div>
            <p className="text-lg font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
              Your cart is empty
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
              Browse products and add them to your cart.
            </p>
            <a
              href="/products"
              className="px-6 py-3 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 transition"
            >
              Explore Products
            </a>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="divide-y divide-zinc-200 dark:divide-zinc-700">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden">
                      {item.img ? (
                        <Image
                          src={item.img}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="object-contain"
                        />
                      ) : (
                        <span className="text-2xl">📦</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-black dark:text-white">{item.name}</h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="px-2 py-1 border rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 rounded bg-zinc-100 dark:bg-zinc-800">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="px-2 py-1 border rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-black dark:text-white">
                      {formatPrice(item.price * item.qty)}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="mt-6 border-t pt-6 space-y-2">
              <div className="flex justify-between">
                <span className="font-bold">Subtotal:</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Shipping:</span>
                <span>{formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span>{formatPrice(total)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="mt-6 w-full px-6 py-3 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
