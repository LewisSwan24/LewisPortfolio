import Link from "next/link";
import type {
  HiringReadinessGateArtifact,
  HiringReadinessGateCheck,
  HiringReadinessGatePack,
  HiringReadinessGateRole,
  HiringReadinessGateSummaryItem,
} from "@/lib/proof";
import { HiringRouteShelf } from "./HiringRouteShelf";

interface HiringReadinessViewProps {
  pack: HiringReadinessGatePack;
}

function HiringReadinessSummary({
  summary,
}: {
  summary: HiringReadinessGateSummaryItem[];
}) {
  return (
    <section className="hiring-readiness-section" aria-labelledby="hiring-readiness-summary-title">
      <div className="hiring-readiness-section-head">
        <div>
          <div className="label">Readiness frame</div>
          <h2 id="hiring-readiness-summary-title">Readiness summary</h2>
        </div>
        <p>
          Use this gate when the proof has been briefed and the hiring reader
          needs a clear go, validate, or monitor path for a specific role lane.
        </p>
      </div>
      <div className="hiring-readiness-summary-grid">
        {summary.map((item) => (
          <article className="hiring-readiness-summary-item" key={item.id}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function HiringReadinessGates({ gates }: { gates: HiringReadinessGateCheck[] }) {
  return (
    <section
      className="hiring-readiness-section"
      id="hiring-readiness-gates"
      aria-labelledby="hiring-readiness-gates-title"
    >
      <div className="hiring-readiness-section-head">
        <div>
          <div className="label">Decision gates</div>
          <h2 id="hiring-readiness-gates-title">Gate checks</h2>
        </div>
        <p>
          Each check turns a broad positive signal into a concrete pass
          condition, failure mode, and route to open next.
        </p>
      </div>
      <div className="hiring-readiness-gate-grid">
        {gates.map((gate) => (
          <article className="hiring-readiness-gate" key={gate.id}>
            <small>{gate.label}</small>
            <h3>{gate.title}</h3>
            <dl>
              <div>
                <dt>Signal</dt>
                <dd>{gate.signal}</dd>
              </div>
              <div>
                <dt>Pass condition</dt>
                <dd>{gate.passCondition}</dd>
              </div>
              <div>
                <dt>Failure mode</dt>
                <dd>{gate.failureMode}</dd>
              </div>
              <div>
                <dt>Next route</dt>
                <dd>{gate.nextRoute}</dd>
              </div>
            </dl>
            <Link className="btn btn-ghost" href={gate.route}>
              {gate.actionLabel}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function HiringReadinessRoleCard({ role }: { role: HiringReadinessGateRole }) {
  return (
    <article className="hiring-readiness-role">
      <div className="hiring-readiness-role-head">
        <small>{role.id}</small>
        <h3>{role.label}</h3>
        <p>{role.readinessSignal}</p>
        <strong>{role.readinessScore}</strong>
      </div>

      <div className="hiring-readiness-proof">
        <div className="label">Proof for readiness</div>
        <h4>{role.proof.claim}</h4>
        <p>{role.proof.evidence}</p>
        <Link href={role.proof.href}>Inspect proof anchor</Link>
      </div>

      <div className="hiring-readiness-evidence">
        <strong>Proven evidence</strong>
        <p>{role.provenEvidence}</p>
      </div>

      <div className="hiring-readiness-gap">
        <strong>Validation gap</strong>
        <p>{role.validationGap}</p>
      </div>

      <div className="hiring-readiness-owner">
        <strong>Stakeholder owner</strong>
        <p>{role.stakeholderOwner}</p>
      </div>

      <div className="hiring-readiness-gate-note">
        <strong>Decision gate</strong>
        <p>{role.decisionGate}</p>
      </div>

      <div className="hiring-readiness-recruiter">
        <strong>Recruiter note</strong>
        <p>{role.recruiterNote}</p>
      </div>

      <div className="hiring-readiness-interview">
        <strong>Interview note</strong>
        <p>{role.interviewNote}</p>
      </div>

      <div className="hiring-readiness-onboarding">
        <strong>Onboarding note</strong>
        <p>{role.onboardingNote}</p>
      </div>

      <div className="hiring-readiness-next">
        <strong>Next readiness action</strong>
        <p>{role.nextReadinessAction}</p>
      </div>

      <div className="hiring-readiness-actions" aria-label={`${role.id} readiness routes`}>
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
        <Link className="btn btn-ghost" href={role.recommendedRoute}>
          Recommended route
        </Link>
        <Link
          className="btn btn-primary"
          href={role.contactRoute}
          aria-label={`Contact ${role.id} readiness`}
        >
          Contact
        </Link>
      </div>
    </article>
  );
}

function HiringReadinessRoles({ roles }: { roles: HiringReadinessGateRole[] }) {
  return (
    <section
      className="hiring-readiness-section"
      id="hiring-readiness-roles"
      aria-labelledby="hiring-readiness-roles-title"
    >
      <div className="hiring-readiness-section-head">
        <div>
          <div className="label">Role lanes</div>
          <h2 id="hiring-readiness-roles-title">Role readiness lanes</h2>
        </div>
        <p>
          Each lane names the readiness state, proven evidence, validation gap,
          owner, decision gate, route, and next action for the hiring reader.
        </p>
      </div>
      <div className="hiring-readiness-role-grid">
        {roles.map((role) => (
          <HiringReadinessRoleCard role={role} key={role.id} />
        ))}
      </div>
    </section>
  );
}

function HiringReadinessArtifacts({
  artifacts,
}: {
  artifacts: HiringReadinessGateArtifact[];
}) {
  return (
    <section
      className="hiring-readiness-section"
      aria-labelledby="hiring-readiness-artifacts-title"
    >
      <div className="hiring-readiness-section-head">
        <div>
          <div className="label">Reusable decisions</div>
          <h2 id="hiring-readiness-artifacts-title">Readiness artifacts</h2>
        </div>
        <p>
          These artifacts package readiness state, route, and proof anchor into
          short notes for recruiter, manager, and onboarding handoff.
        </p>
      </div>
      <div className="hiring-readiness-artifact-grid">
        {artifacts.map((artifact) => (
          <article className="hiring-readiness-artifact" key={artifact.id}>
            <small>{artifact.label}</small>
            <h3>{artifact.title}</h3>
            <p>{artifact.body}</p>
            <div className="hiring-readiness-artifact-actions">
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

export function HiringReadinessView({ pack }: HiringReadinessViewProps) {
  return (
    <article className="hiring-readiness-board container" aria-labelledby="hiring-readiness-title">
      <header className="hiring-readiness-hero">
        <div>
          <div className="label">{pack.hero.eyebrow}</div>
          <h1 id="hiring-readiness-title">{pack.hero.headline}</h1>
          <p>{pack.hero.subhead}</p>
          <div className="hiring-readiness-actions">
            <Link className="btn btn-primary" href={pack.hero.primaryAction.href}>
              {pack.hero.primaryAction.label}
            </Link>
            <Link className="btn btn-ghost" href={pack.hero.secondaryAction.href}>
              {pack.hero.secondaryAction.label}
            </Link>
            <Link className="btn btn-ghost" href="/hire/action">
              Hiring action
            </Link>
            <Link className="btn btn-ghost" href="/hire/tracker">
              Hiring tracker
            </Link>
          </div>
        </div>
        <ul className="hiring-readiness-role-summary" aria-label="Hiring readiness role summary">
          {pack.roles.map((role) => (
            <li key={role.id}>
              <span>{role.label}</span>
              <strong>{role.readinessScore}</strong>
              <span>Proof ready</span>
            </li>
          ))}
        </ul>
      </header>

      <HiringReadinessSummary summary={pack.summary} />
      <HiringReadinessGates gates={pack.gates} />
      <HiringReadinessRoles roles={pack.roles} />
      <HiringReadinessArtifacts artifacts={pack.artifacts} />
      <HiringRouteShelf
        links={[
          { label: "Hiring action", href: "/hire/action" },
          { label: "Hiring tracker", href: "/hire/tracker" },
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

      <section className="hiring-readiness-close" aria-labelledby="hiring-readiness-close-title">
        <div>
          <div className="label">Next action</div>
          <h2 id="hiring-readiness-close-title">{pack.close.title}</h2>
          <p>{pack.close.body}</p>
        </div>
        <div className="hiring-readiness-actions">
          <Link className="btn btn-primary" href={pack.close.primaryAction.href}>
            {pack.close.primaryAction.label}
          </Link>
        </div>
      </section>
    </article>
  );
}
