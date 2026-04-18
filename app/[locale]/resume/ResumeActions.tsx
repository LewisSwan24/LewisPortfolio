"use client";

import { useLocale, useTranslations } from "next-intl";

export function ResumeActions() {
  const t = useTranslations();
  const locale = useLocale();
  const isZh = locale === "zh";

  return (
    <div className="res-actions">
      <button
        className="btn btn-ghost"
        type="button"
        onClick={() => window.print()}
      >
        {t("resume.print")}
      </button>
      <button
        className="btn btn-primary"
        type="button"
        onClick={() =>
          alert(isZh ? "这里会下载 PDF。" : "PDF download would trigger here.")
        }
      >
        {t("resume.download")} <span className="arrow">↓</span>
      </button>
    </div>
  );
}
