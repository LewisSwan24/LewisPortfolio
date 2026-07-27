import Link from "next/link";
import type {
  HiringBriefingRoomArtifact,
  HiringBriefingRoomPack,
  HiringBriefingRoomRole,
  HiringBriefingRoomStakeholderBrief,
  HiringBriefingRoomSummaryItem,
} from "@/lib/proof";
import { HiringRouteShelf } from "./HiringRouteShelf";
import { getHiringViewCopy } from "./hiringViewCopy";

interface HiringBriefingViewProps {
  pack: HiringBriefingRoomPack;
}

type HiringViewCopy = ReturnType<typeof getHiringViewCopy>;

function HiringBriefingSummary({
  summary,
  copy,
}: {
  summary: HiringBriefingRoomSummaryItem[];
  copy: HiringViewCopy;
}) {
  return (
    <section className="hiring-briefing-section" aria-labelledby="hiring-briefing-summary-title">
      <div className="hiring-briefing-section-head">
        <div>
          <div className="label">{copy.briefing.summaryEyebrow}</div>
          <h2 id="hiring-briefing-summary-title">{copy.briefing.summaryTitle}</h2>
        </div>
        <p>{copy.briefing.summaryIntro}</p>
      </div>
      <div className="hiring-briefing-summary-grid">
        {summary.map((item) => (
          <article className="hiring-briefing-summary-item" key={item.id}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function HiringBriefingStakeholders({
  stakeholders,
  copy,
}: {
  stakeholders: HiringBriefingRoomStakeholderBrief[];
  copy: HiringViewCopy;
}) {
  return (
    <section
      className="hiring-briefing-section"
      id="hiring-briefing-stakeholders"
      aria-labelledby="hiring-briefing-stakeholders-title"
    >
      <div className="hiring-briefing-section-head">
        <div>
          <div className="label">{copy.briefing.stakeholdersEyebrow}</div>
          <h2 id="hiring-briefing-stakeholders-title">{copy.briefing.stakeholdersTitle}</h2>
        </div>
        <p>{copy.briefing.stakeholdersIntro}</p>
      </div>
      <div className="hiring-briefing-stakeholder-grid">
        {stakeholders.map((stakeholder) => (
          <article className="hiring-briefing-stakeholder" key={stakeholder.id}>
            <small>{stakeholder.label}</small>
            <h3>{stakeholder.goal}</h3>
            <dl>
              <div>
                <dt>{copy.briefing.readingFocus}</dt>
                <dd>{stakeholder.readingFocus}</dd>
              </div>
              <div>
                <dt>{copy.briefing.questionToAsk}</dt>
                <dd>{stakeholder.questionToAsk}</dd>
              </div>
              <div>
                <dt>{copy.briefing.decisionToMake}</dt>
                <dd>{stakeholder.decisionToMake}</dd>
              </div>
            </dl>
            <Link className="btn btn-ghost" href={stakeholder.route}>
              {stakeholder.actionLabel}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function HiringBriefingRoleCard({
  role,
  copy,
}: {
  role: HiringBriefingRoomRole;
  copy: HiringViewCopy;
}) {
  return (
    <article className="hiring-briefing-role">
      <div className="hiring-briefing-role-head">
        <small>{role.id}</small>
        <h3>{role.label}</h3>
        <p>{role.briefingSignal}</p>
      </div>

      <div className="hiring-briefing-proof">
        <div className="label">{copy.briefing.proofForBriefing}</div>
        <h4>{role.proof.claim}</h4>
        <p>{role.proof.evidence}</p>
        <Link href={role.proof.href}>{copy.inspectProofAnchor}</Link>
      </div>

      <div className="hiring-briefing-context">
        <strong>{copy.briefing.stakeholderContext}</strong>
        <p>{role.stakeholderContext}</p>
      </div>

      <div className="hiring-briefing-opening">
        <strong>{copy.briefing.openingContext}</strong>
        <p>{role.openingContext}</p>
      </div>

      <div className="hiring-briefing-evidence">
        <strong>{copy.briefing.evidenceToInspect}</strong>
        <p>{role.evidenceToInspect}</p>
      </div>

      <div className="hiring-briefing-question">
        <strong>{copy.briefing.decisionQuestion}</strong>
        <p>{role.decisionQuestion}</p>
      </div>

      <div className="hiring-briefing-risk">
        <strong>{copy.briefing.riskToResolve}</strong>
        <p>{role.riskToResolve}</p>
      </div>

      <div className="hiring-briefing-handoff">
        <strong>{copy.briefing.handoffNote}</strong>
        <p>{role.handoffNote}</p>
      </div>

      <div className="hiring-briefing-owner">
        <strong>{copy.briefing.followUpOwner}</strong>
        <p>{role.followUpOwner}</p>
      </div>

      <div className="hiring-briefing-next">
        <strong>{copy.briefing.nextBriefingAction}</strong>
        <p>{role.nextBriefingAction}</p>
      </div>

      <div className="hiring-briefing-actions" aria-label={`${role.id} briefing routes`}>
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
        <Link
          className="btn btn-primary"
          href={role.contactRoute}
          aria-label={`Contact ${role.id} briefing`}
        >
          {copy.contact}
        </Link>
      </div>
    </article>
  );
}

function HiringBriefingRoles({
  roles,
  copy,
}: {
  roles: HiringBriefingRoomRole[];
  copy: HiringViewCopy;
}) {
  return (
    <section
      className="hiring-briefing-section"
      id="hiring-briefing-roles"
      aria-labelledby="hiring-briefing-roles-title"
    >
      <div className="hiring-briefing-section-head">
        <div>
          <div className="label">{copy.briefing.rolesEyebrow}</div>
          <h2 id="hiring-briefing-roles-title">{copy.briefing.rolesTitle}</h2>
        </div>
        <p>{copy.briefing.rolesIntro}</p>
      </div>
      <div className="hiring-briefing-role-grid">
        {roles.map((role) => (
          <HiringBriefingRoleCard copy={copy} role={role} key={role.id} />
        ))}
      </div>
    </section>
  );
}

function HiringBriefingArtifacts({
  artifacts,
  copy,
}: {
  artifacts: HiringBriefingRoomArtifact[];
  copy: HiringViewCopy;
}) {
  return (
    <section
      className="hiring-briefing-section"
      aria-labelledby="hiring-briefing-artifacts-title"
    >
      <div className="hiring-briefing-section-head">
        <div>
          <div className="label">{copy.briefing.artifactsEyebrow}</div>
          <h2 id="hiring-briefing-artifacts-title">{copy.briefing.artifactsTitle}</h2>
        </div>
        <p>{copy.briefing.artifactsIntro}</p>
      </div>
      <div className="hiring-briefing-artifact-grid">
        {artifacts.map((artifact) => (
          <article className="hiring-briefing-artifact" key={artifact.id}>
            <small>{artifact.label}</small>
            <h3>{artifact.title}</h3>
            <p>{artifact.body}</p>
            <div className="hiring-briefing-artifact-actions">
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

export function HiringBriefingView({ pack }: HiringBriefingViewProps) {
  const copy = getHiringViewCopy(pack.locale);

  return (
    <article className="hiring-briefing-board container" aria-labelledby="hiring-briefing-title">
      <header className="hiring-briefing-hero">
        <div>
          <div className="label">{pack.hero.eyebrow}</div>
          <h1 id="hiring-briefing-title">{pack.hero.headline}</h1>
          <p>{pack.hero.subhead}</p>
          <div className="hiring-briefing-actions">
            <Link className="btn btn-primary" href={pack.hero.primaryAction.href}>
              {pack.hero.primaryAction.label}
            </Link>
            <Link className="btn btn-ghost" href={pack.hero.secondaryAction.href}>
              {pack.hero.secondaryAction.label}
            </Link>
            <Link className="btn btn-ghost" href="/hire/readiness">
              {copy.routeLabel("/hire/readiness", "Hiring readiness")}
            </Link>
            <Link className="btn btn-ghost" href="/hire/action">
              {copy.routeLabel("/hire/action", "Hiring action")}
            </Link>
          </div>
        </div>
        <ul className="hiring-briefing-role-summary" aria-label={copy.roleSummary}>
          {pack.roles.map((role) => (
            <li key={role.id}>
              <span>{role.label}</span>
              <strong>{role.id}</strong>
              <span>{copy.proofReady}</span>
            </li>
          ))}
        </ul>
      </header>

      <HiringBriefingSummary copy={copy} summary={pack.summary} />
      <HiringBriefingStakeholders copy={copy} stakeholders={pack.stakeholders} />
      <HiringBriefingRoles copy={copy} roles={pack.roles} />
      <HiringBriefingArtifacts artifacts={pack.artifacts} copy={copy} />
      <HiringRouteShelf
        links={[
          { label: "Hiring readiness", href: "/hire/readiness" },
          { label: "Hiring action", href: "/hire/action" },
          { label: "Hiring tracker", href: "/hire/tracker" },
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

      <section className="hiring-briefing-close" aria-labelledby="hiring-briefing-close-title">
        <div>
          <div className="label">{copy.nextAction}</div>
          <h2 id="hiring-briefing-close-title">{pack.close.title}</h2>
          <p>{pack.close.body}</p>
        </div>
        <div className="hiring-briefing-actions">
          <Link className="btn btn-primary" href={pack.close.primaryAction.href}>
            {pack.close.primaryAction.label}
          </Link>
        </div>
      </section>
    </article>
  );
}
