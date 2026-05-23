import Link from "next/link";
import type {
  HiringOfferReadinessPack,
  HiringOfferReadinessRole,
  HiringOfferReadinessSummaryItem,
} from "@/lib/proof";
import { HiringRouteShelf } from "./HiringRouteShelf";

interface HiringOfferViewProps {
  pack: HiringOfferReadinessPack;
}

function HiringOfferSummary({
  summary,
}: {
  summary: HiringOfferReadinessSummaryItem[];
}) {
  return (
    <section className="hiring-offer-section" aria-labelledby="hiring-offer-summary-title">
      <div className="hiring-offer-section-head">
        <div>
          <div className="label">Offer frame</div>
          <h2 id="hiring-offer-summary-title">Offer summary</h2>
        </div>
        <p>
          Keep the final step concrete: proof, final validation, onboarding focus,
          readiness question, and one route for contact.
        </p>
      </div>
      <div className="hiring-offer-summary-grid">
        {summary.map((item) => (
          <article className="hiring-offer-summary-item" key={item.id}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function HiringOfferRoleCard({ role }: { role: HiringOfferReadinessRole }) {
  return (
    <article className="hiring-offer-role">
      <div className="hiring-offer-role-head">
        <small>{role.id}</small>
        <h3>{role.label}</h3>
        <p>{role.offerSignal}</p>
      </div>

      <div className="hiring-offer-proof">
        <div className="label">Proof before offer conversation</div>
        <h4>{role.proof.claim}</h4>
        <p>{role.proof.evidence}</p>
        <Link href={role.proof.href}>Inspect proof anchor</Link>
      </div>

      <div className="hiring-offer-validation">
        <strong>Final validation</strong>
        <p>{role.validationNote}</p>
      </div>

      <div className="hiring-offer-onboarding">
        <strong>Onboarding focus</strong>
        <p>{role.onboardingFocus}</p>
      </div>

      <div className="hiring-offer-question">
        <strong>Readiness question</strong>
        <p>{role.readinessQuestion}</p>
      </div>

      <div className="hiring-offer-next">
        <strong>Next action</strong>
        <p>{role.nextAction}</p>
      </div>

      <div className="hiring-offer-actions" aria-label={`${role.id} offer routes`}>
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

function HiringOfferRoles({ roles }: { roles: HiringOfferReadinessRole[] }) {
  return (
    <section
      className="hiring-offer-section"
      id="hiring-offer-roles"
      aria-labelledby="hiring-offer-roles-title"
    >
      <div className="hiring-offer-section-head">
        <div>
          <div className="label">Role lanes</div>
          <h2 id="hiring-offer-roles-title">Role offer lanes</h2>
        </div>
        <p>
          Each lane translates the final decision into offer-readiness evidence,
          validation, and first-work focus.
        </p>
      </div>
      <div className="hiring-offer-role-grid">
        {roles.map((role) => (
          <HiringOfferRoleCard role={role} key={role.id} />
        ))}
      </div>
    </section>
  );
}

export function HiringOfferView({ pack }: HiringOfferViewProps) {
  return (
    <article className="hiring-offer-board container" aria-labelledby="hiring-offer-title">
      <header className="hiring-offer-hero">
        <div>
          <div className="label">{pack.hero.eyebrow}</div>
          <h1 id="hiring-offer-title">{pack.hero.headline}</h1>
          <p>{pack.hero.subhead}</p>
          <div className="hiring-offer-actions">
            <Link className="btn btn-primary" href={pack.hero.primaryAction.href}>
              {pack.hero.primaryAction.label}
            </Link>
            <Link className="btn btn-ghost" href={pack.hero.secondaryAction.href}>
              {pack.hero.secondaryAction.label}
            </Link>
            <Link className="btn btn-ghost" href={pack.debriefRoute}>
              Manager debrief
            </Link>
            <Link className="btn btn-ghost" href={pack.shortlistRoute}>
              Shortlist memo
            </Link>
          </div>
        </div>
        <ul className="hiring-offer-role-summary" aria-label="Hiring offer role summary">
          {pack.roles.map((role) => (
            <li key={role.id}>
              <span>{role.label}</span>
              <strong>{role.id}</strong>
              <span>Proof ready</span>
            </li>
          ))}
        </ul>
      </header>

      <HiringOfferSummary summary={pack.summary} />
      <HiringOfferRoles roles={pack.roles} />
      <HiringRouteShelf
        links={[
          { label: "Decision pack", href: pack.decisionRoute },
          { label: "Manager debrief", href: pack.debriefRoute },
          { label: "Shortlist memo", href: pack.shortlistRoute },
          { label: "Hiring scorecard", href: pack.scorecardRoute },
          { label: "Interview agenda", href: pack.interviewRoute },
          { label: "Compare role paths", href: pack.compareRoute },
          { label: "Open proof review", href: pack.reviewRoute },
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

      <section className="hiring-offer-close" aria-labelledby="hiring-offer-close-title">
        <div>
          <div className="label">Next action</div>
          <h2 id="hiring-offer-close-title">{pack.close.title}</h2>
          <p>{pack.close.body}</p>
        </div>
        <div className="hiring-offer-actions">
          <Link className="btn btn-primary" href={pack.close.primaryAction.href}>
            {pack.close.primaryAction.label}
          </Link>
        </div>
      </section>
    </article>
  );
}
