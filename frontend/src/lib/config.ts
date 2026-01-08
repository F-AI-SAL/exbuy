// frontend/src/lib/config.ts
// Centralized configuration for categories, services, notifications, and shipments.
// Enterprise‑grade: strongly typed, extensible, and premium structured.

export interface Category {
  label: string;
  href: string;
}

export interface Service {
  icon: string;      // Path to SVG icon
  title: string;     // Display title
  subtitle: string;  // Short description
  href: string;      // Navigation link
}

export interface Notification {
  id: string;
  text: string;
  type?: 'info' | 'success' | 'warning' | 'error'; // optional for UI styling
}

export type ShipmentStatus = 'Preparing' | 'In transit' | 'Delivered' | 'Delayed';

export interface Shipment {
  id: string;
  status: ShipmentStatus;
  eta?: string; // optional estimated time of arrival
}

// ================== Categories ==================
export const CATEGORIES: Category[] = [
  { label: 'Electronics', href: '/categories/electronics' },
  { label: 'Fashion', href: '/categories/fashion' },
  { label: 'Home & Living', href: '/categories/home' },
  { label: 'Industrial', href: '/categories/industrial' },
  { label: 'More', href: '/categories' },
];

// ================== Services ==================
export const SERVICES: Service[] = [
  {
    icon: '/icons/buy-and-ship-for-me.svg',
    title: 'Buy & Ship For Me',
    subtitle: 'Customized buying and shipping.',
    href: '/services/buy-ship',
  },
  {
    icon: '/icons/ship-for-me.svg',
    title: 'Ship For Me',
    subtitle: 'Hassle-free shipping solutions.',
    href: '/services/ship',
  },
  {
    icon: '/icons/request-for-quotation.svg',
    title: 'Request For Quotation',
    subtitle: 'Precise quotation management.',
    href: '/rfq',
  },
  {
    icon: '/icons/moveon-lens.svg',
    title: 'MoveOn Lens',
    subtitle: 'Intelligent image-based search.',
    href: '/lens',
  },
  {
    icon: '/icons/const-calculator.svg',
    title: 'Cost Calculator',
    subtitle: 'Accurate financial planning tools.',
    href: '/calculator',
  },
  {
    icon: '/icons/associate-services.svg',
    title: 'Associate Services',
    subtitle: 'Value-added partner solutions.',
    href: '/associate-services',
  },
];

// ================== Notifications ==================
export const NOTIFICATIONS: Notification[] = [
  { id: 'n1', text: 'Your RFQ #1023 received.', type: 'info' },
  { id: 'n2', text: 'Shipment #S-884 is in transit.', type: 'success' },
];

// ================== Shipments ==================
export const SHIPMENTS: Shipment[] = [
  { id: 'S-884', status: 'In transit', eta: '2026-01-10' },
  { id: 'S-885', status: 'Preparing' },
];
