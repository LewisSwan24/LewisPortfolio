import { describe, expect, it } from "vitest";
import { auditTranslationese } from "@/lib/i18n/editorial-voice";
import {
  getAllReplayTraces,
  getReplayTraceBySlug,
  REPLAY_TRACK_SLUGS,
} from "@/data/replay/traces";
import { ReplayTraceSchema } from "@/lib/replay/schema";

function collectLocalizedText(val: unknown, enOut: string[], zhOut: string[]) {
  if (!val || typeof val !== "object") return;
  if (Array.isArray(val)) {
    for (const item of val) collectLocalizedText(item, enOut, zhOut);
    return;
  }
  const obj = val as Record<string, unknown>;
  if (typeof obj.en === "string" && typeof obj.zh === "string") {
    enOut.push(obj.en);
    zhOut.push(obj.zh);
    return;
  }
  for (const child of Object.values(obj)) {
    collectLocalizedText(child, enOut, zhOut);
  }
}

describe("v5.3 Hardware & Protocol Replay Trace Invariants", () => {
  it("provides schema-valid deterministic traces for walkie, maze, and onthebeat", () => {
    const traces = getAllReplayTraces();
    expect(traces).toHaveLength(3);
    expect(traces.map((t) => t.slug)).toEqual([...REPLAY_TRACK_SLUGS]);

    for (const slug of REPLAY_TRACK_SLUGS) {
      const trace = getReplayTraceBySlug(slug);
      expect(trace, `Missing replay trace for ${slug}`).not.toBeNull();
      const parsed = ReplayTraceSchema.safeParse(trace);
      expect(parsed.success, parsed.success ? "" : JSON.stringify(parsed.error.issues)).toBe(true);
    }
  });

  it("enforces strictly monotonic timestamps, non-empty hex payloads, and fault divergence", () => {
    for (const trace of getAllReplayTraces()) {
      for (const list of [trace.nominalFrames, trace.faultFrames]) {
        expect(list.length).toBeGreaterThanOrEqual(5);
        for (let i = 0; i < list.length; i += 1) {
          const frame = list[i]!;
          expect(frame.rawHex.trim().length).toBeGreaterThanOrEqual(8);
          expect(frame.decodedFields.length).toBeGreaterThanOrEqual(2);
          if (i > 0) {
            expect(frame.timestampMs).toBeGreaterThan(list[i - 1]!.timestampMs);
          }
        }
      }

      // Fault injection must diverge deterministically into at least one fault or recovered frame
      expect(trace.faultFrames.some((f) => f.faultState === "fault")).toBe(true);
      expect(
        JSON.stringify(trace.faultFrames.map((f) => f.rawHex))
      ).not.toEqual(JSON.stringify(trace.nominalFrames.map((f) => f.rawHex)));

      const enStrings: string[] = [];
      const zhStrings: string[] = [];
      collectLocalizedText(trace, enStrings, zhStrings);
      for (const s of enStrings) {
        expect(auditTranslationese(s, "en"), `EN translationese in replay ${trace.slug}: ${s}`).toEqual([]);
      }
      for (const s of zhStrings) {
        expect(auditTranslationese(s, "zh"), `ZH translationese in replay ${trace.slug}: ${s}`).toEqual([]);
      }
    }
  });
});
