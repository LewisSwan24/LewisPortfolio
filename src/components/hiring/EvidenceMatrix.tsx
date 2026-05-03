import Link from "next/link";
import type {
  EvidenceMatrixCapability,
  ProjectEvidenceSlug,
} from "@/lib/portfolio-proof";

const projectLabels: Record<ProjectEvidenceSlug, string> = {
  connect: "UQ Connect",
  spectra: "Spectra Lens",
  ai: "AI Coach",
  circles: "Connect Circles",
};

const projectOrder: ProjectEvidenceSlug[] = ["connect", "spectra", "ai", "circles"];

interface EvidenceMatrixProps {
  capabilities: EvidenceMatrixCapability[];
}

export function EvidenceMatrix({ capabilities }: EvidenceMatrixProps) {
  return (
    <section className="evidence-matrix-section" aria-labelledby="evidence-matrix-title">
      <div className="evidence-matrix-head">
        <div>
          <div className="label">Evidence matrix</div>
          <h2 id="evidence-matrix-title">Find the strongest proof by capability.</h2>
        </div>
        <p>
          Each cell points to a case section, so hiring readers can inspect the
          evidence without opening every project.
        </p>
      </div>

      <div className="evidence-matrix" role="table" aria-label="Capability evidence matrix">
        <div className="evidence-matrix-row is-header" role="row">
          <div role="columnheader">Capability</div>
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
                  <small className="evidence-matrix-strength">{cell.strength}</small>
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
