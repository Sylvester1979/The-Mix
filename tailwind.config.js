/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0a0a0f',
        'bg-secondary': '#12121a',
        'bg-tertiary': '#1a1a2e',
        'text-primary': '#ffffff',
        'text-secondary': '#a0a0b0',
        'text-muted': '#606070',
        'accent-primary': '#6366f1',
        'accent-secondary': '#8b5cf6',
        'success': '#22c55e',
        'warning': '#f59e0b',
        'error': '#ef4444',
        'info': '#3b82f6',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(99,102,241,0.4)',
        'glow-success': '0 0 20px rgba(34,197,94,0.4)',
        'glow-warning': '0 0 20px rgba(245,158,11,0.4)',
        'card': '0 4px 24px rgba(0,0,0,0.2)',
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, #6366f1, #8b5cf6)',
      },
    },
  },
  plugins: [],
}
