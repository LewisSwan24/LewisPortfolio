import Link from "next/link";
import { getProofUiLabels, type ProofUiLabels, type RolePacket } from "@/lib/proof";

interface RolePacketNavProps {
  packets: RolePacket[];
  labels?: ProofUiLabels;
}

export function RolePacketNav({
  packets,
  labels = getProofUiLabels("en"),
}: RolePacketNavProps) {
  return (
    <section className="role-packet-nav" aria-labelledby="role-packet-nav-title">
      <div className="role-packet-nav-head">
        <div className="label">{labels.rolePackets}</div>
        <h2 id="role-packet-nav-title">{labels.pickHiringContext}</h2>
      </div>
      <div className="role-packet-nav-list">
        {packets.map((packet) => (
          <Link href={packet.route} key={packet.id}>
            <strong>{packet.label}</strong>
            <span>{packet.fitThesis}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
