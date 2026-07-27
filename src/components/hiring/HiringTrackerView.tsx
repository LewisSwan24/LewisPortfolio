import Link from "next/link";
import type {
  HiringFollowUpTrackerArtifact,
  HiringFollowUpTrackerPack,
  HiringFollowUpTrackerRole,
  HiringFollowUpTrackerStage,
  HiringFollowUpTrackerSummaryItem,
} from "@/lib/proof";
import { HiringRouteShelf } from "./HiringRouteShelf";
import { getHiringViewCopy } from "./hiringViewCopy";

interface HiringTrackerViewProps {
  pack: HiringFollowUpTrackerPack;
}

type HiringViewCopy = ReturnType<typeof getHiringViewCopy>;

function HiringTrackerSummary({
  summary,
  copy,
}: {
  summary: HiringFollowUpTrackerSummaryItem[];
  copy: HiringViewCopy;
}) {
  return (
    <section className="hiring-tracker-section" aria-labelledby="hiring-tracker-summary-title">
      <div className="hiring-tracker-section-head">
        <div>
          <div className="label">{copy.tracker.summaryEyebrow}</div>
          <h2 id="hiring-tracker-summary-title">{copy.tracker.summaryTitle}</h2>
        </div>
        <p>{copy.tracker.summaryIntro}</p>
      </div>
      <div className="hiring-tracker-summary-grid">
        {summary.map((item) => (
          <article className="hiring-tracker-summary-item" key={item.id}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function HiringTrackerStages({
  stages,
  copy,
}: {
  stages: HiringFollowUpTrackerStage[];
  copy: HiringViewCopy;
}) {
  return (
    <section
      className="hiring-tracker-section"
      id="hiring-tracker-stages"
      aria-labelledby="hiring-tracker-stages-title"
    >
      <div className="hiring-tracker-section-head">
        <div>
          <div className="label">{copy.tracker.stagesEyebrow}</div>
          <h2 id="hiring-tracker-stages-title">{copy.tracker.stagesTitle}</h2>
        </div>
        <p>{copy.tracker.stagesIntro}</p>
      </div>
      <div className="hiring-tracker-stage-grid">
        {stages.map((stage) => (
          <article className="hiring-tracker-stage" key={stage.id}>
            <small>{stage.label}</small>
            <h3>{stage.title}</h3>
            <dl>
              <div>
                <dt>{copy.tracker.followUpOwner}</dt>
                <dd>{stage.owner}</dd>
              </div>
              <div>
                <dt>{copy.tracker.followUpAction}</dt>
                <dd>{stage.followUpAction}</dd>
              </div>
              <div>
                <dt>{copy.tracker.trackingSignal}</dt>
                <dd>{stage.trackingSignal}</dd>
              </div>
              <div>
                <dt>{copy.closeoutRule}</dt>
                <dd>{stage.closeoutRule}</dd>
              </div>
            </dl>
            <Link className="btn btn-ghost" href={stage.route}>
              {stage.actionLabel}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function HiringTrackerRoleCard({
  role,
  copy,
}: {
  role: HiringFollowUpTrackerRole;
  copy: HiringViewCopy;
}) {
  return (
    <article className="hiring-tracker-role">
      <div className="hiring-tracker-role-head">
        <small>{role.id}</small>
        <h3>{role.label}</h3>
        <p>{role.trackerStatusDetail}</p>
        <strong>{copy.trackerStatus(role.trackerStatus)}</strong>
      </div>

      <div className="hiring-tracker-proof">
        <div className="label">{copy.tracker.proofDependency}</div>
        <h4>{role.proof.claim}</h4>
        <p>{role.proof.evidence}</p>
        <Link href={role.proof.href}>{copy.inspectProofAnchor}</Link>
      </div>

      <div className="hiring-tracker-owner">
        <strong>{copy.tracker.followUpOwner}</strong>
        <p>{role.followUpOwner}</p>
      </div>

      <div className="hiring-tracker-window">
        <strong>{copy.tracker.dueWindow}</strong>
        <p>{role.dueWindow}</p>
      </div>

      <div className="hiring-tracker-dependency">
        <strong>{copy.tracker.evidenceDependency}</strong>
        <p>{role.evidenceDependency}</p>
      </div>

      <div className="hiring-tracker-route">
        <strong>{copy.tracker.routeToReview}</strong>
        <p>{role.routeToReview}</p>
      </div>

      <div className="hiring-tracker-next">
        <strong>{copy.tracker.nextFollowUp}</strong>
        <p>{role.nextFollowUp}</p>
      </div>

      <div className="hiring-tracker-escalation">
        <strong>{copy.tracker.escalationPath}</strong>
        <p>{role.escalationPath}</p>
      </div>

      <div className="hiring-tracker-closeout">
        <strong>{copy.tracker.closeoutSignal}</strong>
        <p>{role.closeoutSignal}</p>
      </div>

      <div className="hiring-tracker-risk">
        <strong>{copy.tracker.followUpRisk}</strong>
        <p>{role.followUpRisk}</p>
      </div>

      <div className="hiring-tracker-actions" aria-label={`${role.id} tracker routes`}>
        <Link
          className="btn btn-ghost"
          href={role.roleRoute}
          aria-label={`Open ${role.id} role room`}
        >
          {copy.role}
        </Link>
        <Link
          className="btn btn-ghost"
          href={role.packetRoute}
          aria-label={`Open ${role.id} packet`}
        >
          {copy.packet}
        </Link>
        <Link
          className="btn btn-ghost"
          href={role.followThroughRoute}
          aria-label={`Open ${role.id} follow-through`}
        >
          {copy.followThrough}
        </Link>
        <Link className="btn btn-ghost" href={role.routeToReview}>
          {copy.reviewRoute}
        </Link>
        <Link
          className="btn btn-primary"
          href={role.contactRoute}
          aria-label={`Contact ${role.id} tracker`}
        >
          {copy.contact}
        </Link>
      </div>
    </article>
  );
}

function HiringTrackerRoles({
  roles,
  copy,
}: {
  roles: HiringFollowUpTrackerRole[];
  copy: HiringViewCopy;
}) {
  return (
    <section
      className="hiring-tracker-section"
      id="hiring-tracker-roles"
      aria-labelledby="hiring-tracker-roles-title"
    >
      <div className="hiring-tracker-section-head">
        <div>
          <div className="label">{copy.tracker.rolesEyebrow}</div>
          <h2 id="hiring-tracker-roles-title">{copy.tracker.rolesTitle}</h2>
        </div>
        <p>{copy.tracker.rolesIntro}</p>
      </div>
      <div className="hiring-tracker-role-grid">
        {roles.map((role) => (
          <HiringTrackerRoleCard copy={copy} role={role} key={role.id} />
        ))}
      </div>
    </section>
  );
}

function HiringTrackerArtifacts({
  artifacts,
  copy,
}: {
  artifacts: HiringFollowUpTrackerArtifact[];
  copy: HiringViewCopy;
}) {
  return (
    <section
      className="hiring-tracker-section"
      aria-labelledby="hiring-tracker-artifacts-title"
    >
      <div className="hiring-tracker-section-head">
        <div>
          <div className="label">{copy.tracker.artifactsEyebrow}</div>
          <h2 id="hiring-tracker-artifacts-title">{copy.tracker.artifactsTitle}</h2>
        </div>
        <p>{copy.tracker.artifactsIntro}</p>
      </div>
      <div className="hiring-tracker-artifact-grid">
        {artifacts.map((artifact) => (
          <article className="hiring-tracker-artifact" key={artifact.id}>
            <small>{artifact.label}</small>
            <h3>{artifact.title}</h3>
            <p>{artifact.body}</p>
            <div className="hiring-tracker-artifact-actions">
              <Link className="btn btn-ghost" href={artifact.route}>
                {artifact.actionLabel}
              </Link>
              <Link className="btn btn-ghost" href={artifact.proofHref}>
                {artifact.proofLabel}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function HiringTrackerView({ pack }: HiringTrackerViewProps) {
  const copy = getHiringViewCopy(pack.locale);

  return (
    <article className="hiring-tracker-board container" aria-labelledby="hiring-tracker-title">
      <header className="hiring-tracker-hero">
        <div>
          <div className="label">{pack.hero.eyebrow}</div>
          <h1 id="hiring-tracker-title">{pack.hero.headline}</h1>
          <p>{pack.hero.subhead}</p>
          <div className="hiring-tracker-actions">
            <Link className="btn btn-primary" href={pack.hero.primaryAction.href}>
              {pack.hero.primaryAction.label}
            </Link>
            <Link className="btn btn-ghost" href={pack.hero.secondaryAction.href}>
              {pack.hero.secondaryAction.label}
            </Link>
            <Link className="btn btn-ghost" href={pack.readinessRoute}>
              {copy.routeLabel(pack.readinessRoute, "Hiring readiness")}
            </Link>
            <Link className="btn btn-ghost" href={pack.briefingRoute}>
              {copy.routeLabel(pack.briefingRoute, "Hiring briefing")}
            </Link>
          </div>
        </div>
        <ul className="hiring-tracker-role-summary" aria-label={copy.roleSummary}>
          {pack.roles.map((role) => (
            <li key={role.id}>
              <span>{role.id}</span>
              <strong>{copy.trackerStatus(role.trackerStatus)}</strong>
              <span>{copy.contactReady}</span>
            </li>
          ))}
        </ul>
      </header>

      <HiringTrackerSummary copy={copy} summary={pack.summary} />
      <HiringTrackerStages copy={copy} stages={pack.stages} />
      <HiringTrackerRoles copy={copy} roles={pack.roles} />
      <HiringTrackerArtifacts artifacts={pack.artifacts} copy={copy} />
      <HiringRouteShelf
        links={[
          { label: "Hiring action", href: pack.actionRoute },
          { label: "Hiring readiness", href: pack.readinessRoute },
          { label: "Hiring briefing", href: pack.briefingRoute },
          { label: "Hiring command", href: pack.commandRoute },
          { label: "Partnership operating", href: pack.partnershipRoute },
          { label: "Retention readiness", href: pack.retentionRoute },
          { label: "Growth roadmap", href: pack.growthRoute },
          { label: "Impact review", href: pack.impactRoute },
          { label: "Kickoff plan", href: pack.kickoffRoute },
          { label: "Onboarding plan", href: pack.onboardingRoute },
          { label: "Offer readiness", href: pack.offerRoute },
          { label: "Decision pack", href: pack.decisionRoute },
          { label: "Manager debrief", href: pack.debriefRoute },
          { label: "Shortlist memo", href: pack.shortlistRoute },
          { label: "Hiring scorecard", href: pack.scorecardRoute },
          { label: "Interview agenda", href: pack.interviewRoute },
          { label: "Compare role paths", href: pack.compareRoute },
          { label: "Open proof review", href: pack.reviewRoute },
        ]}
      />

      <section className="hiring-tracker-close" aria-labelledby="hiring-tracker-close-title">
        <div>
          <div className="label">{copy.closeoutRule}</div>
          <h2 id="hiring-tracker-close-title">{pack.close.title}</h2>
          <p>{pack.close.body}</p>
        </div>
        <div className="hiring-tracker-actions">
          <Link className="btn btn-primary" href={pack.close.primaryAction.href}>
            {pack.close.primaryAction.label}
          </Link>
        </div>
      </section>
    </article>
  );
}
