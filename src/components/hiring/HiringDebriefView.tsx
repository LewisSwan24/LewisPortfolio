import Link from "next/link";
import type {
  HiringManagerDebriefBoard,
  HiringManagerDebriefRole,
  HiringManagerDebriefSummaryItem,
} from "@/lib/proof";

interface HiringDebriefViewProps {
  board: HiringManagerDebriefBoard;
}

function HiringDebriefSummary({
  summary,
}: {
  summary: HiringManagerDebriefSummaryItem[];
}) {
  return (
    <section className="hiring-debrief-section" aria-labelledby="hiring-debrief-summary-title">
      <div className="hiring-debrief-section-head">
        <div>
          <div className="label">Debrief frame</div>
          <h2 id="hiring-debrief-summary-title">Debrief summary</h2>
        </div>
        <p>
          Keep the manager handoff concrete: context, proof anchor, second-round
          question, and boundary.
        </p>
      </div>
      <div className="hiring-debrief-summary-grid">
        {summary.map((item) => (
          <article className="hiring-debrief-summary-item" key={item.id}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function HiringDebriefRoleCard({ role }: { role: HiringManagerDebriefRole }) {
  return (
    <article className="hiring-debrief-role">
      <div className="hiring-debrief-role-head">
        <small>{role.id}</small>
        <h3>{role.label}</h3>
        <p>{role.debriefThesis}</p>
      </div>

      <div className="hiring-debrief-manager">
        <strong>Manager brief</strong>
        <p>{role.managerBrief}</p>
      </div>

      <div className="hiring-debrief-proof">
        <div className="label">Proof to open first</div>
        <h4>{role.proof.claim}</h4>
        <p>{role.proof.evidence}</p>
        <Link href={role.proof.href}>Inspect proof anchor</Link>
      </div>

      <div className="hiring-debrief-question">
        <strong>Second-round question</strong>
        <p>{role.secondRoundQuestion}</p>
      </div>

      <div className="hiring-debrief-boundary">
        <strong>Boundary before deeper process</strong>
        <p>{role.proof.boundary}</p>
      </div>

      <div className="hiring-debrief-next">
        <strong>Next action</strong>
        <p>{role.nextAction}</p>
      </div>

      <div className="hiring-debrief-actions" aria-label={`${role.id} debrief routes`}>
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

function HiringDebriefRoles({ roles }: { roles: HiringManagerDebriefRole[] }) {
  return (
    <section
      className="hiring-debrief-section"
      id="hiring-debrief-roles"
      aria-labelledby="hiring-debrief-roles-title"
    >
      <div className="hiring-debrief-section-head">
        <div>
          <div className="label">Role lanes</div>
          <h2 id="hiring-debrief-roles-title">Role debrief lanes</h2>
        </div>
        <p>
          Each lane gives a manager the brief, proof, question, boundary, and
          route actions needed before deeper process.
        </p>
      </div>
      <div className="hiring-debrief-role-grid">
        {roles.map((role) => (
          <HiringDebriefRoleCard role={role} key={role.id} />
        ))}
      </div>
    </section>
  );
}

export function HiringDebriefView({ board }: HiringDebriefViewProps) {
  return (
    <article className="hiring-debrief-board container" aria-labelledby="hiring-debrief-title">
      <header className="hiring-debrief-hero">
        <div>
          <div className="label">{board.hero.eyebrow}</div>
          <h1 id="hiring-debrief-title">{board.hero.headline}</h1>
          <p>{board.hero.subhead}</p>
          <div className="hiring-debrief-actions">
            <Link className="btn btn-primary" href={board.hero.primaryAction.href}>
              {board.hero.primaryAction.label}
            </Link>
            <Link className="btn btn-ghost" href={board.hero.secondaryAction.href}>
              {board.hero.secondaryAction.label}
            </Link>
            <Link className="btn btn-ghost" href={board.scorecardRoute}>
              Hiring scorecard
            </Link>
            <Link className="btn btn-ghost" href={board.interviewRoute}>
              Interview agenda
            </Link>
            <Link className="btn btn-ghost" href={board.compareRoute}>
              Compare role paths
            </Link>
            <Link className="btn btn-ghost" href={board.reviewRoute}>
              Open proof review
            </Link>
            <Link className="btn btn-ghost" href="/hire/decision">
              Decision pack
            </Link>
          </div>
        </div>
        <ul className="hiring-debrief-role-summary" aria-label="Hiring debrief role summary">
          {board.roles.map((role) => (
            <li key={role.id}>
              <span>{role.label}</span>
              <strong>{role.id}</strong>
              <a href={role.proof.href}>Proof anchor</a>
            </li>
          ))}
        </ul>
      </header>

      <HiringDebriefSummary summary={board.summary} />
      <HiringDebriefRoles roles={board.roles} />

      <section className="hiring-debrief-close" aria-labelledby="hiring-debrief-close-title">
        <div>
          <div className="label">Next action</div>
          <h2 id="hiring-debrief-close-title">{board.close.title}</h2>
          <p>{board.close.body}</p>
        </div>
        <div className="hiring-debrief-actions">
          <Link className="btn btn-primary" href={board.close.primaryAction.href}>
            {board.close.primaryAction.label}
          </Link>
          <Link className="btn btn-ghost" href={board.close.secondaryAction.href}>
            {board.close.secondaryAction.label}
          </Link>
          <Link className="btn btn-ghost" href={board.interviewRoute}>
            Interview agenda
          </Link>
          <Link className="btn btn-ghost" href="/hire/decision">
            Decision pack
          </Link>
        </div>
      </section>
    </article>
  );
}
