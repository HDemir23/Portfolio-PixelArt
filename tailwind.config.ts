import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#201612",
        ember: "#e9a75f",
        copper: "#9c5633",
        panel: "#2b1c18",
        terminal: "#62f08c"
      },
      fontFamily: {
        display: [
          "var(--font-display)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "monospace"
        ],
        mono: [
          "var(--font-pixel)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "monospace"
        ],
        sans: [
          "var(--font-body)",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ]
      },
      boxShadow: {
        pixel: "0 0 0 2px #3a2018, 0 18px 60px rgba(0, 0, 0, 0.45)"
      }
    }
  },
  plugins: []
};

export default config;
