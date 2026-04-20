"use client";

import Link from "next/link";
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

  const tail = stripped === "/" ? "" : stripped;
  const otherLocale: "en" | "zh" = locale === "en" ? "zh" : "en";
  const switchHref = otherLocale === "en" ? (tail || "/") : `/zh${tail}`;

  const isCurrent = (href: string) => {
    const norm = stripped === "" ? "/" : stripped;
    if (href === "/") return norm === "/";
    return norm === href || norm.startsWith(href + "/");
  };

  return (
    <header className="pd-nav" data-scrolled={scrolled ? "true" : "false"}>
      <div className="pd-nav-inner">
        <Link href="/" className="pd-nav-brand" aria-label={t("brand.name")}>
          <span className="dot" aria-hidden="true" />
          <span>{t("brand.name")}</span>
          <em>{t("brand.tagline")}</em>
        </Link>

        <nav className="pd-nav-links" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrent(item.href) ? "page" : undefined}
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>

        <div className="pd-nav-tools">
          <div className="pd-lang" role="group" aria-label="Language">
            <a href={switchHref} data-locale-switch>
              <span className={locale === "en" ? "active" : ""}>{t("nav.lang.en")}</span>
              <span aria-hidden="true"> / </span>
              <span className={locale === "zh" ? "active" : ""}>{t("nav.lang.zh")}</span>
            </a>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
