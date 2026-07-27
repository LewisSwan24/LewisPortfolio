import Link from "next/link";
import type {
  HiringScorecardBoard,
  HiringScorecardCriterion,
  HiringScorecardRole,
} from "@/lib/proof";
import { HiringRouteShelf } from "./HiringRouteShelf";
import { getHiringViewCopy } from "./hiringViewCopy";

interface HiringScorecardViewProps {
  board: HiringScorecardBoard;
}

type HiringViewCopy = ReturnType<typeof getHiringViewCopy>;

function HiringScorecardCriteria({
  criteria,
  copy,
}: {
  criteria: HiringScorecardCriterion[];
  copy: HiringViewCopy;
}) {
  return (
    <section className="hiring-scorecard-section" aria-labelledby="hiring-scorecard-criteria-title">
      <div className="hiring-scorecard-section-head">
        <div>
          <div className="label">{copy.scorecard.criteriaEyebrow}</div>
          <h2 id="hiring-scorecard-criteria-title">{copy.scorecard.criteriaTitle}</h2>
        </div>
        <p>{copy.scorecard.criteriaIntro}</p>
      </div>
      <div className="hiring-scorecard-criteria">
        {criteria.map((criterion) => (
          <article className="hiring-scorecard-criterion" key={criterion.id}>
            <span>{criterion.label}</span>
            <p>{criterion.question}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function HiringScorecardRoleCard({
  role,
  copy,
}: {
  role: HiringScorecardRole;
  copy: HiringViewCopy;
}) {
  return (
    <article className="hiring-scorecard-role">
      <div className="hiring-scorecard-role-head">
        <small>{role.id}</small>
        <h3>{role.label}</h3>
        <p>{role.fitThesis}</p>
      </div>

      <div className="hiring-scorecard-recommendation">
        <strong>{copy.scorecard.recommendationRule}</strong>
        <p>{role.recommendation}</p>
      </div>

      <div className="hiring-scorecard-proof">
        <div className="label">{copy.scorecard.evidenceToScore}</div>
        <h4>{role.proof.claim}</h4>
        <p>{role.proof.evidence}</p>
        <Link href={role.proof.href}>{copy.inspectProofAnchor}</Link>
      </div>

      <div className="hiring-scorecard-boundary">
        <strong>{copy.scorecard.boundaryBeforeShortlist}</strong>
        <p>{role.proof.boundary}</p>
      </div>

      <div className="hiring-scorecard-prompts">
        <strong>{copy.scorecard.scorePrompts}</strong>
        <ul>
          {role.scorePrompts.map((prompt) => (
            <li key={prompt}>{prompt}</li>
          ))}
        </ul>
      </div>

      <div className="hiring-scorecard-actions" aria-label={`${role.id} scorecard routes`}>
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
        <Link className="btn btn-primary" href={role.contactRoute}>
          {copy.contact}
        </Link>
      </div>
    </article>
  );
}

function HiringScorecardRoles({
  roles,
  copy,
}: {
  roles: HiringScorecardRole[];
  copy: HiringViewCopy;
}) {
  return (
    <section
      className="hiring-scorecard-section"
      id="hiring-scorecard-roles"
      aria-labelledby="hiring-scorecard-roles-title"
    >
      <div className="hiring-scorecard-section-head">
        <div>
          <div className="label">{copy.scorecard.rolesEyebrow}</div>
          <h2 id="hiring-scorecard-roles-title">{copy.scorecard.rolesTitle}</h2>
        </div>
        <p>{copy.scorecard.rolesIntro}</p>
      </div>
      <div className="hiring-scorecard-role-grid">
        {roles.map((role) => (
          <HiringScorecardRoleCard copy={copy} role={role} key={role.id} />
        ))}
      </div>
    </section>
  );
}

export function HiringScorecardView({ board }: HiringScorecardViewProps) {
  const copy = getHiringViewCopy(board.locale);

  return (
    <article className="hiring-scorecard-board container" aria-labelledby="hiring-scorecard-title">
      <header className="hiring-scorecard-hero">
        <div>
          <div className="label">{board.hero.eyebrow}</div>
          <h1 id="hiring-scorecard-title">{board.hero.headline}</h1>
          <p>{board.hero.subhead}</p>
          <div className="hiring-scorecard-actions">
            <Link className="btn btn-primary" href={board.hero.primaryAction.href}>
              {board.hero.primaryAction.label}
            </Link>
            <Link className="btn btn-ghost" href={board.hero.secondaryAction.href}>
              {board.hero.secondaryAction.label}
            </Link>
            <Link className="btn btn-ghost" href={board.compareRoute}>
              {copy.routeLabel(board.compareRoute, "Compare role paths")}
            </Link>
            <Link className="btn btn-ghost" href={board.reviewRoute}>
              {copy.routeLabel(board.reviewRoute, "Open proof review")}
            </Link>
          </div>
        </div>
        <ul className="hiring-scorecard-summary" aria-label={copy.roleSummary}>
          {board.roles.map((role) => (
            <li key={role.id}>
              <span>{role.label}</span>
              <strong>{role.id}</strong>
              <span>{copy.proofReady}</span>
            </li>
          ))}
        </ul>
      </header>

      <HiringScorecardCriteria copy={copy} criteria={board.criteria} />
      <HiringScorecardRoles copy={copy} roles={board.roles} />
      <HiringRouteShelf
        links={[
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

      <section className="hiring-scorecard-close" aria-labelledby="hiring-scorecard-close-title">
        <div>
          <div className="label">{copy.nextAction}</div>
          <h2 id="hiring-scorecard-close-title">{board.close.title}</h2>
          <p>{board.close.body}</p>
        </div>
        <div className="hiring-scorecard-actions">
          <Link className="btn btn-primary" href={board.close.primaryAction.href}>
            {board.close.primaryAction.label}
          </Link>
        </div>
      </section>
    </article>
  );
}
