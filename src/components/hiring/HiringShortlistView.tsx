import Link from "next/link";
import type {
  HiringShortlistMemo,
  HiringShortlistRole,
  HiringShortlistSummaryItem,
} from "@/lib/proof";
import { HiringRouteShelf } from "./HiringRouteShelf";

interface HiringShortlistViewProps {
  memo: HiringShortlistMemo;
}

function HiringShortlistSummary({
  summary,
}: {
  summary: HiringShortlistSummaryItem[];
}) {
  return (
    <section className="hiring-shortlist-section" aria-labelledby="hiring-shortlist-summary-title">
      <div className="hiring-shortlist-section-head">
        <div>
          <div className="label">Memo frame</div>
          <h2 id="hiring-shortlist-summary-title">Memo summary</h2>
        </div>
        <p>
          Keep the shortlist memo small enough to forward: role lane, proof anchor,
          boundary, and next action.
        </p>
      </div>
      <div className="hiring-shortlist-summary-grid">
        {summary.map((item) => (
          <article className="hiring-shortlist-summary-item" key={item.id}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function HiringShortlistRoleCard({ role }: { role: HiringShortlistRole }) {
  return (
    <article className="hiring-shortlist-role">
      <div className="hiring-shortlist-role-head">
        <small>{role.id}</small>
        <h3>{role.label}</h3>
        <p>{role.shortlistThesis}</p>
      </div>

      <div className="hiring-shortlist-decision">
        <strong>{role.decisionLabel}</strong>
        <p>{role.managerNote}</p>
      </div>

      <div className="hiring-shortlist-proof">
        <div className="label">Proof to forward</div>
        <h4>{role.proof.claim}</h4>
        <p>{role.proof.evidence}</p>
        <Link href={role.proof.href}>Inspect proof anchor</Link>
      </div>

      <div className="hiring-shortlist-boundary">
        <strong>Boundary before moving forward</strong>
        <p>{role.proof.boundary}</p>
      </div>

      <div className="hiring-shortlist-next">
        <strong>Next action</strong>
        <p>{role.nextAction}</p>
      </div>

      <div className="hiring-shortlist-actions" aria-label={`${role.id} shortlist routes`}>
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
        <Link className="btn btn-primary" href={role.contactRoute}>
          Contact
        </Link>
      </div>
    </article>
  );
}

function HiringShortlistRoles({ roles }: { roles: HiringShortlistRole[] }) {
  return (
    <section
      className="hiring-shortlist-section"
      id="hiring-shortlist-roles"
      aria-labelledby="hiring-shortlist-roles-title"
    >
      <div className="hiring-shortlist-section-head">
        <div>
          <div className="label">Role lanes</div>
          <h2 id="hiring-shortlist-roles-title">Role shortlist lanes</h2>
        </div>
        <p>
          Each lane gives a recruiter the shareable memo text, proof anchor,
          boundary, and route actions needed before moving Lewis forward.
        </p>
      </div>
      <div className="hiring-shortlist-role-grid">
        {roles.map((role) => (
          <HiringShortlistRoleCard role={role} key={role.id} />
        ))}
      </div>
    </section>
  );
}

export function HiringShortlistView({ memo }: HiringShortlistViewProps) {
  return (
    <article className="hiring-shortlist-board container" aria-labelledby="hiring-shortlist-title">
      <header className="hiring-shortlist-hero">
        <div>
          <div className="label">{memo.hero.eyebrow}</div>
          <h1 id="hiring-shortlist-title">{memo.hero.headline}</h1>
          <p>{memo.hero.subhead}</p>
          <div className="hiring-shortlist-actions">
            <Link className="btn btn-primary" href={memo.hero.primaryAction.href}>
              {memo.hero.primaryAction.label}
            </Link>
            <Link className="btn btn-ghost" href={memo.hero.secondaryAction.href}>
              {memo.hero.secondaryAction.label}
            </Link>
            <Link className="btn btn-ghost" href={memo.interviewRoute}>
              Interview agenda
            </Link>
            <Link className="btn btn-ghost" href={memo.compareRoute}>
              Compare role paths
            </Link>
          </div>
        </div>
        <ul className="hiring-shortlist-role-summary" aria-label="Hiring shortlist role summary">
          {memo.roles.map((role) => (
            <li key={role.id}>
              <span>{role.label}</span>
              <strong>{role.id}</strong>
              <span>Proof ready</span>
            </li>
          ))}
        </ul>
      </header>

      <HiringShortlistSummary summary={memo.summary} />
      <HiringShortlistRoles roles={memo.roles} />
      <HiringRouteShelf
        links={[
          { label: "Open proof review", href: memo.reviewRoute },
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

      <section className="hiring-shortlist-close" aria-labelledby="hiring-shortlist-close-title">
        <div>
          <div className="label">Next action</div>
          <h2 id="hiring-shortlist-close-title">{memo.close.title}</h2>
          <p>{memo.close.body}</p>
        </div>
        <div className="hiring-shortlist-actions">
          <Link className="btn btn-primary" href={memo.close.primaryAction.href}>
            {memo.close.primaryAction.label}
          </Link>
        </div>
      </section>
    </article>
  );
}
