/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.header-24': { fontSize: '2.4rem', fontWeight: '700' },
        '.header-20': { fontSize: '2rem', fontWeight: '700' },
        '.title-20': { fontSize: '2rem', fontWeight: '500' },
        '.body-20': { fontSize: '2rem', fontWeight: '400' },
        '.body-18': { fontSize: '1.8rem', fontWeight: '400' },
        '.body-16': { fontSize: '1.6rem', fontWeight: '400' },
        '.body-14': { fontSize: '1.4rem', fontWeight: '400' },
        '.caption-15': { fontSize: '1.5rem', fontWeight: '400' },
        '.caption-11': { fontSize: '1.1rem', fontWeight: '500' },
      };
      addUtilities(newUtilities);
    },
  ],
};
