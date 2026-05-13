import Link from "next/link";
import type {
  HiringDecisionPack,
  HiringDecisionPackRole,
  HiringDecisionPackSummaryItem,
} from "@/lib/proof";
import { HiringRouteShelf } from "./HiringRouteShelf";

interface HiringDecisionViewProps {
  pack: HiringDecisionPack;
}

function HiringDecisionSummary({
  summary,
}: {
  summary: HiringDecisionPackSummaryItem[];
}) {
  return (
    <section className="hiring-decision-section" aria-labelledby="hiring-decision-summary-title">
      <div className="hiring-decision-section-head">
        <div>
          <div className="label">Decision frame</div>
          <h2 id="hiring-decision-summary-title">Decision summary</h2>
        </div>
        <p>
          Keep the final call practical: one lane, one proof anchor, one close
          question, and one explicit remaining risk.
        </p>
      </div>
      <div className="hiring-decision-summary-grid">
        {summary.map((item) => (
          <article className="hiring-decision-summary-item" key={item.id}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function HiringDecisionRoleCard({ role }: { role: HiringDecisionPackRole }) {
  return (
    <article className="hiring-decision-role">
      <div className="hiring-decision-role-head">
        <small>{role.id}</small>
        <h3>{role.label}</h3>
        <p>{role.finalRecommendation}</p>
      </div>

      <div className="hiring-decision-signal">
        <strong>Decision signal</strong>
        <p>{role.decisionSignal}</p>
      </div>

      <div className="hiring-decision-proof">
        <div className="label">Proof to inspect before yes/no</div>
        <h4>{role.proof.claim}</h4>
        <p>{role.proof.evidence}</p>
        <Link href={role.proof.href}>Inspect proof anchor</Link>
      </div>

      <div className="hiring-decision-risk">
        <strong>Remaining risk</strong>
        <p>{role.remainingRisk}</p>
      </div>

      <div className="hiring-decision-question">
        <strong>Close question</strong>
        <p>{role.closeQuestion}</p>
      </div>

      <div className="hiring-decision-next">
        <strong>Next action</strong>
        <p>{role.nextAction}</p>
      </div>

      <div className="hiring-decision-actions" aria-label={`${role.id} decision routes`}>
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

function HiringDecisionRoles({ roles }: { roles: HiringDecisionPackRole[] }) {
  return (
    <section
      className="hiring-decision-section"
      id="hiring-decision-roles"
      aria-labelledby="hiring-decision-roles-title"
    >
      <div className="hiring-decision-section-head">
        <div>
          <div className="label">Role lanes</div>
          <h2 id="hiring-decision-roles-title">Role decision lanes</h2>
        </div>
        <p>
          Each lane keeps the final decision tied to proof, risk, and the next
          route a manager should open.
        </p>
      </div>
      <div className="hiring-decision-role-grid">
        {roles.map((role) => (
          <HiringDecisionRoleCard role={role} key={role.id} />
        ))}
      </div>
    </section>
  );
}

export function HiringDecisionView({ pack }: HiringDecisionViewProps) {
  return (
    <article className="hiring-decision-board container" aria-labelledby="hiring-decision-title">
      <header className="hiring-decision-hero">
        <div>
          <div className="label">{pack.hero.eyebrow}</div>
          <h1 id="hiring-decision-title">{pack.hero.headline}</h1>
          <p>{pack.hero.subhead}</p>
          <div className="hiring-decision-actions">
            <Link className="btn btn-primary" href={pack.hero.primaryAction.href}>
              {pack.hero.primaryAction.label}
            </Link>
            <Link className="btn btn-ghost" href={pack.hero.secondaryAction.href}>
              {pack.hero.secondaryAction.label}
            </Link>
            <Link className="btn btn-ghost" href={pack.shortlistRoute}>
              Shortlist memo
            </Link>
            <Link className="btn btn-ghost" href={pack.scorecardRoute}>
              Hiring scorecard
            </Link>
          </div>
        </div>
        <ul className="hiring-decision-role-summary" aria-label="Hiring decision role summary">
          {pack.roles.map((role) => (
            <li key={role.id}>
              <span>{role.label}</span>
              <strong>{role.id}</strong>
              <span>Proof ready</span>
            </li>
          ))}
        </ul>
      </header>

      <HiringDecisionSummary summary={pack.summary} />
      <HiringDecisionRoles roles={pack.roles} />
      <HiringRouteShelf
        links={[
          { label: "Shortlist memo", href: pack.shortlistRoute },
          { label: "Hiring scorecard", href: pack.scorecardRoute },
          { label: "Interview agenda", href: pack.interviewRoute },
          { label: "Compare role paths", href: pack.compareRoute },
          { label: "Open proof review", href: pack.reviewRoute },
          { label: "Offer readiness", href: "/hire/offer" },
          { label: "Onboarding plan", href: "/hire/onboarding" },
          { label: "Kickoff plan", href: "/hire/kickoff" },
          { label: "Impact review", href: "/hire/impact" },
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

      <section className="hiring-decision-close" aria-labelledby="hiring-decision-close-title">
        <div>
          <div className="label">Next action</div>
          <h2 id="hiring-decision-close-title">{pack.close.title}</h2>
          <p>{pack.close.body}</p>
        </div>
        <div className="hiring-decision-actions">
          <Link className="btn btn-primary" href={pack.close.primaryAction.href}>
            {pack.close.primaryAction.label}
          </Link>
        </div>
      </section>
    </article>
  );
}
