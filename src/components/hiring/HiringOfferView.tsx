import Link from "next/link";
import type {
  HiringOfferReadinessPack,
  HiringOfferReadinessRole,
  HiringOfferReadinessSummaryItem,
} from "@/lib/proof";

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
            <Link className="btn btn-ghost" href="/hire/onboarding">
              Onboarding plan
            </Link>
            <Link className="btn btn-ghost" href="/hire/kickoff">
              Kickoff plan
            </Link>
          </div>
        </div>
        <ul className="hiring-offer-role-summary" aria-label="Hiring offer role summary">
          {pack.roles.map((role) => (
            <li key={role.id}>
              <span>{role.label}</span>
              <strong>{role.id}</strong>
              <a href={role.proof.href}>Proof anchor</a>
            </li>
          ))}
        </ul>
      </header>

      <HiringOfferSummary summary={pack.summary} />
      <HiringOfferRoles roles={pack.roles} />

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
          <Link className="btn btn-ghost" href={pack.close.secondaryAction.href}>
            {pack.close.secondaryAction.label}
          </Link>
          <Link className="btn btn-ghost" href={pack.reviewRoute}>
            Open proof review
          </Link>
          <Link className="btn btn-ghost" href="/hire/onboarding">
            Onboarding plan
          </Link>
          <Link className="btn btn-ghost" href="/hire/kickoff">
            Kickoff plan
          </Link>
        </div>
      </section>
    </article>
  );
}
