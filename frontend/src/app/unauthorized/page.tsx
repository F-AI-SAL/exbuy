// frontend/src/app/unauthorized/page.tsx
'use client';

export default function UnauthorizedPage() {
  return (
    <main className="px-6 py-16 max-w-md mx-auto text-center bg-white dark:bg-zinc-900 rounded-2xl shadow-xl">
      <h1 className="text-3xl font-bold mb-4 text-red-600 dark:text-red-400">
        🚫 Access Denied
      </h1>
      <p className="text-zinc-700 dark:text-zinc-400">
        You do not have permission to view this page.
      </p>
      <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
        <a href="/signin" className="text-blue-600 hover:underline dark:text-blue-400">
          Go back to Sign In
        </a>
      </p>
    </main>
  );
}
