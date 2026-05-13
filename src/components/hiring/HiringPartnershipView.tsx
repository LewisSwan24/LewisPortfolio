import Link from "next/link";
import type {
  HiringPartnershipOperatingPack,
  HiringPartnershipOperatingRole,
  HiringPartnershipOperatingSummaryItem,
} from "@/lib/proof";

interface HiringPartnershipViewProps {
  pack: HiringPartnershipOperatingPack;
}

function HiringPartnershipSummary({
  summary,
}: {
  summary: HiringPartnershipOperatingSummaryItem[];
}) {
  return (
    <section className="hiring-partnership-section" aria-labelledby="hiring-partnership-summary-title">
      <div className="hiring-partnership-section-head">
        <div>
          <div className="label">Partnership frame</div>
          <h2 id="hiring-partnership-summary-title">Partnership summary</h2>
        </div>
        <p>
          Convert retention readiness into a working agreement: manager touchpoint,
          team ritual, escalation rule, success review, and next partnership action.
        </p>
      </div>
      <div className="hiring-partnership-summary-grid">
        {summary.map((item) => (
          <article className="hiring-partnership-summary-item" key={item.id}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function HiringPartnershipRoleCard({ role }: { role: HiringPartnershipOperatingRole }) {
  return (
    <article className="hiring-partnership-role">
      <div className="hiring-partnership-role-head">
        <small>{role.id}</small>
        <h3>{role.label}</h3>
        <p>{role.partnershipSignal}</p>
      </div>

      <div className="hiring-partnership-proof">
        <div className="label">Proof before partnership operating</div>
        <h4>{role.proof.claim}</h4>
        <p>{role.proof.evidence}</p>
        <Link href={role.proof.href}>Inspect proof anchor</Link>
      </div>

      <div className="hiring-partnership-agreement">
        <strong>Operating agreement</strong>
        <p>{role.operatingAgreement}</p>
      </div>

      <div className="hiring-partnership-touchpoint">
        <strong>Manager touchpoint</strong>
        <p>{role.managerTouchpoint}</p>
      </div>

      <div className="hiring-partnership-ritual">
        <strong>Team ritual</strong>
        <p>{role.teamRitual}</p>
      </div>

      <div className="hiring-partnership-escalation">
        <strong>Escalation rule</strong>
        <p>{role.escalationRule}</p>
      </div>

      <div className="hiring-partnership-review">
        <strong>Success review</strong>
        <p>{role.successReview}</p>
      </div>

      <div className="hiring-partnership-action">
        <strong>Next partnership action</strong>
        <p>{role.nextPartnershipAction}</p>
      </div>

      <div className="hiring-partnership-actions" aria-label={`${role.id} partnership routes`}>
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
        <Link className="btn btn-ghost" href={role.retentionRoute}>
          Retention
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

function HiringPartnershipRoles({ roles }: { roles: HiringPartnershipOperatingRole[] }) {
  return (
    <section
      className="hiring-partnership-section"
      id="hiring-partnership-roles"
      aria-labelledby="hiring-partnership-roles-title"
    >
      <div className="hiring-partnership-section-head">
        <div>
          <div className="label">Role lanes</div>
          <h2 id="hiring-partnership-roles-title">Role partnership lanes</h2>
        </div>
        <p>
          Each lane turns retention readiness into a working agreement: touchpoint,
          team ritual, escalation rule, success review, and next action.
        </p>
      </div>
      <div className="hiring-partnership-role-grid">
        {roles.map((role) => (
          <HiringPartnershipRoleCard role={role} key={role.id} />
        ))}
      </div>
    </section>
  );
}

export function HiringPartnershipView({ pack }: HiringPartnershipViewProps) {
  return (
    <article className="hiring-partnership-board container" aria-labelledby="hiring-partnership-title">
      <header className="hiring-partnership-hero">
        <div>
          <div className="label">{pack.hero.eyebrow}</div>
          <h1 id="hiring-partnership-title">{pack.hero.headline}</h1>
          <p>{pack.hero.subhead}</p>
          <div className="hiring-partnership-actions">
            <Link className="btn btn-primary" href={pack.hero.primaryAction.href}>
              {pack.hero.primaryAction.label}
            </Link>
            <Link className="btn btn-ghost" href={pack.hero.secondaryAction.href}>
              {pack.hero.secondaryAction.label}
            </Link>
            <Link className="btn btn-ghost" href="/hire/command">
              Hiring command
            </Link>
            <Link className="btn btn-ghost" href="/hire/briefing">
              Hiring briefing
            </Link>
            <Link className="btn btn-ghost" href="/hire/readiness">
              Hiring readiness
            </Link>
            <Link className="btn btn-ghost" href="/hire/action">
              Hiring action
            </Link>
            <Link className="btn btn-ghost" href="/hire/tracker">
              Hiring tracker
            </Link>
            <Link className="btn btn-ghost" href={pack.growthRoute}>
              Growth roadmap
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
          </div>
        </div>
        <ul className="hiring-partnership-role-summary" aria-label="Hiring partnership role summary">
          {pack.roles.map((role) => (
            <li key={role.id}>
              <span>{role.label}</span>
              <strong>{role.id}</strong>
              <a href={role.proof.href}>Proof anchor</a>
            </li>
          ))}
        </ul>
      </header>

      <HiringPartnershipSummary summary={pack.summary} />
      <HiringPartnershipRoles roles={pack.roles} />

      <section className="hiring-partnership-close" aria-labelledby="hiring-partnership-close-title">
        <div>
          <div className="label">Next action</div>
          <h2 id="hiring-partnership-close-title">{pack.close.title}</h2>
          <p>{pack.close.body}</p>
        </div>
        <div className="hiring-partnership-actions">
          <Link className="btn btn-primary" href={pack.close.primaryAction.href}>
            {pack.close.primaryAction.label}
          </Link>
          <Link className="btn btn-ghost" href={pack.close.secondaryAction.href}>
            {pack.close.secondaryAction.label}
          </Link>
          <Link className="btn btn-ghost" href="/hire/command">
            Hiring command
          </Link>
          <Link className="btn btn-ghost" href="/hire/briefing">
            Hiring briefing
          </Link>
          <Link className="btn btn-ghost" href="/hire/readiness">
            Hiring readiness
          </Link>
          <Link className="btn btn-ghost" href="/hire/action">
            Hiring action
          </Link>
          <Link className="btn btn-ghost" href="/hire/tracker">
            Hiring tracker
          </Link>
          <Link className="btn btn-ghost" href={pack.reviewRoute}>
            Open proof review
          </Link>
        </div>
      </section>
    </article>
  );
}
