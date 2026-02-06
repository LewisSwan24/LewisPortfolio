import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/content/ContactForm";
import { siteConfig } from "@/lib/site";
import { getCurrentDictionary } from "@/lib/i18n-server";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name} for collaboration or inquiries.`,
};

 export default function ContactPage() {
  const { dict } = getCurrentDictionary();

  const contactMethods = [
    {
      id: "email",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: dict.contact.methods.email.title,
      description: dict.contact.methods.email.description,
      value: siteConfig.author.email,
      href: `mailto:${siteConfig.author.email}`,
      action: dict.contact.methods.email.action,
    },
    {
      id: "linkedin",
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      title: dict.contact.methods.linkedin.title,
      description: dict.contact.methods.linkedin.description,
      value: dict.contact.methods.linkedin.value,
      href: siteConfig.social.linkedin,
      action: dict.contact.methods.linkedin.action,
      external: true,
    },
    {
      id: "location",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: dict.contact.methods.location.title,
      description: dict.contact.methods.location.description,
      value: siteConfig.author.location,
      href: null,
      action: null,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="blob blob-1 w-[500px] h-[500px] -top-40 -right-40" />
          <div className="blob blob-2 w-[400px] h-[400px] -bottom-40 -left-40" />
        </div>

        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent mb-6">
              <span className="w-2 h-2 rounded-full bg-accent motion-safe:animate-pulse" />
              {dict.cta.openToOpportunities}
            </span>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {dict.contact.hero.title.prefix}
              <span className="gradient-text">{dict.contact.hero.title.highlight}</span>
              {dict.contact.hero.title.suffix}
            </h1>

            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {dict.contact.hero.description}
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
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
        </Container>
      </section>

      {/* Contact Methods */}
      <section className="py-24">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {contactMethods.map((method, index) => (
              <div
                key={method.id}
                className={`animate-fade-in stagger-${index + 1} group relative rounded-2xl border border-border/50 bg-card p-8 transition-all duration-300 motion-reduce:transition-none hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5 motion-safe:hover:-translate-y-1`}
              >
                {/* Icon */}
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-transform motion-reduce:transition-none motion-safe:group-hover:scale-110">
                  {method.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {method.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {method.description}
                </p>

                {/* Value / Link */}
                {method.href ? (
                  <a
                    href={method.href}
                    target={method.external ? "_blank" : undefined}
                    rel={method.external ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-2 text-accent font-medium hover:underline"
                  >
                    {method.value}
                    <svg className="w-4 h-4 transition-transform motion-reduce:transition-none motion-safe:group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                ) : (
                  <p className="text-foreground font-medium">{method.value}</p>
                )}

                {/* Gradient border on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10">
                  <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-br from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))]" />
                  <div className="absolute inset-0 rounded-2xl bg-card" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 bg-muted/30 relative">
        <div className="absolute inset-0 noise" />
        
        <Container>
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-sm font-medium text-accent uppercase tracking-wider">{dict.contact.form.label}</span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {dict.contact.form.title}
              </h2>
              <p className="mt-3 text-lg text-muted-foreground">
                {dict.contact.form.description}
              </p>
            </div>

            {/* Form Card */}
            <div className="rounded-3xl border border-border/50 bg-card p-8 sm:p-10 shadow-xl">
              <ContactForm dict={dict} />
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <Container>
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-accent uppercase tracking-wider">{dict.contact.faq.label}</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {dict.contact.faq.title}
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {dict.contact.faq.items.map((faq, index) => (
              <div
                key={faq.q}
                className={`animate-fade-in stagger-${index + 1} rounded-2xl border border-border/50 bg-card/50 p-6`}
              >
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-accent text-sm font-bold">
                    {index + 1}
                  </span>
                  {faq.q}
                </h3>
                <p className="text-muted-foreground pl-11">{faq.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
