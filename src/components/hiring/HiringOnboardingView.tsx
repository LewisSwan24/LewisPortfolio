import Link from "next/link";
import type {
  HiringOnboardingReadinessPack,
  HiringOnboardingReadinessRole,
  HiringOnboardingReadinessSummaryItem,
} from "@/lib/proof";

interface HiringOnboardingViewProps {
  pack: HiringOnboardingReadinessPack;
}

function HiringOnboardingSummary({
  summary,
}: {
  summary: HiringOnboardingReadinessSummaryItem[];
}) {
  return (
    <section className="hiring-onboarding-section" aria-labelledby="hiring-onboarding-summary-title">
      <div className="hiring-onboarding-section-head">
        <div>
          <div className="label">Onboarding frame</div>
          <h2 id="hiring-onboarding-summary-title">Onboarding summary</h2>
        </div>
        <p>
          Keep the post-offer step practical: proof, first-week focus,
          first-30-days outcome, onboarding risk, and one manager question.
        </p>
      </div>
      <div className="hiring-onboarding-summary-grid">
        {summary.map((item) => (
          <article className="hiring-onboarding-summary-item" key={item.id}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function HiringOnboardingRoleCard({ role }: { role: HiringOnboardingReadinessRole }) {
  return (
    <article className="hiring-onboarding-role">
      <div className="hiring-onboarding-role-head">
        <small>{role.id}</small>
        <h3>{role.label}</h3>
        <p>{role.onboardingSignal}</p>
      </div>

      <div className="hiring-onboarding-proof">
        <div className="label">Proof before onboarding</div>
        <h4>{role.proof.claim}</h4>
        <p>{role.proof.evidence}</p>
        <Link href={role.proof.href}>Inspect proof anchor</Link>
      </div>

      <div className="hiring-onboarding-week">
        <strong>First-week focus</strong>
        <p>{role.firstWeekFocus}</p>
      </div>

      <div className="hiring-onboarding-thirty">
        <strong>First 30 days</strong>
        <p>{role.firstThirtyDaysOutcome}</p>
      </div>

      <div className="hiring-onboarding-risk">
        <strong>Onboarding risk</strong>
        <p>{role.onboardingRisk}</p>
      </div>

      <div className="hiring-onboarding-question">
        <strong>Manager question</strong>
        <p>{role.managerQuestion}</p>
      </div>

      <div className="hiring-onboarding-next">
        <strong>Next action</strong>
        <p>{role.nextAction}</p>
      </div>

      <div className="hiring-onboarding-actions" aria-label={`${role.id} onboarding routes`}>
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

function HiringOnboardingRoles({ roles }: { roles: HiringOnboardingReadinessRole[] }) {
  return (
    <section
      className="hiring-onboarding-section"
      id="hiring-onboarding-roles"
      aria-labelledby="hiring-onboarding-roles-title"
    >
      <div className="hiring-onboarding-section-head">
        <div>
          <div className="label">Role lanes</div>
          <h2 id="hiring-onboarding-roles-title">Role onboarding lanes</h2>
        </div>
        <p>
          Each lane translates offer readiness into a first-week focus,
          first-30-days outcome, risk, and manager alignment question.
        </p>
      </div>
      <div className="hiring-onboarding-role-grid">
        {roles.map((role) => (
          <HiringOnboardingRoleCard role={role} key={role.id} />
        ))}
      </div>
    </section>
  );
}

export function HiringOnboardingView({ pack }: HiringOnboardingViewProps) {
  return (
    <article className="hiring-onboarding-board container" aria-labelledby="hiring-onboarding-title">
      <header className="hiring-onboarding-hero">
        <div>
          <div className="label">{pack.hero.eyebrow}</div>
          <h1 id="hiring-onboarding-title">{pack.hero.headline}</h1>
          <p>{pack.hero.subhead}</p>
          <div className="hiring-onboarding-actions">
            <Link className="btn btn-primary" href={pack.hero.primaryAction.href}>
              {pack.hero.primaryAction.label}
            </Link>
            <Link className="btn btn-ghost" href={pack.hero.secondaryAction.href}>
              {pack.hero.secondaryAction.label}
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
            <Link className="btn btn-ghost" href="/hire/kickoff">
              Kickoff plan
            </Link>
            <Link className="btn btn-ghost" href="/hire/impact">
              Impact review
            </Link>
            <Link className="btn btn-ghost" href="/hire/growth">
              Growth roadmap
            </Link>
          </div>
        </div>
        <ul className="hiring-onboarding-role-summary" aria-label="Hiring onboarding role summary">
          {pack.roles.map((role) => (
            <li key={role.id}>
              <span>{role.label}</span>
              <strong>{role.id}</strong>
              <a href={role.proof.href}>Proof anchor</a>
            </li>
          ))}
        </ul>
      </header>

      <HiringOnboardingSummary summary={pack.summary} />
      <HiringOnboardingRoles roles={pack.roles} />

      <section className="hiring-onboarding-close" aria-labelledby="hiring-onboarding-close-title">
        <div>
          <div className="label">Next action</div>
          <h2 id="hiring-onboarding-close-title">{pack.close.title}</h2>
          <p>{pack.close.body}</p>
        </div>
        <div className="hiring-onboarding-actions">
          <Link className="btn btn-primary" href={pack.close.primaryAction.href}>
            {pack.close.primaryAction.label}
          </Link>
          <Link className="btn btn-ghost" href={pack.close.secondaryAction.href}>
            {pack.close.secondaryAction.label}
          </Link>
          <Link className="btn btn-ghost" href={pack.reviewRoute}>
            Open proof review
          </Link>
          <Link className="btn btn-ghost" href="/hire/kickoff">
            Kickoff plan
          </Link>
          <Link className="btn btn-ghost" href="/hire/impact">
            Impact review
          </Link>
          <Link className="btn btn-ghost" href="/hire/growth">
            Growth roadmap
          </Link>
        </div>
      </section>
    </article>
  );
}
