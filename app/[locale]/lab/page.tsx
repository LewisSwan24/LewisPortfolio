import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getCurrentDictionary } from "@/lib/i18n-compat";
import { siteConfig } from "@/lib/site";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { TiltCard } from "@/components/effects/TiltCard";

export const metadata: Metadata = {
  title: "Lab",
  description: `Experimental projects and interactive demos by ${siteConfig.name}.`,
};

export default async function LabPage() {
  const { dict } = await getCurrentDictionary();

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          as="h1"
          title={dict.lab.title}
          description={dict.lab.description}
        />

        {/* Magnetic Buttons Demo */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-foreground mb-4">{dict.lab.magneticButtons.title}</h2>
          <p className="text-muted-foreground mb-8">
            {dict.lab.magneticButtons.description}
          </p>
          <div className="flex flex-wrap gap-4 p-8 rounded-2xl border border-border bg-card/50">
            <MagneticButton className="inline-flex items-center justify-center rounded-xl bg-accent text-accent-foreground px-6 py-3 text-sm font-medium shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-shadow">{dict.lab.magneticButtons.hover}</MagneticButton>
            <MagneticButton className="inline-flex items-center justify-center rounded-xl border border-border bg-card text-foreground px-6 py-3 text-sm font-medium hover:border-accent/50 transition-colors">{dict.lab.magneticButtons.secondary}</MagneticButton>
            <MagneticButton className="inline-flex items-center justify-center rounded-xl text-muted-foreground px-6 py-3 text-sm font-medium hover:text-foreground hover:bg-muted/50 transition-colors">{dict.lab.magneticButtons.ghost}</MagneticButton>
          </div>
        </div>

        {/* 3D Card Tilt Demo */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-foreground mb-4">{dict.lab.tiltCards.title}</h2>
          <p className="text-muted-foreground mb-8">
            {dict.lab.tiltCards.description}
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <TiltCard>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20">
                <div className="text-4xl mb-4">{"🎹"}</div>
                <h3 className="font-semibold text-foreground mb-2">{dict.lab.tiltCards.design}</h3>
                <p className="text-sm text-muted-foreground">
                  {dict.lab.tiltCards.designDesc}
                </p>
              </div>
            </TiltCard>
            <TiltCard>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/20">
                <div className="text-4xl mb-4">{"⚡"}</div>
                <h3 className="font-semibold text-foreground mb-2">{dict.lab.tiltCards.performance}</h3>
                <p className="text-sm text-muted-foreground">
                  {dict.lab.tiltCards.performanceDesc}
                </p>
              </div>
            </TiltCard>
            <TiltCard>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/20">
                <div className="text-4xl mb-4">{"♿"}</div>
                <h3 className="font-semibold text-foreground mb-2">{dict.lab.tiltCards.accessibility}</h3>
                <p className="text-sm text-muted-foreground">
                  {dict.lab.tiltCards.accessibilityDesc}
                </p>
              </div>
            </TiltCard>
          </div>
        </div>

        {/* Glass Morphism Demo */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-foreground mb-4">{dict.lab.glassMorphism.title}</h2>
          <p className="text-muted-foreground mb-8">
            {dict.lab.glassMorphism.description}
          </p>
          <div className="relative p-12 rounded-3xl overflow-hidden bg-gradient-to-br from-accent/30 via-accent/10 to-transparent">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 via-transparent to-blue-500/30" />
            <div className="relative grid gap-6 sm:grid-cols-2">
              <div className="glass p-6 rounded-2xl border border-white/20">
                <h3 className="font-semibold text-foreground mb-2">{dict.lab.glassMorphism.glassCard}</h3>
                <p className="text-sm text-muted-foreground">
                  {dict.lab.glassMorphism.glassCardDesc}
                </p>
              </div>
              <div className="glass-heavy p-6 rounded-2xl border border-white/20">
                <h3 className="font-semibold text-foreground mb-2">{dict.lab.glassMorphism.heavyGlass}</h3>
                <p className="text-sm text-muted-foreground">
                  {dict.lab.glassMorphism.heavyGlassDesc}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Animation Playground */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-foreground mb-4">{dict.lab.animations.title}</h2>
          <p className="text-muted-foreground mb-8">
            {dict.lab.animations.description}
          </p>
          <div className="p-8 rounded-2xl border border-border bg-card/50 space-y-8">
            {/* Fade In */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground w-24">{dict.lab.animations.fadeIn}</span>
              <div className="animate-fade-in px-4 py-2 rounded-lg bg-accent text-accent-foreground">
                Animate Fade In
              </div>
            </div>

            {/* Scale In */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground w-24">{dict.lab.animations.scaleIn}</span>
              <div className="animate-scale-in px-4 py-2 rounded-lg bg-green-500 text-white">
                Animate Scale In
              </div>
            </div>

            {/* Float */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground w-24">{dict.lab.animations.float}</span>
              <div className="animate-float px-4 py-2 rounded-lg bg-purple-500 text-white">
                Floating Animation
              </div>
            </div>
          </div>
        </div>

        {/* Component Info */}
        <div className="mt-16 rounded-2xl border border-border bg-muted/30 p-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            {dict.lab.about.title}
          </h3>
          <p className="text-muted-foreground mb-4">
            {dict.lab.about.description}
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {dict.lab.about.features.map((feature: any, index: number) => (
              <li key={index} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
