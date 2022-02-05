const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'media',
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        grey: colors.trueGray,
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/forms')],
};
