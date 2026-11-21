import { LocalizedServerLink as Link } from "@/components/LocalizedServerLink";
import { CaseCoverVisual } from "./CaseCoverVisual";
import type { CaseCardCopy } from "@/lib/cases/schema";
import type { CurrentProjectSlug } from "@/lib/project-routes";
import type { ProofLocale } from "@/lib/portfolio-proof";

export function CaseRelatedNav({
  prevSlug,
  prevCard,
  nextSlug,
  nextCard,
  locale,
  labels,
}: {
  prevSlug: CurrentProjectSlug;
  prevCard: CaseCardCopy;
  nextSlug: CurrentProjectSlug;
  nextCard: CaseCardCopy;
  locale: ProofLocale;
  labels: { related: string; prev: string; next: string; work: string };
}) {
  return (
    <div
      id="related-projects"
      className="cs-section cs-related-section"
      style={{ borderTop: "1px solid var(--border)", paddingTop: 48 }}
    >
      <div className="label" style={{ marginBottom: 20 }}>
        {labels.related}
      </div>
      <div className="cs-related">
        <Link href={`/projects/${prevSlug}`} className="cs-related-card cs-related-prev">
          <div className="cs-related-eyebrow">← {labels.prev}</div>
          <div className="cs-related-viz" aria-hidden>
            <CaseCoverVisual slug={prevSlug} locale={locale} />
          </div>
          <div className="cs-related-meta">
            <h4>{prevCard.title}</h4>
            <p>{prevCard.sub}</p>
          </div>
        </Link>
        <Link href={`/projects/${nextSlug}`} className="cs-related-card cs-related-next">
          <div className="cs-related-eyebrow">{labels.next} →</div>
          <div className="cs-related-viz" aria-hidden>
            <CaseCoverVisual slug={nextSlug} locale={locale} />
          </div>
          <div className="cs-related-meta">
            <h4>{nextCard.title}</h4>
            <p>{nextCard.sub}</p>
          </div>
        </Link>
      </div>
      <div className="cs-related-foot">
        <Link href="/projects" className="btn btn-ghost">
          ← {labels.work}
        </Link>
      </div>
    </div>
  );
}
