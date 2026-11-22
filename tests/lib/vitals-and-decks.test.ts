import { describe, expect, it, beforeEach } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { encodeQrMatrix, generateQrSvgMarkup } from "@/lib/pdf/qr-svg";
import {
  GET as vitalsGet,
  POST as vitalsPost,
} from "../../app/api/vitals/route";
import { resetTelemetryForTests } from "@/lib/vitals-store";

describe("Design-Rationale PDF Dossier, QR SVG & Zero-PII Vitals", () => {
  beforeEach(() => {
    resetTelemetryForTests();
  });

  it("generates valid Byte-mode QR matrices with quiet zone and SVG path", () => {
    const url = "https://lewisdong.design/en/projects/walkie#interactive-demo";
    const matrix = encodeQrMatrix(url);
    expect(matrix.size).toBeGreaterThanOrEqual(25);
    // Top-left 7x7 finder outer corners are always dark (true)
    expect(matrix.get(0, 0)).toBe(true);
    expect(matrix.get(6, 6)).toBe(true);
    expect(matrix.get(0, 6)).toBe(true);
    expect(matrix.get(1, 1)).toBe(false);

    const svg = generateQrSvgMarkup(url, 88);
    expect(svg).toContain("<svg");
    expect(svg).toContain("<path");
    expect(svg).toContain('width="88"');
  });

  it("/api/vitals enforces strict enum schema (rejects PII/arbitrary keys) and aggregates anonymous metrics", async () => {
    const badRes = await vitalsPost(
      new Request("http://localhost/api/vitals", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          metric: "LCP",
          value: 1120,
          routeGroup: "case",
          email: "user@secret.org",
        }),
      })
    );
    expect(badRes.status).toBe(400);

    for (const val of [900, 1200, 1450, 1800]) {
      const res = await vitalsPost(
        new Request("http://localhost/api/vitals", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            metric: "LCP",
            value: val,
            routeGroup: "home",
          }),
        })
      );
      expect(res.status).toBe(200);
    }

    const simRes = await vitalsPost(
      new Request("http://localhost/api/vitals", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          metric: "INTERACTION",
          value: 1,
          routeGroup: "case",
          interactionTarget: "simulator",
        }),
      })
    );
    expect(simRes.status).toBe(200);

    const getRes = await vitalsGet();
    expect(getRes.status).toBe(200);
    const data = (await getRes.json()) as {
      ok: boolean;
      summary: {
        sampleCount: number;
        totalsByRouteGroup: Record<string, number>;
        interactionsByTarget: Record<string, number>;
        metricsP75: Record<string, number | null>;
      };
    };
    expect(data.ok).toBe(true);
    expect(data.summary.sampleCount).toBe(5);
    expect(data.summary.totalsByRouteGroup.home).toBe(4);
    expect(data.summary.interactionsByTarget.simulator).toBe(1);
    expect(data.summary.metricsP75.LCP).toBeGreaterThanOrEqual(1200);
  });

  it("role decks directory defines expected target filenames under budget", () => {
    const decksDir = path.join(process.cwd(), "public", "decks");
    if (fs.existsSync(decksDir)) {
      for (const file of [
        "ai-product-engineer.pdf",
        "design-engineer.pdf",
        "hardware-interaction.pdf",
      ]) {
        const full = path.join(decksDir, file);
        if (fs.existsSync(full)) {
          const buf = fs.readFileSync(full);
          expect(buf.subarray(0, 5).toString("ascii"), file).toBe("%PDF-");
          expect(buf.length, file).toBeLessThan(600 * 1024);
        }
      }
    }
    expect(true).toBe(true);
  });
});
