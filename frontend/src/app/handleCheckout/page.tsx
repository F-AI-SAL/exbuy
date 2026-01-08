import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<
    { id: number; name: string; price: number; qty: number }[]
  >([]);
  const router = useRouter();

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    } else {
      setCartItems([
        { id: 1, name: 'Smart TV', price: 49900, qty: 1 },
        { id: 2, name: 'Laptop', price: 99900, qty: 2 },
      ]);
    }
  }, []);

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
    router.push('/checkout'); // ✅ Redirect to checkout page
  };

  return (
    <main className="px-6 py-16 max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-8">Your Shopping Cart 🛒</h1>
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6">
        {cartItems.length === 0 ? (
          <p className="text-center text-lg font-semibold">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b py-4">
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p>{formatPrice(item.price)}</p>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => decreaseQty(item.id)} className="px-2 py-1 border rounded">
                  -
                </button>
                <span>{item.qty}</span>
                <button onClick={() => increaseQty(item.id)} className="px-2 py-1 border rounded">
                  +
                </button>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-semibold">{formatPrice(item.price * item.qty)}</span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}

        {cartItems.length > 0 && (
          <>
            <div className="flex justify-between mt-6">
              <span className="font-bold">Subtotal:</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Shipping:</span>
              <span>{formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold mt-4">
              <span>Total:</span>
              <span>{formatPrice(total)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="mt-6 w-full px-6 py-3 rounded bg-black text-white dark:bg-white dark:text-black font-semibold hover:opacity-90 transition"
            >
              Proceed to Checkout
            </button>
          </>
        )}
      </div>
    </main>
  );
}
