"use client";

import { useId, useState } from "react";
import type { RoleTrack } from "@/lib/cases/schema";
import type { CurrentProjectSlug } from "@/lib/project-routes";
import type { ProofLocale } from "@/lib/portfolio-proof";

interface BriefCaseOption {
  slug: CurrentProjectSlug;
  title: string;
}

interface TailoredBriefBuilderProps {
  cases: BriefCaseOption[];
  locale: ProofLocale;
}

const ROLE_OPTIONS: ReadonlyArray<{ id: RoleTrack; en: string; zh: string }> = [
  { id: "design-eng", en: "Design Engineer", zh: "设计工程师" },
  { id: "ai-ux", en: "AI UX Designer", zh: "AI UX 设计师" },
  { id: "interaction", en: "Interaction Designer", zh: "交互设计师" },
  { id: "product", en: "Product Designer", zh: "产品设计师" },
];

export function TailoredBriefBuilder({ cases, locale }: TailoredBriefBuilderProps) {
  const isZh = locale === "zh";
  const headingId = useId();
  const [company, setCompany] = useState("");
  const [roleTrack, setRoleTrack] = useState<RoleTrack>("design-eng");
  const [targetLocale, setTargetLocale] = useState<ProofLocale>(locale);
  const [intro, setIntro] = useState("");
  const [selectedSlugs, setSelectedSlugs] = useState<CurrentProjectSlug[]>(() =>
    cases.slice(0, 3).map((c) => c.slug)
  );
  const [adminSecret, setAdminSecret] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

  const copy = isZh
    ? {
        eyebrow: "V3.9 定向投递简报生成器",
        title: "为指定公司与岗位生成专属短链",
        summary: "选择最多 4 个重点案例并填写开场说明，自动生成带 noindex 隐私隔离的定制简报链接。",
        company: "目标公司 / 团队名称",
        companyPlaceholder: "如 Atlassian / Canva",
        companyErr: "请填写目标公司名称。",
        role: "目标岗位方向",
        lang: "简报语言",
        intro: "开场定制说明",
        introPlaceholder: "用 1-2 句话说明为什么选这几个案例对齐该岗位。",
        introErr: "请填写简短开场说明。",
        pickCases: "选择重点案例（1–4 个）",
        secret: "管理员口令（仅当服务端启用 PORTFOLIO_ADMIN_SECRET 时需要）",
        submit: submitting ? "生成中..." : "生成定向简报链接",
        copyBtn: "复制链接",
        openBtn: "打开简报",
        copied: "已复制到剪贴板。",
      }
    : {
        eyebrow: "V3.9 Tailored Brief Generator",
        title: "Generate a company-specific review link",
        summary: "Select 1–4 curated cases and a custom opener to generate a noindex tailored dossier URL.",
        company: "Target company or team",
        companyPlaceholder: "e.g. Atlassian / Canva",
        companyErr: "Enter a target company or team name.",
        role: "Role track",
        lang: "Brief language",
        intro: "Tailored opener",
        introPlaceholder: "1–2 sentences explaining why these selected cases fit this team.",
        introErr: "Enter a short opener before generating.",
        pickCases: "Curated cases (1–4)",
        secret: "Admin secret (optional unless PORTFOLIO_ADMIN_SECRET is set)",
        submit: submitting ? "Generating..." : "Generate tailored brief link",
        copyBtn: "Copy link",
        openBtn: "Open brief",
        copied: "Copied link to clipboard.",
      };

  const toggleSlug = (slug: CurrentProjectSlug) => {
    setSelectedSlugs((prev) => {
      if (prev.includes(slug)) {
        return prev.length > 1 ? prev.filter((s) => s !== slug) : prev;
      }
      if (prev.length >= 4) return prev;
      return [...prev, slug];
    });
  };

  const markTouched = (name: string) =>
    setTouchedFields((prev) => ({ ...prev, [name]: true }));

  const companyInvalid = touchedFields.company && company.trim().length === 0;
  const introInvalid = touchedFields.intro && intro.trim().length === 0;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouchedFields({ company: true, intro: true });
    if (!company.trim() || !intro.trim() || selectedSlugs.length === 0) {
      setStatusMessage(isZh ? "请先补全公司名称与开场说明。" : "Complete required fields before generating.");
      return;
    }

    setSubmitting(true);
    setStatusMessage("");
    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (adminSecret.trim()) headers["x-admin-secret"] = adminSecret.trim();

      const res = await fetch("/api/brief", {
        method: "POST",
        headers,
        body: JSON.stringify({
          company: company.trim(),
          roleTrack,
          locale: targetLocale,
          intro: intro.trim(),
          slugs: selectedSlugs,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; url?: string; mode?: string; error?: string };
      if (!res.ok || !data.ok || !data.url) {
        setStatusMessage(data.error ?? (isZh ? "生成失败，请检查权限口令或字段。" : "Could not generate brief link."));
        return;
      }
      const absolute = `${window.location.origin}${data.url}`;
      setGeneratedUrl(data.url);
      setStatusMessage(
        isZh
          ? `已生成${data.mode === "kv" ? "（KV 短链）" : "（无后端静态签名链）"}：${absolute}`
          : `Ready (${data.mode === "kv" ? "KV short link" : "stateless fallback"}): ${absolute}`
      );
    } catch {
      setStatusMessage(isZh ? "网络请求失败，请稍后再试。" : "Network error while creating brief link.");
    } finally {
      setSubmitting(false);
    }
  };

  const copyLink = async () => {
    if (!generatedUrl) return;
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${generatedUrl}`);
      setStatusMessage(copy.copied);
    } catch {
      setStatusMessage(`${window.location.origin}${generatedUrl}`);
    }
  };

  return (
    <section className="section container" aria-labelledby={headingId}>
      <div className="case-sim-shell">
        <header className="case-sim-head">
          <div className="case-sim-head-copy">
            <div className="label">{copy.eyebrow}</div>
            <h2 id={headingId}>{copy.title}</h2>
            <p className="case-sim-prompt">{copy.summary}</p>
          </div>
        </header>

        <div className="case-sim-stage proc-stage">
          <form className="proc-stage" onSubmit={handleSubmit} noValidate>
            <div className="v3-card-grid">
              <div className="sim-field">
                <label htmlFor="brief-company">{copy.company} *</label>
                <input
                  id="brief-company"
                  name="company"
                  type="text"
                  required
                  maxLength={80}
                  autoComplete="organization"
                  placeholder={copy.companyPlaceholder}
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  onBlur={() => markTouched("company")}
                  aria-invalid={companyInvalid ? "true" : "false"}
                  aria-describedby={companyInvalid ? "brief-company-err" : undefined}
                />
                {companyInvalid && (
                  <span id="brief-company-err" className="sim-field-rule" style={{ color: "var(--error)" }}>
                    {copy.companyErr}
                  </span>
                )}
              </div>

              <div className="sim-field">
                <label htmlFor="brief-role">{copy.role}</label>
                <select
                  id="brief-role"
                  name="roleTrack"
                  value={roleTrack}
                  onChange={(e) => setRoleTrack(e.target.value as RoleTrack)}
                >
                  {ROLE_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt[locale]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sim-field">
                <label htmlFor="brief-lang">{copy.lang}</label>
                <select
                  id="brief-lang"
                  name="targetLocale"
                  value={targetLocale}
                  onChange={(e) => setTargetLocale(e.target.value as ProofLocale)}
                >
                  <option value="en">English (/en/brief/...)</option>
                  <option value="zh">中文 (/zh/brief/...)</option>
                </select>
              </div>
            </div>

            <div className="sim-field">
              <label htmlFor="brief-intro">{copy.intro} *</label>
              <textarea
                id="brief-intro"
                name="intro"
                rows={2}
                required
                maxLength={500}
                placeholder={copy.introPlaceholder}
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
                onBlur={() => markTouched("intro")}
                aria-invalid={introInvalid ? "true" : "false"}
                aria-describedby={introInvalid ? "brief-intro-err" : undefined}
              />
              {introInvalid && (
                <span id="brief-intro-err" className="sim-field-rule" style={{ color: "var(--error)" }}>
                  {copy.introErr}
                </span>
              )}
            </div>

            <fieldset className="sim-field">
              <legend>{copy.pickCases}</legend>
              <div className="sim-segmented">
                {cases.map((item) => {
                  const checked = selectedSlugs.includes(item.slug);
                  return (
                    <button
                      key={item.slug}
                      type="button"
                      className="sim-seg-btn"
                      aria-pressed={checked}
                      onClick={() => toggleSlug(item.slug)}
                    >
                      {item.title}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="sim-field">
              <label htmlFor="brief-secret">{copy.secret}</label>
              <input
                id="brief-secret"
                name="secret"
                type="password"
                autoComplete="off"
                value={adminSecret}
                onChange={(e) => setAdminSecret(e.target.value)}
              />
            </div>

            <div className="lab-pill-row">
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {copy.submit}
              </button>
              {generatedUrl && (
                <>
                  <button type="button" className="btn btn-ghost" onClick={() => void copyLink()}>
                    {copy.copyBtn}
                  </button>
                  <a href={generatedUrl} className="btn btn-ghost">
                    {copy.openBtn} →
                  </a>
                </>
              )}
            </div>
          </form>
        </div>

        {statusMessage && (
          <div className="case-sim-takeaway" role="status" aria-live="polite">
            <span className="case-sim-takeaway-label">Status</span>
            <p>{statusMessage}</p>
          </div>
        )}
      </div>
    </section>
  );
}
