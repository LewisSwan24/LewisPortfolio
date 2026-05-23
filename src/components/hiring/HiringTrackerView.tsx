import Link from "next/link";
import type {
  HiringFollowUpTrackerArtifact,
  HiringFollowUpTrackerPack,
  HiringFollowUpTrackerRole,
  HiringFollowUpTrackerStage,
  HiringFollowUpTrackerSummaryItem,
} from "@/lib/proof";
import { HiringRouteShelf } from "./HiringRouteShelf";

interface HiringTrackerViewProps {
  pack: HiringFollowUpTrackerPack;
}

function HiringTrackerSummary({
  summary,
}: {
  summary: HiringFollowUpTrackerSummaryItem[];
}) {
  return (
    <section className="hiring-tracker-section" aria-labelledby="hiring-tracker-summary-title">
      <div className="hiring-tracker-section-head">
        <div>
          <div className="label">Tracker frame</div>
          <h2 id="hiring-tracker-summary-title">Tracker summary</h2>
        </div>
        <p>
          Use this tracker after the action board is open and the hiring reader
          needs ownership, due window, dependency, escalation, and closeout in
          one place.
        </p>
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
}: {
  stages: HiringFollowUpTrackerStage[];
}) {
  return (
    <section
      className="hiring-tracker-section"
      id="hiring-tracker-stages"
      aria-labelledby="hiring-tracker-stages-title"
    >
      <div className="hiring-tracker-section-head">
        <div>
          <div className="label">Follow-up sequence</div>
          <h2 id="hiring-tracker-stages-title">Follow-up stages</h2>
        </div>
        <p>
          Each stage names the owner, follow-up action, tracking signal, route,
          and closeout rule so the lane does not stay unowned.
        </p>
      </div>
      <div className="hiring-tracker-stage-grid">
        {stages.map((stage) => (
          <article className="hiring-tracker-stage" key={stage.id}>
            <small>{stage.label}</small>
            <h3>{stage.title}</h3>
            <dl>
              <div>
                <dt>Owner</dt>
                <dd>{stage.owner}</dd>
              </div>
              <div>
                <dt>Follow-up action</dt>
                <dd>{stage.followUpAction}</dd>
              </div>
              <div>
                <dt>Tracking signal</dt>
                <dd>{stage.trackingSignal}</dd>
              </div>
              <div>
                <dt>Closeout rule</dt>
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

function HiringTrackerRoleCard({ role }: { role: HiringFollowUpTrackerRole }) {
  return (
    <article className="hiring-tracker-role">
      <div className="hiring-tracker-role-head">
        <small>{role.id}</small>
        <h3>{role.label}</h3>
        <p>{role.trackerStatusDetail}</p>
        <strong>{role.trackerStatus}</strong>
      </div>

      <div className="hiring-tracker-proof">
        <div className="label">Proof dependency</div>
        <h4>{role.proof.claim}</h4>
        <p>{role.proof.evidence}</p>
        <Link href={role.proof.href}>Inspect proof anchor</Link>
      </div>

      <div className="hiring-tracker-owner">
        <strong>Follow-up owner</strong>
        <p>{role.followUpOwner}</p>
      </div>

      <div className="hiring-tracker-window">
        <strong>Due window</strong>
        <p>{role.dueWindow}</p>
      </div>

      <div className="hiring-tracker-dependency">
        <strong>Evidence dependency</strong>
        <p>{role.evidenceDependency}</p>
      </div>

      <div className="hiring-tracker-route">
        <strong>Route to review</strong>
        <p>{role.routeToReview}</p>
      </div>

      <div className="hiring-tracker-next">
        <strong>Next follow-up</strong>
        <p>{role.nextFollowUp}</p>
      </div>

      <div className="hiring-tracker-escalation">
        <strong>Escalation path</strong>
        <p>{role.escalationPath}</p>
      </div>

      <div className="hiring-tracker-closeout">
        <strong>Closeout signal</strong>
        <p>{role.closeoutSignal}</p>
      </div>

      <div className="hiring-tracker-risk">
        <strong>Follow-up risk</strong>
        <p>{role.followUpRisk}</p>
      </div>

      <div className="hiring-tracker-actions" aria-label={`${role.id} tracker routes`}>
        <Link
          className="btn btn-ghost"
          href={role.roleRoute}
          aria-label={`Open ${role.id} role room`}
        >
          Role
        </Link>
        <Link
          className="btn btn-ghost"
          href={role.packetRoute}
          aria-label={`Open ${role.id} packet`}
        >
          Packet
        </Link>
        <Link
          className="btn btn-ghost"
          href={role.followThroughRoute}
          aria-label={`Open ${role.id} follow-through`}
        >
          Follow-through
        </Link>
        <Link className="btn btn-ghost" href={role.routeToReview}>
          Review route
        </Link>
        <Link
          className="btn btn-primary"
          href={role.contactRoute}
          aria-label={`Contact ${role.id} tracker`}
        >
          Contact
        </Link>
      </div>
    </article>
  );
}

function HiringTrackerRoles({ roles }: { roles: HiringFollowUpTrackerRole[] }) {
  return (
    <section
      className="hiring-tracker-section"
      id="hiring-tracker-roles"
      aria-labelledby="hiring-tracker-roles-title"
    >
      <div className="hiring-tracker-section-head">
        <div>
          <div className="label">Role lanes</div>
          <h2 id="hiring-tracker-roles-title">Role tracker lanes</h2>
        </div>
        <p>
          Each lane turns action state into a visible owner, due window,
          dependency, escalation path, closeout signal, and proof anchor.
        </p>
      </div>
      <div className="hiring-tracker-role-grid">
        {roles.map((role) => (
          <HiringTrackerRoleCard role={role} key={role.id} />
        ))}
      </div>
    </section>
  );
}

function HiringTrackerArtifacts({
  artifacts,
}: {
  artifacts: HiringFollowUpTrackerArtifact[];
}) {
  return (
    <section
      className="hiring-tracker-section"
      aria-labelledby="hiring-tracker-artifacts-title"
    >
      <div className="hiring-tracker-section-head">
        <div>
          <div className="label">Reusable follow-ups</div>
          <h2 id="hiring-tracker-artifacts-title">Tracker artifacts</h2>
        </div>
        <p>
          These artifacts package owner, dependency, escalation, and closeout
          notes so follow-up is auditable instead of implied.
        </p>
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
              Hiring readiness
            </Link>
            <Link className="btn btn-ghost" href={pack.briefingRoute}>
              Hiring briefing
            </Link>
          </div>
        </div>
        <ul className="hiring-tracker-role-summary" aria-label="Tracked role statuses">
          {pack.roles.map((role) => (
            <li key={role.id}>
              <span>{role.id}</span>
              <strong>{role.trackerStatus}</strong>
              <span>Contact ready</span>
            </li>
          ))}
        </ul>
      </header>

      <HiringTrackerSummary summary={pack.summary} />
      <HiringTrackerStages stages={pack.stages} />
      <HiringTrackerRoles roles={pack.roles} />
      <HiringTrackerArtifacts artifacts={pack.artifacts} />
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
          <div className="label">Closeout rule</div>
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
