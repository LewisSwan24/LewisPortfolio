import Link from "next/link";
import type { CaseInterviewPack as CaseInterviewPackData } from "@/lib/portfolio-proof";
import type { ProofLocale } from "@/lib/proof";
import { localizeInternalHref } from "@/lib/locale-href";

interface CaseInterviewPackProps {
  pack: CaseInterviewPackData;
  locale?: ProofLocale;
}

export function CaseInterviewPack({
  pack,
  locale = "en",
}: CaseInterviewPackProps) {
  const isZh = locale === "zh";
  const answers = [...pack.answers, pack.managerFollowUp];

  return (
    <div className="case-interview-pack">
      <div className="case-interview-pack-head">
        <div className="label">{isZh ? "面试问答" : "Interview pack"}</div>
        <h2>
          {isZh
            ? "我可以用证据回答的问题。"
            : "Questions I can answer with evidence."}
        </h2>
      </div>
      <div className="case-interview-pack-grid">
        {answers.map((answer) => (
          <article className="case-interview-answer" key={answer.id}>
            <h3>{answer.question}</h3>
            <p>{answer.answer}</p>
            <Link href={localizeInternalHref(answer.evidenceHref, locale)}>
              {isZh ? "查看证据" : "Inspect the evidence"}
            </Link>
            <small>{answer.boundary}</small>
          </article>
        ))}
      </div>
    </div>
  );
}
