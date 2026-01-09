'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type RegisterResponse = {
  token?: string;
  error?: string;
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
        setMessage('Account created. Redirecting...');
        router.push('/dashboard');
      } else {
        setMessage(data?.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Registration error:', err);
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
            <h1 className="mt-3 text-3xl font-extrabold text-zinc-900">Create your account</h1>
            <p className="mt-2 text-sm text-zinc-500">
              Set up a new profile in seconds and manage your orders.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-zinc-700">Full name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                placeholder="Md Faisal Al Islam"
                required
              />
            </div>

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
                placeholder="Create a strong password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-60"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          {message && (
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700">
              {message}
            </div>
          )}

          <p className="text-sm text-zinc-500">
            Already have an account?{' '}
            <Link href="/signin" className="font-semibold text-emerald-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-6 text-white">
          <h2 className="text-xl font-semibold">Premium onboarding</h2>
          <p className="mt-3 text-sm text-emerald-100">
            Get instant access to enterprise tools and premium support.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            <li>Unified procurement dashboard</li>
            <li>Secure payments and wallet</li>
            <li>Dedicated expert assistance</li>
          </ul>
        </div>
      </div>
    </main>
  );
}