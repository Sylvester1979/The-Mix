/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background colors with better depth
        'bg-primary': '#0a0a0f',
        'bg-secondary': '#12121a',
        'bg-tertiary': '#1a1a2e',
        'bg-elevated': '#1f1f32',
        'bg-surface': '#252538',

        // Text colors with improved accessibility
        'text-primary': '#f5f5f7',
        'text-secondary': '#a1a1aa',
        'text-muted': '#71717a',
        'text-disabled': '#52525b',

        // Primary accent palette with states
        'accent-primary': '#6366f1',
        'accent-primary-hover': '#818cf8',
        'accent-primary-active': '#4f46e5',
        'accent-primary-muted': 'rgba(99,102,241,0.15)',

        // Secondary accent palette
        'accent-secondary': '#8b5cf6',
        'accent-secondary-hover': '#a78bfa',
        'accent-secondary-active': '#7c3aed',

        // Tertiary accents for variety
        'accent-teal': '#14b8a6',
        'accent-teal-hover': '#2dd4bf',
        'accent-pink': '#ec4899',
        'accent-pink-hover': '#f472b6',
        'accent-amber': '#f59e0b',
        'accent-amber-hover': '#fbbf24',

        // Semantic colors with better contrast
        'success': '#22c55e',
        'success-light': '#4ade80',
        'success-muted': 'rgba(34,197,94,0.15)',
        'warning': '#f59e0b',
        'warning-light': '#fbbf24',
        'warning-muted': 'rgba(245,158,11,0.15)',
        'error': '#ef4444',
        'error-light': '#f87171',
        'error-muted': 'rgba(239,68,68,0.15)',
        'info': '#3b82f6',
        'info-light': '#60a5fa',
        'info-muted': 'rgba(59,130,246,0.15)',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        // Enhanced glow effects
        'glow-primary': '0 0 20px rgba(99,102,241,0.4)',
        'glow-primary-lg': '0 0 40px rgba(99,102,241,0.5), 0 0 80px rgba(99,102,241,0.2)',
        'glow-primary-intense': '0 0 30px rgba(99,102,241,0.6), 0 4px 20px rgba(0,0,0,0.3)',
        'glow-success': '0 0 20px rgba(34,197,94,0.4)',
        'glow-success-lg': '0 0 40px rgba(34,197,94,0.5)',
        'glow-warning': '0 0 20px rgba(245,158,11,0.4)',
        'glow-error': '0 0 20px rgba(239,68,68,0.4)',
        'glow-teal': '0 0 20px rgba(20,184,166,0.4)',
        'glow-pink': '0 0 20px rgba(236,72,153,0.4)',

        // Card and depth shadows
        'card': '0 4px 24px rgba(0,0,0,0.2)',
        'card-hover': '0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.08)',
        'card-elevated': '0 12px 40px rgba(0,0,0,0.4)',
        'inner-glow': 'inset 0 1px 1px rgba(255,255,255,0.05)',
        'depth-sm': '0 2px 8px rgba(0,0,0,0.2)',
        'depth-md': '0 4px 16px rgba(0,0,0,0.25)',
        'depth-lg': '0 8px 32px rgba(0,0,0,0.35)',
      },
      backgroundImage: {
        // Enhanced gradients
        'accent-gradient': 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        'accent-gradient-hover': 'linear-gradient(135deg, #818cf8, #a78bfa)',
        'accent-gradient-vivid': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
        'accent-gradient-radial': 'radial-gradient(circle at center, #8b5cf6 0%, #6366f1 100%)',

        // Surface gradients for depth
        'surface-gradient': 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
        'surface-gradient-diagonal': 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',

        // Ambient glow backgrounds
        'glow-ambient': 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 70%)',
        'glow-ambient-bottom': 'radial-gradient(ellipse at 50% 100%, rgba(139,92,246,0.1) 0%, transparent 60%)',

        // Success/Warning/Error gradients
        'success-gradient': 'linear-gradient(135deg, #22c55e, #14b8a6)',
        'warning-gradient': 'linear-gradient(135deg, #f59e0b, #f97316)',
        'error-gradient': 'linear-gradient(135deg, #ef4444, #ec4899)',
      },
      animation: {
        'shimmer': 'shimmer 2s infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'fade-in': 'fade-in 0.2s ease-out',
        'fade-in-up': 'fade-in-up 0.3s ease-out',
        'fade-in-down': 'fade-in-down 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'slide-in-bottom': 'slide-in-bottom 0.3s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'bounce-subtle': 'bounce-subtle 0.4s ease-out',
        'wiggle': 'wiggle 0.3s ease-in-out',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(99,102,241,0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(99,102,241,0.6)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-bottom': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-3px)' },
        },
        'wiggle': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-2deg)' },
          '75%': { transform: 'rotate(2deg)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth-out': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'snap': 'cubic-bezier(0.5, 0, 0.1, 1)',
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
        '400': '400ms',
      },
    },
  },
  plugins: [],
}
