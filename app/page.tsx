import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { HeroTypewriter } from "@/components/HeroTypewriter";
<<<<<<< C:/Users/LewisDong/CascadeProjects/portfolio/app/page.tsx
<<<<<<< C:/Users/LewisDong/CascadeProjects/portfolio/app/page.tsx
<<<<<<< C:/Users/LewisDong/CascadeProjects/portfolio/app/page.tsx
=======
import { AnimatedSection } from "@/components/AnimatedSection";
>>>>>>> C:/Users/LewisDong/.windsurf/worktrees/portfolio/portfolio-28678ea1/app/page.tsx
=======
import { AnimatedSection } from "@/components/AnimatedSection";
>>>>>>> C:/Users/LewisDong/.windsurf/worktrees/portfolio/portfolio-28678ea1/app/page.tsx
=======
import { AnimatedSection } from "@/components/AnimatedSection";
>>>>>>> C:/Users/LewisDong/.windsurf/worktrees/portfolio/portfolio-28678ea1/app/page.tsx
import { siteConfig } from "@/lib/site";
import { getCurrentDictionary } from "@/lib/i18n-server";
import { getFeaturedProjects } from "@/lib/projects";

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();
  const { dict } = getCurrentDictionary();

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 -z-10">
          <div className="blob blob-1 w-[500px] h-[500px] -top-20 -left-20" />
          <div className="blob blob-2 w-[400px] h-[400px] top-1/2 right-0" />
          <div className="blob blob-1 w-[300px] h-[300px] bottom-0 left-1/3" />
        </div>
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 -z-10 opacity-[0.015] dark:opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />

        <Container>
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="animate-fade-in mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                {dict.cta.openToOpportunities}
              </span>
            </div>

            {/* Main heading */}
            <h1 className="animate-fade-in stagger-1 text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl">
              <span className="text-foreground">{dict.home.greeting}</span>
              <span className="gradient-text">
                <HeroTypewriter text={siteConfig.name} />
              </span>
            </h1>
            
            {/* Title with animated underline */}
            <p className="animate-fade-in stagger-2 mt-4 text-xl sm:text-2xl font-medium text-muted-foreground">
              {siteConfig.title}
            </p>

            {/* Description */}
            <p className="animate-fade-in stagger-3 mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {siteConfig.description}
            </p>

            {/* CTA Buttons */}
            <div className="animate-fade-in stagger-4 mt-10 flex flex-wrap gap-4">
              <Button href="/projects" className="glow">
                <span className="flex items-center gap-2">
                  {dict.cta.viewProjects}
                  <svg className="w-4 h-4 transition-transform motion-reduce:transition-none motion-safe:group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Button>
              <Button href="/resume.pdf" variant="secondary" download>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {dict.cta.downloadResume}
                </span>
              </Button>
            </div>

            {/* Social links */}
            <div className="animate-fade-in stagger-5 mt-12 flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{dict.home.findMeOn}</span>
              <div className="flex gap-3">
                {siteConfig.social.linkedin && (
                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-muted/50 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                )}
                {siteConfig.social.github && (
                  <a
                    href={siteConfig.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-muted/50 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    aria-label="GitHub"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                )}
                {siteConfig.social.dribbble && (
                  <a
                    href={siteConfig.social.dribbble}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-muted/50 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    aria-label="Dribbble"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </Container>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-xs uppercase tracking-widest">{dict.common.scroll}</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <AnimatedSection>
        <section className="relative py-24 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="absolute -top-40 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
          
          <Container>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <span className="text-sm font-medium text-accent uppercase tracking-wider">{dict.home.portfolioLabel}</span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {dict.home.featuredProjects}
              </h2>
              <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
                {dict.home.featuredProjectsDescription}
              </p>
            </div>
            <Button href="/projects" variant="ghost" className="shrink-0">
              {dict.cta.viewAll}
            </Button>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.length > 0 ? (
              featuredProjects.map((project, index) => (
                <div key={project.slug} className={`animate-fade-in stagger-${index + 1}`}>
                  <Card project={project} dict={dict} />
                </div>
              ))
            ) : (
              <div className="col-span-full">
                <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-12 text-center">
                  <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <p className="text-muted-foreground">{dict.home.featuredProjectsEmpty}</p>
                </div>
              </div>
            )}
          </div>
        </Container>
        </section>
      </AnimatedSection>

      {/* Skills Section */}
      <AnimatedSection delay={0.1}>
        <section className="relative py-24 bg-muted/30">
          <div className="absolute inset-0 noise" />
        
        <Container>
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-accent uppercase tracking-wider">{dict.home.expertise}</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {dict.home.skillsAndTools}
            </h2>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
              {dict.home.skillsAndToolsDescription}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {siteConfig.skills.map((skill, index) => (
              <span
                key={skill}
                className={`
                  animate-scale-in stagger-${(index % 5) + 1}
                  inline-flex items-center px-4 py-2 rounded-full
                  bg-background border border-border
                  text-sm font-medium text-foreground
                  hover:border-accent hover:shadow-lg hover:shadow-accent/10
                  transition-all duration-300 motion-reduce:transition-none cursor-default
                `}
              >
                {skill}
              </span>
            ))}
          </div>
        </Container>
        </section>
      </AnimatedSection>

      {/* Stats Section */}
      <AnimatedSection delay={0.2}>
        <section className="py-24">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "27", label: dict.home.stats.userInterviews },
              { number: "50", label: dict.home.stats.treeTestParticipants },
              { number: "92%", label: dict.home.stats.taskSuccessRate },
              { number: "84%", label: dict.home.stats.findabilityRate },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className={`animate-fade-in stagger-${index + 1} text-center p-6 rounded-2xl border border-border bg-card/50 hover:border-accent/50 transition-colors`}
              >
                <div className="text-4xl sm:text-5xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Container>
        </section>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection delay={0.3}>
        <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5" />
          <div className="blob blob-1 w-[600px] h-[600px] -bottom-40 -right-40 opacity-30" />
        </div>
        
        <Container>
          <div className="relative rounded-3xl border border-accent/20 bg-card/80 backdrop-blur-sm p-8 sm:p-12 lg:p-16 text-center overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {dict.home.letsWorkTogether}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              {dict.home.letsWorkTogetherDescription}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/projects" className="glow">
                {dict.cta.viewProjects}
              </Button>
              <Button href="/resume.pdf" variant="secondary" download>
                {dict.cta.downloadResume}
              </Button>
            </div>
          </div>
        </Container>
        </section>
      </AnimatedSection>
    </>
  );
}
