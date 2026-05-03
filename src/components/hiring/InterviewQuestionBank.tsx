import Link from "next/link";
import type {
  InterviewQuestionBankItem,
  ProjectEvidenceSlug,
} from "@/lib/portfolio-proof";

const groupLabels: Record<InterviewQuestionBankItem["group"], string> = {
  product: "Product judgment",
  research: "Research rigor",
  accessibility: "Accessibility",
  ai: "AI trust",
  limits: "Limits",
};

const caseLabels: Record<ProjectEvidenceSlug, string> = {
  connect: "UQ Connect",
  spectra: "Spectra Lens",
  ai: "AI Coach",
  circles: "Connect Circles",
};

interface InterviewQuestionBankProps {
  items: InterviewQuestionBankItem[];
}

export function InterviewQuestionBank({ items }: InterviewQuestionBankProps) {
  return (
    <section className="interview-question-bank" aria-labelledby="interview-questions-title">
      <div className="interview-section-head">
        <div>
          <div className="label">Interview questions</div>
          <h2 id="interview-questions-title">Questions worth asking.</h2>
        </div>
        <p>
          Use these to inspect how I reason, not just what the final screens
          looked like.
        </p>
      </div>
      <div className="interview-question-grid">
        {items.map((item) => (
          <article className="interview-question-card" key={item.id}>
            <small>
              {groupLabels[item.group]} / {caseLabels[item.caseSlug]}
            </small>
            <h3>{item.question}</h3>
            <p>{item.proves}</p>
            <Link href={item.href}>Inspect evidence</Link>
          </article>
        ))}
      </div>
    </section>
  );
}
