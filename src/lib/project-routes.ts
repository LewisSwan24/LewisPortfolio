export const CURRENT_PROJECT_SLUGS = [
  "connect",
  "spectra",
  "maze",
  "vigil",
  "hoop",
  "pricewise",
  "gapmapper",
  "rules",
] as const;

export type CurrentProjectSlug = (typeof CURRENT_PROJECT_SLUGS)[number];

/**
 * Cases that keep their page but are no longer presented. The page still
 * builds and still answers at its URL; nothing on the site links to it, and
 * the homepage, the work index, the sitemap, the feeds, search, structured
 * data and the proof lists all leave it out.
 *
 * Vigil was abandoned on 2026-09-23. On 2026-09-27 Lewis chose to take it off
 * the homepage and the lists rather than delete it, so its case data, images
 * and prototype stay where they are.
 */
export const UNLISTED_PROJECT_SLUGS: readonly CurrentProjectSlug[] = ["vigil"];

export function isUnlistedProject(slug: string): boolean {
  return (UNLISTED_PROJECT_SLUGS as readonly string[]).includes(slug);
}

export const LISTED_PROJECT_SLUGS: CurrentProjectSlug[] = CURRENT_PROJECT_SLUGS.filter(
  (slug) => !isUnlistedProject(slug),
);

/**
 * True for an internal link into an unlisted case, in either locale and with
 * or without an anchor: `/projects/vigil`, `/zh/projects/vigil#outcome-limits`,
 * `/projects/vigil/prototype.html`.
 */
export function linksToUnlistedProject(href: string): boolean {
  const slug = href.match(/^(?:\/zh)?\/projects\/([^/?#]+)/)?.[1];
  return slug !== undefined && isUnlistedProject(slug);
}

export const LEGACY_PROJECT_SLUG_REDIRECTS: Record<string, CurrentProjectSlug> = {
  "uq-connect": "connect",
  "spectra-lens": "spectra",
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
    oneLiner: "A browser extension that rewrites type and spacing on any page.",
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
    oneLiner: "A Chinese basketball career RPG, and a production pipeline with 299 registered asset specs.",
  },
  pricewise: {
    title: "PriceWise",
    oneLiner: "A live grocery price comparison app, and four classes of defect that a green build could not see.",
  },
  gapmapper: {
    title: "Perception Gap Mapper",
    oneLiner: "I built the route prototype, then argued for abandoning it — a safety interface cannot promise safety.",
  },
  rules: {
    title: "Requirements into Rules",
    oneLiner: "Two coursework briefs, one move: turn a soft requirement into a rule someone can build to and argue with.",
  },
};
