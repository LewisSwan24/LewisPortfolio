import Link from "next/link";
import { conversionEventAttrs, type RolePacket } from "@/lib/proof";

interface RolePacketHeroProps {
  packet: RolePacket;
}

function actionHref(packet: RolePacket, href: RolePacket["primaryAction"]["href"]) {
  return href === "/contact" ? `/contact?role=${packet.id}` : href;
}

export function RolePacketHero({ packet }: RolePacketHeroProps) {
  return (
    <section className="role-packet-hero container" aria-labelledby="role-packet-title">
      <div className="role-packet-hero-copy">
        <div className="label">{packet.label}</div>
        <h1 id="role-packet-title">{packet.headline}</h1>
        <p>{packet.fitThesis}</p>
      </div>
      <div className="role-packet-actions">
        <Link
          className="btn btn-primary"
          href={actionHref(packet, packet.primaryAction.href)}
          {...conversionEventAttrs({
            source: "hire-role",
            role: packet.id,
            action: "contact",
          })}
        >
          {packet.primaryAction.label}
        </Link>
        <Link
          className="btn btn-ghost"
          href={packet.secondaryAction.href}
          {...conversionEventAttrs({
            source: "hire-role",
            role: packet.id,
            action: "resume",
          })}
        >
          {packet.secondaryAction.label}
        </Link>
      </div>
    </section>
  );
}
