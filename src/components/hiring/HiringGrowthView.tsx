import Link from "next/link";
import type {
  HiringGrowthRoadmapPack,
  HiringGrowthRoadmapRole,
  HiringGrowthRoadmapSummaryItem,
} from "@/lib/proof";
import { HiringRouteShelf } from "./HiringRouteShelf";

interface HiringGrowthViewProps {
  pack: HiringGrowthRoadmapPack;
}

function HiringGrowthSummary({
  summary,
}: {
  summary: HiringGrowthRoadmapSummaryItem[];
}) {
  return (
    <section className="hiring-growth-section" aria-labelledby="hiring-growth-summary-title">
      <div className="hiring-growth-section-head">
        <div>
          <div className="label">Growth frame</div>
          <h2 id="hiring-growth-summary-title">Growth summary</h2>
        </div>
        <p>
          Extend first-month impact through the same proof chain: 90-day outcome,
          team leverage, capability transfer, operating rhythm, risk to monitor, and next review.
        </p>
      </div>
      <div className="hiring-growth-summary-grid">
        {summary.map((item) => (
          <article className="hiring-growth-summary-item" key={item.id}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function HiringGrowthRoleCard({ role }: { role: HiringGrowthRoadmapRole }) {
  return (
    <article className="hiring-growth-role">
      <div className="hiring-growth-role-head">
        <small>{role.id}</small>
        <h3>{role.label}</h3>
        <p>{role.growthSignal}</p>
      </div>

      <div className="hiring-growth-proof">
        <div className="label">Proof before growth roadmap</div>
        <h4>{role.proof.claim}</h4>
        <p>{role.proof.evidence}</p>
        <Link href={role.proof.href}>Inspect proof anchor</Link>
      </div>

      <div className="hiring-growth-outcome">
        <strong>90-day outcome</strong>
        <p>{role.ninetyDayOutcome}</p>
      </div>

      <div className="hiring-growth-leverage">
        <strong>Team leverage</strong>
        <p>{role.teamLeverage}</p>
      </div>

      <div className="hiring-growth-transfer">
        <strong>Capability transfer</strong>
        <p>{role.capabilityTransfer}</p>
      </div>

      <div className="hiring-growth-rhythm">
        <strong>Operating rhythm</strong>
        <p>{role.operatingRhythm}</p>
      </div>

      <div className="hiring-growth-risk">
        <strong>Risk to monitor</strong>
        <p>{role.riskToMonitor}</p>
      </div>

      <div className="hiring-growth-next">
        <strong>Next review</strong>
        <p>{role.nextReview}</p>
      </div>

      <div className="hiring-growth-actions" aria-label={`${role.id} growth routes`}>
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

function HiringGrowthRoles({ roles }: { roles: HiringGrowthRoadmapRole[] }) {
  return (
    <section
      className="hiring-growth-section"
      id="hiring-growth-roles"
      aria-labelledby="hiring-growth-roles-title"
    >
      <div className="hiring-growth-section-head">
        <div>
          <div className="label">Role lanes</div>
          <h2 id="hiring-growth-roles-title">Role growth lanes</h2>
        </div>
        <p>
          Each lane turns first-month impact into a 90-day growth roadmap: outcome,
          team leverage, capability transfer, operating rhythm, risk, and next review.
        </p>
      </div>
      <div className="hiring-growth-role-grid">
        {roles.map((role) => (
          <HiringGrowthRoleCard role={role} key={role.id} />
        ))}
      </div>
    </section>
  );
}

export function HiringGrowthView({ pack }: HiringGrowthViewProps) {
  return (
    <article className="hiring-growth-board container" aria-labelledby="hiring-growth-title">
      <header className="hiring-growth-hero">
        <div>
          <div className="label">{pack.hero.eyebrow}</div>
          <h1 id="hiring-growth-title">{pack.hero.headline}</h1>
          <p>{pack.hero.subhead}</p>
          <div className="hiring-growth-actions">
            <Link className="btn btn-primary" href={pack.hero.primaryAction.href}>
              {pack.hero.primaryAction.label}
            </Link>
            <Link className="btn btn-ghost" href={pack.hero.secondaryAction.href}>
              {pack.hero.secondaryAction.label}
            </Link>
            <Link className="btn btn-ghost" href={pack.kickoffRoute}>
              Kickoff plan
            </Link>
            <Link className="btn btn-ghost" href={pack.onboardingRoute}>
              Onboarding plan
            </Link>
          </div>
        </div>
        <ul className="hiring-growth-role-summary" aria-label="Hiring growth role summary">
          {pack.roles.map((role) => (
            <li key={role.id}>
              <span>{role.label}</span>
              <strong>{role.id}</strong>
              <span>Proof ready</span>
            </li>
          ))}
        </ul>
      </header>

      <HiringGrowthSummary summary={pack.summary} />
      <HiringGrowthRoles roles={pack.roles} />
      <HiringRouteShelf
        links={[
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
          { label: "Retention readiness", href: "/hire/retention" },
          { label: "Partnership operating", href: "/hire/partnership" },
          { label: "Hiring command", href: "/hire/command" },
          { label: "Hiring briefing", href: "/hire/briefing" },
          { label: "Hiring readiness", href: "/hire/readiness" },
          { label: "Hiring action", href: "/hire/action" },
          { label: "Hiring tracker", href: "/hire/tracker" },
        ]}
      />

      <section className="hiring-growth-close" aria-labelledby="hiring-growth-close-title">
        <div>
          <div className="label">Next action</div>
          <h2 id="hiring-growth-close-title">{pack.close.title}</h2>
          <p>{pack.close.body}</p>
        </div>
        <div className="hiring-growth-actions">
          <Link className="btn btn-primary" href={pack.close.primaryAction.href}>
            {pack.close.primaryAction.label}
          </Link>
        </div>
      </section>
    </article>
  );
}
