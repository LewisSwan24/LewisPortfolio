import type { CaseNarrativeCopy } from "@/lib/cases/schema";
import type { CurrentProjectSlug } from "@/lib/project-routes";

export function CaseNarrative({
  slug,
  narrative,
  impactLabel,
  isZh,
}: {
  slug: CurrentProjectSlug;
  narrative: CaseNarrativeCopy;
  impactLabel: string;
  isZh: boolean;
}) {
  const methods = [narrative.re.m1, narrative.re.m2, narrative.re.m3];
  const metrics = [narrative.ou.m1, narrative.ou.m2, narrative.ou.m3];

  return (
    <>
      <div className="cs-section">
        <div className="cs-row">
          <div className="cs-row-side">
            <div className="label">{narrative.ch.label}</div>
          </div>
          <div className="cs-row-body">
            <h2>{narrative.ch.title}</h2>
            <p className="prose">{narrative.ch.p}</p>
          </div>
        </div>
      </div>

      <div id="evidence-board" className="case-anchor" aria-hidden />
      <div className="cs-section">
        <div className="cs-row">
          <div className="cs-row-side">
            <div className="label">{narrative.re.label}</div>
          </div>
          <div className="cs-row-body">
            <h2>{narrative.re.title}</h2>
            <div className="cs-method-grid">
              {methods.map((method, idx) => (
                <div key={idx}>
                  <h5>{method.t}</h5>
                  <p>{method.b}</p>
                </div>
              ))}
            </div>
            {narrative.re.quote && (
              <div className="quote" style={{ marginTop: 32, maxWidth: "36em" }}>
                <p>{narrative.re.quote}</p>
                {narrative.re.quoteWho && <cite>— {narrative.re.quoteWho}</cite>}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="cs-section">
        <div className="cs-row">
          <div className="cs-row-side">
            <div className="label">{narrative.sy.label}</div>
          </div>
          <div className="cs-row-body">
            <h2>{narrative.sy.title}</h2>
            <p className="prose">{narrative.sy.p}</p>
            {slug === "connect" && (
              <div className="cs-tree">
                <div>
                  <h6>{isZh ? "假设 · 进场之前" : "Assumed · before fieldwork"}</h6>
                  <ul>
                    <li className="ko">
                      {isZh ? "语言能力是障碍" : "Language proficiency is the barrier"}
                    </li>
                    <li className="ko">{isZh ? "缺口在曝光" : "The gap is exposure"}</li>
                    <li className="ko">
                      {isZh ? "迎新活动本身能建立连接" : "Mixers build connections"}
                    </li>
                    <li className="ko">
                      {isZh ? "给一个契合度分数就够了" : "A match score is enough"}
                    </li>
                  </ul>
                </div>
                <div>
                  <h6>{isZh ? "发现 · 71 份记录之后" : "Found · after 71 sessions"}</h6>
                  <ul>
                    <li className="ok">
                      {isZh ? "障碍是节奏与人数规模" : "Pace and group size"}
                    </li>
                    <li className="ok">{isZh ? "缺口在跟进" : "The gap is follow-through"}</li>
                    <li className="ok">
                      {isZh ? "重复 + 共同任务才留得住" : "Repetition plus a shared task"}
                    </li>
                    <li className="ok">
                      {isZh ? "匹配必须说明理由" : "A match has to say why"}
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div id="decision-timeline" className="case-anchor" aria-hidden />
      <div className="cs-section">
        <div className="cs-row">
          <div className="cs-row-side">
            <div className="label">{narrative.id.label}</div>
          </div>
          <div className="cs-row-body">
            <p className="prose">{narrative.id.p}</p>
          </div>
        </div>
      </div>

      <div className="cs-section">
        <div className="cs-row">
          <div className="cs-row-side">
            <div className="label">{narrative.pr.label}</div>
          </div>
          <div className="cs-row-body">
            <p className="prose">{narrative.pr.p}</p>
          </div>
        </div>
      </div>

      <div id="iteration-gallery" className="case-anchor" aria-hidden />
      <div className="cs-section">
        <div className="cs-row">
          <div className="cs-row-side">
            <div className="label">{narrative.te.label}</div>
          </div>
          <div className="cs-row-body">
            <p className="prose">{narrative.te.p}</p>
          </div>
        </div>
      </div>

      <div className="cs-section">
        <div className="cs-row">
          <div className="cs-row-side">
            <div className="label">{narrative.ou.label}</div>
          </div>
          <div className="cs-row-body">
            <div className="cs-impact" role="figure" aria-label={impactLabel}>
              <div className="cs-impact-eyebrow">{impactLabel}</div>
              <p className="cs-impact-headline">
                <span className="cs-impact-num">{narrative.ou.m1.v}</span>
                <span className="cs-impact-label">{narrative.ou.m1.label}</span>
              </p>
            </div>
            <dl className="cs-metrics">
              {metrics.map((metric, idx) => {
                const parts = metric.v.split("→");
                return (
                  <div key={idx}>
                    <dt>{metric.label}</dt>
                    <dd>
                      {parts[0]}
                      {parts.length > 1 && <em>→</em>}
                      {parts.slice(1).join("→")}
                    </dd>
                  </div>
                );
              })}
            </dl>
            <p className="prose">{narrative.ou.p}</p>
          </div>
        </div>
      </div>

      <div id="interview-takeaway" className="case-anchor" aria-hidden />
      <div className="cs-section">
        <div className="cs-row">
          <div className="cs-row-side">
            <div className="label">{narrative.rf.label}</div>
          </div>
          <div className="cs-row-body">
            <p className="prose">{narrative.rf.p}</p>
          </div>
        </div>
      </div>
    </>
  );
}
