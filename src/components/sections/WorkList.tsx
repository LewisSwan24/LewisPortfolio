import Link from "next/link";

export interface WorkItem {
  slug: string;
  title: string;
  outcome: string;
  year: string;
  coverGradient?: string;
  coverImage?: string;
}

interface WorkListProps { items: WorkItem[]; }

export function WorkList({ items }: WorkListProps) {
  return (
    <ul className="divide-y divide-border-cream">
      {items.map((item) => (
        <li key={item.slug}>
          <Link
            href={`/projects/${item.slug}`}
            className="grid grid-cols-[40px_1fr_auto] items-center gap-3 py-3 transition-colors hover:bg-ivory"
          >
            <span
              aria-hidden="true"
              className="block h-10 w-10 rounded-md"
              style={{
                background: item.coverImage
                  ? `center / cover no-repeat url(${item.coverImage})`
                  : item.coverGradient ?? "linear-gradient(135deg,#a8a29e,#57534e)",
              }}
            />
            <div>
              <div className="text-sm font-medium text-primary">{item.title}</div>
              <div className="text-xs text-secondary">{item.outcome}</div>
            </div>
            <span className="text-xs text-tertiary">{item.year}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
