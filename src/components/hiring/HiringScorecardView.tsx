import Link from "next/link";
import type {
  HiringScorecardBoard,
  HiringScorecardCriterion,
  HiringScorecardRole,
} from "@/lib/proof";

interface HiringScorecardViewProps {
  board: HiringScorecardBoard;
}

function HiringScorecardCriteria({
  criteria,
}: {
  criteria: HiringScorecardCriterion[];
}) {
  return (
    <section className="hiring-scorecard-section" aria-labelledby="hiring-scorecard-criteria-title">
      <div className="hiring-scorecard-section-head">
        <div>
          <div className="label">Decision frame</div>
          <h2 id="hiring-scorecard-criteria-title">Score criteria</h2>
        </div>
        <p>
          Score only what the proof can support. Each criterion keeps the shortlist
          decision tied to a role need, evidence anchor, boundary, and next action.
        </p>
      </div>
      <div className="hiring-scorecard-criteria">
        {criteria.map((criterion) => (
          <article className="hiring-scorecard-criterion" key={criterion.id}>
            <span>{criterion.label}</span>
            <p>{criterion.question}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function HiringScorecardRoleCard({ role }: { role: HiringScorecardRole }) {
  return (
    <article className="hiring-scorecard-role">
      <div className="hiring-scorecard-role-head">
        <small>{role.id}</small>
        <h3>{role.label}</h3>
        <p>{role.fitThesis}</p>
      </div>

      <div className="hiring-scorecard-recommendation">
        <strong>Recommendation rule</strong>
        <p>{role.recommendation}</p>
      </div>

      <div className="hiring-scorecard-proof">
        <div className="label">Evidence to score</div>
        <h4>{role.proof.claim}</h4>
        <p>{role.proof.evidence}</p>
        <Link href={role.proof.href}>Inspect proof anchor</Link>
      </div>

      <div className="hiring-scorecard-boundary">
        <strong>Boundary before shortlist</strong>
        <p>{role.proof.boundary}</p>
      </div>

      <div className="hiring-scorecard-prompts">
        <strong>Score prompts</strong>
        <ul>
          {role.scorePrompts.map((prompt) => (
            <li key={prompt}>{prompt}</li>
          ))}
        </ul>
      </div>

      <div className="hiring-scorecard-actions" aria-label={`${role.id} scorecard routes`}>
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

function HiringScorecardRoles({ roles }: { roles: HiringScorecardRole[] }) {
  return (
    <section
      className="hiring-scorecard-section"
      id="hiring-scorecard-roles"
      aria-labelledby="hiring-scorecard-roles-title"
    >
      <div className="hiring-scorecard-section-head">
        <div>
          <div className="label">Role lanes</div>
          <h2 id="hiring-scorecard-roles-title">Role scorecards</h2>
        </div>
        <p>
          Each lane keeps the shortlist decision inspectable: role thesis, proof
          anchor, boundary, prompts, and route actions stay in one place.
        </p>
      </div>
      <div className="hiring-scorecard-role-grid">
        {roles.map((role) => (
          <HiringScorecardRoleCard role={role} key={role.id} />
        ))}
      </div>
    </section>
  );
}

export function HiringScorecardView({ board }: HiringScorecardViewProps) {
  return (
    <article className="hiring-scorecard-board container" aria-labelledby="hiring-scorecard-title">
      <header className="hiring-scorecard-hero">
        <div>
          <div className="label">{board.hero.eyebrow}</div>
          <h1 id="hiring-scorecard-title">{board.hero.headline}</h1>
          <p>{board.hero.subhead}</p>
          <div className="hiring-scorecard-actions">
            <Link className="btn btn-primary" href={board.hero.primaryAction.href}>
              {board.hero.primaryAction.label}
            </Link>
            <Link className="btn btn-ghost" href={board.hero.secondaryAction.href}>
              {board.hero.secondaryAction.label}
            </Link>
            <Link className="btn btn-ghost" href={board.compareRoute}>
              Compare role paths
            </Link>
            <Link className="btn btn-ghost" href={board.reviewRoute}>
              Open proof review
            </Link>
            <Link className="btn btn-ghost" href="/hire/shortlist">
              Shortlist memo
            </Link>
            <Link className="btn btn-ghost" href="/hire/debrief">
              Manager debrief
            </Link>
            <Link className="btn btn-ghost" href="/hire/decision">
              Decision pack
            </Link>
            <Link className="btn btn-ghost" href="/hire/offer">
              Offer readiness
            </Link>
            <Link className="btn btn-ghost" href="/hire/onboarding">
              Onboarding plan
            </Link>
          </div>
        </div>
        <ul className="hiring-scorecard-summary" aria-label="Hiring scorecard role summary">
          {board.roles.map((role) => (
            <li key={role.id}>
              <span>{role.label}</span>
              <strong>{role.id}</strong>
              <a href={role.proof.href}>Proof anchor</a>
            </li>
          ))}
        </ul>
      </header>

      <HiringScorecardCriteria criteria={board.criteria} />
      <HiringScorecardRoles roles={board.roles} />

      <section className="hiring-scorecard-close" aria-labelledby="hiring-scorecard-close-title">
        <div>
          <div className="label">Next action</div>
          <h2 id="hiring-scorecard-close-title">{board.close.title}</h2>
          <p>{board.close.body}</p>
        </div>
        <div className="hiring-scorecard-actions">
          <Link className="btn btn-primary" href={board.close.primaryAction.href}>
            {board.close.primaryAction.label}
          </Link>
          <Link className="btn btn-ghost" href={board.close.secondaryAction.href}>
            {board.close.secondaryAction.label}
          </Link>
          <Link className="btn btn-ghost" href={board.interviewRoute}>
            Interview agenda
          </Link>
          <Link className="btn btn-ghost" href="/hire/shortlist">
            Shortlist memo
          </Link>
          <Link className="btn btn-ghost" href="/hire/debrief">
            Manager debrief
          </Link>
          <Link className="btn btn-ghost" href="/hire/decision">
            Decision pack
          </Link>
          <Link className="btn btn-ghost" href="/hire/offer">
            Offer readiness
          </Link>
          <Link className="btn btn-ghost" href="/hire/onboarding">
            Onboarding plan
          </Link>
        </div>
      </section>
    </article>
  );
}
