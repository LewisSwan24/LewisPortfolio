import { getListedCases } from "@/lib/cases/registry";
import { getAllBlogPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

export async function buildLlmsTxt(): Promise<string> {
  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const listedCases = getListedCases();
  const posts = await getAllBlogPosts("en");

  const caseLines = listedCases.map((record) => {
    const card = record.card.en;
    const url = `${baseUrl}/en/projects/${record.slug}`;
    const ext = record.links.map((l) => `${l.label}: ${l.href}`).join(" | ");
    return [
      `- [${card.title}](${url}) — ${card.kicker}`,
      `  - Summary: ${card.sub}`,
      `  - Scope & Role: ${card.role} (${card.date})`,
      `  - Evidence Metrics: ${card.m1}; ${card.m2}; ${card.m3}`,
      `  - Change Delivered: ${record.workSummary.changed.en}`,
      ...(ext ? [`  - Public Links: ${ext}`] : []),
    ].join("\n");
  });

  const postLines = posts.map(
    (p) => `- [${p.title}](${baseUrl}/en/blog/${p.slug}) (${p.date}) — ${p.excerpt}`
  );

  return [
    `# ${siteConfig.name} — Interaction Designer & Design Engineer Portfolio`,
    "",
    `> Bilingual static portfolio (English & Simplified Chinese) built with Next.js 15, React 19, TypeScript, Zod 4, Tailwind CSS v4, and GSAP.`,
    `> Focus: interaction systems, physical-digital prototyping, AI safety boundaries, and accessible front-end engineering.`,
    "",
    "## Key Hiring & Interactive Surfaces",
    "",
    `- [Home (Top 6 Featured Deck)](${baseUrl}/en): Curated overview of flagship physical, AI, and design-engineering builds.`,
    `- [All Work Index](${baseUrl}/en/projects): Filterable matrix of ${listedCases.length} listed case studies and capability proof table.`,
    `- [Hiring Decision Room](${baseUrl}/en/hire): Role-tailored lens (?role=product|interaction|design-eng|ai-ux), evidence brief, and honest project limits.`,
    `- [Interactive Workbench (/lab)](${baseUrl}/en/lab): Lively Icons token inspector, GSAP paper-motion sandbox, and live state-machine walkthroughs (?demo=onthebeat|autofill|walkie).`,
    `- [Resume](${baseUrl}/en/resume): Print-ready A4 experience and verified project history (EN & ZH).`,
    `- [Contact](${baseUrl}/en/contact): Direct outreach details.`,
    "",
    `## Listed Case Studies (${listedCases.length})`,
    "",
    ...caseLines,
    "",
    `## Published Engineering & Design Notes (${posts.length})`,
    "",
    ...postLines,
    "",
    "## Integrity & Evidence Policy",
    "",
    "- Every listed case states explicit evidence status, solo vs team boundaries, and unverified constraints.",
    "- Unlisted/abandoned exploratory briefs are excluded from public navigation, feeds, and AI agent indexes.",
    "",
  ].join("\n");
}
