import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "clr-marine-blue": "hsla(var(--marine-blue))",
        "clr-purplish-blue": "hsla(var(--purplish-blue))",
        "clr-pastel-blue": "hsla(var(--pastel-blue))",
        "clr-light-blue": "hsla(var(--light-blue))",
        "clr-strawberry": "hsla(var(--strawberry))",
        "clr-cool-gray": "hsla(var(--cool-gray))",
        "clr-light-gray": "hsla(var(--light-gray))",
        "clr-magnolia": "hsla(var(--magnolia))",
        "clr-alabaster": "hsla(var(--alabaster))",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "slide-r-to-l": {
          from: {
            transform: "translateX(100%)",
          },
          to: {
            transform: "translateX(0)",
          },
        },
        fadein: {
          "0%": { opacity: "0" },
          "50%": { opacity: "0.3" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-r-to-l": "slide-r-to-l 0.4s ease-in-out",
        fadein: "fadein 350ms ease-in ",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
