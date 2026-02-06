"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site";
import type { Dictionary } from "@/lib/i18n";

interface MobileMenuProps {
  dict: Dictionary;
  navLabels: Record<string, string>;
  lang?: string;
}

export function MobileMenu({ dict, navLabels, lang }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-background/40 backdrop-blur-md text-foreground shadow-sm shadow-black/5 transition-all duration-200 motion-reduce:transition-none hover:bg-muted/40 hover:border-border focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
        aria-label={isOpen ? dict.mobileMenu.close : dict.mobileMenu.open}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 border-b border-border/50 bg-background/70 backdrop-blur-xl p-4 shadow-lg shadow-black/10">
          <nav className="flex flex-col gap-2">
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "rounded-lg px-4 py-2.5 text-sm font-medium transition-colors motion-reduce:transition-none",
                  "hover:bg-muted focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background",
                  pathname === link.href
                    ? "bg-muted text-accent"
                    : "text-muted-foreground"
                )}
              >
                {navLabels[link.href] ?? link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
