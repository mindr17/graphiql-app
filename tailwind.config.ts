import { nextui } from '@nextui-org/react';

const config = {
  content: [
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          layout: {},
          colors: {},
        },
        dark: {
          layout: {},
          colors: {
            danger: {
              DEFAULT: '#d33832',
              50: '#d3383225',
            },
          },
        },
      },
    }),
  ],
};

export default config;
