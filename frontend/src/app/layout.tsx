import './globals.css';
import Header from '@/components/Header';
import { Metadata } from 'next';

// Enterprise‑grade metadata
export const metadata: Metadata = {
  title: {
    default: 'ExBuy — Enterprise Commerce',
    template: '%s | ExBuy',
  },
  description: 'ExBuy is a next‑generation enterprise commerce platform with premium UX and scalable workflows.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-gray-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
        {/* Sticky Header */}
        <header className="sticky top-0 z-50 shadow-md">
          <Header />
        </header>

        {/* Main content responsive container */}
        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        {/* Enterprise Footer placeholder */}
        <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black py-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
          © {new Date().getFullYear()} ExBuy — All rights reserved.
        </footer>
      </body>
    </html>
  );
}
