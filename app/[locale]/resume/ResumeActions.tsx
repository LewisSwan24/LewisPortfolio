"use client";

import { useTranslations } from "next-intl";
import { LocalizedLink } from "@/components/LocalizedLink";

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
      <LocalizedLink className="btn btn-primary" href="/contact">
        {t("resume.contact")} <span className="arrow">-&gt;</span>
      </LocalizedLink>
    </div>
  );
}
