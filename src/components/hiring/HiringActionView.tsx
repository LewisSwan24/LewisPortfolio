import Link from "next/link";
import type {
  HiringActionBoardArtifact,
  HiringActionBoardPack,
  HiringActionBoardRole,
  HiringActionBoardStep,
  HiringActionBoardSummaryItem,
} from "@/lib/proof";
import { HiringRouteShelf } from "./HiringRouteShelf";

interface HiringActionViewProps {
  pack: HiringActionBoardPack;
}

function HiringActionSummary({
  summary,
}: {
  summary: HiringActionBoardSummaryItem[];
}) {
  return (
    <section className="hiring-action-section" aria-labelledby="hiring-action-summary-title">
      <div className="hiring-action-section-head">
        <div>
          <div className="label">Action frame</div>
          <h2 id="hiring-action-summary-title">Action summary</h2>
        </div>
        <p>
          Use this board after readiness is known and the hiring reader needs
          the owner, route, proof anchor, and fallback for the next move.
        </p>
      </div>
      <div className="hiring-action-summary-grid">
        {summary.map((item) => (
          <article className="hiring-action-summary-item" key={item.id}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function HiringActionSequence({ sequence }: { sequence: HiringActionBoardStep[] }) {
  return (
    <section
      className="hiring-action-section"
      id="hiring-action-sequence"
      aria-labelledby="hiring-action-sequence-title"
    >
      <div className="hiring-action-section-head">
        <div>
          <div className="label">Action sequence</div>
          <h2 id="hiring-action-sequence-title">Action sequence</h2>
        </div>
        <p>
          Each action names an owner, first move, proof focus, success signal,
          and route so the hiring reader can keep momentum without guessing.
        </p>
      </div>
      <div className="hiring-action-step-grid">
        {sequence.map((step) => (
          <article className="hiring-action-step" key={step.id}>
            <small>{step.label}</small>
            <h3>{step.title}</h3>
            <dl>
              <div>
                <dt>Owner</dt>
                <dd>{step.owner}</dd>
              </div>
              <div>
                <dt>Action</dt>
                <dd>{step.action}</dd>
              </div>
              <div>
                <dt>Proof focus</dt>
                <dd>{step.proofFocus}</dd>
              </div>
              <div>
                <dt>Success signal</dt>
                <dd>{step.successSignal}</dd>
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

function HiringActionRoleCard({ role }: { role: HiringActionBoardRole }) {
  return (
    <article className="hiring-action-role">
      <div className="hiring-action-role-head">
        <small>{role.id}</small>
        <h3>{role.label}</h3>
        <p>{role.actionState}</p>
        <strong>{role.readinessScore}</strong>
      </div>

      <div className="hiring-action-proof">
        <div className="label">Proof for action</div>
        <h4>{role.proof.claim}</h4>
        <p>{role.proof.evidence}</p>
        <Link href={role.proof.href}>Inspect proof anchor</Link>
      </div>

      <div className="hiring-action-owner">
        <strong>Action owner</strong>
        <p>{role.actionOwner}</p>
      </div>

      <div className="hiring-action-first">
        <strong>First action</strong>
        <p>{role.firstAction}</p>
      </div>

      <div className="hiring-action-open">
        <strong>Proof to open</strong>
        <p>{role.proofToOpen}</p>
      </div>

      <div className="hiring-action-route">
        <strong>Route to open</strong>
        <p>{role.routeToOpen}</p>
      </div>

      <div className="hiring-action-recruiter">
        <strong>Recruiter action</strong>
        <p>{role.recruiterAction}</p>
      </div>

      <div className="hiring-action-manager">
        <strong>Manager action</strong>
        <p>{role.managerAction}</p>
      </div>

      <div className="hiring-action-panel">
        <strong>Panel action</strong>
        <p>{role.panelAction}</p>
      </div>

      <div className="hiring-action-onboarding">
        <strong>Onboarding action</strong>
        <p>{role.onboardingAction}</p>
      </div>

      <div className="hiring-action-fallback">
        <strong>Fallback action</strong>
        <p>{role.fallbackAction}</p>
      </div>

      <div className="hiring-action-success">
        <strong>Success signal</strong>
        <p>{role.successSignal}</p>
      </div>

      <div className="hiring-action-risk">
        <strong>Blocking risk</strong>
        <p>{role.blockingRisk}</p>
      </div>

      <div className="hiring-action-next">
        <strong>Next action</strong>
        <p>{role.nextAction}</p>
      </div>

      <div className="hiring-action-actions" aria-label={`${role.id} action routes`}>
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
        <Link className="btn btn-ghost" href={role.routeToOpen}>
          Recommended route
        </Link>
        <Link
          className="btn btn-primary"
          href={role.contactRoute}
          aria-label={`Contact ${role.id} action`}
        >
          Contact
        </Link>
      </div>
    </article>
  );
}

function HiringActionRoles({ roles }: { roles: HiringActionBoardRole[] }) {
  return (
    <section
      className="hiring-action-section"
      id="hiring-action-roles"
      aria-labelledby="hiring-action-roles-title"
    >
      <div className="hiring-action-section-head">
        <div>
          <div className="label">Role lanes</div>
          <h2 id="hiring-action-roles-title">Role action lanes</h2>
        </div>
        <p>
          Each lane turns readiness into owner, first action, proof to open,
          route to open, success signal, blocking risk, and fallback.
        </p>
      </div>
      <div className="hiring-action-role-grid">
        {roles.map((role) => (
          <HiringActionRoleCard role={role} key={role.id} />
        ))}
      </div>
    </section>
  );
}

function HiringActionArtifacts({
  artifacts,
}: {
  artifacts: HiringActionBoardArtifact[];
}) {
  return (
    <section
      className="hiring-action-section"
      aria-labelledby="hiring-action-artifacts-title"
    >
      <div className="hiring-action-section-head">
        <div>
          <div className="label">Reusable actions</div>
          <h2 id="hiring-action-artifacts-title">Action artifacts</h2>
        </div>
        <p>
          These artifacts package role action, proof anchor, and owner into
          short notes for recruiter, manager, panel, and onboarding handoff.
        </p>
      </div>
      <div className="hiring-action-artifact-grid">
        {artifacts.map((artifact) => (
          <article className="hiring-action-artifact" key={artifact.id}>
            <small>{artifact.label}</small>
            <h3>{artifact.title}</h3>
            <p>{artifact.body}</p>
            <div className="hiring-action-artifact-actions">
              <Link className="btn btn-ghost" href={artifact.route}>
                {artifact.actionLabel}
              </Link>
              <Link className="btn btn-ghost" href={artifact.proofHref}>
                {artifact.proofLabel}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function HiringActionView({ pack }: HiringActionViewProps) {
  return (
    <article className="hiring-action-board container" aria-labelledby="hiring-action-title">
      <header className="hiring-action-hero">
        <div>
          <div className="label">{pack.hero.eyebrow}</div>
          <h1 id="hiring-action-title">{pack.hero.headline}</h1>
          <p>{pack.hero.subhead}</p>
          <div className="hiring-action-actions">
            <Link className="btn btn-primary" href={pack.hero.primaryAction.href}>
              {pack.hero.primaryAction.label}
            </Link>
            <Link className="btn btn-ghost" href={pack.hero.secondaryAction.href}>
              {pack.hero.secondaryAction.label}
            </Link>
            <Link className="btn btn-ghost" href="/hire/tracker">
              Hiring tracker
            </Link>
            <Link className="btn btn-ghost" href={pack.briefingRoute}>
              Hiring briefing
            </Link>
          </div>
        </div>
        <ul className="hiring-action-role-summary" aria-label="Hiring action role summary">
          {pack.roles.map((role) => (
            <li key={role.id}>
              <span>{role.label}</span>
              <strong>{role.readinessScore}</strong>
              <span>Proof ready</span>
            </li>
          ))}
        </ul>
      </header>

      <HiringActionSummary summary={pack.summary} />
      <HiringActionSequence sequence={pack.sequence} />
      <HiringActionRoles roles={pack.roles} />
      <HiringActionArtifacts artifacts={pack.artifacts} />
      <HiringRouteShelf
        links={[
          { label: "Hiring tracker", href: "/hire/tracker" },
          { label: "Hiring readiness", href: pack.readinessRoute },
          { label: "Hiring briefing", href: pack.briefingRoute },
          { label: "Hiring command", href: pack.commandRoute },
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

      <section className="hiring-action-close" aria-labelledby="hiring-action-close-title">
        <div>
          <div className="label">Next action</div>
          <h2 id="hiring-action-close-title">{pack.close.title}</h2>
          <p>{pack.close.body}</p>
        </div>
        <div className="hiring-action-actions">
          <Link className="btn btn-primary" href={pack.close.primaryAction.href}>
            {pack.close.primaryAction.label}
          </Link>
        </div>
      </section>
    </article>
  );
}
