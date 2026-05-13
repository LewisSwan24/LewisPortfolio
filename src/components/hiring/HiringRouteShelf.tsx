import Link from "next/link";

interface HiringRouteShelfLink {
  href: string;
  label: string;
}

interface HiringRouteShelfProps {
  label?: string;
  links: HiringRouteShelfLink[];
}

export function HiringRouteShelf({
  label = "Related hiring routes",
  links,
}: HiringRouteShelfProps) {
  return (
    <nav className="hiring-route-shelf" aria-label="Related hiring navigation">
      <span>{label}</span>
      <div>
        {links.map((link) => (
          <Link href={link.href} key={`${link.href}-${link.label}`}>
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
