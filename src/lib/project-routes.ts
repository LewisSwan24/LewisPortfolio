export const CURRENT_PROJECT_SLUGS = ["connect", "spectra", "ai", "circles"] as const;

export type CurrentProjectSlug = (typeof CURRENT_PROJECT_SLUGS)[number];

export const LEGACY_PROJECT_SLUG_REDIRECTS: Record<string, CurrentProjectSlug> = {
  "uq-connect": "connect",
  "spectra-lens": "spectra",
  "ai-interview-assistant": "ai",
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
};
