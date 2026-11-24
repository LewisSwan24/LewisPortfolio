import { describe, expect, it } from "vitest";
import { getAllReplayTraces } from "@/data/replay/traces";
import { auditTranslationese } from "@/lib/i18n/editorial-voice";
import {
  HARDWARE_TWIN_ZONES,
  mapReplayFrameToHardwareTwin,
} from "@/lib/replay/hardware-twin-map";

describe("v5.8 Hardware Digital Twin Invariants", () => {
  it("maps every nominal and fault frame across walkie, maze, and onthebeat to a valid hardware zone", () => {
    const traces = getAllReplayTraces();
    expect(traces.length).toBe(3);

    for (const trace of traces) {
      const zones = HARDWARE_TWIN_ZONES[trace.slug];
      expect(zones.length).toBeGreaterThanOrEqual(3);
      const validIds = new Set(zones.map((zone) => zone.id));

      for (const frame of [...trace.nominalFrames, ...trace.faultFrames]) {
        const mapped = mapReplayFrameToHardwareTwin(trace.slug, frame);
        expect(validIds.has(mapped.activeZoneId)).toBe(true);
        expect(mapped.pinOrBus.length).toBeGreaterThan(2);
        expect(mapped.signalRatio).toBeGreaterThanOrEqual(0);
        expect(mapped.signalRatio).toBeLessThanOrEqual(1);
        expect(mapped.faultState).toBe(frame.faultState);
        expect(mapped.telemetryCallout.en.length).toBeGreaterThan(10);
        expect(mapped.telemetryCallout.zh.length).toBeGreaterThan(6);
      }
    }
  });

  it("produces zero EN/ZH editorial translationese violations across twin zones and telemetry callouts", () => {
    const traces = getAllReplayTraces();

    for (const trace of traces) {
      for (const zone of HARDWARE_TWIN_ZONES[trace.slug]) {
        expect(auditTranslationese(zone.label.en, "en")).toEqual([]);
        expect(auditTranslationese(zone.label.zh, "zh")).toEqual([]);
        expect(auditTranslationese(zone.role.en, "en")).toEqual([]);
        expect(auditTranslationese(zone.role.zh, "zh")).toEqual([]);
      }

      for (const frame of [...trace.nominalFrames, ...trace.faultFrames]) {
        const mapped = mapReplayFrameToHardwareTwin(trace.slug, frame);
        expect(auditTranslationese(mapped.telemetryCallout.en, "en")).toEqual([]);
        expect(auditTranslationese(mapped.telemetryCallout.zh, "zh")).toEqual([]);
      }
    }
  });
});
