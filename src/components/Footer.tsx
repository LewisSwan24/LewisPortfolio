"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Container } from "./Container";
import { siteConfig } from "@/lib/site";

export function Footer() {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  const navLabels: Record<string, string> = {
    "/": t("nav.home"),
    "/projects": t("nav.projects"),
    "/about": t("nav.about"),
    "/contact": t("nav.contact"),
    "/resume": t("nav.resume"),
  };

  return (
    <footer className="relative border-t border-border/50 bg-card/50">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 right-0 w-60 h-60 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <Container>
        {/* Main footer content */}
        <div className="py-16">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand column */}
            <div className="lg:col-span-2">
              <Link href="/" className="group inline-flex items-center gap-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background">
                <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-accent text-accent-foreground font-bold shadow-lg shadow-accent/20 transition-transform duration-200 ease-out motion-reduce:transition-none motion-safe:group-hover:scale-105 motion-safe:group-active:scale-[0.98]">
                  {siteConfig.name.charAt(0)}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent" />
                </div>
                <span className="text-xl font-semibold text-foreground">
                  {siteConfig.name}
                </span>
              </Link>
              <p className="mt-4 text-muted-foreground max-w-md leading-relaxed">
                {siteConfig.description}
              </p>

              {/* Social links */}
              <div className="mt-6 flex items-center gap-3">
                {siteConfig.social.linkedin && (
                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/40 backdrop-blur-md text-muted-foreground shadow-sm shadow-black/5 transition-all duration-200 motion-reduce:transition-none hover:border-transparent hover:bg-accent hover:text-accent-foreground motion-safe:hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-background"
                    aria-label="LinkedIn"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                )}
                {siteConfig.social.github && (
                  <a
                    href={siteConfig.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/40 backdrop-blur-md text-muted-foreground shadow-sm shadow-black/5 transition-all duration-200 motion-reduce:transition-none hover:border-transparent hover:bg-accent hover:text-accent-foreground motion-safe:hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-background"
                    aria-label="GitHub"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                )}
                {siteConfig.social.dribbble && (
                  <a
                    href={siteConfig.social.dribbble}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/40 backdrop-blur-md text-muted-foreground shadow-sm shadow-black/5 transition-all duration-200 motion-reduce:transition-none hover:border-transparent hover:bg-accent hover:text-accent-foreground motion-safe:hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-background"
                    aria-label="Dribbble"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                {t("footer.navigation")}
              </h3>
              <ul className="mt-4 space-y-3">
                {siteConfig.navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground transition-colors motion-reduce:transition-none hover:text-accent animated-underline"
                    >
                      {navLabels[link.href] ?? link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact info */}
            <div>
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                {t("footer.getInTouch")}
              </h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href={`mailto:${siteConfig.author.email}`}
                    className="flex items-center gap-2 text-muted-foreground transition-colors motion-reduce:transition-none hover:text-accent rounded-md focus:outline-none focus:ring-2 focus:ring-accent/30 focus:ring-offset-2 focus:ring-offset-background"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm">{siteConfig.author.email}</span>
                  </a>
                </li>
                <li>
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm">{siteConfig.author.location}</span>
                  </span>
                </li>
              </ul>

              {/* Resume download */}
              <div className="mt-6">
                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-lg bg-muted/50 px-4 py-2 text-sm font-medium text-foreground transition-all duration-200 motion-reduce:transition-none hover:bg-muted motion-safe:hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:ring-offset-2 focus:ring-offset-background"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {t("footer.downloadResume")}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/50 py-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              &copy; {currentYear} {siteConfig.name}. {t("footer.allRightsReserved")}
            </p>
            <p className="text-xs text-muted-foreground">
              {t("footer.builtWith")}{" "}
              <span className="text-accent">Next.js</span>,{" "}
              <span className="text-accent">TypeScript</span> &{" "}
              <span className="text-accent">Tailwind CSS</span>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
