import { Container } from "@/components/ui/Container";
import { AvailabilityPill } from "@/components/ui/AvailabilityPill";
import { StatsStrip } from "@/components/sections/StatsStrip";

interface HeroSectionProps {
  availabilityLabel: string;
  headlineLead: string;
  headlineEmphasis: string;
  headlineTail?: string;
  subHeadline: string;
  stats: { value: string; label: string }[];
}

export function HeroSection({
  availabilityLabel,
  headlineLead,
  headlineEmphasis,
  headlineTail = "",
  subHeadline,
  stats,
}: HeroSectionProps) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="max-w-2xl">
          <AvailabilityPill label={availabilityLabel} />
          <h1 className="mt-6 font-serif text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight text-primary">
            {headlineLead}{" "}
            <span style={{ color: "var(--accent-moss)" }}>{headlineEmphasis}</span>
            {headlineTail}
          </h1>
          <p className="mt-5 text-lg text-secondary leading-relaxed">{subHeadline}</p>
          <StatsStrip stats={stats} />
        </div>
      </Container>
    </section>
  );
}
