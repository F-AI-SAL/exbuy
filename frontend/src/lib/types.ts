// frontend/src/lib/types.ts
// Central type definitions for ExBuy platform.
// Enterprise‑grade: strongly typed, extensible, and modern.

export interface ServiceItem {
  /** Path to SVG icon in /public/icons */
  icon: string;
  /** Display title of the service */
  title: string;
  /** Short description or subtitle */
  subtitle: string;
  /** Optional navigation link */
  href?: string;
  /** Optional badge (e.g. "New", "Popular") */
  badge?: string;
  /** Optional priority for sorting */
  priority?: number;
}

export interface UserInfo {
  /** Unique identifier for the user */
  id: string;
  /** Email address (optional) */
  email?: string;
  /** First name (optional) */
  firstName?: string;
  /** Avatar image URL (optional) */
  avatarUrl?: string;
  /** Optional role (e.g. "admin", "customer") */
  role?: 'admin' | 'customer' | 'partner';
  /** Account status (optional) */
  status?: 'active' | 'inactive' | 'banned';
  /** Optional timestamp for creation */
  createdAt?: string;
}
