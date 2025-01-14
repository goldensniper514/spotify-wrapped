import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'spotify-green': '#1DB954',
        'spotify-off-green': '#1ed760',
        'spotify-blue': '#509bf5',
        'nav-black': '#040306',
        'spotify-black': '#181818',
        'lightest-grey': '#b3b3b3',
        'light-grey': '#9B9B9B',
        'spotify-grey': '#404040',
        'dark-grey': '#282828',
      },
      fontFamily: {
        circular: ['Circular Std', 'system', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'md': '20px',
        'lg': '24px',
        'xl': '28px',
        '2xl': '32px',
      },
      spacing: {
        'xs': '5px',
        'sm': '10px',
        'base': '20px',
        'md': '30px',
        'lg': '50px',
        'xl': '100px',
      },
      transitionTimingFunction: {
        'spotify': 'cubic-bezier(0.3, 0, 0.4, 1)',
        'in-cubic': 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
        'out-cubic': 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        'in-out-cubic': 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'in-out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'in-back': 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
        'out-back': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'in-out-back': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
} satisfies Config;
