import type { ProofLocale } from "@/lib/portfolio-proof";

interface CaseSummaryData {
  challenge: string;
  role: string;
  methods: string[];
  evidence: string[];
  outcome: string;
  next: string;
}

export function CaseSummaryBlock({
  locale,
  summary,
}: {
  locale: ProofLocale;
  summary: CaseSummaryData;
}) {
  const isZh = locale === "zh";

  return (
    <>
      <div id="snapshot" className="case-anchor" aria-hidden />
      <div id="interviewer-scan" className="case-anchor" aria-hidden />
      <aside className="case-summary" aria-label={isZh ? "案例摘要" : "Case summary"}>
        <div className="case-summary-head">
          <div className="label">{isZh ? "一句话结论" : "Case summary"}</div>
          <p>{summary.challenge}</p>
        </div>
        <div className="case-summary-grid">
          <div>
            <h3>{isZh ? "我的角色" : "My role"}</h3>
            <p>{summary.role}</p>
          </div>
          <div>
            <h3>{isZh ? "方法" : "Methods"}</h3>
            <ul>
              {summary.methods.map((method) => (
                <li key={method}>{method}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>{isZh ? "证据" : "Evidence collected"}</h3>
            <ul>
              {summary.evidence.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>{isZh ? "结果" : "Outcome"}</h3>
            <p>{summary.outcome}</p>
          </div>
          <div className="case-summary-next">
            <h3>{isZh ? "下一步我会做什么" : "What I would do next"}</h3>
            <p>{summary.next}</p>
          </div>
        </div>
      </aside>
    </>
  );
}
