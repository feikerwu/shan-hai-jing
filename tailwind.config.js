/** @type {import('tailwindcss').Config} */

// const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    // './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {},
  },
  // 使用官方的书写插件
  plugins: [require('@tailwindcss/typography')],
};
