'use client';

export async function logout(): Promise<void> {
  try {
    const res = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      localStorage.removeItem('token');
      window.location.href = '/signin';
    } else {
      let errorMsg = 'Logout failed';
      try {
        const data = await res.json();
        errorMsg = data?.error || errorMsg;
      } catch {
        // ignore parse error
      }
      console.error('Logout failed:', errorMsg);
      alert(errorMsg);
    }
  } catch (err) {
    console.error('Logout error:', err);
    alert('Server error during logout');
  }
}