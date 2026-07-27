import Link from "next/link";
import type {
  HiringActionBoardArtifact,
  HiringActionBoardPack,
  HiringActionBoardRole,
  HiringActionBoardStep,
  HiringActionBoardSummaryItem,
} from "@/lib/proof";
import { HiringRouteShelf } from "./HiringRouteShelf";
import { getHiringViewCopy } from "./hiringViewCopy";

interface HiringActionViewProps {
  pack: HiringActionBoardPack;
}

type HiringViewCopy = ReturnType<typeof getHiringViewCopy>;

function HiringActionSummary({
  summary,
  copy,
}: {
  summary: HiringActionBoardSummaryItem[];
  copy: HiringViewCopy;
}) {
  return (
    <section className="hiring-action-section" aria-labelledby="hiring-action-summary-title">
      <div className="hiring-action-section-head">
        <div>
          <div className="label">{copy.action.summaryEyebrow}</div>
          <h2 id="hiring-action-summary-title">{copy.action.summaryTitle}</h2>
        </div>
        <p>{copy.action.summaryIntro}</p>
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

function HiringActionSequence({
  sequence,
  copy,
}: {
  sequence: HiringActionBoardStep[];
  copy: HiringViewCopy;
}) {
  return (
    <section
      className="hiring-action-section"
      id="hiring-action-sequence"
      aria-labelledby="hiring-action-sequence-title"
    >
      <div className="hiring-action-section-head">
        <div>
          <div className="label">{copy.action.sequenceEyebrow}</div>
          <h2 id="hiring-action-sequence-title">{copy.action.sequenceTitle}</h2>
        </div>
        <p>{copy.action.sequenceIntro}</p>
      </div>
      <div className="hiring-action-step-grid">
        {sequence.map((step) => (
          <article className="hiring-action-step" key={step.id}>
            <small>{step.label}</small>
            <h3>{step.title}</h3>
            <dl>
              <div>
                <dt>{copy.action.actionOwner}</dt>
                <dd>{step.owner}</dd>
              </div>
              <div>
                <dt>{copy.action.firstAction}</dt>
                <dd>{step.action}</dd>
              </div>
              <div>
                <dt>{copy.action.proofFocus}</dt>
                <dd>{step.proofFocus}</dd>
              </div>
              <div>
                <dt>{copy.action.successSignal}</dt>
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

function HiringActionRoleCard({
  role,
  copy,
}: {
  role: HiringActionBoardRole;
  copy: HiringViewCopy;
}) {
  return (
    <article className="hiring-action-role">
      <div className="hiring-action-role-head">
        <small>{role.id}</small>
        <h3>{role.label}</h3>
        <p>{role.actionState}</p>
        <strong>{copy.readinessStatus(role.readinessScore)}</strong>
      </div>

      <div className="hiring-action-proof">
        <div className="label">{copy.action.proofForAction}</div>
        <h4>{role.proof.claim}</h4>
        <p>{role.proof.evidence}</p>
        <Link href={role.proof.href}>{copy.inspectProofAnchor}</Link>
      </div>

      <div className="hiring-action-owner">
        <strong>{copy.action.actionOwner}</strong>
        <p>{role.actionOwner}</p>
      </div>

      <div className="hiring-action-first">
        <strong>{copy.action.firstAction}</strong>
        <p>{role.firstAction}</p>
      </div>

      <div className="hiring-action-open">
        <strong>{copy.action.proofToOpen}</strong>
        <p>{role.proofToOpen}</p>
      </div>

      <div className="hiring-action-route">
        <strong>{copy.action.routeToOpen}</strong>
        <p>{role.routeToOpen}</p>
      </div>

      <div className="hiring-action-recruiter">
        <strong>{copy.action.recruiterAction}</strong>
        <p>{role.recruiterAction}</p>
      </div>

      <div className="hiring-action-manager">
        <strong>{copy.action.managerAction}</strong>
        <p>{role.managerAction}</p>
      </div>

      <div className="hiring-action-panel">
        <strong>{copy.action.panelAction}</strong>
        <p>{role.panelAction}</p>
      </div>

      <div className="hiring-action-onboarding">
        <strong>{copy.action.onboardingAction}</strong>
        <p>{role.onboardingAction}</p>
      </div>

      <div className="hiring-action-fallback">
        <strong>{copy.action.fallbackAction}</strong>
        <p>{role.fallbackAction}</p>
      </div>

      <div className="hiring-action-success">
        <strong>{copy.action.successSignal}</strong>
        <p>{role.successSignal}</p>
      </div>

      <div className="hiring-action-risk">
        <strong>{copy.action.blockingRisk}</strong>
        <p>{role.blockingRisk}</p>
      </div>

      <div className="hiring-action-next">
        <strong>{copy.nextAction}</strong>
        <p>{role.nextAction}</p>
      </div>

      <div className="hiring-action-actions" aria-label={`${role.id} action routes`}>
        <Link
          className="btn btn-ghost"
          href={role.roleRoute}
          aria-label={`Open ${role.id} role room`}
        >
          {copy.role}
        </Link>
        <Link
          className="btn btn-ghost"
          href={role.packetRoute}
          aria-label={`Open ${role.id} packet`}
        >
          {copy.packet}
        </Link>
        <Link
          className="btn btn-ghost"
          href={role.followThroughRoute}
          aria-label={`Open ${role.id} follow-through`}
        >
          {copy.followThrough}
        </Link>
        <Link className="btn btn-ghost" href={role.routeToOpen}>
          {copy.recommendedRoute}
        </Link>
        <Link
          className="btn btn-primary"
          href={role.contactRoute}
          aria-label={`Contact ${role.id} action`}
        >
          {copy.contact}
        </Link>
      </div>
    </article>
  );
}

function HiringActionRoles({
  roles,
  copy,
}: {
  roles: HiringActionBoardRole[];
  copy: HiringViewCopy;
}) {
  return (
    <section
      className="hiring-action-section"
      id="hiring-action-roles"
      aria-labelledby="hiring-action-roles-title"
    >
      <div className="hiring-action-section-head">
        <div>
          <div className="label">{copy.action.rolesEyebrow}</div>
          <h2 id="hiring-action-roles-title">{copy.action.rolesTitle}</h2>
        </div>
        <p>{copy.action.rolesIntro}</p>
      </div>
      <div className="hiring-action-role-grid">
        {roles.map((role) => (
          <HiringActionRoleCard copy={copy} role={role} key={role.id} />
        ))}
      </div>
    </section>
  );
}

function HiringActionArtifacts({
  artifacts,
  copy,
}: {
  artifacts: HiringActionBoardArtifact[];
  copy: HiringViewCopy;
}) {
  return (
    <section
      className="hiring-action-section"
      aria-labelledby="hiring-action-artifacts-title"
    >
      <div className="hiring-action-section-head">
        <div>
          <div className="label">{copy.action.artifactsEyebrow}</div>
          <h2 id="hiring-action-artifacts-title">{copy.action.artifactsTitle}</h2>
        </div>
        <p>{copy.action.artifactsIntro}</p>
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
  const copy = getHiringViewCopy(pack.locale);

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
              {copy.routeLabel("/hire/tracker", "Hiring tracker")}
            </Link>
            <Link className="btn btn-ghost" href={pack.briefingRoute}>
              {copy.routeLabel(pack.briefingRoute, "Hiring briefing")}
            </Link>
          </div>
        </div>
        <ul className="hiring-action-role-summary" aria-label={copy.roleSummary}>
          {pack.roles.map((role) => (
            <li key={role.id}>
              <span>{role.label}</span>
              <strong>{copy.readinessStatus(role.readinessScore)}</strong>
              <span>{copy.proofReady}</span>
            </li>
          ))}
        </ul>
      </header>

      <HiringActionSummary copy={copy} summary={pack.summary} />
      <HiringActionSequence copy={copy} sequence={pack.sequence} />
      <HiringActionRoles copy={copy} roles={pack.roles} />
      <HiringActionArtifacts artifacts={pack.artifacts} copy={copy} />
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
          <div className="label">{copy.nextAction}</div>
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
