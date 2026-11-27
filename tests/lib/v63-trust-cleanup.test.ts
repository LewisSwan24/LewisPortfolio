import fs from "node:fs";
import path from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { getAllReplayTraces } from "@/data/replay/traces";
import { ReplayTraceFallback } from "@/components/studio/ReplayTraceFallback";
import { hasTelemetrySamples } from "@/components/lab/LabTelemetryPanel";
import { shouldLoadVercelAnalytics } from "@/lib/analytics";

const root = process.cwd();
const read = (...parts: string[]) => fs.readFileSync(path.join(root, ...parts), "utf8");
const esc = (t: string) => t.replace(/&/g, "&amp;").replace(/'/g, "&#x27;").replace(/"/g, "&quot;");

describe("v6.3 trust cleanup", () => {
  it("never calls the 2-page PDF resume a one-page CV", () => {
    const sources = [
      read("app", "[locale]", "page.tsx"),
      read("app", "[locale]", "contact", "page.tsx"),
      read("app", "[locale]", "hire", "page.tsx"),
      read("app", "[locale]", "resume", "page.tsx"),
      read("app", "[locale]", "resume", "ResumeActions.tsx"),
      read("src", "components", "resume", "ResumeComposerClient.tsx"),
    ].join("\n");
    expect(sources).not.toMatch(/1-Page|1-page|one-page|单页|一页/);
  });

  it("keeps backend words out of visitor copy on the contact form and brief builder", () => {
    const contact = read("src", "components", "contact", "QuickContactForm.tsx");
    const brief = read("src", "components", "hiring", "TailoredBriefBuilder.tsx");
    for (const src of [contact, brief]) {
      expect(src).not.toMatch(/KV 通道|KV\/webhook|KV 短链|KV short link|zero-backend|无后端/);
    }
  });

  it("hides the lab telemetry panel until real samples exist", () => {
    expect(hasTelemetrySamples(null)).toBe(false);
    expect(hasTelemetrySamples({ sampleCount: 0 })).toBe(false);
    expect(hasTelemetrySamples({ sampleCount: 3 })).toBe(true);
  });

  it("server-renders every replay track title in the /studio/replay first screen", () => {
    const traces = getAllReplayTraces();
    for (const locale of ["en", "zh"] as const) {
      const html = renderToStaticMarkup(createElement(ReplayTraceFallback, { traces, locale }));
      for (const t of traces) {
        expect(html).toContain(esc(t.title[locale]));
      }
    }
  });

  it("loads Vercel Analytics only on Vercel", () => {
    expect(shouldLoadVercelAnalytics({})).toBe(false);
    expect(shouldLoadVercelAnalytics({ VERCEL: "" })).toBe(false);
    expect(shouldLoadVercelAnalytics({ VERCEL: "1" })).toBe(true);
  });

  it("says AI tools helped with Fencepost code in both Fencepost posts, both locales", () => {
    for (const dir of [["content", "blog"], ["content", "blog", "zh"]]) {
      for (const slug of ["fencepost-data-layer-ai-revocation", "walkie-and-fencepost-invariants"]) {
        const body = read(...dir, `${slug}.mdx`);
        expect(body, `${dir.join("/")}/${slug}`).toMatch(/69/);
        expect(body, `${dir.join("/")}/${slug}`).toMatch(/271/);
      }
    }
  });
});
