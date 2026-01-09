// frontend/src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import Navbar from '@/components/Navbar';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'ExBuy Enterprise Commerce',
    template: '%s | ExBuy',
  },
  description:
    'ExBuy is a next-generation enterprise commerce platform with premium UX and scalable workflows.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${manrope.variable} min-h-screen flex flex-col bg-gray-50 text-zinc-900 font-sans antialiased`}
      >
        <header className="sticky top-0 z-50 shadow-md">
          <Navbar />
        </header>

        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        <footer className="border-t border-zinc-200 bg-white py-6 text-center text-sm text-zinc-500">
          (c) {new Date().getFullYear()} ExBuy. All rights reserved.
        </footer>
      </body>
    </html>
  );
}