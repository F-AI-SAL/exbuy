// frontend/src/app/register/page.tsx
'use client';

import { useState } from 'react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        // Placeholder: store JWT token
        localStorage.setItem('token', data.token);
        alert('Registered successfully!');
      } else {
        alert('Registration failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error registering');
    }
  };

  return (
    <main className="px-6 py-16 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create Account</h1>
      <form className="flex flex-col gap-4" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Full Name"
          className="p-3 border rounded bg-transparent"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="p-3 border rounded bg-transparent"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-3 border rounded bg-transparent"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="px-6 py-3 rounded bg-black text-white font-semibold hover:opacity-90 transition">
          Register
        </button>
      </form>
    </main>
  );
}
