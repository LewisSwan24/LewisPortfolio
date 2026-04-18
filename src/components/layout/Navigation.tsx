"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState, useTransition } from "react";
import dynamic from "next/dynamic";

const ThemeToggle = dynamic(
  () => import("@/components/providers/ThemeToggle").then((m) => ({ default: m.ThemeToggle })),
  {
    ssr: false,
    loading: () => <div className="tool" aria-hidden="true" style={{ width: 36, height: 32 }} />,
  },
);

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
  const router = useRouter();
  const locale = useLocale();
  const [, startTransition] = useTransition();
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

  const switchLocale = (next: "en" | "zh") => {
    if (next === locale) return;
    const newPath = next === "en" ? stripped || "/" : `/zh${stripped === "/" ? "" : stripped}`;
    startTransition(() => router.push(newPath));
  };

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
            <button type="button" onClick={() => switchLocale(locale === "en" ? "zh" : "en")}>
              <span className={locale === "en" ? "active" : ""}>{t("nav.lang.en")}</span>
              <span aria-hidden="true"> / </span>
              <span className={locale === "zh" ? "active" : ""}>{t("nav.lang.zh")}</span>
            </button>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
