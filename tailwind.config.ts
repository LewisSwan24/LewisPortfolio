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
            "--tw-prose-body": "hsl(var(--foreground))",
            "--tw-prose-headings": "hsl(var(--foreground))",
            "--tw-prose-links": "hsl(var(--accent))",
            "--tw-prose-bold": "hsl(var(--foreground))",
            "--tw-prose-counters": "hsl(var(--muted-foreground))",
            "--tw-prose-bullets": "hsl(var(--muted-foreground))",
            "--tw-prose-hr": "hsl(var(--border))",
            "--tw-prose-quotes": "hsl(var(--foreground))",
            "--tw-prose-quote-borders": "hsl(var(--accent))",
            "--tw-prose-captions": "hsl(var(--muted-foreground))",
            "--tw-prose-code": "hsl(var(--foreground))",
            "--tw-prose-pre-code": "hsl(var(--foreground))",
            "--tw-prose-pre-bg": "hsl(var(--muted))",
            "--tw-prose-th-borders": "hsl(var(--border))",
            "--tw-prose-td-borders": "hsl(var(--border))",
            maxWidth: "none",
            a: {
              textDecoration: "underline",
              textUnderlineOffset: "4px",
              "&:hover": {
                color: "hsl(var(--accent))",
              },
            },
            "h2, h3, h4": {
              scrollMarginTop: "5rem",
            },
            code: {
              backgroundColor: "hsl(var(--muted))",
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
              backgroundColor: "hsl(var(--muted))",
              border: "1px solid hsl(var(--border))",
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
