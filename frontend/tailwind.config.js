/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        background: '#09090B', // Very dark zinc for bg
        card: '#111827', // Gray-900 for cards
        primary: '#3B82F6', // Blue-500
        secondary: '#94A3B8', // Slate-400
        text: '#F9FAFB', // Gray-50
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(to right, #3B82F6, #8B5CF6)', // Blue to Purple
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
