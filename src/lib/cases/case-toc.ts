/**
 * Side table of contents for a case page.
 *
 * The page lists its sections once, in the order it renders them, and the
 * TOC is derived from that list, so the two cannot drift apart again.
 */

export interface CaseTocSection {
  id: string;
  label: string;
  /** False when the section does not render on this case. */
  present?: boolean;
}

export interface CaseTocEntry {
  id: string;
  label: string;
}

const normaliseLabel = (label: string) => label.trim().toLocaleLowerCase().replace(/\s+/g, " ");

/** Drop absent sections and merge entries whose labels read the same. */
export function buildCaseToc(sections: readonly CaseTocSection[]): CaseTocEntry[] {
  const seenLabels = new Set<string>();
  const seenIds = new Set<string>();
  const entries: CaseTocEntry[] = [];
  for (const section of sections) {
    if (section.present === false) continue;
    const key = normaliseLabel(section.label);
    if (seenLabels.has(key) || seenIds.has(section.id)) continue;
    seenLabels.add(key);
    seenIds.add(section.id);
    entries.push({ id: section.id, label: section.label });
  }
  return entries;
}

export interface CaseEvidenceLink {
  href: string;
  label: string;
  /** True when the link stays on the current case page. */
  inPage: boolean;
}

/**
 * Evidence links in the interview pack and red-team panel point at
 * `/projects/<slug>#<section>`. On that same case page they become in-page
 * anchors named after the section they jump to.
 */
export function resolveCaseEvidenceLink(
  href: string,
  {
    currentSlug,
    sectionLabels,
    locale,
  }: {
    currentSlug: string;
    sectionLabels: Readonly<Record<string, string>>;
    locale: "en" | "zh";
  }
): CaseEvidenceLink {
  const match = /^\/projects\/([^#?/]+)(?:#(.+))?$/.exec(href);
  const sectionId = match?.[2];

  if (match && match[1] === currentSlug && sectionId) {
    const name = sectionLabels[sectionId] ?? sectionId;
    return {
      href: `#${sectionId}`,
      label: locale === "zh" ? `跳到「${name}」 ↓` : `Jump to ${name} ↓`,
      inPage: true,
    };
  }

  // Another page: the labels passed in belong to this page, so stay generic.
  return {
    href,
    label: locale === "zh" ? "打开对应案例段落 ↗" : "Open the case section ↗",
    inPage: false,
  };
}
