import Link from "next/link";
import type {
  HiringPartnershipOperatingPack,
  HiringPartnershipOperatingRole,
  HiringPartnershipOperatingSummaryItem,
} from "@/lib/proof";
import { HiringRouteShelf } from "./HiringRouteShelf";

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
          </div>
        </div>
        <ul className="hiring-partnership-role-summary" aria-label="Hiring partnership role summary">
          {pack.roles.map((role) => (
            <li key={role.id}>
              <span>{role.label}</span>
              <strong>{role.id}</strong>
              <span>Proof ready</span>
            </li>
          ))}
        </ul>
      </header>

      <HiringPartnershipSummary summary={pack.summary} />
      <HiringPartnershipRoles roles={pack.roles} />
      <HiringRouteShelf
        links={[
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
          { label: "Hiring command", href: "/hire/command" },
          { label: "Hiring briefing", href: "/hire/briefing" },
          { label: "Hiring readiness", href: "/hire/readiness" },
          { label: "Hiring action", href: "/hire/action" },
          { label: "Hiring tracker", href: "/hire/tracker" },
        ]}
      />

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
        </div>
      </section>
    </article>
  );
}
