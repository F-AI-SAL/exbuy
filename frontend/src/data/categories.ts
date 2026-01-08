// frontend/src/data/categories.ts
// Enterprise-grade static category dataset with type safety and extensibility

export type Category = {
  name: string;
  slug: string;
  icon?: string;      // optional: UI icon reference
  description?: string; // optional: category description for tooltips or SEO
};

export const categories: Category[] = [
  {
    name: 'Fashion & Personal Style',
    slug: 'fashion',
    icon: '👗',
    description: 'Clothing, accessories, and personal style trends',
  },
  {
    name: 'Home & Lifestyle',
    slug: 'home-lifestyle',
    icon: '🏡',
    description: 'Furniture, decor, and lifestyle essentials',
  },
  {
    name: 'Electrical & Electronics',
    slug: 'electronics',
    icon: '🔌',
    description: 'Consumer electronics, gadgets, and appliances',
  },
  {
    name: 'Family, Kids & Daily Care',
    slug: 'family-care',
    icon: '👨‍👩‍👧‍👦',
    description: 'Products for family, kids, and everyday care',
  },
  {
    name: 'Agriculture & Food Industry',
    slug: 'agriculture-food',
    icon: '🌾',
    description: 'Agricultural goods and food industry products',
  },
  {
    name: 'Construction & Engineering',
    slug: 'construction',
    icon: '🏗️',
    description: 'Building materials and engineering solutions',
  },
  {
    name: 'Industrial & Manufacturing',
    slug: 'industrial',
    icon: '⚙️',
    description: 'Industrial tools, machinery, and manufacturing supplies',
  },
  {
    name: 'Automotive & Transportation',
    slug: 'automotive',
    icon: '🚗',
    description: 'Vehicles, auto parts, and transport services',
  },
  {
    name: 'Sports, Leisure & Recreation',
    slug: 'sports',
    icon: '🏀',
    description: 'Sports gear, leisure, and recreational products',
  },
  {
    name: 'Business, Packaging & Office',
    slug: 'business-office',
    icon: '📦',
    description: 'Office supplies, packaging, and business solutions',
  },
  {
    name: 'Energy & Sustainability',
    slug: 'energy',
    icon: '⚡',
    description: 'Renewable energy and sustainable products',
  },
];
