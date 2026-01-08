// frontend/src/app/register/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type RegisterResponse = {
  token?: string;
  detail?: string;
};

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data: RegisterResponse = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        setMessage('✅ Registered successfully! Redirecting...');
        router.push('/signin');
      } else {
        setMessage(`❌ Registration failed: ${data?.detail || 'Please try again.'}`);
      }
    } catch (err) {
      console.error('❌ Registration error:', err);
      setMessage('⚠️ Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="px-6 py-16 max-w-md mx-auto bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 rounded-2xl shadow-xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Create Account
      </h1>

      <form
        className="flex flex-col gap-4 bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-8"
        onSubmit={handleRegister}
      >
        <input
          type="text"
          placeholder="Full Name"
          className="p-3 border rounded-md bg-transparent focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-700"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="p-3 border rounded-md bg-transparent focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="p-3 border rounded-md bg-transparent focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      {message && (
        <div
          className={`mt-6 text-center font-semibold ${
            message.startsWith('✅')
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-600 dark:text-red-400'
          }`}
        >
          {message}
        </div>
      )}

      <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
        Already have an account?{' '}
        <a href="/signin" className="text-blue-600 hover:underline dark:text-blue-400">
          Sign In
        </a>
      </p>
    </main>
  );
}
