'use client';

import { FaGoogle, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const router = useRouter();

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/signin');
  };

  const handleRegister = () => {
    router.push('/register');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Authentication"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Dialog */}
      <div className="relative bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-md p-8 animate-in fade-in zoom-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-zinc-500 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-black dark:text-white mb-2">Welcome to ExBuy</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
          Please sign in to continue with your request.
        </p>

        {/* Sign In Form */}
        <form className="flex flex-col gap-4 mb-6" onSubmit={handleSignIn}>
          <input
            type="email"
            placeholder="Email"
            required
            className="p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-black dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-black dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition"
          >
            Sign In
          </button>
        </form>

        {/* Social Sign In */}
        <div className="flex flex-col gap-3 mb-6">
          <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
            <FaGoogle className="text-red-500" /> Sign in with Google
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
            <FaFacebook className="text-blue-600" /> Sign in with Facebook
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
            <FaLinkedin className="text-blue-500" /> Sign in with LinkedIn
          </button>
        </div>

        {/* Register Link */}
        <p className="mt-6 text-sm text-zinc-600 dark:text-zinc-400">
          Don’t have an account?{' '}
          <button
            onClick={handleRegister}
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Create Account
          </button>
        </p>
      </div>
    </div>
  );
}
