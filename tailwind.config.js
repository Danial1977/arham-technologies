/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FBF9F5',  // Warm ivory
          100: '#F5EFE6', // Soft oatmeal / biscuit
          200: '#E8DEC8', // Sand
          300: '#D5C4A1', // Light oak / warm bronze
          400: '#B89F70', // Warm brass
          500: '#8C5E2D', // British walnut / caramel amber
          600: '#734A1F', // Deep walnut
          700: '#523C1B', // Dark timber
          800: '#3A2910', // Espresso
          900: '#26160C', // Charcoal wood / deep espresso
          950: '#1A0E07',
        },
        walnut: {
          50: '#FBF9F5',
          100: '#F5EFE6',
          200: '#E8DEC8',
          300: '#D5C4A1',
          400: '#B89F70',
          500: '#8C5E2D',
          600: '#734A1F',
          700: '#523C1B',
          800: '#3A2910',
          900: '#26160C',
        },
        timber: {
          50: '#FAF7F2',
          100: '#F5EFE6',
          200: '#E8DFD5',
          800: '#332015',
          900: '#26160C',
          950: '#1F150D',
        }
      },
      fontFamily: {
        serif: ["'Cinzel'", "'Cormorant Garamond'", 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        cinzel: ["'Cinzel'", 'Georgia', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
