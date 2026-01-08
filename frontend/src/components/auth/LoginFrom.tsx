'use client';
import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data = await res.json();
      if (res.ok) {
        window.location.href = '/dashboard';
      } else {
        setError(data.error || 'Login failed');
      }
    } catch {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    window.location.href = `/api/auth/${provider.toLowerCase()}`;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-zinc-900 dark:to-zinc-800">
      <div className="w-full max-w-md rounded-2xl border bg-white dark:bg-zinc-900 dark:border-zinc-700 shadow-2xl p-8 animate-fadeIn">
        {/* Header */}
        <h2 className="text-3xl font-extrabold text-center text-gray-800 dark:text-gray-100 mb-6">
          Welcome back to{' '}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            ExBuy
          </span>
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border-gray-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 transition"
              placeholder="you@example.com"
            />
          </div>

          {/* Password with toggle */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border-gray-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 pr-10 transition"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-2 flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember me */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-gray-300 dark:border-zinc-700 dark:bg-zinc-800 text-blue-600 focus:ring-blue-500"
              />
              Remember me
            </label>
            <a
              href="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Forgot password?
            </a>
          </div>

          {/* Error */}
          {error && <div className="text-sm text-red-600 dark:text-red-400">{error}</div>}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2.5 shadow-md hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t dark:border-zinc-700"></div>
          <span className="px-3 text-sm text-gray-500 dark:text-gray-400">or</span>
          <div className="flex-grow border-t dark:border-zinc-700"></div>
        </div>

        {/* Social login buttons */}
        <div className="space-y-3">
          <button
            onClick={() => handleSocialLogin('Google')}
            className="w-full flex items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 py-2.5 shadow-sm hover:bg-gray-50 dark:hover:bg-zinc-700 transition"
          >
            <img src="/icons/google.svg" alt="Google" className="h-5 w-5" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Continue with Google
            </span>
          </button>

          <button
            onClick={() => handleSocialLogin('Microsoft')}
            className="w-full flex items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 py-2.5 shadow-sm hover:bg-gray-50 dark:hover:bg-zinc-700 transition"
          >
            <img src="/icons/microsoft.svg" alt="Microsoft" className="h-5 w-5" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Continue with Microsoft
            </span>
          </button>

          <button
            onClick={() => handleSocialLogin('Apple')}
            className="w-full flex items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 py-2.5 shadow-sm hover:bg-gray-50 dark:hover:bg-zinc-700 transition"
          >
            <img src="/icons/apple.svg" alt="Apple" className="h-5 w-5" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Continue with Apple
            </span>
          </button>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Don’t have an account?{' '}
          <a
            href="/register"
            className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
