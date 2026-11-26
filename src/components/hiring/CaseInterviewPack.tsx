import Link from "next/link";
import type { CaseInterviewPack as CaseInterviewPackData } from "@/lib/portfolio-proof";
import type { ProofLocale } from "@/lib/proof";
import { localizeInternalHref } from "@/lib/locale-href";
import { resolveCaseEvidenceLink } from "@/lib/cases/case-toc";

interface CaseInterviewPackProps {
  pack: CaseInterviewPackData;
  locale?: ProofLocale;
  /** The case this pack renders on; its own evidence links become in-page anchors. */
  currentSlug?: string;
  /** Section id to the label the page TOC uses for it. */
  sectionLabels?: Readonly<Record<string, string>>;
  /** Old section ids that now live under another id on this page. */
  sectionAliases?: Readonly<Record<string, string>>;
  /** Inside the case appendix the section sits one level down, under a plainer title. */
  headingLevel?: 2 | 3;
  headingText?: string;
}

export function CaseInterviewPack({
  pack,
  locale = "en",
  currentSlug = "",
  sectionLabels = {},
  sectionAliases = {},
  headingLevel = 2,
  headingText,
}: CaseInterviewPackProps) {
  const HeadingTag = headingLevel === 3 ? "h3" : "h2";
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
        <HeadingTag id="interview-pack-title">
{headingText ?? (isZh
            ? "围绕取舍与验证细节的追问清单。"
            : "Questions I can answer with evidence.")}
</HeadingTag>
      </div>
      <div className="v3-accordion case-interview-accordion">
        {answers.map((answer) => (
          <details className="v3-details case-interview-answer" key={answer.id}>
            <summary>{answer.question}</summary>
            <div className="v3-details-body">
              <p>{answer.answer}</p>
              <div className="case-interview-meta">
                <EvidenceLink
                  link={resolveCaseEvidenceLink(answer.evidenceHref, {
                    currentSlug,
                    sectionLabels,
                    sectionAliases,
                    locale,
                  })}
                  locale={locale}
                />
                <small>{answer.boundary}</small>
              </div>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

function EvidenceLink({
  link,
  locale,
}: {
  link: ReturnType<typeof resolveCaseEvidenceLink>;
  locale: ProofLocale;
}) {
  if (link.inPage) return <a href={link.href}>{link.label}</a>;
  return <Link href={localizeInternalHref(link.href, locale)}>{link.label}</Link>;
}
