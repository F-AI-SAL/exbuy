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

export type MegaCategory = {
  label: string;
  href: string;
  subcategories: string[];
  featured: string[];
};

export const CATEGORY_MENU: MegaCategory[] = [
  {
    label: 'Fashion & Personal Style',
    href: '/categories/fashion',
    subcategories: [
      'Shoes & Accessories',
      'Apparel & Accessories',
      'Beauty',
      'Jewelry, Eyewear & Watches',
      'Luggage, Bags & Cases',
    ],
    featured: [
      'Chelsea Boots',
      'Flip-Flops Slippers',
      'Chukka Boots',
      'Flat Sandals',
      'Chunky Shoes',
      'Home Slippers',
      'Hiking Boots',
      'Snow Boots',
      'Rain Boots',
      'Shoe Trees',
      'Shoelaces',
      'Shoe Uppers',
      'Height Increasing Shoes',
      'Diabetic Shoes',
      'Safety Shoes',
    ],
  },
  {
    label: 'Home & Lifestyle',
    href: '/categories/home',
    subcategories: [
      'Furniture',
      'Kitchen & Dining',
      'Home Decor',
      'Lighting',
      'Home Appliances',
    ],
    featured: [
      'Air Fryers',
      'Coffee Makers',
      'Standing Fans',
      'Bedding Sets',
      'Storage Boxes',
      'LED Lamps',
    ],
  },
  {
    label: 'Electrical & Electronics',
    href: '/categories/electronics',
    subcategories: [
      'Mobile Accessories',
      'Smart Devices',
      'Audio & Video',
      'Computer & Office',
      'Security Systems',
    ],
    featured: [
      'Power Banks',
      'Bluetooth Speakers',
      'Smart Watches',
      'USB Hubs',
      'IP Cameras',
    ],
  },
  {
    label: 'Family, Kids & Daily Care',
    href: '/categories/family',
    subcategories: [
      'Baby Care',
      'Kids Toys',
      'Personal Care',
      'Health Essentials',
      'Household Supplies',
    ],
    featured: [
      'Baby Bottles',
      'Baby Diapers',
      'Educational Toys',
      'Electric Toothbrush',
      'First Aid Kits',
    ],
  },
  {
    label: 'Agriculture & Food Industry',
    href: '/categories/agriculture',
    subcategories: [
      'Farm Tools',
      'Seeds & Fertilizer',
      'Food Processing',
      'Packaging',
      'Beverage Equipment',
    ],
    featured: [
      'Irrigation Kits',
      'Seedling Trays',
      'Vacuum Sealers',
      'Grain Mills',
      'Bottling Tools',
    ],
  },
  {
    label: 'Construction & Engineering',
    href: '/categories/construction',
    subcategories: [
      'Power Tools',
      'Hardware',
      'Building Materials',
      'Safety Gear',
      'Machinery',
    ],
    featured: [
      'Drill Sets',
      'Wrenches',
      'Safety Helmets',
      'Concrete Mixers',
      'Laser Levels',
    ],
  },
  {
    label: 'Industrial & Manufacturing',
    href: '/categories/industrial',
    subcategories: [
      'Industrial Supplies',
      'Automation',
      'Parts & Components',
      'Packaging Machines',
      'Warehouse Equipment',
    ],
    featured: [
      'Conveyor Belts',
      'Servo Motors',
      'Pallet Trucks',
      'Control Panels',
      'Seal Machines',
    ],
  },
  {
    label: 'Automotive & Transportation',
    href: '/categories/automotive',
    subcategories: [
      'Auto Parts',
      'Car Electronics',
      'Tires & Wheels',
      'Maintenance Tools',
      'Motorbike Parts',
    ],
    featured: [
      'Car Chargers',
      'Dash Cams',
      'Brake Pads',
      'Tool Kits',
      'LED Headlights',
    ],
  },
  {
    label: 'Sports, Leisure & Recreation',
    href: '/categories/sports',
    subcategories: [
      'Outdoor Gear',
      'Fitness',
      'Cycling',
      'Camping',
      'Travel',
    ],
    featured: [
      'Yoga Mats',
      'Camping Tents',
      'Water Bottles',
      'Dumbbells',
      'Travel Bags',
    ],
  },
  {
    label: 'Business, Packaging & Office',
    href: '/categories/business',
    subcategories: [
      'Office Supplies',
      'Printing',
      'Packaging',
      'Retail Displays',
      'Stationery',
    ],
    featured: [
      'Thermal Printers',
      'Packing Tapes',
      'Label Rolls',
      'Display Racks',
      'Notebooks',
    ],
  },
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
