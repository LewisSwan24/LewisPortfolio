import Link from "next/link";
import {
  getProofUiLabels,
  proofAnchorEventAttrs,
  type CaseReaderAnchorId,
  type ProofUiLabels,
  type ProjectEvidenceSlug,
  type RolePacket,
} from "@/lib/proof";

interface RolePacketProofListProps {
  packet: RolePacket;
  labels?: ProofUiLabels;
}

function proofAttrs(packet: RolePacket, href: string) {
  const [, caseSlug, anchorId] = href.match(/^\/projects\/([^#]+)#(.+)$/) ?? [];

  if (!caseSlug || !anchorId) {
    return {};
  }

  return proofAnchorEventAttrs({
    source: "hire-role",
    role: packet.id,
    caseSlug: caseSlug as ProjectEvidenceSlug,
    anchorId: anchorId as CaseReaderAnchorId,
  });
}

export function RolePacketProofList({
  packet,
  labels = getProofUiLabels("en"),
}: RolePacketProofListProps) {
  return (
    <section className="role-packet-proof-list" aria-labelledby="role-packet-proof-title">
      <div className="label">{labels.bestProof}</div>
      <h2 id="role-packet-proof-title">{labels.bestProofForRole}</h2>
      <div className="role-packet-proof-items">
        {packet.proofClaims.map((claim, index) => (
          <Link
            href={claim.strongestAnchor}
            key={claim.id}
            {...proofAttrs(packet, claim.strongestAnchor)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{claim.claim}</h3>
            <p>{claim.evidence}</p>
            <small>{claim.boundary}</small>
          </Link>
        ))}
      </div>
    </section>
  );
}
