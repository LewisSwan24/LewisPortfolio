import Link from "next/link";
import { getProofUiLabels, type ProofUiLabels } from "@/lib/proof";
import type {
  InterviewEvidenceBriefItem,
  ProjectEvidenceSlug,
} from "@/lib/portfolio-proof";

const caseLabels: Record<ProjectEvidenceSlug, string> = {
  connect: "UQ Connect",
  spectra: "Spectra Lens",
  ai: "AI Coach",
  maze: "MazeRunners",
  vigil: "Vigil",
  hoop: "Hoop Dream",
};

interface InterviewEvidenceBriefProps {
  items: InterviewEvidenceBriefItem[];
  labels?: ProofUiLabels;
}

export function InterviewEvidenceBrief({
  items,
  labels = getProofUiLabels("en"),
}: InterviewEvidenceBriefProps) {
  return (
    <section className="interview-evidence-brief" aria-labelledby="interview-evidence-title">
      <div className="interview-section-head">
        <div>
          <div className="label">{labels.evidenceBrief}</div>
          <h2 id="interview-evidence-title">{labels.evidenceBriefTitle}</h2>
        </div>
        <p>{labels.evidenceBriefIntro}</p>
      </div>
      <div className="interview-evidence-list">
        {items.map((item) => (
          <Link className="interview-evidence-item" href={item.href} key={item.id}>
            <small>{item.capability}</small>
            <h3>{caseLabels[item.caseSlug]}</h3>
            <p>{item.proof}</p>
            <span>{item.whyItMatters}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
