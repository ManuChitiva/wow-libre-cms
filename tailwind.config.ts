import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        shine: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        colorCycle: {
          "0%, 100%": { color: "#C5A880" }, // Dorado suave
          "25%": { color: "#8D99AE" }, // Plata/gris azulado
          "50%": { color: "#A26769" }, // Vino tinto suave
          "75%": { color: "#F5F5F5" }, // Blanco roto
        },
        "border-glow": {
          "0%, 100%": { borderColor: "transparent" },
          "50%": { borderColor: "#6366f1" }, // Indigo-500
        },
      },
      animation: {
        "color-cycle": "colorCycle 4s ease-in-out infinite",
        shine: "shine 1s ease-in-out",
        "border-glow": "border-glow 3s linear infinite",
      },
      colors: {
        midnight: "#0B1218",
        orange_500: "#f97316",
        btnPrimary: "#FF4E16",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar-hide")],
};
export default config;
