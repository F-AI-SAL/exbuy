// frontend/src/middleware.ts
// Enterprise‑grade middleware for route protection and RBAC in Next.js.
// Ensures authentication and role-based access control for protected routes.

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const protectedRoutes: string[] = ['/checkout', '/wishlist'];
const adminRoutes: string[] = ['/admin'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check if route is protected or admin
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

  if (isProtected || isAdminRoute) {
    const token = req.cookies.get('token')?.value;

    if (!token) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`⚠️ No token found. Redirecting to /signin`);
      }
      return NextResponse.redirect(new URL('/signin', req.url));
    }

    try {
      const secret = new TextEncoder().encode(
        process.env.JWT_SECRET || 'your-secret-key'
      );
      const { payload } = await jwtVerify(token, secret);

      // RBAC check for admin routes
      if (isAdminRoute && payload.role !== 'admin') {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`⚠️ Unauthorized role attempted to access admin route`);
        }
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }

      return NextResponse.next();
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error(`❌ Token verification failed:`, err);
      }
      return NextResponse.redirect(new URL('/signin', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/checkout/:path*', '/wishlist/:path*', '/admin/:path*'],
};
