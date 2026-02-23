/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#1B1F3B',
        dark: '#12152E',
        teal: '#2EE6C9',
      },
      borderRadius: {
        'xl': '20px',
      },
      boxShadow: {
        'glow': '0 0 20px 2px rgba(46, 230, 201, 0.4)',
        'glass': '0 8px 32px 0 rgba(27, 31, 59, 0.37)',
      },
      fontFamily: {
        'modern': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(135deg, #1B1F3B 0%, #12152E 100%)',
        'glass-blur': 'radial-gradient(circle, rgba(46, 230, 201, 0.15) 0%, rgba(27, 31, 59, 0.3) 100%)',
      },
    },
  },
  plugins: [],
}
