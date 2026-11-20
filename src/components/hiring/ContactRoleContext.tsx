import Link from "next/link";
import { localizeInternalHref } from "@/lib/locale-href";
import {
  getHiringRoleFits,
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

  // A role with no listed case behind it has no card on /hire (accessibility,
  // since 2026-11-20), so a stale ?role= link gets the plain form.
  if (!getHiringRoleFits(locale).some((fit) => fit.id === role)) return null;
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
          <Link
            href={localizeInternalHref(claim.strongestAnchor, locale)}
            key={claim.id}
          >
            {claim.claim}
          </Link>
        ))}
        {packet.thread && (
          <Link href={localizeInternalHref(packet.thread.href, locale)}>
            {packet.thread.label}
          </Link>
        )}
        <Link href={localizeInternalHref(packet.route, locale)}>
          {labels.openRolePacket}
        </Link>
      </div>
    </section>
  );
}
