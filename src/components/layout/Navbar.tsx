"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site";
import type { Dictionary, Language } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { SearchModal } from "@/components/navigation/SearchModal";

// Dynamic imports for non-critical components
const ThemeToggle = dynamic(() => import("@/components/providers/ThemeToggle").then(mod => ({ default: mod.ThemeToggle })), {
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

const LanguageToggle = dynamic(() => import("@/components/providers/LanguageToggle").then(mod => ({ default: mod.LanguageToggle })), {
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
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setIsSearchOpen(true);
      }
      if (event.key === "Escape" && isMoreOpen) {
        setIsMoreOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMoreOpen]);

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
              {siteConfig.navLinks.slice(0, 4).map((link) => (
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
              
              {/* More dropdown for remaining links */}
              {siteConfig.navLinks.length > 4 && (
                <div className="relative" ref={moreDropdownRef}>
                  <button
                    onClick={() => setIsMoreOpen(!isMoreOpen)}
                    aria-expanded={isMoreOpen}
                    aria-haspopup="true"
                    className="relative rounded-full px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
                  >
                    <span className="flex items-center">
                      {dict.nav.more ?? "More"}
                      <svg className={cn("ml-1 h-4 w-4 transition-transform", isMoreOpen && "rotate-180")} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  {isMoreOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 z-50" role="menu" aria-orientation="vertical">
                      <div className="rounded-lg border border-border/60 bg-background/95 backdrop-blur-xl shadow-lg shadow-black/10 p-1">
                        {siteConfig.navLinks.slice(4).map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            role="menuitem"
                            onClick={() => setIsMoreOpen(false)}
                            className={cn(
                              "block rounded-md px-3 py-2 text-sm transition-colors",
                              pathname === link.href
                                ? "bg-accent text-accent-foreground"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                            )}
                          >
                            {navLabels[link.href] ?? link.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              {/* Search - simplified */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-background/40 backdrop-blur-md text-muted-foreground shadow-sm shadow-black/5 hover:border-border hover:bg-muted/40 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background transition-all duration-200"
                aria-label="Search (⌘K)"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Theme and Language */}
              <div className="hidden sm:flex items-center gap-1 rounded-lg border border-border/60 bg-background/40 backdrop-blur-md shadow-sm shadow-black/5">
                <LanguageToggle lang={lang} dict={dict} />
                <div className="h-5 w-px bg-border/60" />
                <ThemeToggle />
              </div>
              
              {/* Mobile menu */}
              <MobileMenu dict={dict} navLabels={navLabels} lang={lang} />
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
        noResultsText={dict.search?.noResults || "No results found"}
      />
    </header>
  );
}
