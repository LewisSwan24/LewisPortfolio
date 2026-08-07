export const CURRENT_PROJECT_SLUGS = [
  "connect",
  "spectra",
  "ai",
  "maze",
  "vigil",
  "hoop",
] as const;

export type CurrentProjectSlug = (typeof CURRENT_PROJECT_SLUGS)[number];

export const LEGACY_PROJECT_SLUG_REDIRECTS: Record<string, CurrentProjectSlug> = {
  "uq-connect": "connect",
  "spectra-lens": "spectra",
  "ai-interview-assistant": "ai",
  // Only slugs that were genuinely live before the rename belong here; this
  // list mirrors legacyProjectRedirects in next.config.js. "maze", "vigil" and
  // "hoop" are newer, so they have no legacy alias to redirect from.
  //
  // "connect-circles" -> "circles" is gone with the case itself: Connect
  // Circles described a project that never existed, so there is no destination
  // to send that URL to. /projects/circles now redirects to /projects.
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
  maze: {
    title: "MazeRunners",
    oneLiner: "A sensor-driven physical maze wired to haptics, audio, and a browser console.",
  },
  vigil: {
    title: "Vigil",
    oneLiner: "A review desk for deciding when to trust an email classifier that is wrong 12% of the time.",
  },
  hoop: {
    title: "Hoop Dream",
    oneLiner: "A Chinese basketball career RPG, and a production pipeline for 299 generated assets.",
  },
};
