/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{html,js,tsx}',
    './src/pages/**/*.{html,js,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {},
    colors: {
      floral_white: '#fffcf2ff',
      timberwolf: '#ccc5b9ff',
      black_olive: '#403d39ff',
      eerie_black: '#252422ff',
      flame: '#eb5e28ff',
    },
  },
  plugins: [],
};
