// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // root level এ allowedDevOrigins দিতে হবে
  allowedDevOrigins: [
    'http://192.168.68.101:3000', // তোমার LAN IP
    'http://localhost:3000', // Localhost
  ],
  reactStrictMode: true, // optional, ভালো practice
};

export default nextConfig;
