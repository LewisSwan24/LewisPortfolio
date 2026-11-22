import Link from "next/link";
import { localizeInternalHref } from "@/lib/locale-href";
import type { ProofLocale } from "@/lib/proof";
import type { InterviewDecisionBrief as InterviewDecisionBriefData } from "@/lib/portfolio-proof";
import type { PresentationDeckData } from "@/lib/presentation/build-deck";
import { PresentationTrigger } from "@/components/presentation/PresentationTrigger";

interface InterviewDecisionBriefProps {
  brief: InterviewDecisionBriefData;
  locale?: ProofLocale;
  workLabel?: string;
  presentationDeck?: PresentationDeckData;
}

export function InterviewDecisionBrief({
  brief,
  locale = "en",
  workLabel,
  presentationDeck,
}: InterviewDecisionBriefProps) {
  const projectsText = workLabel ?? (locale === "zh" ? "查看作品" : "Browse work");
  return (
    <section className="interview-room-hero container" aria-labelledby="interview-room-title">
      <div className="v4-editorial-grid" style={{ alignItems: "end" }}>
        <div className="interview-room-hero-copy v4-span-7">
          <div className="label">{brief.eyebrow}</div>
          <h1 id="interview-room-title">{brief.headline}</h1>
          <p>{brief.subhead}</p>
          <p className="interview-room-status">{brief.status}</p>
          <div className="interview-room-actions interview-room-primary-actions">
            <Link className="btn btn-primary" href={localizeInternalHref(brief.primaryAction.href, locale)}>
              {brief.primaryAction.label}
            </Link>
            <Link className="btn btn-ghost" href={localizeInternalHref(brief.secondaryAction.href, locale)}>
              {brief.secondaryAction.label}
            </Link>
            <Link className="btn btn-ghost" href={localizeInternalHref("/projects", locale)}>
              {projectsText}
            </Link>
            {presentationDeck && (
              <PresentationTrigger deck={presentationDeck} locale={locale} />
            )}
          </div>
        </div>
        <div className="interview-room-signal-card v4-span-5" aria-label="Hiring decision signals">
          {brief.signals.map((signal) => (
            <div className="interview-room-signal" key={signal.label}>
              <small>{signal.label}</small>
              <strong>{signal.value}</strong>
              <span>{signal.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
