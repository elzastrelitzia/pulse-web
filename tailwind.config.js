/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0a",
        "bg-raised": "#111111",
        "bg-card": "#141414",
        line: "#232323",
        "line-soft": "#1a1a1a",
        ink: "#f2f0eb",
        "ink-dim": "#a8a39a",
        "ink-faint": "#6b675f",
        accent: "#ffffff",
        "accent-soft": "rgba(255, 255, 255, 0.08)",
      },
      fontFamily: {
        geist: ["Geist", "system-ui", "sans-serif"],
        "geist-mono": ["Geist Mono", "ui-monospace", "monospace"],
        "geist-pixel": ["Geist Pixel", "ui-monospace", "monospace"],
      },
      borderRadius: {
        DEFAULT: "14px",
        sm: "9px",
      },
      transitionTimingFunction: {
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animation: {
        shimmer: "shimmer 1.4s infinite",
        "chevron-rotate": "chevron-rotate 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "150% 0" },
          "100%": { backgroundPosition: "-50% 0" },
        },
        "chevron-rotate": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(90deg)" },
        },
      },
    },
  },
  plugins: [],
};