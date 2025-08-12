const defaultTheme = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  safelist: [
    'translate-x-6.5',
    'translate-x-0.5',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard Variable", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primaryPoint: '#BB2B2B',
        primary500: '#DC5454',
        // primaryPoint: '#3D8F74',
        // primaryPoint: '#3D768F',
        // primaryPoint: '#A48800',
        // primaryPoint: '#F37A58',
        primaryBg: '#FFE8EF',
      },
      screens: {
        'max-sm': { max: '639px' },
        'max-md': { max: '767px' },
        'max-lg': { max: '1023px' },
        'max-xl': { max: '1280px' },
        'max-2xl': { max: '1535px' },
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      }, 
      translate: {
        '6.5': '1.625rem', // 26px
        '0.5': '0.125rem', // 2px
      },
    },
  },
  plugins: [],
}