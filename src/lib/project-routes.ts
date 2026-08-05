export const CURRENT_PROJECT_SLUGS = ["connect", "spectra", "ai", "circles", "maze"] as const;

export type CurrentProjectSlug = (typeof CURRENT_PROJECT_SLUGS)[number];

export const LEGACY_PROJECT_SLUG_REDIRECTS: Record<string, CurrentProjectSlug> = {
  "uq-connect": "connect",
  "spectra-lens": "spectra",
  "ai-interview-assistant": "ai",
  // Only slugs that were genuinely live before the rename belong here; this
  // list mirrors legacyProjectRedirects in next.config.js. "maze" is new, so it
  // has no legacy alias to redirect from.
  "connect-circles": "circles",
};

export const PROJECT_OG_COPY: Record<
  CurrentProjectSlug,
  { title: string; oneLiner: string }
> = {
  connect: {
    title: "UQ Connect",
    oneLiner: "A task-first information architecture for university students.",
  },
  spectra: {
    title: "Spectra Lens",
    oneLiner: "Private colour interpretation for real-world accessibility moments.",
  },
  ai: {
    title: "AI Interview Assistant",
    oneLiner: "A calmer AI coaching loop for interview practice.",
  },
  circles: {
    title: "Connect Circles",
    oneLiner: "A slower social design direction for international student belonging.",
  },
  maze: {
    title: "MazeRunners",
    oneLiner: "A sensor-driven physical maze wired to haptics, audio, and a browser console.",
  },
};
