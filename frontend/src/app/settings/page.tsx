// frontend/src/app/settings/page.tsx
'use client';

import { useState } from 'react';
import { logout } from '@/utils/logout';

export default function SettingsPage() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('❌ New passwords do not match');
      return;
    }
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      if (res.ok) {
        alert('✅ Password changed successfully');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        alert('❌ Failed to change password');
      }
    } catch (err) {
      console.error(err);
      alert('⚠️ Server error');
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm('⚠️ Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }
    try {
      const res = await fetch('/api/auth/delete-account', {
        method: 'DELETE',
      });
      if (res.ok) {
        alert('✅ Account deleted successfully');
        logout(); // Clear session and redirect
      } else {
        alert('❌ Failed to delete account');
      }
    } catch (err) {
      console.error(err);
      alert('⚠️ Server error');
    }
  };

  return (
    <main className="max-w-2xl mx-auto px-6 py-12 bg-white dark:bg-zinc-900 rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Account Settings ⚙️
      </h1>

      <section className="space-y-8">
        {/* Change Password Section */}
        <div className="p-6 border rounded-md dark:border-zinc-700">
          <h2 className="text-lg font-semibold mb-4">Change Password</h2>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <input
              type="password"
              placeholder="Current Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className="w-full p-3 border rounded-md dark:bg-zinc-800 dark:border-zinc-700"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full p-3 border rounded-md dark:bg-zinc-800 dark:border-zinc-700"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-3 border rounded-md dark:bg-zinc-800 dark:border-zinc-700"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Update Password
            </button>
          </form>
        </div>

        {/* Delete Account Section */}
        <div className="p-6 border rounded-md dark:border-zinc-700">
          <h2 className="text-lg font-semibold text-red-600 mb-4">Delete Account</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Once you delete your account, all your data will be permanently removed.
          </p>
          <button
            onClick={handleDeleteAccount}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Delete My Account
          </button>
        </div>

        {/* Logout Section */}
        <div className="p-6 border rounded-md dark:border-zinc-700">
          <h2 className="text-lg font-semibold text-red-600 mb-4">Logout</h2>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Log Out
          </button>
        </div>
      </section>
    </main>
  );
}
