import Link from "next/link";
import type { CaseInterviewPack as CaseInterviewPackData } from "@/lib/portfolio-proof";

interface CaseInterviewPackProps {
  pack: CaseInterviewPackData;
}

export function CaseInterviewPack({ pack }: CaseInterviewPackProps) {
  const answers = [...pack.answers, pack.managerFollowUp];

  return (
    <div className="case-interview-pack">
      <div className="case-interview-pack-head">
        <div className="label">Interview pack</div>
        <h2>Questions I can answer with evidence.</h2>
      </div>
      <div className="case-interview-pack-grid">
        {answers.map((answer) => (
          <article className="case-interview-answer" key={answer.id}>
            <h3>{answer.question}</h3>
            <p>{answer.answer}</p>
            <Link href={answer.evidenceHref}>Inspect the evidence</Link>
            <small>{answer.boundary}</small>
          </article>
        ))}
      </div>
    </div>
  );
}
