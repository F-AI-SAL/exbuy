// src/lib/useUser.ts
'use client';

import { useMemo } from 'react';

export interface UserInfo {
  id: string;
  email?: string;
  firstName?: string;
  avatarUrl?: string;
  role?: 'admin' | 'customer' | 'partner';
  status?: 'active' | 'inactive' | 'banned';
}

export function useUser(): { user: UserInfo } {
  // Replace with real auth integration later (e.g. JWT, OAuth, NextAuth)
  const user: UserInfo = useMemo(
    () => ({
      id: 'u_123',
      email: 'md@exbuy.com',
      firstName: 'Md',
      avatarUrl: '', // empty triggers fallback
      role: 'customer',
      status: 'active',
    }),
    []
  );

  // Fallback avatar if none provided
  const enrichedUser: UserInfo = {
    ...user,
    avatarUrl:
      user.avatarUrl && user.avatarUrl.trim() !== ''
        ? user.avatarUrl
        : '/images/avatar-fallback.png',
  };

  return { user: enrichedUser };
}
