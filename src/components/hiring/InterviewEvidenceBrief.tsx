import Link from "next/link";
import type {
  InterviewEvidenceBriefItem,
  ProjectEvidenceSlug,
} from "@/lib/portfolio-proof";

const caseLabels: Record<ProjectEvidenceSlug, string> = {
  connect: "UQ Connect",
  spectra: "Spectra Lens",
  ai: "AI Coach",
  circles: "Connect Circles",
};

interface InterviewEvidenceBriefProps {
  items: InterviewEvidenceBriefItem[];
}

export function InterviewEvidenceBrief({ items }: InterviewEvidenceBriefProps) {
  return (
    <section className="interview-evidence-brief" aria-labelledby="interview-evidence-title">
      <div className="interview-section-head">
        <div>
          <div className="label">Evidence brief</div>
          <h2 id="interview-evidence-title">What to inspect before the call.</h2>
        </div>
        <p>
          Each proof point links to a case section instead of asking the reader
          to browse everything.
        </p>
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
