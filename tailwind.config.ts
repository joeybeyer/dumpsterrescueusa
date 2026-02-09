import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#ED1C24",          // Safety Red - primary CTAs
          "red-dark": "#C41920",   // Darker red for hover states
          "red-light": "#FF3B42",  // Lighter red for accents
          yellow: "#FFF200",       // Caution Yellow - accents & highlights
          "yellow-dark": "#E6D900", // Darker yellow for hover
          black: "#000000",        // Rich Black - headers, footers
          white: "#FFFFFF",
          green: "#00A651",        // Legacy green (kept for specific uses)
        },
        primary: {
          50: "#FEF2F2",
          100: "#FEE2E3",
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#ED1C24",   // Safety Red
          600: "#C41920",   // Primary hover
          700: "#A11419",
          800: "#7F1012",
          900: "#5C0B0D",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-anton)", "Impact", "sans-serif"],
      },
      boxShadow: {
        soft: "0 20px 40px rgba(24, 32, 28, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
