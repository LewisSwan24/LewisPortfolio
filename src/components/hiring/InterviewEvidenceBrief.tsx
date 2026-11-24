import Link from "next/link";
import { getProofUiLabels, type ProofUiLabels } from "@/lib/proof";
import type {
  InterviewEvidenceBriefItem,
  ProjectEvidenceSlug,
} from "@/lib/portfolio-proof";

const caseLabels: Record<ProjectEvidenceSlug, string> = {
  connect: "UQ Connect",
  spectra: "Spectra Lens",
  maze: "MazeRunners",
  hoop: "Hoop Dream",
  pricewise: "PriceWise",
  gapmapper: "Perception Gap Mapper",
  rules: "Requirements into Rules",
  grassland: "Grassland Iron Tide",
  onthebeat: "On The Beat",
  lamplight: "Lamplight Nook",
  autofill: "Resume Autofill",
  walkie: "Walkie",
  fencepost: "Fencepost",
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
