"use client";

import { useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import type { RoleTrack } from "@/lib/cases/schema";
import { siteConfig } from "@/lib/site";

export interface RoleLensCaseItem {
  slug: string;
  title: string;
  kicker: string;
  sub: string;
  metrics: [string, string, string];
  roleTracks: RoleTrack[];
}

type LensKey = "all" | RoleTrack;

const LENSES: Array<{
  id: LensKey;
  en: string;
  zh: string;
  noteEn: string;
  noteZh: string;
}> = [
  {
    id: "all",
    en: "All tracks",
    zh: "全部方向",
    noteEn: "Curated 6-case portfolio across interaction design, product systems, physical hardware, and AI UX.",
    noteZh: "精选 6 案例全景，涵盖交互设计、产品系统、物理硬件与 AI UX。",
  },
  {
    id: "product",
    en: "Product Designer",
    zh: "产品设计师",
    noteEn: "End-to-end problem framing, information architecture, research trade-offs, and honest product scope.",
    noteZh: "端到端问题定义、信息架构、研究取舍与诚实的产品范围控制。",
  },
  {
    id: "interaction",
    en: "Interaction Designer",
    zh: "交互设计师",
    noteEn: "State machines, physical-digital feedback loops, navigation clarity, and accessibility.",
    noteZh: "状态机规则、软硬协同反馈循环、导航清晰度与无障碍设计。",
  },
  {
    id: "design-eng",
    en: "Design Engineer",
    zh: "设计工程师",
    noteEn: "Working prototypes in Next.js, React, TypeScript, Python, Arduino/ESP32, and reproducible verification gates.",
    noteZh: "基于 Next.js、React、TypeScript、Python 与 Arduino/ESP32 的可运行原型与自动化验证门禁。",
  },
  {
    id: "ai-ux",
    en: "AI UX & Trust",
    zh: "AI UX 与信任",
    noteEn: "Human-in-the-loop approvals, zero-guess confidence rules, access invariants, and safety red-line testing.",
    noteZh: "人在回路审批、零猜测置信度规则、数据层权限不变量与安全红线评测。",
  },
];

function parseLens(raw: string | null): LensKey {
  if (raw === "product" || raw === "interaction" || raw === "design-eng" || raw === "ai-ux") {
    return raw;
  }
  return "all";
}

export function RoleLensSwitch({
  cases,
  locale,
}: {
  cases: RoleLensCaseItem[];
  locale: "en" | "zh";
}) {
  const isZh = locale === "zh";
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);
  // v7.0 R28: in-app browsers often block the clipboard; show the link instead.
  const [manualCopy, setManualCopy] = useState(false);

  const activeLens = parseLens(searchParams.get("role"));
  const lensMeta = LENSES.find((l) => l.id === activeLens) ?? LENSES[0];
  const filtered =
    activeLens === "all"
      ? cases
      : cases.filter((item) => item.roleTracks.includes(activeLens));

  const selectLens = (lens: LensKey) => {
    const next = new URLSearchParams(searchParams.toString());
    if (lens === "all") next.delete("role");
    else next.set("role", lens);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const shareUrl = `${siteConfig.url.replace(/\/$/, "")}${locale === "zh" ? "/zh" : ""}/hire${
    activeLens === "all" ? "" : `?role=${activeLens}`
  }`;

  const copyShareUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setManualCopy(true);
    }
  };

  return (
    <section className="section container role-lens-panel" aria-labelledby="role-lens-heading">
      <div className="role-lens-head">
        <div>
          <div className="label">{isZh ? "岗位视角过滤" : "Role-tailored lens"}</div>
          <h2 id="role-lens-heading">
            {isZh ? (
              <>
                按你的团队岗位，<span className="nobr">直接筛出</span>
                <span className="nobr">最相关案例。</span>
              </>
            ) : (
              "Filter the strongest proof for your opening."
            )}
          </h2>
          <p>{isZh ? lensMeta.noteZh : lensMeta.noteEn}</p>
        </div>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={copyShareUrl}
          data-testid="copy-role-lens-link"
        >
          {copied
            ? isZh
              ? "已复制专属链接 ✓"
              : "Tailored link copied ✓"
            : isZh
              ? "复制当前视角链接"
              : "Copy tailored link"}
        </button>
        {manualCopy && (
          <label className="role-lens-manual-copy">
            <span>{isZh ? "无法自动复制，请手动复制这个链接" : "Copy this link by hand"}</span>
            <input
              type="text"
              readOnly
              value={shareUrl}
              autoFocus
              onFocus={(e) => e.currentTarget.select()}
            />
          </label>
        )}
      </div>

      <div className="role-lens-tabs" role="tablist" aria-label={isZh ? "选择岗位视角" : "Choose role lens"}>
        {LENSES.map((lens) => (
          <button
            key={lens.id}
            type="button"
            role="tab"
            aria-selected={activeLens === lens.id}
            className="role-lens-tab"
            onClick={() => selectLens(lens.id)}
          >
            {isZh ? lens.zh : lens.en}
          </button>
        ))}
      </div>

      <div className="role-lens-grid" data-active-lens={activeLens}>
        {filtered.map((item) => (
          <Link key={item.slug} href={`/projects/${item.slug}`} className="role-lens-card">
            <div className="role-lens-card-head">
              <h3>{item.title}</h3>
              <span className="tag">{item.metrics[0]}</span>
            </div>
            <div className="eyebrow">{item.kicker}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
