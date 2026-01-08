'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/token/`, // ✅ env variable ব্যবহার করা হলো
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('token', data.access);
        localStorage.setItem('refresh', data.refresh);

        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }

        setMessage('✅ Login successful!');
      } else {
        const errData = await res.json().catch(() => null);
        setMessage(`❌ Login failed: ${errData?.detail || 'Invalid credentials'}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('⚠️ Error connecting to backend.');
    }
  };

  return (
    <main className="px-6 py-16 max-w-md mx-auto bg-gradient-to-br from-white via-green-50 to-green-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 rounded-2xl shadow-xl">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900 dark:text-white">
        Login 🔑
      </h1>

      <form
        onSubmit={handleLogin}
        className="space-y-6 bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-8"
      >
        <div>
          <label className="block font-semibold mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 dark:bg-zinc-800 dark:border-zinc-700"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 dark:bg-zinc-800 dark:border-zinc-700"
            required
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="accent-green-600"
            />
            Remember Me
          </label>
          <a href="/forgot-password" className="text-green-600 hover:underline dark:text-green-400">
            Forgot Password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 transition"
        >
          Login
        </button>

        {/* Social Login */}
        <div className="mt-6 space-y-3">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">Or login with</p>
          <div className="flex flex-col gap-3">
            <button className="w-full flex items-center justify-center gap-2 px-6 py-2 rounded-md border bg-white dark:bg-zinc-800 dark:border-zinc-700 font-medium hover:bg-gray-100 dark:hover:bg-zinc-700 transition">
              <Image src="/icons/facebook.svg" alt="Facebook" width={20} height={20} />
              Continue with Facebook
            </button>
            <button className="w-full flex items-center justify-center gap-2 px-6 py-2 rounded-md border bg-white dark:bg-zinc-800 dark:border-zinc-700 font-medium hover:bg-gray-100 dark:hover:bg-zinc-700 transition">
              <Image src="/icons/google.svg" alt="Google" width={20} height={20} />
              Continue with Google
            </button>
            <button className="w-full flex items-center justify-center gap-2 px-6 py-2 rounded-md border bg-white dark:bg-zinc-800 dark:border-zinc-700 font-medium hover:bg-gray-100 dark:hover:bg-zinc-700 transition">
              <Image src="/icons/apple.svg" alt="Apple" width={20} height={20} />
              Continue with Apple
            </button>
          </div>
        </div>
      </form>

      {message && (
        <div
          className={`mt-6 text-lg font-semibold text-center ${
            message.startsWith('✅')
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-600 dark:text-red-400'
          }`}
        >
          {message}
        </div>
      )}
    </main>
  );
}
