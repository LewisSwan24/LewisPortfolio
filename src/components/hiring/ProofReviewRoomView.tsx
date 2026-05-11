import Link from "next/link";
import type {
  ProofReviewAnchorLedgerItem,
  ProofReviewCommand,
  ProofReviewReadingStep,
  ProofReviewRoleCard,
  ProofReviewRoom,
  ProofReviewSignal,
} from "@/lib/proof";

interface ProofReviewRoomViewProps {
  room: ProofReviewRoom;
}

function statusText(status: ProofReviewSignal["status"]) {
  return status === "ready" ? "Ready" : "Blocked";
}

function ProofReviewSignals({ signals }: { signals: ProofReviewSignal[] }) {
  return (
    <ul className="proof-review-signals" aria-label="Proof readiness signals">
      {signals.map((signal) => (
        <li className="proof-review-signal" data-status={signal.status} key={signal.id}>
          <span>{signal.label}</span>
          <strong>{signal.value}</strong>
          <p>{signal.detail}</p>
          <small>{statusText(signal.status)}</small>
        </li>
      ))}
    </ul>
  );
}

function ProofReviewCommands({ commands }: { commands: ProofReviewCommand[] }) {
  return (
    <section
      className="proof-review-section proof-review-command-section"
      id="proof-review-commands"
      aria-labelledby="proof-review-commands-title"
    >
      <div className="proof-review-section-head">
        <div>
          <div className="label">Release readiness</div>
          <h2 id="proof-review-commands-title">Command checklist</h2>
        </div>
        <p>
          These commands are the proof gates behind this page. They keep the public
          hiring surface tied to current route, anchor, maintenance, and handoff data.
        </p>
      </div>
      <div className="proof-review-command-list">
        {commands.map((command) => (
          <div className="proof-review-command" data-status={command.status} key={command.command}>
            <code>{command.command}</code>
            <strong>{command.label}</strong>
            <p>{command.detail}</p>
            <span>{statusText(command.status)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function RoleReviewCard({ role }: { role: ProofReviewRoleCard }) {
  return (
    <article className="proof-review-role-card">
      <div>
        <small>{role.id}</small>
        <h3>{role.label}</h3>
        <p>{role.fitThesis}</p>
      </div>
      <dl className="proof-review-role-stats">
        <div>
          <dt>Claims</dt>
          <dd>{role.claimCount}</dd>
        </div>
        <div>
          <dt>Anchors</dt>
          <dd>{role.proofAnchorCount}</dd>
        </div>
        <div>
          <dt>Cases</dt>
          <dd>{role.strongestCases.join(", ")}</dd>
        </div>
      </dl>
      <p className="proof-review-role-claim">{role.primaryClaim}</p>
      <div className="proof-review-role-actions" aria-label={`${role.id} review routes`}>
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
          aria-label={`Open ${role.id} application packet`}
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

function ProofReviewRoles({ roles }: { roles: ProofReviewRoleCard[] }) {
  return (
    <section
      className="proof-review-section"
      id="proof-review-roles"
      aria-labelledby="proof-review-roles-title"
    >
      <div className="proof-review-section-head">
        <div>
          <div className="label">Role coverage</div>
          <h2 id="proof-review-roles-title">Role coverage</h2>
        </div>
        <p>
          Each role card connects the same proof spine: role room, application packet,
          follow-through plan, contact route, and strongest case anchors.
        </p>
      </div>
      <div className="proof-review-role-grid">
        {roles.map((role) => (
          <RoleReviewCard role={role} key={role.id} />
        ))}
      </div>
    </section>
  );
}

function ProofReviewAnchorLedger({
  anchors,
}: {
  anchors: ProofReviewAnchorLedgerItem[];
}) {
  return (
    <section
      className="proof-review-section"
      id="proof-review-anchors"
      aria-labelledby="proof-review-anchors-title"
    >
      <div className="proof-review-section-head">
        <div>
          <div className="label">Evidence jumps</div>
          <h2 id="proof-review-anchors-title">Proof anchor ledger</h2>
        </div>
        <p>
          These links jump directly into case evidence. They are the fastest way to
          verify a claim before spending interview time on it.
        </p>
      </div>
      <div className="proof-review-anchor-ledger">
        {anchors.map((anchor) => (
          <a className="proof-review-anchor" href={anchor.href} key={anchor.id}>
            <small>
              {anchor.roleLabel} · {anchor.href}
            </small>
            <h3>{anchor.claim}</h3>
            <p>{anchor.evidence}</p>
            <span>{anchor.boundary}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function ProofReviewReadingSequence({
  steps,
}: {
  steps: ProofReviewReadingStep[];
}) {
  return (
    <section className="proof-review-section" aria-labelledby="proof-review-sequence-title">
      <div className="proof-review-section-head">
        <div>
          <div className="label">How to read</div>
          <h2 id="proof-review-sequence-title">Recruiter reading sequence</h2>
        </div>
        <p>
          The review room is designed for quick triage. Start from readiness, choose
          a role, verify an anchor, then make the interview ask specific.
        </p>
      </div>
      <ol className="proof-review-sequence">
        {steps.map((step) => (
          <li className="proof-review-step" key={step.id}>
            <span>{step.label}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
            <Link href={step.href}>{step.actionLabel}</Link>
          </li>
        ))}
      </ol>
    </section>
  );
}

function ProofReviewBundle({ room }: { room: ProofReviewRoom }) {
  return (
    <section className="proof-review-bundle" aria-labelledby="proof-review-bundle-title">
      <div>
        <div className="label">{room.bundle.label}</div>
        <h2 id="proof-review-bundle-title">Release bundle</h2>
        <p>{room.bundle.summary}</p>
      </div>
      <dl>
        <div>
          <dt>Output directory</dt>
          <dd>{room.bundle.outputDir}</dd>
        </div>
        <div>
          <dt>Markdown handoff</dt>
          <dd>{room.bundle.handoffFilename}</dd>
        </div>
        <div>
          <dt>Manifest</dt>
          <dd>{room.bundle.manifestFilename}</dd>
        </div>
      </dl>
    </section>
  );
}

export function ProofReviewRoomView({ room }: ProofReviewRoomViewProps) {
  return (
    <article className="proof-review-room container" aria-labelledby="proof-review-title">
      <header className="proof-review-hero">
        <div className="proof-review-hero-copy">
          <div className="label">{room.hero.eyebrow}</div>
          <h1 id="proof-review-title">{room.hero.headline}</h1>
          <p>{room.hero.subhead}</p>
          <p className="proof-review-status">{room.hero.status}</p>
          <div className="proof-review-actions">
            <Link className="btn btn-primary" href={room.hero.primaryAction.href}>
              {room.hero.primaryAction.label}
            </Link>
            <Link className="btn btn-ghost" href={room.hero.secondaryAction.href}>
              {room.hero.secondaryAction.label}
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
          </div>
        </div>
        <ProofReviewSignals signals={room.signals} />
      </header>

      <ProofReviewCommands commands={room.commands} />
      <ProofReviewRoles roles={room.roles} />
      <ProofReviewAnchorLedger anchors={room.anchorLedger} />
      <ProofReviewReadingSequence steps={room.readingSequence} />
      <ProofReviewBundle room={room} />

      <section className="proof-review-close" aria-labelledby="proof-review-close-title">
        <div>
          <div className="label">Next action</div>
          <h2 id="proof-review-close-title">{room.close.title}</h2>
          <p>{room.close.body}</p>
        </div>
        <div className="proof-review-actions">
          <Link
            className="btn btn-primary"
            href={room.close.primaryAction.href}
            aria-label={`${room.close.primaryAction.label} after proof review`}
          >
            {room.close.primaryAction.label}
          </Link>
          <Link className="btn btn-ghost" href={room.close.secondaryAction.href}>
            {room.close.secondaryAction.label}
          </Link>
          <Link className="btn btn-ghost" href="/hire/compare">
            Compare role paths
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
        </div>
      </section>
    </article>
  );
}
