import Link from "next/link";
import { getProofUiLabels, type ProofUiLabels } from "@/lib/proof";
import type {
  InterviewQuestionBankItem,
  ProjectEvidenceSlug,
} from "@/lib/portfolio-proof";

const caseLabels: Record<ProjectEvidenceSlug, string> = {
  connect: "UQ Connect",
  spectra: "Spectra Lens",
  ai: "AI Coach",
  circles: "Connect Circles",
};

interface InterviewQuestionBankProps {
  items: InterviewQuestionBankItem[];
  labels?: ProofUiLabels;
}

export function InterviewQuestionBank({
  items,
  labels = getProofUiLabels("en"),
}: InterviewQuestionBankProps) {
  return (
    <section className="interview-question-bank" aria-labelledby="interview-questions-title">
      <div className="interview-section-head">
        <div>
          <div className="label">{labels.interviewQuestions}</div>
          <h2 id="interview-questions-title">{labels.questionsWorthAsking}</h2>
        </div>
        <p>{labels.questionsIntro}</p>
      </div>
      <div className="interview-question-grid">
        {items.map((item) => (
          <article className="interview-question-card" key={item.id}>
            <small>
              {labels.groupLabels[item.group]} / {caseLabels[item.caseSlug]}
            </small>
            <h3>{item.question}</h3>
            <p>{item.proves}</p>
            <Link href={item.href}>{labels.inspectEvidence}</Link>
          </article>
        ))}
      </div>
    </section>
  );
}
