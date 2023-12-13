import { nextui } from '@nextui-org/react';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {}, // light theme colors
        },
        dark: {
          layout: {}, // dark theme layout tokens
          colors: {
            danger: {
              DEFAULT: '#d33832',
              50: '#d3383225',
            },
          }, // dark theme colors
        },
      },
    }),
  ],
};
export default config;

// {
//   50: "#e6f1fe",
//   100: "#cce3fd",
//   200: "#99c7fb",
//   300: "#66aaf9",
//   400: "#338ef7",
//   500: "#006FEE",
//   600: "#005bc4",
//   700: "#004493",
//   800: "#002e62",
//   900: "#001731",
// }
