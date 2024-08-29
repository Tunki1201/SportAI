import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    keyframes: {
      typing: {
        '0%': { width: '0%' },
        '100%': { width: '100%' },
      },
      blink: {
        '0%, 100%': { borderColor: 'transparent' },
        '50%': { borderColor: 'white' },
      },
    },
    animation: {
      typing: 'typing 4s steps(40) infinite, blink .7s infinite',
    },
  },
  plugins: [],
};
export default config;
