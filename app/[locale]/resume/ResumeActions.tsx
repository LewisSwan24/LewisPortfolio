"use client";

import { useLocale, useTranslations } from "next-intl";
import { LocalizedLink } from "@/components/LocalizedLink";

export function ResumeActions() {
  const t = useTranslations();
  const locale = useLocale() === "zh" ? "zh" : "en";
  const isZh = locale === "zh";

  return (
    <div className="res-actions">
      <a
        className="btn btn-primary"
        href={`/resume/lewis-dong-resume-${locale}.pdf`}
        download
      >
        {isZh ? "下载 PDF 简历" : "Download PDF CV"}{" "}
        <span className="arrow" aria-hidden="true">↓</span>
      </a>
      {/* Hidden on phones (pages.css, review C17). */}
      <button
        className="btn btn-ghost res-print"
        type="button"
        onClick={() => window.print()}
      >
        {t("resume.print")}
      </button>
      <LocalizedLink className="btn btn-ghost" href="/resume/compose">
        {isZh ? "定制岗位简历" : "Tailor CV"}{" "}
        <span className="arrow" aria-hidden="true">→</span>
      </LocalizedLink>
      <LocalizedLink className="btn btn-ghost" href="/contact">
        {t("resume.contact")} <span className="arrow" aria-hidden="true">→</span>
      </LocalizedLink>
    </div>
  );
}
