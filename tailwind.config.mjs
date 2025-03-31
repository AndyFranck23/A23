/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // Assure-toi que 'class' est bien activé
  theme: {
    extend: {
      colors: {
        chocolate: '#6B3E2E',
        fashion: '#FF69B4',
        tech: '#2E6B5E',
        amber: {
          50: '#fffbeb',
          100: '#fef3c7',
          800: '#92400e',
          600: '#d97706',
        },
        brand: {
          primary: '#7C3AED',
          secondary: '#6D28D9',
          dark: '#1F2937',
          light: '#F9FAFB'
        }
      }
    }
  }
};
