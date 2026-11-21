"use client";

import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/providers/ThemeToggle";

const NAV_ITEMS: Array<{ key: "work" | "about" | "resume" | "writing" | "contact"; href: string }> = [
  { key: "work", href: "/projects" },
  { key: "about", href: "/about" },
  { key: "resume", href: "/resume" },
  { key: "writing", href: "/blog" },
  { key: "contact", href: "/contact" },
];

export function Navigation() {
  const t = useTranslations();
  const pathname = usePathname();
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const stripped = (() => {
    const segs = pathname.split("/").filter(Boolean);
    if (segs[0] === "en" || segs[0] === "zh") return "/" + segs.slice(1).join("/");
    return pathname || "/";
  })();

  const currentPath = stripped === "" ? "/" : stripped;
  const currentLocale: "en" | "zh" = locale === "zh" ? "zh" : "en";
  const otherLocale: "en" | "zh" = currentLocale === "en" ? "zh" : "en";
  const localizeHref = (href: string, targetLocale: "en" | "zh" = currentLocale) => {
    const normalizedHref = href === "" ? "/" : href;
    return targetLocale === "zh"
      ? normalizedHref === "/"
        ? "/zh"
        : `/zh${normalizedHref}`
      : normalizedHref;
  };
  const switchHref = localizeHref(currentPath, otherLocale);

  const isCurrent = (href: string) => {
    if (href === "/") return currentPath === "/";
    return currentPath === href || currentPath.startsWith(href + "/");
  };

  return (
    <header className="pd-nav" data-scrolled={scrolled ? "true" : "false"}>
      <div className="pd-nav-inner">
        <a href={localizeHref("/")} className="pd-nav-brand">
          <span className="dot" aria-hidden="true" />
          <span>{t("brand.name")}</span>
          <em>{t("brand.tagline")}</em>
        </a>

        <nav className="pd-nav-links" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={localizeHref(item.href)}
              aria-current={isCurrent(item.href) ? "page" : undefined}
            >
              {t(`nav.${item.key}`)}
            </a>
          ))}
        </nav>

        <div className="pd-nav-tools">
          <button
            type="button"
            className="pd-mobile-toggle"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
          <div className="pd-lang" role="group" aria-label="Language">
            <a href={switchHref} data-locale-switch>
              <span className={currentLocale === "en" ? "active" : ""}>{t("nav.lang.en")}</span>
              <span aria-hidden="true"> / </span>
              <span className={currentLocale === "zh" ? "active" : ""}>{t("nav.lang.zh")}</span>
            </a>
          </div>
          <ThemeToggle />
        </div>
      </div>
      {mobileOpen && (
        <div className="pd-mobile-menu" id="mobile-navigation">
          <nav aria-label="Mobile primary">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={localizeHref(item.href)}
                aria-current={isCurrent(item.href) ? "page" : undefined}
              >
                {t(`nav.${item.key}`)}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
