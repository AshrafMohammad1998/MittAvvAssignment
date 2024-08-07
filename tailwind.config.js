/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        sans: ['Bai Jamjuree', 'sans-serif'],
      },
      colors: {
        'custom-green': '#63ba3c',
        'custom-purple': '#8e4399',
        'custom-orange': '#ea9713',
      },
    },
  },
  plugins: [],
}

