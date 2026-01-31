import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { getCurrentDictionary } from "@/lib/i18n-server";
import { siteConfig } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lab",
  description: `Experimental projects and interactive demos by ${siteConfig.name}.`,
};

const experiments = [
  {
    id: "custom-cursor",
    title: "Custom Cursor",
    description: "A smooth, animated cursor that responds to interactive elements.",
    icon: "🎯",
    status: "live",
  },
  {
    id: "magnetic-buttons",
    title: "Magnetic Buttons",
    description: "Buttons that subtly follow your mouse movement.",
    icon: "🧲",
    status: "live",
  },
  {
    id: "parallax-effects",
    title: "Parallax Effects",
    description: "Multi-layered backgrounds that create depth on scroll.",
    icon: "🌌",
    status: "live",
  },
  {
    id: "glass-morphism",
    title: "Glass Morphism",
    description: "Modern frosted glass UI effects with blur and transparency.",
    icon: "🪟",
    status: "live",
  },
  {
    id: "3d-cards",
    title: "3D Card Tilt",
    description: "Cards that tilt in 3D space following cursor position.",
    icon: "🃏",
    status: "live",
  },
  {
    id: "smooth-scroll",
    title: "Smooth Scroll",
    description: "Custom easing functions for buttery smooth scrolling.",
    icon: "📜",
    status: "live",
  },
];

export default function LabPage() {
  const { dict } = getCurrentDictionary();

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          as="h1"
          title="Lab"
          description="A collection of interactive experiments and UI components. These are the building blocks that power this portfolio."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {experiments.map((experiment) => (
            <div
              key={experiment.id}
              className="group relative rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-layered"
            >
              {/* Status badge */}
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-600 dark:text-green-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  {experiment.status}
                </span>
              </div>

              {/* Icon */}
              <div className="mb-4 text-4xl">{experiment.icon}</div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {experiment.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {experiment.description}
              </p>

              {/* Hover effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Want to see these in action?
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-accent hover:underline"
          >
            Explore the homepage
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </Container>
    </section>
  );
}
