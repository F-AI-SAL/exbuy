/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
  ],
  darkMode: 'class', // ✅ modern dark mode toggle
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#2563eb', // blue-600
          light: '#3b82f6', // blue-500
          dark: '#1e40af', // blue-800
        },
      },
      boxShadow: {
        'xl-soft': '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
        neon: '0 0 10px rgba(99,102,241,0.8), 0 0 20px rgba(99,102,241,0.6)',
      },
      backgroundSize: {
        shimmer: '200% auto',
      },
      keyframes: {
        bump: {
          '0%': { transform: 'scale(1)' },
          '30%': { transform: 'scale(1.3)' },
          '60%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        pulseGlow: {
          '0%, 100%': {
            boxShadow: '0 0 0 0 rgba(16, 185, 129, 0.7)',
          },
          '50%': {
            boxShadow: '0 0 10px 4px rgba(16, 185, 129, 0.5)',
          },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-2px)' },
          '50%': { transform: 'translateX(2px)' },
          '75%': { transform: 'translateX(-2px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        neonPulse: {
          '0%, 100%': { textShadow: '0 0 5px #6366f1, 0 0 10px #6366f1' },
          '50%': { textShadow: '0 0 20px #6366f1, 0 0 40px #6366f1' },
        },
      },
      animation: {
        bump: 'bump 0.3s ease',
        fadeIn: 'fadeIn 0.2s ease-out',
        pulseGlow: 'pulseGlow 0.6s ease-in-out',
        shake: 'shake 0.4s ease-in-out',
        shimmer: 'shimmer 3s linear infinite',
        neonPulse: 'neonPulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // ✅ better form styling
    require('@tailwindcss/typography'), // ✅ prose content
    require('@tailwindcss/aspect-ratio'), // ✅ responsive images/videos
    require('@tailwindcss/line-clamp'), // ✅ text truncation utility
  ],
};
