/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  mode: "jit",
  theme: {
    extend: {
      colors: {
        /* Semantic theme colors: use these for theme-aware UI */
        "brand-bg": "var(--brand-bg)",
        "brand-surface": "var(--brand-surface)",
        "brand-surface-elevated": "var(--brand-surface-elevated)",
        "brand-text": "var(--brand-text)",
        "brand-text-muted": "var(--brand-text-muted)",
        "brand-border": "var(--brand-border)",
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
        accent: {
          blue: "#56ccf2",
          purple: "#804dee",
          "blue-muted": "rgba(86, 204, 242, 0.2)",
          "purple-muted": "rgba(128, 77, 238, 0.2)",
        },
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
        glow: "0 0 40px -10px rgba(86, 204, 242, 0.4)",
        "glow-purple": "0 0 40px -10px rgba(128, 77, 238, 0.4)",
        "premium": "0 2px 8px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)",
        "premium-lg": "0 8px 30px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)",
        "premium-nav": "0 1px 0 rgba(0, 0, 0, 0.06)",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.webp')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
