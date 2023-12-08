const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'media',
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        38: '152px',
      },
      colors: {
        grey: colors.trueGray,
        lime: colors.lime,
      },
    },
  },
  variants: {},
};
