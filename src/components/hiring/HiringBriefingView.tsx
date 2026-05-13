import Link from "next/link";
import type {
  HiringBriefingRoomArtifact,
  HiringBriefingRoomPack,
  HiringBriefingRoomRole,
  HiringBriefingRoomStakeholderBrief,
  HiringBriefingRoomSummaryItem,
} from "@/lib/proof";

interface HiringBriefingViewProps {
  pack: HiringBriefingRoomPack;
}

function HiringBriefingSummary({
  summary,
}: {
  summary: HiringBriefingRoomSummaryItem[];
}) {
  return (
    <section className="hiring-briefing-section" aria-labelledby="hiring-briefing-summary-title">
      <div className="hiring-briefing-section-head">
        <div>
          <div className="label">Briefing frame</div>
          <h2 id="hiring-briefing-summary-title">Briefing summary</h2>
        </div>
        <p>
          Use this room when the hiring proof is ready, but each stakeholder needs
          a different reading path, decision question, and next route.
        </p>
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
}: {
  stakeholders: HiringBriefingRoomStakeholderBrief[];
}) {
  return (
    <section
      className="hiring-briefing-section"
      id="hiring-briefing-stakeholders"
      aria-labelledby="hiring-briefing-stakeholders-title"
    >
      <div className="hiring-briefing-section-head">
        <div>
          <div className="label">Audience routes</div>
          <h2 id="hiring-briefing-stakeholders-title">Stakeholder briefs</h2>
        </div>
        <p>
          Each brief names the reader, the proof focus, the question to ask, and
          the decision they should make before opening the next surface.
        </p>
      </div>
      <div className="hiring-briefing-stakeholder-grid">
        {stakeholders.map((stakeholder) => (
          <article className="hiring-briefing-stakeholder" key={stakeholder.id}>
            <small>{stakeholder.label}</small>
            <h3>{stakeholder.goal}</h3>
            <dl>
              <div>
                <dt>Reading focus</dt>
                <dd>{stakeholder.readingFocus}</dd>
              </div>
              <div>
                <dt>Question to ask</dt>
                <dd>{stakeholder.questionToAsk}</dd>
              </div>
              <div>
                <dt>Decision to make</dt>
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

function HiringBriefingRoleCard({ role }: { role: HiringBriefingRoomRole }) {
  return (
    <article className="hiring-briefing-role">
      <div className="hiring-briefing-role-head">
        <small>{role.id}</small>
        <h3>{role.label}</h3>
        <p>{role.briefingSignal}</p>
      </div>

      <div className="hiring-briefing-proof">
        <div className="label">Proof for this briefing</div>
        <h4>{role.proof.claim}</h4>
        <p>{role.proof.evidence}</p>
        <Link href={role.proof.href}>Inspect proof anchor</Link>
      </div>

      <div className="hiring-briefing-context">
        <strong>Stakeholder context</strong>
        <p>{role.stakeholderContext}</p>
      </div>

      <div className="hiring-briefing-opening">
        <strong>Opening context</strong>
        <p>{role.openingContext}</p>
      </div>

      <div className="hiring-briefing-evidence">
        <strong>Evidence to inspect</strong>
        <p>{role.evidenceToInspect}</p>
      </div>

      <div className="hiring-briefing-question">
        <strong>Decision question</strong>
        <p>{role.decisionQuestion}</p>
      </div>

      <div className="hiring-briefing-risk">
        <strong>Risk to resolve</strong>
        <p>{role.riskToResolve}</p>
      </div>

      <div className="hiring-briefing-handoff">
        <strong>Handoff note</strong>
        <p>{role.handoffNote}</p>
      </div>

      <div className="hiring-briefing-owner">
        <strong>Follow-up owner</strong>
        <p>{role.followUpOwner}</p>
      </div>

      <div className="hiring-briefing-next">
        <strong>Next briefing action</strong>
        <p>{role.nextBriefingAction}</p>
      </div>

      <div className="hiring-briefing-actions" aria-label={`${role.id} briefing routes`}>
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
        <Link className="btn btn-ghost" href={role.briefingRoute}>
          Briefing
        </Link>
        <Link className="btn btn-ghost" href={role.commandRoute}>
          Command
        </Link>
        <Link className="btn btn-ghost" href={role.partnershipRoute}>
          Partnership
        </Link>
        <Link className="btn btn-ghost" href={role.retentionRoute}>
          Retention
        </Link>
        <Link className="btn btn-ghost" href={role.growthRoute}>
          Growth
        </Link>
        <Link className="btn btn-ghost" href={role.impactRoute}>
          Impact
        </Link>
        <Link className="btn btn-ghost" href={role.kickoffRoute}>
          Kickoff
        </Link>
        <Link className="btn btn-ghost" href={role.onboardingRoute}>
          Onboarding
        </Link>
        <Link className="btn btn-ghost" href={role.offerRoute}>
          Offer
        </Link>
        <Link className="btn btn-ghost" href={role.decisionRoute}>
          Decision
        </Link>
        <Link className="btn btn-ghost" href={role.debriefRoute}>
          Debrief
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
        <Link
          className="btn btn-primary"
          href={role.contactRoute}
          aria-label={`Contact ${role.id} briefing`}
        >
          Contact
        </Link>
      </div>
    </article>
  );
}

function HiringBriefingRoles({ roles }: { roles: HiringBriefingRoomRole[] }) {
  return (
    <section
      className="hiring-briefing-section"
      id="hiring-briefing-roles"
      aria-labelledby="hiring-briefing-roles-title"
    >
      <div className="hiring-briefing-section-head">
        <div>
          <div className="label">Role lanes</div>
          <h2 id="hiring-briefing-roles-title">Role briefing lanes</h2>
        </div>
        <p>
          Each lane turns the command-center signal into stakeholder context,
          opening context, evidence, decision question, risk, handoff, owner, and
          next action.
        </p>
      </div>
      <div className="hiring-briefing-role-grid">
        {roles.map((role) => (
          <HiringBriefingRoleCard role={role} key={role.id} />
        ))}
      </div>
    </section>
  );
}

function HiringBriefingArtifacts({
  artifacts,
}: {
  artifacts: HiringBriefingRoomArtifact[];
}) {
  return (
    <section
      className="hiring-briefing-section"
      aria-labelledby="hiring-briefing-artifacts-title"
    >
      <div className="hiring-briefing-section-head">
        <div>
          <div className="label">Reusable handoff</div>
          <h2 id="hiring-briefing-artifacts-title">Briefing artifacts</h2>
        </div>
        <p>
          These artifacts package the route, proof anchor, and practical handoff
          note a stakeholder can reuse without rereading the entire portfolio.
        </p>
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
              Hiring readiness
            </Link>
            <Link className="btn btn-ghost" href="/hire/action">
              Hiring action
            </Link>
            <Link className="btn btn-ghost" href="/hire/tracker">
              Hiring tracker
            </Link>
            <Link className="btn btn-ghost" href={pack.partnershipRoute}>
              Partnership operating
            </Link>
            <Link className="btn btn-ghost" href={pack.retentionRoute}>
              Retention readiness
            </Link>
            <Link className="btn btn-ghost" href={pack.growthRoute}>
              Growth roadmap
            </Link>
            <Link className="btn btn-ghost" href={pack.impactRoute}>
              Impact review
            </Link>
            <Link className="btn btn-ghost" href={pack.kickoffRoute}>
              Kickoff plan
            </Link>
            <Link className="btn btn-ghost" href={pack.onboardingRoute}>
              Onboarding plan
            </Link>
            <Link className="btn btn-ghost" href={pack.offerRoute}>
              Offer readiness
            </Link>
            <Link className="btn btn-ghost" href={pack.decisionRoute}>
              Decision pack
            </Link>
            <Link className="btn btn-ghost" href={pack.debriefRoute}>
              Manager debrief
            </Link>
            <Link className="btn btn-ghost" href={pack.shortlistRoute}>
              Shortlist memo
            </Link>
            <Link className="btn btn-ghost" href={pack.scorecardRoute}>
              Hiring scorecard
            </Link>
            <Link className="btn btn-ghost" href={pack.interviewRoute}>
              Interview agenda
            </Link>
            <Link className="btn btn-ghost" href={pack.compareRoute}>
              Compare role paths
            </Link>
            <Link className="btn btn-ghost" href={pack.reviewRoute}>
              Open proof review
            </Link>
          </div>
        </div>
        <ul className="hiring-briefing-role-summary" aria-label="Hiring briefing role summary">
          {pack.roles.map((role) => (
            <li key={role.id}>
              <span>{role.label}</span>
              <strong>{role.id}</strong>
              <a href={role.proof.href}>Proof anchor</a>
            </li>
          ))}
        </ul>
      </header>

      <HiringBriefingSummary summary={pack.summary} />
      <HiringBriefingStakeholders stakeholders={pack.stakeholders} />
      <HiringBriefingRoles roles={pack.roles} />
      <HiringBriefingArtifacts artifacts={pack.artifacts} />

      <section className="hiring-briefing-close" aria-labelledby="hiring-briefing-close-title">
        <div>
          <div className="label">Next action</div>
          <h2 id="hiring-briefing-close-title">{pack.close.title}</h2>
          <p>{pack.close.body}</p>
        </div>
        <div className="hiring-briefing-actions">
          <Link className="btn btn-primary" href={pack.close.primaryAction.href}>
            {pack.close.primaryAction.label}
          </Link>
          <Link className="btn btn-ghost" href={pack.close.secondaryAction.href}>
            {pack.close.secondaryAction.label}
          </Link>
          <Link className="btn btn-ghost" href="/hire/readiness">
            Hiring readiness
          </Link>
          <Link className="btn btn-ghost" href="/hire/action">
            Hiring action
          </Link>
          <Link className="btn btn-ghost" href="/hire/tracker">
            Hiring tracker
          </Link>
          <Link className="btn btn-ghost" href={pack.reviewRoute}>
            Open proof review
          </Link>
        </div>
      </section>
    </article>
  );
}
