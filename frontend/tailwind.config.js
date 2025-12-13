/** @type {import('tailwindcss').Config} */
export default {
 content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
  theme: {
    extend: {
      colors: {
        primary: '#2F34A2',
        secondary: '#409F68',
        background: '#F3F4F6',
        error: '#A22F2F',
        text: '#111827',
      }
    },
  },
  plugins: [],
}