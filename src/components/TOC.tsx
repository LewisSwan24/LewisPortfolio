"use client";

import { useLocale } from "next-intl";
import { useState, useEffect } from "react";
import { cn } from "@/lib/cn";
import type { TOCItem } from "@/lib/toc";

interface TOCProps {
  items: TOCItem[];
}

export function TOC({ items }: TOCProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const onThisPage = useLocale() === "zh" ? "本页目录" : "On this page";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -80% 0px",
        threshold: 0,
      }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) {
    return null;
  }

  return (
    <>
      {/* Mobile TOC */}
      <div className="mb-6 lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between rounded-xl border border-border/60 bg-[var(--surface)] px-4 py-3 text-sm font-medium text-foreground transition-all duration-200 motion-reduce:transition-none focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
          aria-expanded={isOpen}
        >
          <span>{onThisPage}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(
              "h-4 w-4 transition-transform motion-reduce:transition-none",
              isOpen && "rotate-180"
            )}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
        {isOpen && (
          <nav className="mt-2 rounded-xl border border-border/60 bg-[var(--surface)] p-4">
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block text-sm transition-colors motion-reduce:transition-none rounded-md focus:outline-none focus:ring-2 focus:ring-accent/30 focus:ring-offset-2 focus:ring-offset-background",
                      item.level === 3 && "pl-4",
                      activeId === item.id
                        ? "text-accent font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Desktop TOC */}
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <p className="mb-4 text-sm font-medium text-foreground">{onThisPage}</p>
          <nav>
            <ul className="space-y-2 border-l border-border">
              {items.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={cn(
                      "block border-l-2 py-1 text-sm transition-colors motion-reduce:transition-none rounded-r-md focus:outline-none focus:ring-2 focus:ring-accent/30 focus:ring-offset-2 focus:ring-offset-background",
                      item.level === 2 ? "pl-4" : "pl-6",
                      activeId === item.id
                        ? "border-accent text-accent font-medium"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground"
                    )}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
