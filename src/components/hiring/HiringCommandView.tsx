import Link from "next/link";
import type {
  HiringCommandCenterCheckpoint,
  HiringCommandCenterPack,
  HiringCommandCenterRole,
  HiringCommandCenterSequenceStep,
  HiringCommandCenterSummaryItem,
} from "@/lib/proof";
import { HiringRouteShelf } from "./HiringRouteShelf";

interface HiringCommandViewProps {
  pack: HiringCommandCenterPack;
}

function HiringCommandSummary({
  summary,
}: {
  summary: HiringCommandCenterSummaryItem[];
}) {
  return (
    <section className="hiring-command-section" aria-labelledby="hiring-command-summary-title">
      <div className="hiring-command-section-head">
        <div>
          <div className="label">Command frame</div>
          <h2 id="hiring-command-summary-title">Command summary</h2>
        </div>
        <p>
          Use one board to choose a proof route, inspect a role lane, and keep
          the same evidence signal alive from review through partnership.
        </p>
      </div>
      <div className="hiring-command-summary-grid">
        {summary.map((item) => (
          <article className="hiring-command-summary-item" key={item.id}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function HiringCommandSequence({
  sequence,
}: {
  sequence: HiringCommandCenterSequenceStep[];
}) {
  return (
    <section
      className="hiring-command-section"
      id="hiring-command-sequence"
      aria-labelledby="hiring-command-sequence-title"
    >
      <div className="hiring-command-section-head">
        <div>
          <div className="label">Route order</div>
          <h2 id="hiring-command-sequence-title">Command sequence</h2>
        </div>
        <p>
          Each step names the manager question, proof focus, completion signal,
          and route to open when that moment is the real blocker.
        </p>
      </div>
      <div className="hiring-command-sequence-grid">
        {sequence.map((step, index) => (
          <article className="hiring-command-step" key={step.id}>
            <small>{String(index + 1).padStart(2, "0")}</small>
            <h3>{step.label}</h3>
            <dl>
              <div>
                <dt>Manager question</dt>
                <dd>{step.managerQuestion}</dd>
              </div>
              <div>
                <dt>Proof focus</dt>
                <dd>{step.proofFocus}</dd>
              </div>
              <div>
                <dt>Completion signal</dt>
                <dd>{step.completionSignal}</dd>
              </div>
            </dl>
            <Link className="btn btn-ghost" href={step.route}>
              {step.actionLabel}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function HiringCommandRoleCard({ role }: { role: HiringCommandCenterRole }) {
  return (
    <article className="hiring-command-role">
      <div className="hiring-command-role-head">
        <small>{role.id}</small>
        <h3>{role.label}</h3>
        <p>{role.currentSignal}</p>
      </div>

      <div className="hiring-command-proof">
        <div className="label">Proof before command action</div>
        <h4>{role.proof.claim}</h4>
        <p>{role.proof.evidence}</p>
        <Link href={role.proof.href}>Inspect proof anchor</Link>
      </div>

      <div className="hiring-command-focus">
        <strong>Decision focus</strong>
        <p>{role.decisionFocus}</p>
      </div>

      <div className="hiring-command-move">
        <strong>Opening move</strong>
        <p>{role.openingMove}</p>
      </div>

      <div className="hiring-command-gate">
        <strong>Proof gate</strong>
        <p>{role.proofGate}</p>
      </div>

      <div className="hiring-command-risk">
        <strong>Manager risk</strong>
        <p>{role.managerRisk}</p>
      </div>

      <div className="hiring-command-handoff">
        <strong>Team handoff</strong>
        <p>{role.teamHandoff}</p>
      </div>

      <div className="hiring-command-ritual">
        <strong>Follow-up ritual</strong>
        <p>{role.followUpRitual}</p>
      </div>

      <div className="hiring-command-escalation">
        <strong>Escalation trigger</strong>
        <p>{role.escalationTrigger}</p>
      </div>

      <div className="hiring-command-next">
        <strong>Next command action</strong>
        <p>{role.nextCommandAction}</p>
      </div>

      <div className="hiring-command-actions" aria-label={`${role.id} command routes`}>
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
        <Link
          className="btn btn-primary"
          href={role.contactRoute}
          aria-label={`Contact ${role.id} command`}
        >
          Contact
        </Link>
      </div>
    </article>
  );
}

function HiringCommandRoles({ roles }: { roles: HiringCommandCenterRole[] }) {
  return (
    <section
      className="hiring-command-section"
      id="hiring-command-roles"
      aria-labelledby="hiring-command-roles-title"
    >
      <div className="hiring-command-section-head">
        <div>
          <div className="label">Role lanes</div>
          <h2 id="hiring-command-roles-title">Role command lanes</h2>
        </div>
        <p>
          Each lane pulls together the current signal, decision focus, proof gate,
          manager risk, team handoff, ritual, escalation trigger, and next action.
        </p>
      </div>
      <div className="hiring-command-role-grid">
        {roles.map((role) => (
          <HiringCommandRoleCard role={role} key={role.id} />
        ))}
      </div>
    </section>
  );
}

function HiringCommandCheckpoints({
  checkpoints,
}: {
  checkpoints: HiringCommandCenterCheckpoint[];
}) {
  return (
    <section
      className="hiring-command-section"
      aria-labelledby="hiring-command-checkpoints-title"
    >
      <div className="hiring-command-section-head">
        <div>
          <div className="label">Operating guardrails</div>
          <h2 id="hiring-command-checkpoints-title">Operating checkpoints</h2>
        </div>
        <p>
          These checkpoints keep the command center from becoming another list:
          proof first, risk named, expectations planned, continuity reviewed.
        </p>
      </div>
      <div className="hiring-command-checkpoint-grid">
        {checkpoints.map((checkpoint) => (
          <article className="hiring-command-checkpoint" key={checkpoint.id}>
            <small>{checkpoint.label}</small>
            <h3>{checkpoint.title}</h3>
            <p>{checkpoint.body}</p>
            <div className="hiring-command-checkpoint-actions">
              <Link className="btn btn-ghost" href={checkpoint.route}>
                Open route
              </Link>
              <Link className="btn btn-ghost" href={checkpoint.proofHref}>
                Proof anchor
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function HiringCommandView({ pack }: HiringCommandViewProps) {
  return (
    <article className="hiring-command-board container" aria-labelledby="hiring-command-title">
      <header className="hiring-command-hero">
        <div>
          <div className="label">{pack.hero.eyebrow}</div>
          <h1 id="hiring-command-title">{pack.hero.headline}</h1>
          <p>{pack.hero.subhead}</p>
          <div className="hiring-command-actions">
            <Link className="btn btn-primary" href={pack.hero.primaryAction.href}>
              {pack.hero.primaryAction.label}
            </Link>
            <Link className="btn btn-ghost" href={pack.hero.secondaryAction.href}>
              {pack.hero.secondaryAction.label}
            </Link>
            <Link className="btn btn-ghost" href="/hire/briefing">
              Hiring briefing
            </Link>
            <Link className="btn btn-ghost" href="/hire/readiness">
              Hiring readiness
            </Link>
          </div>
        </div>
        <ul className="hiring-command-role-summary" aria-label="Hiring command role summary">
          {pack.roles.map((role) => (
            <li key={role.id}>
              <span>{role.label}</span>
              <strong>{role.id}</strong>
              <span>Proof ready</span>
            </li>
          ))}
        </ul>
      </header>

      <HiringCommandSummary summary={pack.summary} />
      <HiringCommandSequence sequence={pack.sequence} />
      <HiringCommandRoles roles={pack.roles} />
      <HiringCommandCheckpoints checkpoints={pack.checkpoints} />
      <HiringRouteShelf
        links={[
          { label: "Hiring briefing", href: "/hire/briefing" },
          { label: "Hiring readiness", href: "/hire/readiness" },
          { label: "Hiring action", href: "/hire/action" },
          { label: "Hiring tracker", href: "/hire/tracker" },
          { label: "Partnership operating", href: pack.partnershipRoute },
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
        ]}
      />

      <section className="hiring-command-close" aria-labelledby="hiring-command-close-title">
        <div>
          <div className="label">Next action</div>
          <h2 id="hiring-command-close-title">{pack.close.title}</h2>
          <p>{pack.close.body}</p>
        </div>
        <div className="hiring-command-actions">
          <Link className="btn btn-primary" href={pack.close.primaryAction.href}>
            {pack.close.primaryAction.label}
          </Link>
        </div>
      </section>
    </article>
  );
}
