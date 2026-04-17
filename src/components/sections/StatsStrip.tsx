interface Stat { value: string; label: string; }
interface StatsStripProps { stats: Stat[]; }

export function StatsStrip({ stats }: StatsStripProps) {
  return (
    <div className="grid grid-cols-3 border-y border-border-warm py-4 my-8">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={i === 0 ? "pr-4" : "border-l border-border-warm pl-4"}
        >
          <div className="text-2xl font-serif font-medium text-primary leading-none">
            {stat.value}
          </div>
          <div className="mt-1 text-xs text-tertiary">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
