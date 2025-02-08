/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'ping': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      colors: {
        'gov-green': {
          50: '#f2f8f4',
          100: '#e6f1e8',
          200: '#bfd9c4',
          300: '#99c2a1',
          400: '#4d8f5c',  // More refined government green
          500: '#2c7a3d',  // Primary green
          600: '#236831',  // Darker shade
          700: '#1a5525',
          800: '#11421a',
          900: '#082f0e',
        }
      },
      fontFamily: {
        serif: ['Merriweather', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};