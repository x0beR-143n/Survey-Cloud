/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0D9488', // teal-600
        'primary-foreground': '#ffffff',
        secondary: '#0F766E', // teal-700
        'secondary-foreground': '#ffffff',
        border: '#e2e8f0',
        destructive: '#ef4444',
        'destructive-foreground': '#ffffff',
        card: '#ffffff',
        'card-foreground': '#0f172a',
        accent: '#f1f5f9',
        'accent-foreground': '#0f172a',
        muted: '#f8fafc',
        'muted-foreground': '#64748b',
        background: '#ffffff',
      }
    },
  },
  plugins: [],
}