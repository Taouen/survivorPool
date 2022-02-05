const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'media',
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    customForms: (theme) => ({
      default: {
        radio: {
          icon: '<svg height="21px" version="1.1" viewBox="0 0 20 21" width="20px" xmlns="http://www.w3.org/2000/svg" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" xmlns:xlink="http://www.w3.org/1999/xlink"><title/><desc/><defs/><g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1"><g fill="#f59e0b" id="Core" transform="translate(-296.000000, -422.000000)"><g id="star" transform="translate(296.000000, 422.500000)"><path d="M10,15.273 L16.18,19 L14.545,11.971 L20,7.244 L12.809,6.627 L10,0 L7.191,6.627 L0,7.244 L5.455,11.971 L3.82,19 L10,15.273 Z" id="Shape"/></g></g></g></svg>',
        },
      },
    }),
    extend: {
      colors: {
        grey: colors.trueGray,
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/custom-forms')],
};
