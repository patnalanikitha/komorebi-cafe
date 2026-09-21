/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cozy: ['Fredoka', 'system-ui', 'sans-serif'],
        pixel: ['Silkscreen', 'monospace'],
        handwriting: ['"Nanum Pen Script"', 'cursive'],
      },
      colors: {
        cafe: {
          50: '#fbf8f3',
          100: '#f6ede0',
          200: '#ecd9c2',
          300: '#dfbda0',
          400: '#ce9d7b',
          500: '#b87c56',
          600: '#9d6343',
          700: '#7e4d36',
          800: '#543324',
          900: '#2d1a12',
          cream: '#fcf8f0',
          foam: '#fffbf5',
          latte: '#e9d7c3',
          crema: '#c88c46',
          espresso: '#352119',
          mocha: '#4a2c20',
          caramel: '#b86b2d',
          wood: '#442b20',
          woodLight: '#734e38',
          woodDark: '#23150f',
        }
      },
      boxShadow: {
        'pixel': '3px 3px 0px 0px rgba(0,0,0,0.5)',
        'pixel-lg': '5px 5px 0px 0px rgba(0,0,0,0.6)',
        'pixel-sm': '2px 2px 0px 0px rgba(0,0,0,0.5)',
        'cozy-glow': '0 0 25px rgba(254, 215, 170, 0.25)',
      },
      keyframes: {
        'steam-rise': {
          '0%': { transform: 'translateY(0) scaleX(1)', opacity: '0' },
          '30%': { opacity: '0.6' },
          '70%': { transform: 'translateY(-24px) scaleX(1.3) translateX(4px)', opacity: '0.4' },
          '100%': { transform: 'translateY(-45px) scaleX(1.8) translateX(-6px)', opacity: '0' },
        },
        'liquid-fill': {
          '0%': { height: '0%' },
          '100%': { height: '100%' },
        },
        'gentle-bob': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        }
      },
      animation: {
        'steam': 'steam-rise 3s ease-out infinite',
        'steam-delay': 'steam-rise 3.2s ease-out 1.2s infinite',
        'steam-delay-2': 'steam-rise 2.8s ease-out 0.6s infinite',
        'bob': 'gentle-bob 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
