'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type TokenResponse = {
  access?: string;
  refresh?: string;
  detail?: string;
};

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/token/`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: email, password }), // Django SimpleJWT expects "username"
        }
      );

      const data: TokenResponse = await res.json();

      if (res.ok && data.access && data.refresh) {
        // ✅ Safe localStorage usage (client component)
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);
        setMessage('✅ Sign in successful! Redirecting...');
        router.push('/calculator');
      } else {
        setMessage(`❌ Invalid credentials: ${data?.detail || 'Please try again.'}`);
      }
    } catch (err) {
      console.error('❌ Sign-in error:', err);
      setMessage('⚠️ Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="px-6 py-16 max-w-md mx-auto bg-gradient-to-br from-white via-green-50 to-green-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 rounded-2xl shadow-xl">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900 dark:text-white">
        Sign In 🔑
      </h1>

      <form
        className="flex flex-col gap-6 bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-8"
        onSubmit={handleSignIn}
      >
        <input
          type="text"
          placeholder="Email / Username"
          className="p-3 border rounded-md bg-transparent focus:ring-2 focus:ring-green-500 dark:bg-zinc-800 dark:border-zinc-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="p-3 border rounded-md bg-transparent focus:ring-2 focus:ring-green-500 dark:bg-zinc-800 dark:border-zinc-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 transition disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Sign In'}
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
        Don’t have an account?{' '}
        <a href="/register" className="text-green-600 hover:underline dark:text-green-400">
          Sign Up
        </a>
      </p>
    </main>
  );
}
