/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          black: '#020202', // Deepest black
          glass: 'rgba(20, 20, 20, 0.6)',
          border: 'rgba(255, 255, 255, 0.08)',
          gold: '#D4AF37',
          accent: '#6366f1',
          cyan: '#06b6d4',
          plasma: '#3b82f6',
        },
      },
      boxShadow: {
        '3d': '0 20px 50px -12px rgba(0, 0, 0, 0.7)',
        'glow': '0 0 20px rgba(99, 102, 241, 0.3)',
        'reactor-core': '0 0 80px 30px rgba(6, 182, 212, 0.6)',
        'reactor-ring': '0 0 25px 5px rgba(59, 130, 246, 0.4)',
        'hologram': '0 0 10px rgba(6, 182, 212, 0.5), inset 0 0 20px rgba(6, 182, 212, 0.2)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'spin-slower': 'spin 40s linear infinite',
        'spin-reverse': 'spin-reverse 25s linear infinite',
        'spin-reverse-slow': 'spin-reverse 50s linear infinite',
        'flicker': 'flicker 3s infinite alternate',
        'orbit': 'orbit 10s linear infinite',
        'orbit-reverse': 'orbit-reverse 15s linear infinite',
        'fade-in': 'fade-in 1s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'spin-reverse': {
          'from': { transform: 'rotate(360deg)' },
          'to': { transform: 'rotate(0deg)' },
        },
        flicker: {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': {
            opacity: 1,
            boxShadow: '0 0 80px 30px rgba(6, 182, 212, 0.6)'
          },
          '20%, 24%, 55%': {
            opacity: 0.8,
            boxShadow: '0 0 40px 15px rgba(6, 182, 212, 0.3)'
          }
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(10px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(10px) rotate(-360deg)' }
        },
        'orbit-reverse': {
          '0%': { transform: 'rotate(360deg) translateX(15px) rotate(-360deg)' },
          '100%': { transform: 'rotate(0deg) translateX(15px) rotate(0deg)' }
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
