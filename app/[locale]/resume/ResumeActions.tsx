"use client";

import { useTranslations } from "next-intl";

export function ResumeActions() {
  const t = useTranslations();

  return (
    <div className="res-actions">
      <button
        className="btn btn-ghost"
        type="button"
        onClick={() => window.print()}
      >
        {t("resume.print")}
      </button>
      <a className="btn btn-primary" href="/resume.pdf" download>
        {t("resume.download")} <span className="arrow">-&gt;</span>
      </a>
    </div>
  );
}
