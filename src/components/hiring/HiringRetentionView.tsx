import Link from "next/link";
import type {
  HiringRetentionReadinessPack,
  HiringRetentionReadinessRole,
  HiringRetentionReadinessSummaryItem,
} from "@/lib/proof";

interface HiringRetentionViewProps {
  pack: HiringRetentionReadinessPack;
}

function HiringRetentionSummary({
  summary,
}: {
  summary: HiringRetentionReadinessSummaryItem[];
}) {
  return (
    <section className="hiring-retention-section" aria-labelledby="hiring-retention-summary-title">
      <div className="hiring-retention-section-head">
        <div>
          <div className="label">Retention frame</div>
          <h2 id="hiring-retention-summary-title">Retention summary</h2>
        </div>
        <p>
          Extend 90-day growth through the same proof chain: long-term fit,
          manager support, team dependency, durability risk, review cadence, and retention question.
        </p>
      </div>
      <div className="hiring-retention-summary-grid">
        {summary.map((item) => (
          <article className="hiring-retention-summary-item" key={item.id}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function HiringRetentionRoleCard({ role }: { role: HiringRetentionReadinessRole }) {
  return (
    <article className="hiring-retention-role">
      <div className="hiring-retention-role-head">
        <small>{role.id}</small>
        <h3>{role.label}</h3>
        <p>{role.retentionSignal}</p>
      </div>

      <div className="hiring-retention-proof">
        <div className="label">Proof before retention readiness</div>
        <h4>{role.proof.claim}</h4>
        <p>{role.proof.evidence}</p>
        <Link href={role.proof.href}>Inspect proof anchor</Link>
      </div>

      <div className="hiring-retention-fit">
        <strong>Long-term fit</strong>
        <p>{role.longTermFit}</p>
      </div>

      <div className="hiring-retention-support">
        <strong>Manager support</strong>
        <p>{role.managerSupport}</p>
      </div>

      <div className="hiring-retention-dependency">
        <strong>Team dependency</strong>
        <p>{role.teamDependency}</p>
      </div>

      <div className="hiring-retention-risk">
        <strong>Durability risk</strong>
        <p>{role.durabilityRisk}</p>
      </div>

      <div className="hiring-retention-cadence">
        <strong>Review cadence</strong>
        <p>{role.reviewCadence}</p>
      </div>

      <div className="hiring-retention-question">
        <strong>Next retention question</strong>
        <p>{role.nextRetentionQuestion}</p>
      </div>

      <div className="hiring-retention-actions" aria-label={`${role.id} retention routes`}>
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
        <Link className="btn btn-ghost" href={role.growthRoute}>
          Growth
        </Link>
        <Link className="btn btn-ghost" href={role.impactRoute}>
          Impact
        </Link>
        <Link className="btn btn-ghost" href={role.kickoffRoute}>
          Kickoff
        </Link>
        <Link className="btn btn-ghost" href={role.onboardingRoute}>
          Onboarding
        </Link>
        <Link className="btn btn-ghost" href={role.offerRoute}>
          Offer
        </Link>
        <Link className="btn btn-ghost" href={role.decisionRoute}>
          Decision
        </Link>
        <Link className="btn btn-ghost" href={role.debriefRoute}>
          Debrief
        </Link>
        <Link className="btn btn-ghost" href={role.shortlistRoute}>
          Shortlist
        </Link>
        <Link className="btn btn-ghost" href={role.scorecardRoute}>
          Scorecard
        </Link>
        <Link className="btn btn-ghost" href={role.interviewRoute}>
          Interview
        </Link>
        <Link className="btn btn-ghost" href={role.compareRoute}>
          Compare
        </Link>
        <Link className="btn btn-ghost" href={role.reviewRoute}>
          Review
        </Link>
        <Link className="btn btn-primary" href={role.contactRoute}>
          Contact
        </Link>
      </div>
    </article>
  );
}

function HiringRetentionRoles({ roles }: { roles: HiringRetentionReadinessRole[] }) {
  return (
    <section
      className="hiring-retention-section"
      id="hiring-retention-roles"
      aria-labelledby="hiring-retention-roles-title"
    >
      <div className="hiring-retention-section-head">
        <div>
          <div className="label">Role lanes</div>
          <h2 id="hiring-retention-roles-title">Role retention lanes</h2>
        </div>
        <p>
          Each lane turns the 90-day roadmap into retention readiness: long-term fit,
          manager support, team dependency, risk, review cadence, and retention question.
        </p>
      </div>
      <div className="hiring-retention-role-grid">
        {roles.map((role) => (
          <HiringRetentionRoleCard role={role} key={role.id} />
        ))}
      </div>
    </section>
  );
}

export function HiringRetentionView({ pack }: HiringRetentionViewProps) {
  return (
    <article className="hiring-retention-board container" aria-labelledby="hiring-retention-title">
      <header className="hiring-retention-hero">
        <div>
          <div className="label">{pack.hero.eyebrow}</div>
          <h1 id="hiring-retention-title">{pack.hero.headline}</h1>
          <p>{pack.hero.subhead}</p>
          <div className="hiring-retention-actions">
            <Link className="btn btn-primary" href={pack.hero.primaryAction.href}>
              {pack.hero.primaryAction.label}
            </Link>
            <Link className="btn btn-ghost" href={pack.hero.secondaryAction.href}>
              {pack.hero.secondaryAction.label}
            </Link>
            <Link className="btn btn-ghost" href={pack.impactRoute}>
              Impact review
            </Link>
            <Link className="btn btn-ghost" href={pack.kickoffRoute}>
              Kickoff plan
            </Link>
            <Link className="btn btn-ghost" href={pack.onboardingRoute}>
              Onboarding plan
            </Link>
            <Link className="btn btn-ghost" href={pack.offerRoute}>
              Offer readiness
            </Link>
            <Link className="btn btn-ghost" href={pack.decisionRoute}>
              Decision pack
            </Link>
            <Link className="btn btn-ghost" href={pack.debriefRoute}>
              Manager debrief
            </Link>
            <Link className="btn btn-ghost" href={pack.shortlistRoute}>
              Shortlist memo
            </Link>
            <Link className="btn btn-ghost" href={pack.scorecardRoute}>
              Hiring scorecard
            </Link>
            <Link className="btn btn-ghost" href={pack.interviewRoute}>
              Interview agenda
            </Link>
            <Link className="btn btn-ghost" href={pack.compareRoute}>
              Compare role paths
            </Link>
            <Link className="btn btn-ghost" href={pack.reviewRoute}>
              Open proof review
            </Link>
            <Link className="btn btn-ghost" href="/hire/partnership">
              Partnership operating
            </Link>
          </div>
        </div>
        <ul className="hiring-retention-role-summary" aria-label="Hiring retention role summary">
          {pack.roles.map((role) => (
            <li key={role.id}>
              <span>{role.label}</span>
              <strong>{role.id}</strong>
              <a href={role.proof.href}>Proof anchor</a>
            </li>
          ))}
        </ul>
      </header>

      <HiringRetentionSummary summary={pack.summary} />
      <HiringRetentionRoles roles={pack.roles} />

      <section className="hiring-retention-close" aria-labelledby="hiring-retention-close-title">
        <div>
          <div className="label">Next action</div>
          <h2 id="hiring-retention-close-title">{pack.close.title}</h2>
          <p>{pack.close.body}</p>
        </div>
        <div className="hiring-retention-actions">
          <Link className="btn btn-primary" href={pack.close.primaryAction.href}>
            {pack.close.primaryAction.label}
          </Link>
          <Link className="btn btn-ghost" href={pack.close.secondaryAction.href}>
            {pack.close.secondaryAction.label}
          </Link>
          <Link className="btn btn-ghost" href={pack.reviewRoute}>
            Open proof review
          </Link>
          <Link className="btn btn-ghost" href="/hire/partnership">
            Partnership operating
          </Link>
        </div>
      </section>
    </article>
  );
}
