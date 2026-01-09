'use client';

import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl items-center px-6 py-12">
      <div className="w-full rounded-3xl border border-rose-100 bg-white p-10 text-center shadow-lg">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">Access denied</p>
        <h1 className="mt-3 text-3xl font-extrabold text-zinc-900">You do not have access</h1>
        <p className="mt-3 text-sm text-zinc-500">
          Please sign in with an authorized account to continue.
        </p>
        <Link
          href="/signin"
          className="mt-6 inline-flex rounded-full bg-rose-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-700"
        >
          Go to sign in
        </Link>
      </div>
    </main>
  );
}