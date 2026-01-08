'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<
    { id: number; name: string; price: number; qty: number }[]
  >([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');

  // Payment details
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');

  const [referenceId, setReferenceId] = useState('');
  const [senderNumber, setSenderNumber] = useState('');
  const [screenshot, setScreenshot] = useState<File | null>(null);

  const router = useRouter();

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsed = JSON.parse(savedCart);
      setCartItems(
        parsed.length > 0
          ? parsed
          : [
              { id: 1, name: 'Smart TV', price: 49900, qty: 1 },
              { id: 2, name: 'Laptop', price: 99900, qty: 2 },
            ]
      );
    } else {
      setCartItems([
        { id: 1, name: 'Smart TV', price: 49900, qty: 1 },
        { id: 2, name: 'Laptop', price: 99900, qty: 2 },
      ]);
    }
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = cartItems.length > 0 ? 500 : 0;
  const total = subtotal + shipping;

  // ✅ Pre-order rule: must pay 80%
  const requiredPayment = Math.round(total * 0.8);

  const formatPrice = (amount: number) => `৳${amount.toLocaleString('en-BD')}`;

  const handlePlaceOrder = () => {
    if (!name || !phone || !address || !city || !postalCode) {
      alert('⚠️ Please fill in all shipping fields.');
      return;
    }

    if (paymentMethod === 'card' && (!cardNumber || !expiry || !cvv || !cardHolder)) {
      alert('⚠️ Please fill in all card details.');
      return;
    }

    if (
      (paymentMethod === 'bkash' || paymentMethod === 'nagad') &&
      (!referenceId || !senderNumber)
    ) {
      alert('⚠️ Please provide reference ID and sender number.');
      return;
    }

    // ✅ Pre-order validation
    alert(`You must pay at least 80% (${formatPrice(requiredPayment)}) to place this order.`);

    const orderId = 'ORD' + Math.floor(Math.random() * 1000000);

    const orderData = {
      orderId,
      cartItems,
      shippingAddress: { name, phone, address, city, postalCode },
      paymentMethod,
      paymentDetails:
        paymentMethod === 'card'
          ? { cardNumber, expiry, cvv, cardHolder }
          : paymentMethod === 'bkash' || paymentMethod === 'nagad'
            ? { referenceId, senderNumber, screenshot }
            : {},
      subtotal,
      shipping,
      total,
      requiredPayment, // ✅ store required 80% payment
    };

    localStorage.setItem('orderId', orderId);
    localStorage.setItem('cartSummary', JSON.stringify(cartItems));

    console.log('Order placed:', orderData);

    router.push('/order-confirmation');
  };

  return (
    <main className="px-6 py-16 max-w-4xl mx-auto bg-gradient-to-br from-white via-green-50 to-green-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 rounded-2xl shadow-xl">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-10 text-center text-gray-900 dark:text-white">
        Checkout 🧾
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-lg font-semibold">Your cart is empty.</p>
      ) : (
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-8 space-y-8">
          {/* Order Summary */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-green-700 dark:text-green-400">
              Order Summary
            </h2>
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between border-b pb-2 text-sm">
                <span>
                  {item.name} × {item.qty}
                </span>
                <span>{formatPrice(item.price * item.qty)}</span>
              </div>
            ))}
            <div className="flex justify-between mt-4 text-sm">
              <span className="font-bold">Subtotal:</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-bold">Shipping:</span>
              <span>{formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold mt-2 text-green-700 dark:text-green-400">
              <span>Total:</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="font-bold">Required (80% Pre-order):</span>
              <span className="text-green-700 dark:text-green-400 font-semibold">
                {formatPrice(requiredPayment)}
              </span>
            </div>
          </div>

          {/* Shipping Address Form */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-green-700 dark:text-green-400">
              Shipping Address
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                placeholder="Street Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                placeholder="Postal Code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-green-700 dark:text-green-400">
              Payment Method
            </h2>
            <div className="space-y-2 text-sm">
              {[
                { value: 'cod', label: 'Cash on Delivery' },
                { value: 'card', label: 'Credit/Debit Card' },
                { value: 'bkash', label: 'bKash' },
                { value: 'nagad', label: 'Nagad' },
              ].map((method) => (
                <label key={method.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value={method.value}
                    checked={paymentMethod === method.value}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  {method.label}
                </label>
              ))}
            </div>
          </div>

          {/* Dynamic Payment Details */}
          {paymentMethod === 'card' && (
            <div className="space-y-4 mt-4">
              <input
                type="text"
                placeholder="Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Expiry Date (MM/YY)"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                />
              </div>
              <input
                type="text"
                placeholder="Cardholder Name"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
              />
            </div>
          )}

          {(paymentMethod === 'bkash' || paymentMethod === 'nagad') && (
            <div className="space-y-4 mt-4">
              <input
                type="text"
                placeholder="Reference ID"
                value={referenceId}
                onChange={(e) => setReferenceId(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Sender Number"
                  value={senderNumber}
                  onChange={(e) => setSenderNumber(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setScreenshot(e.target.files ? e.target.files[0] : null)}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Please upload the screenshot of your payment confirmation.
                </p>
              </div>
            </div>
          )}

          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            className="mt-6 w-full px-6 py-3 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 transition"
          >
            ✅ Place Order
          </button>
        </div>
      )}
    </main>
  );
}
