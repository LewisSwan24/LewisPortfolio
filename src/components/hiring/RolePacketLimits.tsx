import { getProofUiLabels, type ProofUiLabels, type RolePacket } from "@/lib/proof";

interface RolePacketLimitsProps {
  packet: RolePacket;
  labels?: ProofUiLabels;
}

export function RolePacketLimits({
  packet,
  labels = getProofUiLabels("en"),
}: RolePacketLimitsProps) {
  return (
    <section className="role-packet-limits" aria-labelledby="role-packet-limits-title">
      <div className="label">{labels.doNotOverclaim}</div>
      <h2 id="role-packet-limits-title">{labels.shouldNotOverclaim}</h2>
      <div className="role-packet-limit-items">
        {packet.proofClaims.map((claim) => (
          <article key={claim.id}>
            <h3>{claim.claim}</h3>
            <p>{claim.boundary}</p>
            <small>{claim.nextValidation}</small>
          </article>
        ))}
      </div>
    </section>
  );
}
