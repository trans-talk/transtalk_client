/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.header-20': { fontSize: '2rem', fontWeight: '700' },
        '.header-16': { fontSize: '1.6rem', fontWeight: '700' },
        '.title-16': { fontSize: '1.6rem', fontWeight: '500' },
        '.body-16': { fontSize: '1.6rem', fontWeight: '400' },
        '.body-14': { fontSize: '1.4rem', fontWeight: '400' },
        '.body-12': { fontSize: '1.4rem', fontWeight: '400' },
        '.caption-10': { fontSize: '10rem', fontWeight: '500' },
      };
      addUtilities(newUtilities);
    },
  ],
};
