import Link from "next/link";
import type {
  HiringRetentionReadinessPack,
  HiringRetentionReadinessRole,
  HiringRetentionReadinessSummaryItem,
} from "@/lib/proof";
import { HiringRouteShelf } from "./HiringRouteShelf";

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
          </div>
        </div>
        <ul className="hiring-retention-role-summary" aria-label="Hiring retention role summary">
          {pack.roles.map((role) => (
            <li key={role.id}>
              <span>{role.label}</span>
              <strong>{role.id}</strong>
              <span>Proof ready</span>
            </li>
          ))}
        </ul>
      </header>

      <HiringRetentionSummary summary={pack.summary} />
      <HiringRetentionRoles roles={pack.roles} />
      <HiringRouteShelf
        links={[
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
          { label: "Partnership operating", href: "/hire/partnership" },
          { label: "Hiring command", href: "/hire/command" },
          { label: "Hiring briefing", href: "/hire/briefing" },
          { label: "Hiring readiness", href: "/hire/readiness" },
          { label: "Hiring action", href: "/hire/action" },
          { label: "Hiring tracker", href: "/hire/tracker" },
        ]}
      />

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
        </div>
      </section>
    </article>
  );
}
