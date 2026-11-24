import { describe, expect, it, beforeEach } from "vitest";
import { LISTED_PROJECT_SLUGS, UNLISTED_PROJECT_SLUGS } from "@/lib/project-routes";
import { EVIDENCE_CORPUS_ITEMS } from "@/lib/ai/evidence-corpus";
import { auditTranslationese } from "@/lib/i18n/editorial-voice";
import { hybridRetrieve } from "@/lib/ai/hybrid-retrieval";
import {
  getAllRedTeamDecks,
  getCaseRedTeamDeck,
  RED_TEAM_LENS_IDS,
  RedTeamDeckSchema,
} from "@/data/critique/red-team";
import { POST as critiquePost } from "../../app/api/ai/critique/route";
import { resetMemoryRateLimiterForTests } from "@/lib/server/rate-limit";

function collectLocalizedStrings(val: unknown, enOut: string[], zhOut: string[]) {
  if (!val || typeof val !== "object") return;
  if (Array.isArray(val)) {
    for (const item of val) collectLocalizedStrings(item, enOut, zhOut);
    return;
  }
  const obj = val as Record<string, unknown>;
  if (typeof obj.en === "string" && typeof obj.zh === "string") {
    enOut.push(obj.en);
    zhOut.push(obj.zh);
    return;
  }
  for (const child of Object.values(obj)) {
    collectLocalizedStrings(child, enOut, zhOut);
  }
}

describe("v5.2 Hybrid BM25F + Quantized Vector Retrieval & 4-Lens Red-Team", () => {
  beforeEach(() => {
    resetMemoryRateLimiterForTests();
  });

  it("indexes Raw Research Vault entries cleanly with zero unlisted case leakage", () => {
    const vaultChunks = EVIDENCE_CORPUS_ITEMS.filter((c) => c.pillar === "research-vault");
    expect(vaultChunks.length).toBeGreaterThanOrEqual(18);

    const corpusSlugs = new Set(EVIDENCE_CORPUS_ITEMS.map((c) => c.slug));
    for (const listed of LISTED_PROJECT_SLUGS) {
      expect(corpusSlugs.has(listed)).toBe(true);
    }
    for (const unlisted of UNLISTED_PROJECT_SLUGS) {
      expect(corpusSlugs.has(unlisted)).toBe(false);
    }
  });

  it("surfaces deterministic hybrid BM25F + quantized vector hits for APAC ZH and ANZ EN queries", () => {
    const enHits = hybridRetrieve(
      "tactile wrist confirmation and dual-boot flash guardrails",
      "en",
      6
    );
    expect(enHits.length).toBeGreaterThan(0);
    expect(enHits.some((h) => h.slug === "walkie")).toBe(true);
    expect(typeof enHits[0]?.bm25Score).toBe("number");
    expect(typeof enHits[0]?.vectorScore).toBe("number");
    expect(typeof enHits[0]?.hybridScore).toBe("number");

    const zhHits = hybridRetrieve(
      "高危确认弹窗防回车误触以及多关卡一致操作语法",
      "zh",
      6
    );
    expect(zhHits.length).toBeGreaterThan(0);
    expect(zhHits.some((h) => h.slug === "lamplight" || h.slug === "grassland")).toBe(true);

    for (const hit of [...enHits, ...zhHits]) {
      expect(UNLISTED_PROJECT_SLUGS).not.toContain(hit.slug);
    }
  });

  it("provides schema-valid 4-lens Red-Team defenses for all 6 listed cases with clean EN/ZH voice", () => {
    const decks = getAllRedTeamDecks();
    expect(decks).toHaveLength(6);

    for (const slug of LISTED_PROJECT_SLUGS) {
      const deck = getCaseRedTeamDeck(slug);
      expect(deck, `Missing red-team deck for ${slug}`).not.toBeNull();
      const parsed = RedTeamDeckSchema.safeParse(deck);
      expect(parsed.success, parsed.success ? "" : JSON.stringify(parsed.error.issues)).toBe(true);

      const lensIds = deck!.lenses.map((l) => l.lens);
      expect(lensIds).toEqual([...RED_TEAM_LENS_IDS]);

      const enStrings: string[] = [];
      const zhStrings: string[] = [];
      collectLocalizedStrings(deck, enStrings, zhStrings);
      for (const s of enStrings) {
        expect(auditTranslationese(s, "en"), `EN translationese in red-team ${slug}: ${s}`).toEqual([]);
      }
      for (const s of zhStrings) {
        expect(auditTranslationese(s, "zh"), `ZH translationese in red-team ${slug}: ${s}`).toEqual([]);
      }
    }

    for (const unlisted of UNLISTED_PROJECT_SLUGS) {
      expect(getCaseRedTeamDeck(unlisted)).toBeNull();
    }
  });

  it("streams deterministic offline SSE critique packets from /api/ai/critique", async () => {
    const badRes = await critiquePost(
      new Request("http://localhost/api/ai/critique", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ query: "hi" }),
      })
    );
    expect(badRes.status).toBe(400);

    const res = await critiquePost(
      new Request("http://localhost/api/ai/critique", {
        method: "POST",
        headers: { "content-type": "application/json", "x-forwarded-for": "198.51.100.12" },
        body: JSON.stringify({
          query: "How does Walkie protect against OTA overwrite and habitual approval?",
          locale: "en",
          caseSlug: "walkie",
        }),
      })
    );
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("text/event-stream");
    const streamBody = await res.text();
    expect(streamBody).toContain("event: meta");
    expect(streamBody).toContain("event: evidence");
    expect(streamBody).toContain("event: redteam");
    expect(streamBody).toContain("event: done");
    expect(streamBody).toContain("walkie");
  });
});
