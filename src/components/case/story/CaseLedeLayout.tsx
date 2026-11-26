import { StoryAppendixGroup } from "@/components/case/story/CaseStoryBody";

/**
 * v6.7: the unlisted cases take the v6.6 layout with their copy untouched
 * (Lewis, 2026-11-26: 「只換版面」). Every string here comes from the case
 * summary and depth data the old layout already rendered; only the
 * arrangement changes.
 */

interface CaseSummaryData {
  challenge: string;
  role: string;
  methods: string[];
  evidence: string[];
  outcome: string;
  next: string;
}

interface CaseLimit {
  constraint: string;
  whyItMatters: string;
  nextValidation: string;
}

export function ledeCopyLabels(isZh: boolean) {
  return isZh
    ? {
        appendixHint: "方法、证据、过程与追问。默认收起，点开查看。",
        glance: "方法与证据",
        methods: "方法",
        evidence: "证据",
        next: "下一步我会做什么",
        outcomeLimits: "实证局限与边界",
        nextValidation: "下步验证",
        role: "角色",
        team: "团队",
      }
    : {
        appendixHint: "Methods, evidence, process and hard questions. Collapsed by default.",
        glance: "Methods and evidence",
        methods: "Methods",
        evidence: "Evidence collected",
        next: "What I would do next",
        outcomeLimits: "Outcome limits",
        nextValidation: "Next validation",
        role: "Role",
        team: "Team",
      };
}

export type LedeLabels = ReturnType<typeof ledeCopyLabels>;

/** First screen: the summary's challenge, outcome and role, unlabelled. */
export function SummaryLede({ summary }: { summary: CaseSummaryData }) {
  return (
    <div className="cs-story-lede">
      <p className="cs-story-problem" data-story-problem>
        {summary.challenge}
      </p>
      <p className="cs-story-result" data-story-result>
        {summary.outcome}
      </p>
      <p className="cs-story-role" data-story-role>
        {summary.role}
      </p>
    </div>
  );
}

/** The rest of the old summary box, for the appendix. */
export function SummaryGlance({ summary, labels }: { summary: CaseSummaryData; labels: LedeLabels }) {
  return (
    <StoryAppendixGroup id="snapshot" title={labels.glance}>
      <span id="interviewer-scan" className="case-anchor" aria-hidden="true" />
      <div className="cs-lede-glance">
        <div>
          <h4>{labels.methods}</h4>
          <ul>
            {summary.methods.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>{labels.evidence}</h4>
          <ul>
            {summary.evidence.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>{labels.next}</h4>
          <p>{summary.next}</p>
        </div>
      </div>
    </StoryAppendixGroup>
  );
}

/** Outcome limits as plain prose: title, why it matters, next validation. */
export function PlainLimits({ limits, labels }: { limits: CaseLimit[]; labels: LedeLabels }) {
  return (
    <section
      id="outcome-limits"
      className="cs-story-section case-limits"
      aria-labelledby="lede-limits-h"
    >
      <h2 id="lede-limits-h">{labels.outcomeLimits}</h2>
      {limits.map((limit) => (
        <div key={limit.constraint} className="cs-lede-limit">
          <h3>{limit.constraint}</h3>
          <p>{limit.whyItMatters}</p>
          <p className="cs-lede-limit-next">
            <span>{labels.nextValidation}</span> {limit.nextValidation}
          </p>
        </div>
      ))}
    </section>
  );
}
