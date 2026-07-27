import Link from "next/link";
import type {
  HiringReadinessGateArtifact,
  HiringReadinessGateCheck,
  HiringReadinessGatePack,
  HiringReadinessGateRole,
  HiringReadinessGateSummaryItem,
} from "@/lib/proof";
import { HiringRouteShelf } from "./HiringRouteShelf";
import { getHiringViewCopy } from "./hiringViewCopy";

interface HiringReadinessViewProps {
  pack: HiringReadinessGatePack;
}

type HiringViewCopy = ReturnType<typeof getHiringViewCopy>;

function HiringReadinessSummary({
  summary,
  copy,
}: {
  summary: HiringReadinessGateSummaryItem[];
  copy: HiringViewCopy;
}) {
  return (
    <section className="hiring-readiness-section" aria-labelledby="hiring-readiness-summary-title">
      <div className="hiring-readiness-section-head">
        <div>
          <div className="label">{copy.readiness.summaryEyebrow}</div>
          <h2 id="hiring-readiness-summary-title">{copy.readiness.summaryTitle}</h2>
        </div>
        <p>{copy.readiness.summaryIntro}</p>
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

function HiringReadinessGates({
  gates,
  copy,
}: {
  gates: HiringReadinessGateCheck[];
  copy: HiringViewCopy;
}) {
  return (
    <section
      className="hiring-readiness-section"
      id="hiring-readiness-gates"
      aria-labelledby="hiring-readiness-gates-title"
    >
      <div className="hiring-readiness-section-head">
        <div>
          <div className="label">{copy.readiness.gatesEyebrow}</div>
          <h2 id="hiring-readiness-gates-title">{copy.readiness.gatesTitle}</h2>
        </div>
        <p>{copy.readiness.gatesIntro}</p>
      </div>
      <div className="hiring-readiness-gate-grid">
        {gates.map((gate) => (
          <article className="hiring-readiness-gate" key={gate.id}>
            <small>{gate.label}</small>
            <h3>{gate.title}</h3>
            <dl>
              <div>
                <dt>{copy.readiness.signal}</dt>
                <dd>{gate.signal}</dd>
              </div>
              <div>
                <dt>{copy.readiness.passCondition}</dt>
                <dd>{gate.passCondition}</dd>
              </div>
              <div>
                <dt>{copy.readiness.failureMode}</dt>
                <dd>{gate.failureMode}</dd>
              </div>
              <div>
                <dt>{copy.readiness.nextRoute}</dt>
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

function HiringReadinessRoleCard({
  role,
  copy,
}: {
  role: HiringReadinessGateRole;
  copy: HiringViewCopy;
}) {
  return (
    <article className="hiring-readiness-role">
      <div className="hiring-readiness-role-head">
        <small>{role.id}</small>
        <h3>{role.label}</h3>
        <p>{role.readinessSignal}</p>
        <strong>{copy.readinessStatus(role.readinessScore)}</strong>
      </div>

      <div className="hiring-readiness-proof">
        <div className="label">{copy.readiness.proofForReadiness}</div>
        <h4>{role.proof.claim}</h4>
        <p>{role.proof.evidence}</p>
        <Link href={role.proof.href}>{copy.inspectProofAnchor}</Link>
      </div>

      <div className="hiring-readiness-evidence">
        <strong>{copy.readiness.provenEvidence}</strong>
        <p>{role.provenEvidence}</p>
      </div>

      <div className="hiring-readiness-gap">
        <strong>{copy.readiness.validationGap}</strong>
        <p>{role.validationGap}</p>
      </div>

      <div className="hiring-readiness-owner">
        <strong>{copy.readiness.stakeholderOwner}</strong>
        <p>{role.stakeholderOwner}</p>
      </div>

      <div className="hiring-readiness-gate-note">
        <strong>{copy.readiness.decisionGate}</strong>
        <p>{role.decisionGate}</p>
      </div>

      <div className="hiring-readiness-recruiter">
        <strong>{copy.readiness.recruiterNote}</strong>
        <p>{role.recruiterNote}</p>
      </div>

      <div className="hiring-readiness-interview">
        <strong>{copy.readiness.interviewNote}</strong>
        <p>{role.interviewNote}</p>
      </div>

      <div className="hiring-readiness-onboarding">
        <strong>{copy.readiness.onboardingNote}</strong>
        <p>{role.onboardingNote}</p>
      </div>

      <div className="hiring-readiness-next">
        <strong>{copy.readiness.nextReadinessAction}</strong>
        <p>{role.nextReadinessAction}</p>
      </div>

      <div className="hiring-readiness-actions" aria-label={`${role.id} readiness routes`}>
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
        <Link className="btn btn-ghost" href={role.recommendedRoute}>
          {copy.recommendedRoute}
        </Link>
        <Link
          className="btn btn-primary"
          href={role.contactRoute}
          aria-label={`Contact ${role.id} readiness`}
        >
          {copy.contact}
        </Link>
      </div>
    </article>
  );
}

function HiringReadinessRoles({
  roles,
  copy,
}: {
  roles: HiringReadinessGateRole[];
  copy: HiringViewCopy;
}) {
  return (
    <section
      className="hiring-readiness-section"
      id="hiring-readiness-roles"
      aria-labelledby="hiring-readiness-roles-title"
    >
      <div className="hiring-readiness-section-head">
        <div>
          <div className="label">{copy.readiness.rolesEyebrow}</div>
          <h2 id="hiring-readiness-roles-title">{copy.readiness.rolesTitle}</h2>
        </div>
        <p>{copy.readiness.rolesIntro}</p>
      </div>
      <div className="hiring-readiness-role-grid">
        {roles.map((role) => (
          <HiringReadinessRoleCard copy={copy} role={role} key={role.id} />
        ))}
      </div>
    </section>
  );
}

function HiringReadinessArtifacts({
  artifacts,
  copy,
}: {
  artifacts: HiringReadinessGateArtifact[];
  copy: HiringViewCopy;
}) {
  return (
    <section
      className="hiring-readiness-section"
      aria-labelledby="hiring-readiness-artifacts-title"
    >
      <div className="hiring-readiness-section-head">
        <div>
          <div className="label">{copy.readiness.artifactsEyebrow}</div>
          <h2 id="hiring-readiness-artifacts-title">{copy.readiness.artifactsTitle}</h2>
        </div>
        <p>{copy.readiness.artifactsIntro}</p>
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
  const copy = getHiringViewCopy(pack.locale);

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
              {copy.routeLabel("/hire/action", "Hiring action")}
            </Link>
            <Link className="btn btn-ghost" href="/hire/tracker">
              {copy.routeLabel("/hire/tracker", "Hiring tracker")}
            </Link>
          </div>
        </div>
        <ul className="hiring-readiness-role-summary" aria-label={copy.roleSummary}>
          {pack.roles.map((role) => (
            <li key={role.id}>
              <span>{role.label}</span>
              <strong>{copy.readinessStatus(role.readinessScore)}</strong>
              <span>{copy.proofReady}</span>
            </li>
          ))}
        </ul>
      </header>

      <HiringReadinessSummary copy={copy} summary={pack.summary} />
      <HiringReadinessGates copy={copy} gates={pack.gates} />
      <HiringReadinessRoles copy={copy} roles={pack.roles} />
      <HiringReadinessArtifacts artifacts={pack.artifacts} copy={copy} />
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
          <div className="label">{copy.nextAction}</div>
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
