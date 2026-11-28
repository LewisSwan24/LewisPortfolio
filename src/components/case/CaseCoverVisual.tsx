import Image from "next/image";
import {
  VizConnect,
  VizSpectra,
  VizMaze,
  VizHoop,
  VizPricewise,
  VizGapmapper,
  VizRules,
} from "@/components/viz/ProjectViz";
import { getProjectCover } from "@/lib/project-covers";
import { localizeMediaSrc } from "@/lib/cases/localized-media";
import type { CurrentProjectSlug } from "@/lib/project-routes";
import type { ProofLocale } from "@/lib/portfolio-proof";

const SCREENSHOT_COVER_SLUGS: readonly CurrentProjectSlug[] = [
  "grassland",
  "onthebeat",
  "lamplight",
  "autofill",
  "walkie",
  "fencepost",
];

export function hasScreenshotCover(slug: CurrentProjectSlug): boolean {
  return SCREENSHOT_COVER_SLUGS.includes(slug) && getProjectCover(slug) !== undefined;
}

/** Cases with a schematic drawn for them (others fall back to Spectra's). */
const SCHEMATIC_SLUGS: readonly CurrentProjectSlug[] = [
  "maze",
  "hoop",
  "connect",
  "pricewise",
  "gapmapper",
  "rules",
  "spectra",
];

export function hasCaseSchematic(slug: CurrentProjectSlug): boolean {
  return SCHEMATIC_SLUGS.includes(slug);
}

export function CaseCoverVisual({
  slug,
  locale,
  priority = false,
}: {
  slug: CurrentProjectSlug;
  locale: ProofLocale;
  /** Only the hero cover. The related-case cards at the bottom used to be
   * preloaded too and competed with the LCP image (v7.0 review P2). */
  priority?: boolean;
}) {
  if (hasScreenshotCover(slug)) {
    const cover = getProjectCover(slug)!;
    return (
      <Image
        src={localizeMediaSrc(cover.src, locale)}
        fill
        priority={priority}
        alt={cover.alt[locale]}
        className={`project-cover project-cover--${cover.fit}`}
        sizes="(max-width: 1200px) 100vw, 1200px"
      />
    );
  }
  if (slug === "maze") {
    // The schematic's labels shrink to about 3px on a phone, so small screens
    // get the exhibition photo instead (case.css swaps them at 600px).
    const photo = getProjectCover(slug);
    if (!photo) return <VizMaze locale={locale} />;
    return (
      <>
        <div className="cs-cover-schematic">
          <VizMaze locale={locale} />
        </div>
        <Image
          src={photo.src}
          fill
          alt={photo.alt[locale]}
          className="project-cover project-cover--cover cs-cover-photo-mobile"
          sizes="(max-width: 600px) 100vw, 1px"
          loading={priority ? "eager" : "lazy"}
        />
      </>
    );
  }
  if (slug === "hoop") return <VizHoop locale={locale} />;
  if (slug === "connect") return <VizConnect locale={locale} />;
  if (slug === "pricewise") return <VizPricewise locale={locale} />;
  if (slug === "gapmapper") return <VizGapmapper locale={locale} />;
  if (slug === "rules") return <VizRules locale={locale} />;
  return <VizSpectra locale={locale} />;
}
