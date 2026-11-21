"use client";

import { useTranslations } from "next-intl";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { siteConfig } from "@/lib/site";

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="pd-footer">
      <div className="pd-footer-inner">
        <div className="pd-footer-grid">
          <div className="pd-footer-signature">
            {t("foot.signature.text")} <em>{t("foot.signature.em")}</em>
          </div>

          <div>
            <h4>{t("foot.site")}</h4>
            <ul>
              <li><Link href="/projects">{t("nav.work")}</Link></li>
              <li><Link href="/about">{t("nav.about")}</Link></li>
              <li><Link href="/resume">{t("nav.resume")}</Link></li>
              <li><Link href="/contact">{t("nav.contact")}</Link></li>
            </ul>
          </div>

          <div>
            <h4>{t("foot.write")}</h4>
            <ul>
              <li><Link href="/blog">{t("nav.writing")}</Link></li>
            </ul>
          </div>

          <div>
            <h4>{t("foot.elsewhere")}</h4>
            <ul>
              {siteConfig.social.linkedin ? (
                <li>
                  <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </li>
              ) : null}
              {siteConfig.social.github ? (
                <li>
                  <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </li>
              ) : null}
              {siteConfig.social.dribbble ? (
                <li>
                  <a href={siteConfig.social.dribbble} target="_blank" rel="noopener noreferrer">
                    Dribbble
                  </a>
                </li>
              ) : null}
              <li>
                <a href={`mailto:${t("contact.email")}`}>{t("contact.email")}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pd-footer-meta">
          <span>{t("foot.meta.built")}</span>
          <span>{t("foot.meta.version")}</span>
        </div>
      </div>
    </footer>
  );
}
