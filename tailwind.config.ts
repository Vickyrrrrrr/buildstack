import type { Config } from "tailwindcss";

const config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        lg: "1.5rem",
        xl: "1.5rem",
        "2xl": "1.5rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        bg: {
          base: "var(--bg-base)",
          surface: "var(--bg-surface)",
          elevated: "var(--bg-elevated)",
          terminal: "var(--bg-terminal)",
        },
        accent: {
          primary: "var(--accent-primary)",
          secondary: "var(--accent-secondary)",
          error: "var(--accent-error)",
          repair: "var(--accent-repair)",
        },
        text: {
          primary: "var(--text-primary)",
          muted: "var(--text-muted)",
        },
        border: {
          DEFAULT: "var(--border)",
        },
        trace: "var(--trace)",
      },
      fontFamily: {
        sans: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(217, 119, 69, 0.14), 0 12px 40px rgba(217, 119, 69, 0.12)",
        "glow-strong":
          "0 0 0 1px rgba(217, 119, 69, 0.2), 0 16px 48px rgba(217, 119, 69, 0.16)",
        surface: "0 24px 80px rgba(77, 50, 33, 0.12)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      backgroundImage: {
        "launch-radial":
          "radial-gradient(circle at center, rgba(224, 188, 150, 0.55) 0%, rgba(247, 243, 238, 1) 72%)",
        "trace-grid":
          "linear-gradient(to right, rgba(217, 119, 69, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(217, 119, 69, 0.06) 1px, transparent 1px)",
        "trace-pattern":
          "radial-gradient(circle at 1px 1px, rgba(217, 119, 69, 0.18) 1px, transparent 0)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "cursor-blink": {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -10px, 0)" },
        },
      },
      animation: {
        marquee: "marquee 24s linear infinite",
        "cursor-blink": "cursor-blink 1s steps(1, end) infinite",
        orbit: "orbit 5s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
} satisfies Config;

export default config;
