export function getApiBase(): string {
  const rawBase = process.env.NEXT_PUBLIC_API_BASE || 'https://api.exbuy.com';
  const isProd = process.env.NODE_ENV === 'production';

  if (isProd && !rawBase.startsWith('https://')) {
    throw new Error('NEXT_PUBLIC_API_BASE must be https in production');
  }

  return rawBase;
}
