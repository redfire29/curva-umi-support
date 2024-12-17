/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {},
      fontFamily: {},
      keyframes: {
        'move-forever': {
          '0%': {
            'transform': 'translate3d(-90px, 0, 0)'
          },
          '100%': {
            'transform': 'translate3d(85px, 0, 0)'
          }
        },
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("js", ".js &");
      addVariant("nojs", ".no-js &");
    }),
  ],
}

