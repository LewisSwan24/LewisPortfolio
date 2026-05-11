import Link from "next/link";
import type {
  HiringImpactReviewPack,
  HiringImpactReviewRole,
  HiringImpactReviewSummaryItem,
} from "@/lib/proof";

interface HiringImpactViewProps {
  pack: HiringImpactReviewPack;
}

function HiringImpactSummary({
  summary,
}: {
  summary: HiringImpactReviewSummaryItem[];
}) {
  return (
    <section className="hiring-impact-section" aria-labelledby="hiring-impact-summary-title">
      <div className="hiring-impact-section-head">
        <div>
          <div className="label">Impact frame</div>
          <h2 id="hiring-impact-summary-title">Impact summary</h2>
        </div>
        <p>
          Review first-month impact through the same proof chain: kickoff metric,
          early evidence, stakeholder checkpoint, delivery review, risk watch, and next milestone.
        </p>
      </div>
      <div className="hiring-impact-summary-grid">
        {summary.map((item) => (
          <article className="hiring-impact-summary-item" key={item.id}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function HiringImpactRoleCard({ role }: { role: HiringImpactReviewRole }) {
  return (
    <article className="hiring-impact-role">
      <div className="hiring-impact-role-head">
        <small>{role.id}</small>
        <h3>{role.label}</h3>
        <p>{role.impactSignal}</p>
      </div>

      <div className="hiring-impact-proof">
        <div className="label">Proof before impact review</div>
        <h4>{role.proof.claim}</h4>
        <p>{role.proof.evidence}</p>
        <Link href={role.proof.href}>Inspect proof anchor</Link>
      </div>

      <div className="hiring-impact-metric">
        <strong>Review metric</strong>
        <p>{role.reviewMetric}</p>
      </div>

      <div className="hiring-impact-evidence">
        <strong>First-month evidence</strong>
        <p>{role.firstMonthEvidence}</p>
      </div>

      <div className="hiring-impact-checkpoint">
        <strong>Stakeholder checkpoint</strong>
        <p>{role.stakeholderCheckpoint}</p>
      </div>

      <div className="hiring-impact-delivery">
        <strong>Delivery review</strong>
        <p>{role.deliveryReview}</p>
      </div>

      <div className="hiring-impact-risk">
        <strong>Risk watch</strong>
        <p>{role.riskWatch}</p>
      </div>

      <div className="hiring-impact-next">
        <strong>Next milestone</strong>
        <p>{role.nextMilestone}</p>
      </div>

      <div className="hiring-impact-actions" aria-label={`${role.id} impact routes`}>
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

function HiringImpactRoles({ roles }: { roles: HiringImpactReviewRole[] }) {
  return (
    <section
      className="hiring-impact-section"
      id="hiring-impact-roles"
      aria-labelledby="hiring-impact-roles-title"
    >
      <div className="hiring-impact-section-head">
        <div>
          <div className="label">Role lanes</div>
          <h2 id="hiring-impact-roles-title">Role impact lanes</h2>
        </div>
        <p>
          Each lane turns kickoff alignment into a first-month review: metric,
          evidence, stakeholder checkpoint, delivery quality, and the next milestone.
        </p>
      </div>
      <div className="hiring-impact-role-grid">
        {roles.map((role) => (
          <HiringImpactRoleCard role={role} key={role.id} />
        ))}
      </div>
    </section>
  );
}

export function HiringImpactView({ pack }: HiringImpactViewProps) {
  return (
    <article className="hiring-impact-board container" aria-labelledby="hiring-impact-title">
      <header className="hiring-impact-hero">
        <div>
          <div className="label">{pack.hero.eyebrow}</div>
          <h1 id="hiring-impact-title">{pack.hero.headline}</h1>
          <p>{pack.hero.subhead}</p>
          <div className="hiring-impact-actions">
            <Link className="btn btn-primary" href={pack.hero.primaryAction.href}>
              {pack.hero.primaryAction.label}
            </Link>
            <Link className="btn btn-ghost" href={pack.hero.secondaryAction.href}>
              {pack.hero.secondaryAction.label}
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
          </div>
        </div>
        <ul className="hiring-impact-role-summary" aria-label="Hiring impact role summary">
          {pack.roles.map((role) => (
            <li key={role.id}>
              <span>{role.label}</span>
              <strong>{role.id}</strong>
              <a href={role.proof.href}>Proof anchor</a>
            </li>
          ))}
        </ul>
      </header>

      <HiringImpactSummary summary={pack.summary} />
      <HiringImpactRoles roles={pack.roles} />

      <section className="hiring-impact-close" aria-labelledby="hiring-impact-close-title">
        <div>
          <div className="label">Next action</div>
          <h2 id="hiring-impact-close-title">{pack.close.title}</h2>
          <p>{pack.close.body}</p>
        </div>
        <div className="hiring-impact-actions">
          <Link className="btn btn-primary" href={pack.close.primaryAction.href}>
            {pack.close.primaryAction.label}
          </Link>
          <Link className="btn btn-ghost" href={pack.close.secondaryAction.href}>
            {pack.close.secondaryAction.label}
          </Link>
          <Link className="btn btn-ghost" href={pack.reviewRoute}>
            Open proof review
          </Link>
        </div>
      </section>
    </article>
  );
}
