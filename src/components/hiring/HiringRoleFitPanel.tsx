import Link from "next/link";
import type { HiringRoleFit } from "@/lib/portfolio-proof";

interface HiringRoleFitPanelProps {
  roles: HiringRoleFit[];
  eyebrow?: string;
  title: string;
  intro?: string;
  compact?: boolean;
}

export function HiringRoleFitPanel({
  roles,
  eyebrow = "Role fit",
  title,
  intro,
  compact = false,
}: HiringRoleFitPanelProps) {
  return (
    <section
      className={`hiring-role-fit ${compact ? "is-compact" : ""}`}
      aria-labelledby="role-fit-title"
    >
      <div className="hiring-role-fit-head">
        <div>
          <div className="label">{eyebrow}</div>
          <h2 id="role-fit-title">{title}</h2>
        </div>
        {intro && <p>{intro}</p>}
      </div>

      <div className="hiring-role-fit-grid">
        {roles.map((role) => (
          <article className="hiring-role-card" key={role.id}>
            <div>
              <h3>{role.label}</h3>
              <p>{role.fit}</p>
            </div>

            <div className="hiring-role-links">
              {role.proofLinks.map((link) => (
                <Link href={link.href} key={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>

            <dl>
              <div>
                <dt>Best interview angle</dt>
                <dd>{role.interviewAngle}</dd>
              </div>
              <div>
                <dt>Limit</dt>
                <dd>{role.risk}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
