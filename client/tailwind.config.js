/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--color-ink)",
        muted: "var(--color-muted)",
        canvas: "var(--color-canvas)",
        surface: "var(--color-surface)",
        "brand-panel": "var(--color-brand-panel)",
        border: "var(--color-border)",
        accent: "var(--color-accent)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        card: "0 24px 80px -36px rgba(32, 38, 32, 0.22)"
      }
    }
  },
  plugins: []
};
