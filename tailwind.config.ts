import type { Config } from "tailwindcss";
import {heroui} from "@heroui/react";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [heroui({
    layout: {
      disabledOpacity: "0.4",
    },
    themes: {
      light: {
        colors: {
          background:{
            DEFAULT: "#FFFFFF",
          },
          foreground:{
            DEFAULT: "#000000",
          },
          primary: {
            foreground: "#FFFFFF",
            DEFAULT: "#000000",
          },
          focus: "#000000",
          
        },
      },
    },
  })],
} satisfies Config;
