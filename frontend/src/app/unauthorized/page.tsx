// frontend/src/app/unauthorized/page.tsx
'use client';

export default function UnauthorizedPage() {
  return (
    <main className="px-6 py-16 max-w-md mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">🚫 Access Denied</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        You do not have permission to view this page.
      </p>
    </main>
  );
}
