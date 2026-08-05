import { LocalizedLink as Link } from "@/components/LocalizedLink";
import type {
  EvidenceMatrixCapability,
  ProjectEvidenceSlug,
  ProofLocale,
} from "@/lib/portfolio-proof";

const projectLabels: Record<ProjectEvidenceSlug, string> = {
  connect: "UQ Connect",
  spectra: "Spectra Lens",
  ai: "AI Coach",
  circles: "Connect Circles",
  maze: "MazeRunners",
};

const projectOrder: ProjectEvidenceSlug[] = ["connect", "spectra", "ai", "circles", "maze"];

interface EvidenceMatrixProps {
  capabilities: EvidenceMatrixCapability[];
  locale?: ProofLocale;
}

export function EvidenceMatrix({ capabilities, locale = "en" }: EvidenceMatrixProps) {
  const isZh = locale === "zh";
  const copy = isZh
    ? {
        label: "证据矩阵",
        title: "按能力找到最强证据。",
        body: "每个单元格都指向案例里的具体段落，招聘方不用逐个打开项目也能检查证据。",
        aria: "能力证据矩阵",
        capability: "能力",
        strength: {
          primary: "主要",
          supporting: "支持",
        },
      }
    : {
        label: "Evidence matrix",
        title: "Find the strongest proof by capability.",
        body:
          "Each cell points to a case section, so hiring readers can inspect the evidence without opening every project.",
        aria: "Capability evidence matrix",
        capability: "Capability",
        strength: {
          primary: "primary",
          supporting: "supporting",
        },
      };

  return (
    <section className="evidence-matrix-section" aria-labelledby="evidence-matrix-title">
      <div className="evidence-matrix-head">
        <div>
          <div className="label">{copy.label}</div>
          <h2 id="evidence-matrix-title">{copy.title}</h2>
        </div>
        <p>{copy.body}</p>
      </div>

      <div className="evidence-matrix" role="table" aria-label={copy.aria}>
        <div className="evidence-matrix-row is-header" role="row">
          <div role="columnheader">{copy.capability}</div>
          {projectOrder.map((slug) => (
            <div role="columnheader" key={slug}>
              {projectLabels[slug]}
            </div>
          ))}
        </div>

        {capabilities.map((capability) => (
          <div className="evidence-matrix-row" role="row" key={capability.id}>
            <div className="evidence-matrix-capability" role="rowheader">
              <strong>{capability.label}</strong>
              <span>{capability.summary}</span>
            </div>

            {projectOrder.map((slug) => {
              const cell = capability.cases[slug];
              if (!cell || cell.strength === "none") {
                return (
                  <div className="evidence-matrix-empty" role="cell" key={slug}>
                    <small className="evidence-matrix-mobile-label">
                      {projectLabels[slug]}
                    </small>
                    <span>-</span>
                  </div>
                );
              }

              return (
                <Link
                  className={`evidence-matrix-cell is-${cell.strength}`}
                  role="cell"
                  href={cell.href}
                  key={slug}
                >
                  <small className="evidence-matrix-mobile-label">
                    {projectLabels[slug]}
                  </small>
                  <small className="evidence-matrix-strength">
                    {copy.strength[cell.strength] ?? cell.strength}
                  </small>
                  <span>{cell.proof}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
