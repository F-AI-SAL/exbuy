// frontend/src/utils/api.ts
// Enterprise‑grade API utility for GET/POST requests.
// Strong typing, structured error handling, and modern interface alignment.

export interface ApiError extends Error {
  status?: number;
  details?: string;
}

export type ApiResponse<T = any> = T | string;

const API_BASE: string =
  process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000';

/**
 * Generic request handler
 */
async function request<T = any>(
  path: string,
  opts: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE}${path}`;

  try {
    const res = await fetch(url, {
      credentials: 'include',
      cache: 'no-store',
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

/**
 * GET request
 */
export async function apiGet<T = any>(path: string): Promise<ApiResponse<T>> {
  return request<T>(path, { method: 'GET' });
}

/**
 * POST request
 */
export async function apiPost<T = any>(
  path: string,
  body: any
): Promise<ApiResponse<T>> {
  return request<T>(path, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}
