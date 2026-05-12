import Link from "next/link";
import type {
  RoleComparisonBoard,
  RoleComparisonCriterion,
  RoleComparisonDecisionStep,
  RoleComparisonLane,
} from "@/lib/proof";

interface RoleComparisonViewProps {
  board: RoleComparisonBoard;
}

function RoleComparisonCriteria({
  criteria,
}: {
  criteria: RoleComparisonCriterion[];
}) {
  return (
    <section className="role-comparison-section" aria-labelledby="role-comparison-criteria-title">
      <div className="role-comparison-section-head">
        <div>
          <div className="label">Decision frame</div>
          <h2 id="role-comparison-criteria-title">Comparison criteria</h2>
        </div>
        <p>
          Use these checks before opening every proof route. The goal is to choose
          the right lane first, then inspect evidence.
        </p>
      </div>
      <div className="role-comparison-criteria">
        {criteria.map((criterion) => (
          <article className="role-comparison-criterion" key={criterion.id}>
            <span>{criterion.label}</span>
            <p>{criterion.question}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function RoleComparisonLaneCard({ role }: { role: RoleComparisonLane }) {
  return (
    <article className="role-comparison-lane">
      <div className="role-comparison-lane-head">
        <small>{role.id}</small>
        <h3>{role.label}</h3>
        <p>{role.fitThesis}</p>
      </div>

      <dl className="role-comparison-stats">
        <div>
          <dt>Claims</dt>
          <dd>{role.claimCount}</dd>
        </div>
        <div>
          <dt>Anchors</dt>
          <dd>{role.anchorCount}</dd>
        </div>
        <div>
          <dt>Cases</dt>
          <dd>{role.strongestCases.join(", ")}</dd>
        </div>
      </dl>

      <div className="role-comparison-proof">
        <div className="label">Strongest proof</div>
        <h4>{role.strongestProof.claim}</h4>
        <p>{role.strongestProof.evidence}</p>
        <Link href={role.strongestProof.href}>Inspect proof anchor</Link>
      </div>

      <div className="role-comparison-boundary">
        <strong>Boundary</strong>
        <p>{role.strongestProof.boundary}</p>
      </div>

      <div className="role-comparison-question">
        <strong>Interview question</strong>
        <p>{role.interviewQuestion}</p>
      </div>

      <div className="role-comparison-route-actions" aria-label={`${role.id} comparison routes`}>
        <Link
          className="btn btn-ghost"
          href={role.roleRoute}
          aria-label={`Open ${role.id} role room`}
        >
          Role room
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

function RoleComparisonLanes({ roles }: { roles: RoleComparisonLane[] }) {
  return (
    <section
      className="role-comparison-section"
      id="role-comparison-lanes"
      aria-labelledby="role-comparison-lanes-title"
    >
      <div className="role-comparison-section-head">
        <div>
          <div className="label">Role lanes</div>
          <h2 id="role-comparison-lanes-title">Role lanes</h2>
        </div>
        <p>
          Each lane uses the same proof spine: role room, packet, follow-through,
          contact route, and one anchor worth inspecting first.
        </p>
      </div>
      <div className="role-comparison-grid">
        {roles.map((role) => (
          <RoleComparisonLaneCard role={role} key={role.id} />
        ))}
      </div>
    </section>
  );
}

function RoleComparisonDecisionSequence({
  steps,
}: {
  steps: RoleComparisonDecisionStep[];
}) {
  return (
    <section className="role-comparison-section" aria-labelledby="role-comparison-sequence-title">
      <div className="role-comparison-section-head">
        <div>
          <div className="label">Decision sequence</div>
          <h2 id="role-comparison-sequence-title">How to choose</h2>
        </div>
        <p>
          This sequence keeps the reader from over-reading. Pick a lane, inspect
          one anchor, then choose the next route.
        </p>
      </div>
      <ol className="role-comparison-sequence">
        {steps.map((step) => (
          <li className="role-comparison-step" key={step.id}>
            <span>{step.label}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function RoleComparisonView({ board }: RoleComparisonViewProps) {
  return (
    <article className="role-comparison-board container" aria-labelledby="role-comparison-title">
      <header className="role-comparison-hero">
        <div>
          <div className="label">{board.hero.eyebrow}</div>
          <h1 id="role-comparison-title">{board.hero.headline}</h1>
          <p>{board.hero.subhead}</p>
          <div className="role-comparison-actions">
            <Link className="btn btn-primary" href={board.hero.primaryAction.href}>
              {board.hero.primaryAction.label}
            </Link>
            <Link className="btn btn-ghost" href={board.hero.secondaryAction.href}>
              {board.hero.secondaryAction.label}
            </Link>
            <Link className="btn btn-ghost" href={board.hireRoute}>
              Hire room
            </Link>
            <Link className="btn btn-ghost" href="/hire/interview">
              Interview agenda
            </Link>
            <Link className="btn btn-ghost" href="/hire/scorecard">
              Hiring scorecard
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
            <Link className="btn btn-ghost" href="/hire/kickoff">
              Kickoff plan
            </Link>
            <Link className="btn btn-ghost" href="/hire/impact">
              Impact review
            </Link>
            <Link className="btn btn-ghost" href="/hire/growth">
              Growth roadmap
            </Link>
          </div>
        </div>
        <ul className="role-comparison-summary" aria-label="Role comparison summary">
          {board.roles.map((role) => (
            <li key={role.id}>
              <span>{role.label}</span>
              <strong>{role.claimCount} claims</strong>
              <a href={role.strongestProof.href}>First anchor</a>
            </li>
          ))}
        </ul>
      </header>

      <RoleComparisonCriteria criteria={board.criteria} />
      <RoleComparisonLanes roles={board.roles} />
      <RoleComparisonDecisionSequence steps={board.decisionSequence} />

      <section className="role-comparison-close" aria-labelledby="role-comparison-close-title">
        <div>
          <div className="label">Next action</div>
          <h2 id="role-comparison-close-title">{board.close.title}</h2>
          <p>{board.close.body}</p>
        </div>
        <div className="role-comparison-actions">
          <Link className="btn btn-primary" href={board.close.primaryAction.href}>
            {board.close.primaryAction.label}
          </Link>
          <Link className="btn btn-ghost" href={board.close.secondaryAction.href}>
            {board.close.secondaryAction.label}
          </Link>
          <Link className="btn btn-ghost" href={board.reviewRoute}>
            Proof review room
          </Link>
          <Link className="btn btn-ghost" href="/hire/interview">
            Interview agenda
          </Link>
          <Link className="btn btn-ghost" href="/hire/scorecard">
            Hiring scorecard
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
          <Link className="btn btn-ghost" href="/hire/kickoff">
            Kickoff plan
          </Link>
          <Link className="btn btn-ghost" href="/hire/impact">
            Impact review
          </Link>
          <Link className="btn btn-ghost" href="/hire/growth">
            Growth roadmap
          </Link>
        </div>
      </section>
    </article>
  );
}
