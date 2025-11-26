/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/**/**/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // or false
  theme: {
    extend: {
      colors: {
        gray: {
          50: '#f8f7ff',
          100: '#f6f5ff',
          200: '#eff0fe',
          300: '#e0e0fc',
          400: '#98A5C0',
          500: '#84848f',
          600: '#595983',
          700: '#1e1f48',
          800: '#0f103b',
          900: '#000000'
        },
      }
    },
    fontFamily: {
      sans: ['Nunito', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
  },
  variants: {
    extend: {
      backgroundOpacity: ['dark']
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#FFA500",
          "secondary": "#FFA500",
          "accent": "#FFA500",
          "neutral": "#3D4451",
          "base-100": "#FFFFFF",
          "info": "#1D2D47",
          "success": "#009485",
          "warning": "#FFA500", // Set the warning color to orange
          "error": "#ff5724",
        },
      },
    ],
  },

}
