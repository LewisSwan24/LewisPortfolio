"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site";
import type { Dictionary, Language } from "@/lib/i18n";
import { Container } from "./Container";
import { SearchModal } from "./SearchModal";

// Dynamic imports for non-critical components
const ThemeToggle = dynamic(() => import("./ThemeToggle").then(mod => ({ default: mod.ThemeToggle })), {
  ssr: false,
  loading: () => (
    <div className="h-9 w-9 rounded-lg border border-border/60 bg-muted/20 animate-pulse" />
  ),
});

const MobileMenu = dynamic(() => import("./MobileMenu").then(mod => ({ default: mod.MobileMenu })), {
  ssr: false,
  loading: () => (
    <div className="md:hidden h-9 w-9 rounded-lg border border-border/60 bg-muted/20" />
  ),
});

const LanguageToggle = dynamic(() => import("./LanguageToggle").then(mod => ({ default: mod.LanguageToggle })), {
  ssr: false,
  loading: () => (
    <div className="h-9 w-auto rounded-lg border border-border/60 bg-muted/20 px-3 animate-pulse" />
  ),
});

interface NavbarProps {
  lang: Language;
  dict: Dictionary;
}

interface SearchItem {
  type: "project" | "blog";
  slug: string;
  title: string;
  description: string;
  tags: string[];
}

interface NavbarPropsWithSearch extends NavbarProps {
  searchItems?: SearchItem[];
}

export function Navbar({ lang, dict, searchItems = [] }: NavbarPropsWithSearch) {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLabels: Record<string, string> = {
    "/": dict.nav.home,
    "/projects": dict.nav.projects,
    "/about": dict.nav.about,
    "/contact": dict.nav.contact,
    "/resume": dict.nav.resume,
    "/blog": dict.nav.blog || "Blog",
  };

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Gradient line at top */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />

      {/* Glass background */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm shadow-black/5">
        <Container>
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="group flex items-center gap-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
            >
              {/* Logo mark */}
              <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-accent text-accent-foreground font-bold text-sm shadow-lg shadow-accent/20 transition-transform duration-200 ease-out motion-reduce:transition-none motion-safe:group-hover:scale-105 motion-safe:group-active:scale-[0.98]">
                {siteConfig.name.charAt(0)}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent" />
              </div>
              {/* Logo text */}
              <span className="hidden sm:block text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
                {siteConfig.name}
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex md:items-center md:gap-1 rounded-full border border-border/60 bg-background/40 backdrop-blur-md shadow-sm shadow-black/5 p-1">
              {siteConfig.navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                    "motion-reduce:transition-none",
                    "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background",
                    pathname === link.href
                      ? "text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {pathname === link.href && (
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] shadow-lg shadow-accent/25" />
                  )}
                  <span className="relative">
                    {navLabels[link.href] ?? link.label}
                  </span>
                </Link>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-3">
              {/* CTA Button - desktop only */}
              <Link
                href="/projects"
                className="relative hidden lg:inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] px-4 py-2 text-sm font-medium text-accent-foreground shadow-lg shadow-accent/25 transition-all duration-200 ease-out motion-reduce:transition-none hover:shadow-xl hover:shadow-accent/30 motion-safe:hover:scale-[1.03] motion-safe:active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-background before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-b before:from-white/20 before:to-transparent before:opacity-0 before:transition-opacity motion-reduce:before:transition-none hover:before:opacity-100 after:content-[''] after:absolute after:inset-y-0 after:left-[-150%] after:w-[150%] after:skew-x-[-20deg] after:bg-[linear-gradient(110deg,transparent,hsl(0_0%_100%_/_0.35),transparent)] after:opacity-0 after:pointer-events-none after:transition-all after:duration-700 motion-reduce:after:transition-none motion-safe:hover:after:left-[150%] motion-safe:hover:after:opacity-100"
              >
                <span className="relative z-10">{dict.cta.viewProjects}</span>
                <svg className="relative z-10 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              {/* Divider */}
              <div className="hidden lg:block h-6 w-px bg-border" />

              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 rounded-lg border border-border/60 bg-background/40 backdrop-blur-md px-2.5 py-2 text-muted-foreground shadow-sm shadow-black/5 hover:border-border hover:bg-muted/40 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background transition-all duration-200"
                aria-label="Search (⌘K)"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-border/60 bg-muted/50 px-1.5 py-0.5 text-[10px]">
                  <span>⌘</span>K
                </kbd>
              </button>

              <LanguageToggle lang={lang} dict={dict} />
              <ThemeToggle />
              <MobileMenu dict={dict} navLabels={navLabels} />
            </div>
          </div>
        </Container>
      </div>
      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        items={searchItems}
        placeholder={dict.search?.placeholder || "Search projects and blog posts..."}
      />
    </header>
  );
}
