import Link from "next/link";
import {
  getProofUiLabels,
  getRolePacket,
  type HiringRoleId,
  type ProofLocale,
} from "@/lib/proof";

interface ContactRoleContextProps {
  role?: string;
  locale: ProofLocale;
}

export function ContactRoleContext({ role, locale }: ContactRoleContextProps) {
  if (!role) return null;

  const packet = getRolePacket(role as HiringRoleId, locale);
  if (!packet) return null;
  const labels = getProofUiLabels(locale);

  return (
    <section className="contact-role-context" aria-labelledby="contact-role-context-title">
      <div>
        <div className="label">{labels.roleContext}</div>
        <h2 id="contact-role-context-title">{packet.label}</h2>
        <p>{packet.fitThesis}</p>
      </div>
      <div className="contact-role-context-links">
        <strong>{labels.bestProof}</strong>
        {packet.proofClaims.slice(0, 2).map((claim) => (
          <Link href={claim.strongestAnchor} key={claim.id}>
            {claim.claim}
          </Link>
        ))}
        <Link href={packet.route}>{labels.openRolePacket}</Link>
      </div>
    </section>
  );
}
