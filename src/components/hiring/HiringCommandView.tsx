import Link from "next/link";
import type {
  HiringCommandCenterCheckpoint,
  HiringCommandCenterPack,
  HiringCommandCenterRole,
  HiringCommandCenterSequenceStep,
  HiringCommandCenterSummaryItem,
} from "@/lib/proof";
import { HiringRouteShelf } from "./HiringRouteShelf";
import { getHiringViewCopy } from "./hiringViewCopy";

interface HiringCommandViewProps {
  pack: HiringCommandCenterPack;
}

type HiringViewCopy = ReturnType<typeof getHiringViewCopy>;

function HiringCommandSummary({
  summary,
  copy,
}: {
  summary: HiringCommandCenterSummaryItem[];
  copy: HiringViewCopy;
}) {
  return (
    <section className="hiring-command-section" aria-labelledby="hiring-command-summary-title">
      <div className="hiring-command-section-head">
        <div>
          <div className="label">{copy.command.summaryEyebrow}</div>
          <h2 id="hiring-command-summary-title">{copy.command.summaryTitle}</h2>
        </div>
        <p>{copy.command.summaryIntro}</p>
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
  copy,
}: {
  sequence: HiringCommandCenterSequenceStep[];
  copy: HiringViewCopy;
}) {
  return (
    <section
      className="hiring-command-section"
      id="hiring-command-sequence"
      aria-labelledby="hiring-command-sequence-title"
    >
      <div className="hiring-command-section-head">
        <div>
          <div className="label">{copy.command.sequenceEyebrow}</div>
          <h2 id="hiring-command-sequence-title">{copy.command.sequenceTitle}</h2>
        </div>
        <p>{copy.command.sequenceIntro}</p>
      </div>
      <div className="hiring-command-sequence-grid">
        {sequence.map((step, index) => (
          <article className="hiring-command-step" key={step.id}>
            <small>{String(index + 1).padStart(2, "0")}</small>
            <h3>{step.label}</h3>
            <dl>
              <div>
                <dt>{copy.managerQuestion}</dt>
                <dd>{step.managerQuestion}</dd>
              </div>
              <div>
                <dt>{copy.proofFocus}</dt>
                <dd>{step.proofFocus}</dd>
              </div>
              <div>
                <dt>{copy.completionSignal}</dt>
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

function HiringCommandRoleCard({
  role,
  copy,
}: {
  role: HiringCommandCenterRole;
  copy: HiringViewCopy;
}) {
  return (
    <article className="hiring-command-role">
      <div className="hiring-command-role-head">
        <small>{role.id}</small>
        <h3>{role.label}</h3>
        <p>{role.currentSignal}</p>
      </div>

      <div className="hiring-command-proof">
        <div className="label">{copy.command.proofBeforeAction}</div>
        <h4>{role.proof.claim}</h4>
        <p>{role.proof.evidence}</p>
        <Link href={role.proof.href}>{copy.inspectProofAnchor}</Link>
      </div>

      <div className="hiring-command-focus">
        <strong>{copy.decisionFocus}</strong>
        <p>{role.decisionFocus}</p>
      </div>

      <div className="hiring-command-move">
        <strong>{copy.openingMove}</strong>
        <p>{role.openingMove}</p>
      </div>

      <div className="hiring-command-gate">
        <strong>{copy.command.proofGate}</strong>
        <p>{role.proofGate}</p>
      </div>

      <div className="hiring-command-risk">
        <strong>{copy.command.managerRisk}</strong>
        <p>{role.managerRisk}</p>
      </div>

      <div className="hiring-command-handoff">
        <strong>{copy.command.teamHandoff}</strong>
        <p>{role.teamHandoff}</p>
      </div>

      <div className="hiring-command-ritual">
        <strong>{copy.command.followUpRitual}</strong>
        <p>{role.followUpRitual}</p>
      </div>

      <div className="hiring-command-escalation">
        <strong>{copy.command.escalationTrigger}</strong>
        <p>{role.escalationTrigger}</p>
      </div>

      <div className="hiring-command-next">
        <strong>{copy.command.nextCommandAction}</strong>
        <p>{role.nextCommandAction}</p>
      </div>

      <div className="hiring-command-actions" aria-label={`${role.id} command routes`}>
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
          aria-label={`Contact ${role.id} command`}
        >
          {copy.contact}
        </Link>
      </div>
    </article>
  );
}

function HiringCommandRoles({
  roles,
  copy,
}: {
  roles: HiringCommandCenterRole[];
  copy: HiringViewCopy;
}) {
  return (
    <section
      className="hiring-command-section"
      id="hiring-command-roles"
      aria-labelledby="hiring-command-roles-title"
    >
      <div className="hiring-command-section-head">
        <div>
          <div className="label">{copy.command.rolesEyebrow}</div>
          <h2 id="hiring-command-roles-title">{copy.command.rolesTitle}</h2>
        </div>
        <p>{copy.command.rolesIntro}</p>
      </div>
      <div className="hiring-command-role-grid">
        {roles.map((role) => (
          <HiringCommandRoleCard copy={copy} role={role} key={role.id} />
        ))}
      </div>
    </section>
  );
}

function HiringCommandCheckpoints({
  checkpoints,
  copy,
}: {
  checkpoints: HiringCommandCenterCheckpoint[];
  copy: HiringViewCopy;
}) {
  return (
    <section
      className="hiring-command-section"
      aria-labelledby="hiring-command-checkpoints-title"
    >
      <div className="hiring-command-section-head">
        <div>
          <div className="label">{copy.command.checkpointsEyebrow}</div>
          <h2 id="hiring-command-checkpoints-title">{copy.command.checkpointsTitle}</h2>
        </div>
        <p>{copy.command.checkpointsIntro}</p>
      </div>
      <div className="hiring-command-checkpoint-grid">
        {checkpoints.map((checkpoint) => (
          <article className="hiring-command-checkpoint" key={checkpoint.id}>
            <small>{checkpoint.label}</small>
            <h3>{checkpoint.title}</h3>
            <p>{checkpoint.body}</p>
            <div className="hiring-command-checkpoint-actions">
              <Link className="btn btn-ghost" href={checkpoint.route}>
                {copy.openRoute}
              </Link>
              <Link className="btn btn-ghost" href={checkpoint.proofHref}>
                {copy.proofAnchor}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function HiringCommandView({ pack }: HiringCommandViewProps) {
  const copy = getHiringViewCopy(pack.locale);

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
              {copy.routeLabel("/hire/briefing", "Hiring briefing")}
            </Link>
            <Link className="btn btn-ghost" href="/hire/readiness">
              {copy.routeLabel("/hire/readiness", "Hiring readiness")}
            </Link>
          </div>
        </div>
        <ul className="hiring-command-role-summary" aria-label={copy.roleSummary}>
          {pack.roles.map((role) => (
            <li key={role.id}>
              <span>{role.label}</span>
              <strong>{role.id}</strong>
              <span>{copy.proofReady}</span>
            </li>
          ))}
        </ul>
      </header>

      <HiringCommandSummary copy={copy} summary={pack.summary} />
      <HiringCommandSequence copy={copy} sequence={pack.sequence} />
      <HiringCommandRoles copy={copy} roles={pack.roles} />
      <HiringCommandCheckpoints checkpoints={pack.checkpoints} copy={copy} />
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
          <div className="label">{copy.nextAction}</div>
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
