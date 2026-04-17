import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        parchment: "var(--bg-parchment)",
        ivory: "var(--bg-ivory)",
        sand: "var(--bg-sand)",
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        tertiary: "var(--text-tertiary)",
        "border-cream": "var(--border-cream)",
        "border-warm": "var(--border-warm)",
        moss: {
          DEFAULT: "var(--accent-moss)",
          hover: "var(--accent-moss-hover)",
        },
        success: "var(--success)",
        error: "var(--error)",
        focus: "var(--focus)",
        // Backwards-compat aliases for pre-redesign components swept in later sprints
        background: "var(--bg-parchment)",
        foreground: "var(--text-primary)",
        muted: { DEFAULT: "var(--bg-sand)", foreground: "var(--text-secondary)" },
        card: { DEFAULT: "var(--bg-ivory)", foreground: "var(--text-primary)" },
        border: "var(--border-cream)",
        accent: { DEFAULT: "var(--accent-moss)", foreground: "var(--bg-ivory)" },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "var(--text-primary)",
            "--tw-prose-headings": "var(--text-primary)",
            "--tw-prose-links": "var(--accent-moss)",
            "--tw-prose-bold": "var(--text-primary)",
            "--tw-prose-counters": "var(--text-secondary)",
            "--tw-prose-bullets": "var(--text-secondary)",
            "--tw-prose-hr": "var(--border-cream)",
            "--tw-prose-quotes": "var(--text-primary)",
            "--tw-prose-quote-borders": "var(--accent-moss)",
            "--tw-prose-captions": "var(--text-secondary)",
            "--tw-prose-code": "var(--text-primary)",
            "--tw-prose-pre-code": "var(--text-primary)",
            "--tw-prose-pre-bg": "var(--bg-sand)",
            "--tw-prose-th-borders": "var(--border-cream)",
            "--tw-prose-td-borders": "var(--border-cream)",
            maxWidth: "none",
            a: {
              textDecoration: "underline",
              textUnderlineOffset: "4px",
              "&:hover": {
                color: "var(--accent-moss)",
              },
            },
            "h2, h3, h4": {
              scrollMarginTop: "5rem",
            },
            code: {
              backgroundColor: "var(--bg-sand)",
              padding: "0.25rem 0.375rem",
              borderRadius: "0.25rem",
              fontWeight: "400",
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
            pre: {
              backgroundColor: "var(--bg-sand)",
              border: "1px solid var(--border-cream)",
              borderRadius: "0.5rem",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
