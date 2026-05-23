import Link from "next/link";
import type {
  HiringImpactReviewPack,
  HiringImpactReviewRole,
  HiringImpactReviewSummaryItem,
} from "@/lib/proof";
import { HiringRouteShelf } from "./HiringRouteShelf";

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
          </div>
        </div>
        <ul className="hiring-impact-role-summary" aria-label="Hiring impact role summary">
          {pack.roles.map((role) => (
            <li key={role.id}>
              <span>{role.label}</span>
              <strong>{role.id}</strong>
              <span>Proof ready</span>
            </li>
          ))}
        </ul>
      </header>

      <HiringImpactSummary summary={pack.summary} />
      <HiringImpactRoles roles={pack.roles} />
      <HiringRouteShelf
        links={[
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
          { label: "Growth roadmap", href: "/hire/growth" },
          { label: "Retention readiness", href: "/hire/retention" },
          { label: "Partnership operating", href: "/hire/partnership" },
          { label: "Hiring command", href: "/hire/command" },
          { label: "Hiring briefing", href: "/hire/briefing" },
          { label: "Hiring readiness", href: "/hire/readiness" },
          { label: "Hiring action", href: "/hire/action" },
          { label: "Hiring tracker", href: "/hire/tracker" },
        ]}
      />

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
        </div>
      </section>
    </article>
  );
}
