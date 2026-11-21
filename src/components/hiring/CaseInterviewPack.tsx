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
    <section
      id="interview-pack"
      className="case-interview-pack container"
      aria-labelledby="interview-pack-title"
    >
      <div className="case-interview-pack-head">
        <div className="label">{isZh ? "面试深入问答" : "Interview pack"}</div>
        <h2 id="interview-pack-title">
          {isZh
            ? "围绕取舍与验证细节的追问清单。"
            : "Questions I can answer with evidence."}
        </h2>
      </div>
      <div className="v3-accordion case-interview-accordion">
        {answers.map((answer) => (
          <details className="v3-details case-interview-answer" key={answer.id}>
            <summary>{answer.question}</summary>
            <div className="v3-details-body">
              <p>{answer.answer}</p>
              <div className="case-interview-meta">
                <Link href={localizeInternalHref(answer.evidenceHref, locale)}>
                  {isZh ? "跳到对应段落 ↗" : "Inspect the evidence ↗"}
                </Link>
                <small>{answer.boundary}</small>
              </div>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
