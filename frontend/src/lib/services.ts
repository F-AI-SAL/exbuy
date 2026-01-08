// frontend/src/lib/services.ts
// Enterprise‑grade configuration for service items.
// Strongly typed, extensible, and modern interface ready.

export interface ServiceItem {
  icon: string;       // Path to SVG icon
  title: string;      // Display title
  subtitle: string;   // Short description
  href: string;       // Navigation link
  badge?: string;     // Optional badge (e.g. "New", "20% OFF")
  priority?: number;  // Optional priority for sorting
}

export const SERVICES: ServiceItem[] = [
  {
    icon: '/icons/buy-and-ship-for-me.svg',
    title: 'Buy & Ship For Me',
    subtitle: 'Customized buying and shipping.',
    href: '/services/buy-ship',
    badge: 'Popular',
    priority: 1,
  },
  {
    icon: '/icons/ship-for-me.svg',
    title: 'Ship For Me',
    subtitle: 'Hassle-free shipping solutions.',
    href: '/services/ship',
    priority: 2,
  },
  {
    icon: '/icons/request-for-quotation.svg',
    title: 'Request For Quotation',
    subtitle: 'Precise quotation management.',
    href: '/rfq',
    badge: 'New',
    priority: 3,
  },
  {
    icon: '/icons/moveon-lens.svg',
    title: 'MoveOn Lens',
    subtitle: 'Intelligent image-based search.',
    href: '/lens',
    priority: 4,
  },
  {
    icon: '/icons/const-calculator.svg',
    title: 'Cost Calculator',
    subtitle: 'Accurate financial planning tools.',
    href: '/calculator',
    priority: 5,
  },
  {
    icon: '/icons/associate-services.svg',
    title: 'Associate Services',
    subtitle: 'Value-added partner solutions.',
    href: '/associate-services',
    priority: 6,
  },
];
