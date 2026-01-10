import Image from 'next/image';
import { cookies } from 'next/headers';

import { getApiBase } from '@/lib/serverConfig';

type Product = {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: string;
  currency: string;
  image_url: string;
  stock_qty: number;
  updated_at: string;
};

export const revalidate = 300;

async function fetchProduct(slug: string): Promise<Product | null> {
  const base = getApiBase();
  const token = cookies().get('token')?.value;
  const res = await fetch(`${base}/api/products/${slug}/`, {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    next: { revalidate },
  });

  if (res.status === 401) {
    return null;
  }

  if (!res.ok) {
    throw new Error('Failed to load product');
  }

  return (await res.json()) as Product;
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await fetchProduct(params.slug);

  if (!product) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-2xl font-semibold text-slate-900">Sign in required</h1>
        <p className="mt-3 text-slate-600">
          Please sign in to view product details.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="grid gap-10 md:grid-cols-[1.1fr_1fr]">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-50">
            <Image
              src={product.image_url || '/hero-appliances.svg'}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
              priority
            />
          </div>
          <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
            <span>Stock: {product.stock_qty}</span>
            <span>Updated: {new Date(product.updated_at).toLocaleDateString()}</span>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            Product Details
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">{product.name}</h1>
          <p className="mt-4 text-slate-600">{product.description || 'Premium sourcing with verified suppliers.'}</p>
          <div className="mt-6 flex items-baseline gap-2">
            <span className="text-3xl font-semibold text-slate-900">
              {product.currency} {product.price}
            </span>
            <span className="text-sm text-slate-500">per unit</span>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm">
              Request Quote
            </button>
            <button className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700">
              Add to RFQ
            </button>
          </div>
          <div className="mt-8 rounded-2xl border border-slate-100 bg-slate-50 p-5 text-sm text-slate-600">
            Cloudflare cached (ISR). Lead time and freight options update automatically.
          </div>
        </div>
      </div>
    </div>
  );
}
