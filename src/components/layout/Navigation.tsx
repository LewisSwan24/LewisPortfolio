"use client";

import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { ThemeToggle } from "@/components/providers/ThemeToggle";

const NAV_ITEMS: Array<{
  key: "work" | "lab" | "ai" | "writing" | "about" | "contact" | "hire";
  href: string;
  accent?: boolean;
}> = [
  { key: "work", href: "/projects" },
  { key: "lab", href: "/lab" },
  { key: "ai", href: "/ai" },
  { key: "writing", href: "/blog" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
  { key: "hire", href: "/hire", accent: true },
];

export function Navigation() {
  const t = useTranslations();
  const pathname = usePathname();
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // v6.9 (review D03): while the phone menu is open the page behind it is
  // locked and dimmed, and Escape closes it and hands focus back to the toggle.
  useEffect(() => {
    if (!mobileOpen) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setMobileOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      root.style.overflow = previous;
    };
  }, [mobileOpen]);

  // Navigating, or widening past the phone layout, closes it.
  useEffect(() => setMobileOpen(false), [pathname]);
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 961px)");
    const onChange = () => wide.matches && setMobileOpen(false);
    wide.addEventListener("change", onChange);
    return () => wide.removeEventListener("change", onChange);
  }, []);

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
        <Link href="/" className="pd-nav-brand">
          <span className="dot" aria-hidden="true" />
          <span>{t("brand.name")}</span>
          <em>{t("brand.tagline")}</em>
        </Link>

        <nav className="pd-nav-links" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={item.accent ? "pd-nav-hire" : undefined}
              aria-current={isCurrent(item.href) ? "page" : undefined}
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>

        <div className="pd-nav-tools">
          <button
            ref={toggleRef}
            type="button"
            className="pd-mobile-toggle"
            aria-label={
              currentLocale === "zh"
                ? mobileOpen
                  ? "关闭菜单"
                  : "打开菜单"
                : mobileOpen
                  ? "Close menu"
                  : "Open menu"
            }
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
          <nav aria-label={currentLocale === "zh" ? "主导航" : "Mobile primary"}>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={item.accent ? "pd-nav-hire" : undefined}
                aria-current={isCurrent(item.href) ? "page" : undefined}
                onClick={() => setMobileOpen(false)}
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </nav>
        </div>
      )}
      {mobileOpen && typeof document !== "undefined"
        ? createPortal(
            <div
              className="pd-mobile-backdrop"
              aria-hidden="true"
              onClick={() => setMobileOpen(false)}
            />,
            document.body,
          )
        : null}
    </header>
  );
}
