import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/effects/AnimatedSection";
import { ParallaxBackground } from "@/components/effects/ParallaxBackground";
import { DynamicSkillsVisualization } from "@/components/seo/DynamicImports";
import { siteConfig } from "@/lib/site";
import { getCurrentDictionary } from "@/lib/i18n-compat";

export const metadata: Metadata = {
  title: "About",
  description: `Learn more about ${siteConfig.name}, a UQ Master of Interaction Design student.`,
};

 export default async function AboutPage() {
  const { dict } = await getCurrentDictionary();

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <ParallaxBackground />
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="blob blob-1 w-[400px] h-[400px] -top-20 right-0" />
          <div className="blob blob-2 w-[300px] h-[300px] bottom-0 -left-20" />
        </div>

        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text content */}
            <div className="order-2 lg:order-1">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent mb-6">
                <span className="w-2 h-2 rounded-full bg-accent motion-safe:animate-pulse" />
                {dict.about.badge}
              </span>

              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {dict.about.title.prefix}
                <span className="gradient-text">{dict.about.title.highlight}</span>
                {dict.about.title.suffix}
              </h1>

              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                {dict.about.intro.p1}
              </p>

              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                {dict.about.intro.p2}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/projects" className="glow">
                  <span className="flex items-center gap-2">
                    {dict.cta.viewProjects}
                    <svg className="w-4 h-4 transition-transform motion-reduce:transition-none motion-safe:group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Button>
                <Button href="/resume.pdf" variant="secondary" download>
                  {dict.cta.downloadResume}
                </Button>
              </div>
            </div>

            {/* Profile image placeholder */}
            <div className="order-1 lg:order-2">
              <div className="relative mx-auto w-64 h-64 sm:w-80 sm:h-80 lg:w-full lg:h-96">
                {/* Decorative rings */}
                <div className="absolute inset-0 rounded-3xl border-2 border-dashed border-accent/20 motion-safe:animate-[spin_20s_linear_infinite]" />
                <div className="absolute inset-4 rounded-3xl border-2 border-dashed border-accent/30 motion-safe:animate-[spin_15s_linear_infinite_reverse]" />
                
                {/* Main container */}
                <div className="absolute inset-8 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center overflow-hidden">
                  <div className="text-center">
                    <div className="text-6xl mb-4">{"🧑‍🎨"}</div>
                    <p className="text-sm text-muted-foreground">{dict.about.profilePhoto}</p>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center animate-float">
                  <span className="text-2xl">{"✨"}</span>
                </div>
                <div className="absolute -bottom-4 -left-4 w-14 h-14 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center animate-float" style={{ animationDelay: '-1.5s' }}>
                  <span className="text-xl">{"🎨"}</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Design Principles */}
      <section className="py-24 bg-muted/30 relative">
        <div className="absolute inset-0 noise" />
        
        <Container>
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-accent uppercase tracking-wider">{dict.about.sections.philosophy.label}</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {dict.about.sections.philosophy.title}
            </h2>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
              {dict.about.sections.philosophy.description}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {dict.about.designPrinciples.map((principle: any, index: number) => (
              <div
                key={principle.title}
                className={`animate-fade-in stagger-${index + 1} group relative rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300 motion-reduce:transition-none hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5 motion-safe:hover:-translate-y-1`}
              >
                {/* Icon */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-2xl transition-transform motion-reduce:transition-none motion-safe:group-hover:scale-110">
                  {principle.icon}
                </div>
                
                <h3 className="font-semibold text-foreground text-lg mb-2">
                  {principle.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {principle.description}
                </p>

                {/* Gradient border on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 motion-reduce:transition-none -z-10">
                  <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-br from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))]" />
                  <div className="absolute inset-0 rounded-2xl bg-card" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Toolbox */}
      <section className="py-24">
        <Container>
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-accent uppercase tracking-wider">{dict.about.sections.toolbox.label}</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {dict.about.sections.toolbox.title}
            </h2>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
              {dict.about.sections.toolbox.description}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 items-start">
            {/* Skills Radar Chart */}
            <div className="flex justify-center">
              <DynamicSkillsVisualization
                skills={[
                  { name: "User Research", level: 90, category: "research" },
                  { name: "Prototyping", level: 85, category: "design" },
                  { name: "Visual Design", level: 80, category: "design" },
                  { name: "Accessibility", level: 85, category: "design" },
                  { name: "React / Next.js", level: 75, category: "technical" },
                  { name: "Design Systems", level: 80, category: "design" },
                  { name: "Usability Testing", level: 88, category: "research" },
                  { name: "Communication", level: 85, category: "soft" },
                ]}
                size={320}
              />
            </div>

            {/* Tool Categories */}
            <div className="space-y-6">
              {dict.about.toolCategories.map((category: any, catIndex: number) => (
                <div
                  key={category.name}
                  className={`animate-fade-in stagger-${catIndex + 1} rounded-2xl border border-border/50 bg-card/50 p-6`}
                >
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    {category.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.tools.map((tool: any) => (
                      <span
                        key={tool}
                        className="inline-flex items-center px-3 py-1.5 rounded-lg bg-muted/50 text-sm font-medium text-foreground border border-border/50 hover:border-accent/50 hover:bg-accent/10 transition-all cursor-default"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Timeline / Journey */}
      <section className="py-24 bg-muted/30 relative">
        <div className="absolute inset-0 noise" />
        
        <Container>
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-accent uppercase tracking-wider">{dict.about.sections.journey.label}</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {dict.about.sections.journey.title}
            </h2>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
              {dict.about.sections.journey.description}
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent/50 to-transparent" />

              {/* Timeline items */}
              <div className="space-y-12">
                {dict.about.timeline.map((item: any, index: number) => (
                  <div
                    key={item.title}
                    className={`animate-fade-in stagger-${index + 1} relative pl-20`}
                  >
                    {/* Year badge */}
                    <div className="absolute left-0 w-16 h-16 rounded-2xl bg-accent flex items-center justify-center text-accent-foreground font-bold text-lg shadow-lg shadow-accent/25">
                      {item.year}
                    </div>

                    {/* Content */}
                    <div className="rounded-2xl border border-border/50 bg-card p-6">
                      <h3 className="font-semibold text-foreground text-lg">
                        {item.title}
                      </h3>
                      <p className="text-sm text-accent mt-1">{item.org}</p>
                      <p className="text-muted-foreground mt-3 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Fun facts */}
      <section className="py-24">
        <Container>
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-accent uppercase tracking-wider">{dict.about.sections.personal.label}</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {dict.about.sections.personal.title}
            </h2>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
              {dict.about.sections.personal.description}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
            {dict.about.funFacts.map((fact: any, index: number) => (
              <div
                key={fact.label}
                className={`animate-scale-in stagger-${index + 1} text-center p-6 rounded-2xl border border-border/50 bg-card/50 hover:border-accent/50 transition-all`}
              >
                <div className="text-4xl mb-3">{fact.emoji}</div>
                <p className="text-sm text-muted-foreground">{fact.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
