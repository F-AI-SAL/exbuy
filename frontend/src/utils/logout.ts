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
      // Try to parse error response safely
      let errorMsg = 'Logout failed';
      try {
        const data = await res.json();
        errorMsg = data?.error || errorMsg;
      } catch {
        // ignore parse error
      }
      console.error('❌ Logout failed:', errorMsg);
      alert(errorMsg);
    }
  } catch (err) {
    console.error('❌ Logout error:', err);
    alert('Server error during logout');
  }
}
