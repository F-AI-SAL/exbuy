// frontend/src/utils/authFetch.ts
// Enterprise‑grade authenticated fetch utility with CRUD wrappers.
// Handles access token injection, automatic refresh, and error management.

export interface AuthError extends Error {
  status?: number;
  details?: string;
}

const REFRESH_URL =
  process.env.NEXT_PUBLIC_REFRESH_URL || 'http://localhost:8000/api/token/refresh/';

async function baseAuthFetch(url: string, options: RequestInit = {}): Promise<Response> {
  let access = localStorage.getItem('token');
  const refresh = localStorage.getItem('refresh');

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (access) {
    headers['Authorization'] = `Bearer ${access}`;
  }

  options.headers = headers;

  let res = await fetch(url, options);

  // If access token expired → try refresh
  if (res.status === 401 && refresh) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('⚠️ Access token expired, attempting refresh...');
    }

    const refreshRes = await fetch(REFRESH_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh }),
    });

    if (refreshRes.ok) {
      const data = await refreshRes.json();
      localStorage.setItem('token', data.access);
      access = data.access;

      const retryHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
        Authorization: `Bearer ${access}`,
      };

      options.headers = retryHeaders;
      res = await fetch(url, options);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh');
      throw new Error('❌ Session expired. Please log in again.');
    }
  }

  if (!res.ok) {
    const error: AuthError = new Error(`Request failed: ${res.status}`);
    error.status = res.status;
    error.details = await res.text();
    if (process.env.NODE_ENV === 'development') {
      console.error(`[AUTH FETCH ERROR] ${url}`, error.details);
    }
    throw error;
  }

  return res;
}

// ================== CRUD Wrappers ==================
export async function authGet<T = any>(url: string): Promise<T> {
  const res = await baseAuthFetch(url, { method: 'GET' });
  return res.json();
}

export async function authPost<T = any>(url: string, body: any): Promise<T> {
  const res = await baseAuthFetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function authPut<T = any>(url: string, body: any): Promise<T> {
  const res = await baseAuthFetch(url, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function authDelete<T = any>(url: string): Promise<T> {
  const res = await baseAuthFetch(url, { method: 'DELETE' });
  return res.json();
}
