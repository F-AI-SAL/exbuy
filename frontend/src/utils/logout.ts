// frontend/src/utils/logout.ts
'use client';

export async function logout(): Promise<void> {
  try {
    const res = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      // ✅ Clear localStorage tokens
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      localStorage.removeItem('token');

      // ✅ Redirect to signin page
      window.location.href = '/signin';
    } else {
      console.error('❌ Logout failed:', await res.json());
    }
  } catch (err) {
    console.error('❌ Logout error:', err);
  }
}
