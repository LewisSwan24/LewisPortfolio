import type { ReactNode } from "react";
import { LocalizedServerLink as Link } from "@/components/LocalizedServerLink";
import type { CaseStoryCopy } from "@/data/cases/story/types";
import type { CaseTocEntry } from "@/lib/cases/case-toc";

/**
 * v6.6 story-first case page (review rows 01, 02, 03, 04, 09):
 * first screen, problem, three decisions, try it, built and tested,
 * results, then a collapsed appendix for interviewers.
 */

export const STORY_SECTION_IDS = {
  problem: "problem",
  decisions: "design-decisions",
  tryIt: "interactive-demo",
  built: "built",
  outcome: "outcome-limits",
  appendix: "for-interviewers",
} as const;

/** Ids from the long-form layout, mapped to where that content lives now. */
export const STORY_SECTION_ALIASES: Readonly<Record<string, string>> = {
  snapshot: "problem",
  "long-form": "problem",
  "evidence-board": "problem",
  "decision-timeline": "design-decisions",
  "iteration-gallery": "built",
  "interview-takeaway": "outcome-limits",
};

export function storyCopyLabels(isZh: boolean) {
  return isZh
    ? {
        problemLabel: "问题",
        roleLabel: "角色与团队",
        resultLabel: "结果",
        problem: "问题",
        decisions: "三个关键决策",
        tryIt: "亲手试一试",
        built: "做出来与测试",
        outcome: "结果、局限与下一步",
        appendix: "给面试官",
        appendixHint: "过程、研究笔记、丢掉的版本与追问。默认收起，点开查看。",
        conflict: "冲突",
        chosen: "我的选择",
        gaveUp: "放弃了什么",
        evidence: "证据",
        tested: "实际测了什么",
        states: "五种状态",
        colState: "状态",
        colWhat: "发生什么",
        colRecovery: "怎么兜底",
        limits: "局限",
        next: "下一步",
        time: "周期",
        tools: "工具",
        links: "链接",
        journey: "一步步怎么做出来",
        beforeAfter: "改造前后",
        rejected: "我丢掉的版本",
        research: "原始研究笔记",
        hardware: "硬件 3D 模型",
        interview: "面试官常问的问题",
        redTeam: "别人怎么挑战这个设计",
      }
    : {
        problemLabel: "Problem",
        roleLabel: "Role and team",
        resultLabel: "Result",
        problem: "The problem",
        decisions: "Three decisions",
        tryIt: "Try it yourself",
        built: "Built and tested",
        outcome: "Results, limits and next steps",
        appendix: "For interviewers",
        appendixHint: "Process, research notes, rejected versions and hard questions. Collapsed by default.",
        conflict: "The conflict",
        chosen: "What I chose",
        gaveUp: "What I gave up",
        evidence: "Evidence",
        tested: "What was tested",
        states: "Five states",
        colState: "State",
        colWhat: "What happens",
        colRecovery: "How it recovers",
        limits: "Limits",
        next: "Next",
        time: "Timeline",
        tools: "Tools",
        links: "Links",
        journey: "How the work unfolded, stage by stage",
        beforeAfter: "Before and after",
        rejected: "Versions I threw away",
        research: "Raw research notes",
        hardware: "The hardware in 3D",
        interview: "Questions interviewers ask",
        redTeam: "How others have challenged this design",
      };
}

export type StoryLabels = ReturnType<typeof storyCopyLabels>;

export function storyToc(labels: StoryLabels): CaseTocEntry[] {
  return [
    { id: STORY_SECTION_IDS.problem, label: labels.problem },
    { id: STORY_SECTION_IDS.decisions, label: labels.decisions },
    { id: STORY_SECTION_IDS.tryIt, label: labels.tryIt },
    { id: STORY_SECTION_IDS.built, label: labels.built },
    { id: STORY_SECTION_IDS.outcome, label: labels.outcome },
    { id: STORY_SECTION_IDS.appendix, label: labels.appendix },
  ];
}

export function StoryLede({ copy, labels }: { copy: CaseStoryCopy; labels: StoryLabels }) {
  return (
    <div className="cs-story-lede">
      <p className="cs-story-problem" data-story-problem>
        {copy.problem}
      </p>
      <p className="cs-story-result" data-story-result>
        {copy.result}
      </p>
      <p className="cs-story-role" data-story-role>
        {copy.roleLine}
      </p>
    </div>
  );
}

/** Old long-form section ids, kept as empty targets so existing deep links still land. */
function AliasAnchors({ ids }: { ids: readonly string[] }) {
  return (
    <>
      {ids.map((id) => (
        <span key={id} id={id} className="case-anchor" aria-hidden="true" />
      ))}
    </>
  );
}

export function StoryProblem({ copy, labels }: { copy: CaseStoryCopy; labels: StoryLabels }) {
  return (
    <section id={STORY_SECTION_IDS.problem} className="cs-story-section" aria-labelledby="story-problem-h">
      <AliasAnchors ids={["snapshot", "long-form", "evidence-board"]} />
      <h2 id="story-problem-h">{labels.problem}</h2>
      {copy.problemBody.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </section>
  );
}

export function StoryDecisions({ copy, labels }: { copy: CaseStoryCopy; labels: StoryLabels }) {
  return (
    <section
      id={STORY_SECTION_IDS.decisions}
      className="cs-story-section"
      aria-labelledby="story-decisions-h"
    >
      <AliasAnchors ids={["decision-timeline"]} />
      <h2 id="story-decisions-h">{labels.decisions}</h2>
      <ol className="cs-story-decisions">
        {copy.decisions.map((d, i) => (
          <li key={d.id}>
            <article id={d.id} className="cs-story-decision">
              <h3>
                <span className="cs-story-decision-n" aria-hidden="true">
                  {i + 1}
                </span>
                {d.title}
              </h3>
              <p className="cs-story-chosen">{d.chosen}</p>
              <dl className="cs-story-notes">
                <div>
                  <dt>{labels.conflict}</dt>
                  <dd>{d.conflict}</dd>
                </div>
                <div>
                  <dt>{labels.gaveUp}</dt>
                  <dd>{d.gaveUp}</dd>
                </div>
                <div className="cs-story-evidence">
                  <dt>{labels.evidence}</dt>
                  <dd>{d.evidence}</dd>
                </div>
              </dl>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function StoryTryIt({
  copy,
  labels,
  simulator,
  simulatorId,
}: {
  copy: CaseStoryCopy;
  labels: StoryLabels;
  simulator: ReactNode;
  simulatorId?: string;
}) {
  return (
    <section
      id={STORY_SECTION_IDS.tryIt}
      className="cs-story-section"
      aria-labelledby="story-try-h"
      data-simulator-id={simulatorId}
    >
      <h2 id="story-try-h">{labels.tryIt}</h2>
      <p className="cs-story-watch">{copy.watchFor}</p>
      {simulator}
      {copy.tryLinks && copy.tryLinks.length > 0 && (
        <ul className="cs-story-links">
          {copy.tryLinks.map((link) => {
            const external = /^https?:/.test(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="case-text-link"
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export function StoryBuilt({
  copy,
  labels,
  media,
}: {
  copy: CaseStoryCopy;
  labels: StoryLabels;
  media: ReactNode;
}) {
  return (
    <section id={STORY_SECTION_IDS.built} className="cs-story-section" aria-labelledby="story-built-h">
      <AliasAnchors ids={["iteration-gallery"]} />
      <h2 id="story-built-h">{labels.built}</h2>
      {copy.built.body.map((p) => (
        <p key={p}>{p}</p>
      ))}
      {media}
      <h3>{labels.tested}</h3>
      <ul className="cs-story-tested">
        {copy.built.tested.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <div id="state-matrix" className="cs-story-states-wrap">
      <h3>{labels.states}</h3>
      <div className="cs-story-table-scroll">
        <table className="cs-story-states">
          <thead>
            <tr>
              <th scope="col">{labels.colState}</th>
              <th scope="col">{labels.colWhat}</th>
              <th scope="col">{labels.colRecovery}</th>
            </tr>
          </thead>
          <tbody>
            {copy.built.states.map((row) => (
              <tr key={row.state}>
                <th scope="row">{row.state}</th>
                <td>{row.what}</td>
                <td>{row.recovery}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </section>
  );
}

export function StoryOutcome({ copy, labels }: { copy: CaseStoryCopy; labels: StoryLabels }) {
  return (
    <section id={STORY_SECTION_IDS.outcome} className="cs-story-section" aria-labelledby="story-outcome-h">
      <AliasAnchors ids={["interview-takeaway"]} />
      <h2 id="story-outcome-h">{labels.outcome}</h2>
      {copy.outcome.body.map((p) => (
        <p key={p}>{p}</p>
      ))}
      <h3>{labels.limits}</h3>
      {copy.outcome.limits.map((l) => (
        <p key={l.title} className="cs-story-limit">
          {l.title} {l.body}
        </p>
      ))}
      <h3>{labels.next}</h3>
      <p>{copy.outcome.next}</p>
    </section>
  );
}

export function StoryAppendix({
  labels,
  hint,
  children,
}: {
  labels: StoryLabels;
  /** Overrides the default hint when the appendix holds different material. */
  hint?: string;
  children: ReactNode;
}) {
  return (
    <details id={STORY_SECTION_IDS.appendix} className="case-appendix">
      <summary>
        <h2>{labels.appendix}</h2>
        <span className="case-appendix-hint">{hint ?? labels.appendixHint}</span>
      </summary>
      <div className="case-appendix-body">{children}</div>
    </details>
  );
}

export function StoryAppendixGroup({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="case-appendix-group" aria-label={title}>
      <h3>{title}</h3>
      {children}
    </section>
  );
}
