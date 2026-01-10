// frontend/src/lib/api.ts
export interface ApiError extends Error {
  status?: number;
  details?: string;
}

export type ApiResponse<T = any> = T | string;

export async function api<T = any>(path: string, opts: RequestInit = {}): Promise<ApiResponse<T>> {
  const rawBase = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000';
  const isProd = process.env.NODE_ENV === 'production';
  if (isProd && !rawBase.startsWith('https://')) {
    throw new Error('NEXT_PUBLIC_API_BASE must be https in production');
  }
  const base = rawBase;
  const url = `${base}${path}`;

  try {
    const res = await fetch(url, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(opts.headers || {}),
      },
      ...opts,
    });

    const contentType = res.headers.get('content-type') || '';

    if (!res.ok) {
      const errorText = await res.text();
      const error: ApiError = new Error(errorText);
      error.status = res.status;
      error.details = errorText;
      if (process.env.NODE_ENV === 'development') {
        console.error(`[API ERROR] ${res.status} ${url}`, errorText);
      }
      throw error;
    }

    if (contentType.includes('application/json')) {
      return res.json() as Promise<T>;
    }
    return res.text();
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error(`[API FAILED] ${url}`, err);
    }
    throw err;
  }
}
