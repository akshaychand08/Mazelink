import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg)",
        card: "var(--card)",
        primary: "#6C63FF",
        secondary: "#8B85FF",
        accent: "#F472D0",
        muted: "#9CA3AF"
      },
      borderRadius: {
        xl: "20px",
        "2xl": "28px"
      }
    }
  },
  plugins: []
};

export default config;
