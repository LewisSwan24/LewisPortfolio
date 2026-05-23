import Link from "next/link";
import type { FollowThroughBrief, ProofUiLabels } from "@/lib/proof";
import { buildFollowThroughMailto } from "@/lib/proof";
import { CopyEmailButton } from "./CopyEmailButton";

interface FollowThroughViewProps {
  brief: FollowThroughBrief;
  email: string;
  labels: ProofUiLabels;
}

export function FollowThroughView({ brief, email, labels }: FollowThroughViewProps) {
  return (
    <article className="follow-through container" aria-labelledby="follow-through-title">
      <header className="follow-through-hero">
        <div>
          <div className="label">{labels.followThrough}</div>
          <h1 id="follow-through-title">{brief.headline}</h1>
          <p>{brief.summary}</p>
        </div>
        <div className="follow-through-actions" aria-label={labels.followThrough}>
          {brief.actions
            .filter((action) => action.kind === "packet" || action.kind === "role-room")
            .map((action) =>
              action.href ? (
                <Link className="btn btn-ghost" href={action.href} key={action.kind}>
                  {action.label}
                </Link>
              ) : null
            )}
        </div>
      </header>

      <section className="follow-through-section" aria-labelledby="sendable-email-title">
        <h2 id="sendable-email-title">{labels.sendableEmail}</h2>
        <div className="follow-through-email">
          <p>
            <strong>{brief.emailSubject}</strong>
          </p>
          <p>{brief.emailBody}</p>
          <div className="follow-through-actions">
            <CopyEmailButton
              label={labels.copyEmail}
              copiedLabel={labels.copiedEmail}
              subject={brief.emailSubject}
              body={brief.emailBody}
            />
            <a className="btn btn-primary" href={buildFollowThroughMailto(email, brief)}>
              {labels.openMailClient}
            </a>
          </div>
        </div>
      </section>

      <section className="follow-through-section" aria-labelledby="pre-call-evidence-title">
        <h2 id="pre-call-evidence-title">{labels.preCallEvidence}</h2>
        <div className="follow-through-evidence">
          {brief.preCallEvidence.map((item) => (
            <a className="follow-through-evidence-item" href={item.href} key={item.id}>
              <h3>{item.label}</h3>
              <p>{item.reason}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="follow-through-section" aria-labelledby="meeting-agenda-title">
        <h2 id="meeting-agenda-title">{labels.meetingAgenda}</h2>
        <ol className="follow-through-list">
          {brief.meetingAgenda.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>

      <section className="follow-through-section" aria-labelledby="decision-questions-title">
        <h2 id="decision-questions-title">{labels.decisionQuestions}</h2>
        <ul className="follow-through-list">
          {brief.decisionQuestions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="follow-through-section" aria-labelledby="follow-through-boundaries-title">
        <h2 id="follow-through-boundaries-title">{labels.boundaries}</h2>
        <ul className="follow-through-list">
          {brief.boundaries.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </article>
  );
}
