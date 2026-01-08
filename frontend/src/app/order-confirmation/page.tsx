// frontend/src/app/order-confirmation/page.tsx
'use client';

import { useEffect, useState } from 'react';

export default function OrderConfirmationPage() {
  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderSummary, setOrderSummary] = useState<
    { id: number; name: string; price: number; qty: number }[]
  >([]);

  useEffect(() => {
    setOrderId(localStorage.getItem('orderId'));
    const savedCart = localStorage.getItem('cartSummary');
    if (savedCart) setOrderSummary(JSON.parse(savedCart));
  }, []);

  const subtotal = orderSummary.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = orderSummary.length > 0 ? 500 : 0;
  const total = subtotal + shipping;

  const formatPrice = (amount: number) => `৳${amount.toLocaleString('en-BD')}`;

  return (
    <main className="px-6 py-16 max-w-4xl mx-auto text-center">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6">🎉 Order Confirmed!</h1>
      {orderId ? (
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6 space-y-6">
          <p className="text-lg font-semibold">Your Order ID:</p>
          <p className="text-2xl font-bold text-green-600">{orderId}</p>
          {/* Summary */}
          {orderSummary.map((item) => (
            <div key={item.id} className="flex justify-between border-b py-2">
              <span>
                {item.name} × {item.qty}
              </span>
              <span>{formatPrice(item.price * item.qty)}</span>
            </div>
          ))}
          <div className="flex justify-between mt-4">
            <span className="font-bold">Total:</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      ) : (
        <p>No order found.</p>
      )}
    </main>
  );
}
