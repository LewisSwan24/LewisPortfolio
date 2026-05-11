import Link from "next/link";
import type {
  HiringKickoffAlignmentPack,
  HiringKickoffAlignmentRole,
  HiringKickoffAlignmentSummaryItem,
} from "@/lib/proof";

interface HiringKickoffViewProps {
  pack: HiringKickoffAlignmentPack;
}

function HiringKickoffSummary({
  summary,
}: {
  summary: HiringKickoffAlignmentSummaryItem[];
}) {
  return (
    <section className="hiring-kickoff-section" aria-labelledby="hiring-kickoff-summary-title">
      <div className="hiring-kickoff-section-head">
        <div>
          <div className="label">Kickoff frame</div>
          <h2 id="hiring-kickoff-summary-title">Kickoff summary</h2>
        </div>
        <p>
          Keep the first project aligned: proof, project brief, success metric,
          stakeholder question, delivery artifact, and risk guardrail.
        </p>
      </div>
      <div className="hiring-kickoff-summary-grid">
        {summary.map((item) => (
          <article className="hiring-kickoff-summary-item" key={item.id}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function HiringKickoffRoleCard({ role }: { role: HiringKickoffAlignmentRole }) {
  return (
    <article className="hiring-kickoff-role">
      <div className="hiring-kickoff-role-head">
        <small>{role.id}</small>
        <h3>{role.label}</h3>
        <p>{role.kickoffSignal}</p>
      </div>

      <div className="hiring-kickoff-proof">
        <div className="label">Proof before first project</div>
        <h4>{role.proof.claim}</h4>
        <p>{role.proof.evidence}</p>
        <Link href={role.proof.href}>Inspect proof anchor</Link>
      </div>

      <div className="hiring-kickoff-brief">
        <strong>First project brief</strong>
        <p>{role.firstProjectBrief}</p>
      </div>

      <div className="hiring-kickoff-metric">
        <strong>Success metric</strong>
        <p>{role.successMetric}</p>
      </div>

      <div className="hiring-kickoff-question">
        <strong>Stakeholder question</strong>
        <p>{role.stakeholderQuestion}</p>
      </div>

      <div className="hiring-kickoff-artifact">
        <strong>Delivery artifact</strong>
        <p>{role.deliveryArtifact}</p>
      </div>

      <div className="hiring-kickoff-risk">
        <strong>Risk guardrail</strong>
        <p>{role.riskGuardrail}</p>
      </div>

      <div className="hiring-kickoff-next">
        <strong>Next action</strong>
        <p>{role.nextAction}</p>
      </div>

      <div className="hiring-kickoff-actions" aria-label={`${role.id} kickoff routes`}>
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

function HiringKickoffRoles({ roles }: { roles: HiringKickoffAlignmentRole[] }) {
  return (
    <section
      className="hiring-kickoff-section"
      id="hiring-kickoff-roles"
      aria-labelledby="hiring-kickoff-roles-title"
    >
      <div className="hiring-kickoff-section-head">
        <div>
          <div className="label">Role lanes</div>
          <h2 id="hiring-kickoff-roles-title">Role kickoff lanes</h2>
        </div>
        <p>
          Each lane translates onboarding readiness into a scoped first project,
          manager question, delivery artifact, and proof-backed guardrail.
        </p>
      </div>
      <div className="hiring-kickoff-role-grid">
        {roles.map((role) => (
          <HiringKickoffRoleCard role={role} key={role.id} />
        ))}
      </div>
    </section>
  );
}

export function HiringKickoffView({ pack }: HiringKickoffViewProps) {
  return (
    <article className="hiring-kickoff-board container" aria-labelledby="hiring-kickoff-title">
      <header className="hiring-kickoff-hero">
        <div>
          <div className="label">{pack.hero.eyebrow}</div>
          <h1 id="hiring-kickoff-title">{pack.hero.headline}</h1>
          <p>{pack.hero.subhead}</p>
          <div className="hiring-kickoff-actions">
            <Link className="btn btn-primary" href={pack.hero.primaryAction.href}>
              {pack.hero.primaryAction.label}
            </Link>
            <Link className="btn btn-ghost" href={pack.hero.secondaryAction.href}>
              {pack.hero.secondaryAction.label}
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
            <Link className="btn btn-ghost" href="/hire/impact">
              Impact review
            </Link>
          </div>
        </div>
        <ul className="hiring-kickoff-role-summary" aria-label="Hiring kickoff role summary">
          {pack.roles.map((role) => (
            <li key={role.id}>
              <span>{role.label}</span>
              <strong>{role.id}</strong>
              <a href={role.proof.href}>Proof anchor</a>
            </li>
          ))}
        </ul>
      </header>

      <HiringKickoffSummary summary={pack.summary} />
      <HiringKickoffRoles roles={pack.roles} />

      <section className="hiring-kickoff-close" aria-labelledby="hiring-kickoff-close-title">
        <div>
          <div className="label">Next action</div>
          <h2 id="hiring-kickoff-close-title">{pack.close.title}</h2>
          <p>{pack.close.body}</p>
        </div>
        <div className="hiring-kickoff-actions">
          <Link className="btn btn-primary" href={pack.close.primaryAction.href}>
            {pack.close.primaryAction.label}
          </Link>
          <Link className="btn btn-ghost" href={pack.close.secondaryAction.href}>
            {pack.close.secondaryAction.label}
          </Link>
          <Link className="btn btn-ghost" href={pack.reviewRoute}>
            Open proof review
          </Link>
          <Link className="btn btn-ghost" href="/hire/impact">
            Impact review
          </Link>
        </div>
      </section>
    </article>
  );
}
