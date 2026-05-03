import Link from "next/link";
import type { InterviewDecisionBrief as InterviewDecisionBriefData } from "@/lib/portfolio-proof";

interface InterviewDecisionBriefProps {
  brief: InterviewDecisionBriefData;
}

export function InterviewDecisionBrief({ brief }: InterviewDecisionBriefProps) {
  return (
    <section className="interview-room-hero container" aria-labelledby="interview-room-title">
      <div className="interview-room-hero-copy">
        <div className="label">{brief.eyebrow}</div>
        <h1 id="interview-room-title">{brief.headline}</h1>
        <p>{brief.subhead}</p>
        <p className="interview-room-status">{brief.status}</p>
        <div className="interview-room-actions">
          <Link className="btn btn-primary" href={brief.primaryAction.href}>
            {brief.primaryAction.label}
          </Link>
          <Link className="btn btn-ghost" href={brief.secondaryAction.href}>
            {brief.secondaryAction.label}
          </Link>
        </div>
      </div>
      <div className="interview-room-signal-card" aria-label="Hiring decision signals">
        {brief.signals.map((signal) => (
          <div className="interview-room-signal" key={signal.label}>
            <small>{signal.label}</small>
            <strong>{signal.value}</strong>
            <span>{signal.detail}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
