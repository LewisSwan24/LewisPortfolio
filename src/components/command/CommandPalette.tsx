"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import Link from "next/link";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTheme } from "next-themes";
import { StructuredRationaleCard } from "@/components/ai/StructuredRationaleCard";
import { siteConfig } from "@/lib/site";
import {
  fetchGroundedEvidence,
  PRESET_DESIGN_QUESTIONS,
  type GroundedMatchGroup,
} from "@/lib/ai/client";

export interface PaletteItem {
  type: "project" | "blog";
  slug: string;
  title: string;
  description: string;
  tags: string[];
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  items: PaletteItem[];
}

export function CommandPalette({ isOpen, onClose, items }: CommandPaletteProps) {
  const locale = useLocale();
  const isZh = locale === "zh";
  const router = useRouter();
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<"search" | "rationale">("search");
  const [aiQuery, setAiQuery] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiMatches, setAiMatches] = useState<GroundedMatchGroup[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navigate = (href: string) => {
    onClose();
    router.push(href);
  };

  const projects = items.filter((item) => item.type === "project");
  const posts = items.filter((item) => item.type === "blog");
  const proofLocale = isZh ? "zh" : "en";

  const runRationaleQuery = async (q: string) => {
    if (q.trim().length < 3) return;
    setAiLoading(true);
    try {
      const { response } = await fetchGroundedEvidence(q, proofLocale);
      setAiMatches(response.matches ?? []);
    } finally {
      setAiLoading(false);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.author.email);
      setCopied(true);
      window.setTimeout(() => {
        setCopied(false);
        onClose();
      }, 600);
    } catch {
      onClose();
    }
  };

  return (
    <>
      <div className="cmdk-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="cmdk-dialog" role="dialog" aria-modal="true" aria-label={isZh ? "命令面板" : "Command palette"}>
        <Command label={isZh ? "全局搜索与命令" : "Global search and commands"}>
          <div className="cmdk-input-row">
            <span aria-hidden="true" style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--text-3)" }}>
              ⌘K
            </span>
            <div style={{ display: "flex", gap: 6 }}>
              <button
                type="button"
                className={`idx-filter${mode === "search" ? " active" : ""}`}
                style={{ padding: "3px 10px", fontSize: 11 }}
                onClick={() => setMode("search")}
              >
                {isZh ? "全站搜索" : "Search"}
              </button>
              <button
                type="button"
                className={`idx-filter${mode === "rationale" ? " active" : ""}`}
                style={{ padding: "3px 10px", fontSize: 11 }}
                onClick={() => setMode("rationale")}
              >
                {isZh ? "问设计理由" : "Ask Rationale"}
              </button>
            </div>
            {mode === "search" ? (
              <Command.Input
                className="cmdk-input"
                aria-label="Search"
                autoFocus
                placeholder={
                  isZh
                    ? "搜索案例、文章，或输入命令（主题 / 语言 / 岗位视角）..."
                    : "Search cases, articles, or jump to role lenses & actions..."
                }
              />
            ) : (
              <input
                className="cmdk-input"
                aria-label={isZh ? "输入设计论证问题" : "Ask a grounded design question"}
                autoFocus
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    void runRationaleQuery(aiQuery);
                  }
                }}
                placeholder={
                  isZh
                    ? "输入设计追问并回车（如：为什么不用语音批准）..."
                    : "Ask design rationale & press Enter (e.g. why physical buttons)..."
                }
              />
            )}
            <button
              type="button"
              onClick={onClose}
              style={{
                border: "1px solid var(--border)",
                borderRadius: "var(--r-xs)",
                padding: "2px 8px",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                background: "var(--surface)",
                color: "var(--text-3)",
                cursor: "pointer",
              }}
            >
              ESC
            </button>
          </div>

          {mode === "rationale" ? (
            <div className="cmdk-list" style={{ padding: "14px 16px", display: "grid", gap: 12 }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {PRESET_DESIGN_QUESTIONS.map((q) => (
                  <button
                    key={q.en}
                    type="button"
                    className="idx-filter"
                    style={{ fontSize: 12 }}
                    onClick={() => {
                      setAiQuery(q[proofLocale]);
                      void runRationaleQuery(q[proofLocale]);
                    }}
                  >
                    {q[proofLocale]}
                  </button>
                ))}
              </div>
              {aiLoading && (
                <div className="eyebrow">{isZh ? "正在匹配静态证据库..." : "Searching evidence corpus..."}</div>
              )}
              {aiMatches.map((m) => (
                <div
                  key={m.slug}
                  style={{ border: "1px solid var(--border)", padding: 12, display: "grid", gap: 8 }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <strong>{m.caseTitle}</strong>
                    <span className="tag">{m.reasonLabel}</span>
                  </div>
                  {m.citations.map((c) => (
                    <div key={c.id} onClick={onClose}>
                      <StructuredRationaleCard
                        citation={c}
                        locale={proofLocale}
                        compact
                        showInspector={false}
                      />
                    </div>
                  ))}
                </div>
              ))}
              <button
                type="button"
                className="btn btn-ghost"
                style={{ justifySelf: "start", fontSize: 12 }}
                onClick={() => navigate("/ai")}
              >
                {isZh ? "打开完整 AI 实验室与追溯详情 (/ai) →" : "Open full AI Lab with pipeline telemetry (/ai) →"}
              </button>
            </div>
          ) : (
            <Command.List className="cmdk-list">
            <Command.Empty className="cmdk-empty">
              {isZh ? "没有匹配的案例或命令。" : "No matching cases or commands."}
            </Command.Empty>

            <Command.Group className="cmdk-group-heading" heading={isZh ? "作品案例" : "Case Studies"}>
              {projects.map((item) => (
                <Command.Item
                  key={`proj-${item.slug}`}
                  value={`${item.title} ${item.description} ${item.tags.join(" ")}`}
                  className="cmdk-item"
                  onSelect={() => navigate(`/projects/${item.slug}`)}
                >
                  <div>
                    <div style={{ fontWeight: 600 }}>{item.title}</div>
                    <div style={{ fontSize: 12, color: "var(--text-3)" }}>{item.description}</div>
                  </div>
                  <span className="cmdk-item-meta">{isZh ? "案例" : "Case"}</span>
                </Command.Item>
              ))}
            </Command.Group>

            {posts.length > 0 && (
              <Command.Group className="cmdk-group-heading" heading={isZh ? "写作与文章" : "Writing"}>
                {posts.map((item) => (
                  <Command.Item
                    key={`blog-${item.slug}`}
                    value={`${item.title} ${item.description} ${item.tags.join(" ")}`}
                    className="cmdk-item"
                    onSelect={() => navigate(`/blog/${item.slug}`)}
                  >
                    <span>{item.title}</span>
                    <span className="cmdk-item-meta">{isZh ? "文章" : "Post"}</span>
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            <Command.Group className="cmdk-group-heading" heading={isZh ? "招聘岗位视角" : "Hiring Role Lenses"}>
              <Command.Item
                value="hire product designer role lens 招聘 产品设计"
                className="cmdk-item"
                onSelect={() => navigate("/hire?role=product")}
              >
                <span>{isZh ? "产品设计师视角 (/hire?role=product)" : "Product Designer Lens (/hire?role=product)"}</span>
                <span className="cmdk-item-meta">Hire</span>
              </Command.Item>
              <Command.Item
                value="hire interaction designer role lens 招聘 交互设计"
                className="cmdk-item"
                onSelect={() => navigate("/hire?role=interaction")}
              >
                <span>{isZh ? "交互设计师视角 (/hire?role=interaction)" : "Interaction Designer Lens (/hire?role=interaction)"}</span>
                <span className="cmdk-item-meta">Hire</span>
              </Command.Item>
              <Command.Item
                value="hire design engineer creative technologist 招聘 设计工程师"
                className="cmdk-item"
                onSelect={() => navigate("/hire?role=design-eng")}
              >
                <span>{isZh ? "Design Engineer 视角 (/hire?role=design-eng)" : "Design Engineer Lens (/hire?role=design-eng)"}</span>
                <span className="cmdk-item-meta">Hire</span>
              </Command.Item>
              <Command.Item
                value="hire ai ux trust role lens 招聘 AI 交互"
                className="cmdk-item"
                onSelect={() => navigate("/hire?role=ai-ux")}
              >
                <span>{isZh ? "AI UX 与信任视角 (/hire?role=ai-ux)" : "AI UX & Trust Lens (/hire?role=ai-ux)"}</span>
                <span className="cmdk-item-meta">Hire</span>
              </Command.Item>
            </Command.Group>

            <Command.Group className="cmdk-group-heading" heading={isZh ? "快捷操作" : "Quick Actions"}>
              <Command.Item
                value="ai lab rationale bm25 grounded evidence 实验室 辩护 证据"
                className="cmdk-item"
                onSelect={() => navigate("/ai")}
              >
                <span>{isZh ? "打开 AI 实验室 (/ai)" : "Open AI Lab (/ai)"}</span>
                <span className="cmdk-item-meta">AI</span>
              </Command.Item>
              <Command.Item
                value="lab design system lively icons motion workbench 实验室 设计系统"
                className="cmdk-item"
                onSelect={() => navigate("/lab")}
              >
                <span>{isZh ? "打开实验室工作台 (/lab)" : "Open Lab Workbench (/lab)"}</span>
                <span className="cmdk-item-meta">Lab</span>
              </Command.Item>
              <Command.Item
                value="resume cv pdf 简历"
                className="cmdk-item"
                onSelect={() => navigate("/resume")}
              >
                <span>{isZh ? "打开简历与 PDF (/resume)" : "Open Resume & PDF (/resume)"}</span>
                <span className="cmdk-item-meta">Resume</span>
              </Command.Item>
              <Command.Item
                value="toggle theme dark light mode 切换主题 暗黑 亮色"
                className="cmdk-item"
                onSelect={() => {
                  setTheme(resolvedTheme === "dark" ? "light" : "dark");
                  onClose();
                }}
              >
                <span>
                  {isZh
                    ? `切换到${resolvedTheme === "dark" ? "暖纸亮色" : "无色相暗色"}主题`
                    : `Switch to ${resolvedTheme === "dark" ? "warm paper light" : "monochrome dark"} theme`}
                </span>
                <span className="cmdk-item-meta">Theme</span>
              </Command.Item>
              <Command.Item
                value="switch language english chinese en zh 切换语言 中文 英文"
                className="cmdk-item"
                onSelect={() => {
                  onClose();
                  router.replace(pathname, { locale: isZh ? "en" : "zh" });
                }}
              >
                <span>{isZh ? "Switch site to English (EN)" : "切换站点到中文 (ZH)"}</span>
                <span className="cmdk-item-meta">i18n</span>
              </Command.Item>
              <Command.Item
                value="copy email contact 复制邮箱 联系"
                className="cmdk-item"
                onSelect={copyEmail}
              >
                <span>
                  {copied
                    ? isZh
                      ? "已复制邮箱地址 ✓"
                      : "Email copied ✓"
                    : isZh
                      ? `复制联系邮箱 (${siteConfig.author.email})`
                      : `Copy email (${siteConfig.author.email})`}
                </span>
                <span className="cmdk-item-meta">Copy</span>
              </Command.Item>
            </Command.Group>
          </Command.List>
          )}

          <div className="cmdk-foot">
            <span>{isZh ? "↑↓ 选择 · Enter 打开 · Esc 关闭" : "↑↓ navigate · Enter select · Esc close"}</span>
            <span>Lively Icons · cmdk</span>
          </div>
        </Command>
      </div>
    </>
  );
}
