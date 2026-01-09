'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type LoginResponse = {
  token?: string;
  error?: string;
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
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data: LoginResponse = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        setMessage('Sign in successful. Redirecting...');
        router.push('/dashboard');
      } else {
        setMessage(data?.error || 'Invalid credentials. Please try again.');
      }
    } catch (err) {
      console.error('Sign-in error:', err);
      setMessage('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-[80vh] max-w-5xl items-center px-6 py-12">
      <div className="grid w-full gap-8 rounded-3xl border border-emerald-100 bg-white p-8 shadow-lg md:grid-cols-[1.1fr_1fr]">
        <div className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
              ExBuy Access
            </p>
            <h1 className="mt-3 text-3xl font-extrabold text-zinc-900">Sign in</h1>
            <p className="mt-2 text-sm text-zinc-500">
              Enter your credentials to continue.
            </p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-zinc-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                placeholder="you@exbuy.com"
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-zinc-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-zinc-600">
                <input type="checkbox" className="accent-emerald-600" />
                Remember me
              </label>
              <Link href="/forgot-password" className="text-emerald-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          {message && (
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700">
              {message}
            </div>
          )}

          <p className="text-sm text-zinc-500">
            New here?{' '}
            <Link href="/register" className="font-semibold text-emerald-600 hover:underline">
              Create an account
            </Link>
          </p>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-6 text-white">
          <h2 className="text-xl font-semibold">Enterprise control center</h2>
          <p className="mt-3 text-sm text-emerald-100">
            Track orders, automate shipping, and manage your business in one place.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            <li>Real-time order updates</li>
            <li>Integrated billing and wallet</li>
            <li>Multi-channel procurement tools</li>
          </ul>
        </div>
      </div>
    </main>
  );
}