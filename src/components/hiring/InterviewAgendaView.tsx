import Link from "next/link";
import type {
  InterviewAgendaBoard,
  InterviewAgendaPhase,
  InterviewAgendaRolePrep,
} from "@/lib/proof";
import { HiringRouteShelf } from "./HiringRouteShelf";

interface InterviewAgendaViewProps {
  board: InterviewAgendaBoard;
}

function InterviewAgendaPhases({ phases }: { phases: InterviewAgendaPhase[] }) {
  return (
    <section className="interview-agenda-section" aria-labelledby="interview-agenda-phases-title">
      <div className="interview-agenda-section-head">
        <div>
          <div className="label">Call structure</div>
          <h2 id="interview-agenda-phases-title">Agenda phases</h2>
        </div>
        <p>
          Keep the first call narrow. The agenda starts from role fit, moves into
          one anchor, then validates one boundary.
        </p>
      </div>
      <ol className="interview-agenda-phases">
        {phases.map((phase) => (
          <li className="interview-agenda-phase" key={phase.id}>
            <span>{phase.label}</span>
            <h3>{phase.title}</h3>
            <p>{phase.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function InterviewAgendaRoleCard({ role }: { role: InterviewAgendaRolePrep }) {
  return (
    <article className="interview-agenda-role">
      <div className="interview-agenda-role-head">
        <small>{role.id}</small>
        <h3>{role.label}</h3>
        <p>{role.fitThesis}</p>
      </div>

      <div className="interview-agenda-proof">
        <div className="label">Proof to open first</div>
        <h4>{role.proof.claim}</h4>
        <p>{role.proof.evidence}</p>
        <Link href={role.proof.href}>Inspect proof anchor</Link>
      </div>

      <div className="interview-agenda-question">
        <strong>First question</strong>
        <p>{role.firstQuestion}</p>
      </div>

      <div className="interview-agenda-boundary">
        <strong>Boundary to validate</strong>
        <p>{role.proof.boundary}</p>
      </div>

      <div className="interview-agenda-mini-list">
        <strong>Agenda items</strong>
        <ul>
          {role.agendaItems.slice(0, 3).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="interview-agenda-actions" aria-label={`${role.id} interview routes`}>
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

function InterviewAgendaRolePrep({ roles }: { roles: InterviewAgendaRolePrep[] }) {
  return (
    <section
      className="interview-agenda-section"
      id="interview-agenda-roles"
      aria-labelledby="interview-agenda-roles-title"
    >
      <div className="interview-agenda-section-head">
        <div>
          <div className="label">Role prep</div>
          <h2 id="interview-agenda-roles-title">Role prep</h2>
        </div>
        <p>
          Each prep card names the anchor, question, and boundary that should guide
          the first interview for that role.
        </p>
      </div>
      <div className="interview-agenda-role-grid">
        {roles.map((role) => (
          <InterviewAgendaRoleCard role={role} key={role.id} />
        ))}
      </div>
    </section>
  );
}

export function InterviewAgendaView({ board }: InterviewAgendaViewProps) {
  return (
    <article className="interview-agenda-board container" aria-labelledby="interview-agenda-title">
      <header className="interview-agenda-hero">
        <div>
          <div className="label">{board.hero.eyebrow}</div>
          <h1 id="interview-agenda-title">{board.hero.headline}</h1>
          <p>{board.hero.subhead}</p>
          <div className="interview-agenda-actions">
            <Link className="btn btn-primary" href={board.hero.primaryAction.href}>
              {board.hero.primaryAction.label}
            </Link>
            <Link className="btn btn-ghost" href={board.hero.secondaryAction.href}>
              {board.hero.secondaryAction.label}
            </Link>
            <Link className="btn btn-ghost" href={board.reviewRoute}>
              Proof review room
            </Link>
            <Link className="btn btn-ghost" href="/hire/scorecard">
              Hiring scorecard
            </Link>
          </div>
        </div>
        <ul className="interview-agenda-summary" aria-label="Interview agenda role summary">
          {board.roles.map((role) => (
            <li key={role.id}>
              <span>{role.label}</span>
              <strong>{role.id}</strong>
              <span>Proof ready</span>
            </li>
          ))}
        </ul>
      </header>

      <InterviewAgendaPhases phases={board.agendaPhases} />
      <InterviewAgendaRolePrep roles={board.roles} />
      <HiringRouteShelf
        links={[
          { label: "Proof review room", href: board.reviewRoute },
          { label: "Hiring scorecard", href: "/hire/scorecard" },
          { label: "Shortlist memo", href: "/hire/shortlist" },
          { label: "Manager debrief", href: "/hire/debrief" },
          { label: "Decision pack", href: "/hire/decision" },
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

      <section className="interview-agenda-close" aria-labelledby="interview-agenda-close-title">
        <div>
          <div className="label">Next action</div>
          <h2 id="interview-agenda-close-title">{board.close.title}</h2>
          <p>{board.close.body}</p>
        </div>
        <div className="interview-agenda-actions">
          <Link className="btn btn-primary" href={board.close.primaryAction.href}>
            {board.close.primaryAction.label}
          </Link>
        </div>
      </section>
    </article>
  );
}
