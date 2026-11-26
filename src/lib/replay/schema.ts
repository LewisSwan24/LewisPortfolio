import "@/lib/zod-jitless";
import { z } from "zod";
import { LocalizedStringSchema } from "@/lib/cases/schema";
import { CaseVerifiedStatusSchema } from "@/lib/cases/modules-schema";

export const REPLAY_TRACK_SLUGS = ["walkie", "maze", "onthebeat"] as const;
export type ReplayTrackSlug = (typeof REPLAY_TRACK_SLUGS)[number];

export const ReplayDecodedFieldSchema = z.object({
  key: z.string().min(1),
  value: z.string().min(1),
});

export type ReplayDecodedField = z.infer<typeof ReplayDecodedFieldSchema>;

export const ReplayFrameSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  timestampMs: z.number().int().nonnegative(),
  channel: z.string().min(2),
  stateLabel: LocalizedStringSchema,
  signalLevel: z.number().min(0).max(100),
  faultState: z.enum(["nominal", "fault", "recovered"]),
  rawHex: z.string().min(8),
  decodedFields: z.array(ReplayDecodedFieldSchema).min(2),
  humanSummary: LocalizedStringSchema,
  invariantCheck: LocalizedStringSchema,
});

export type ReplayFrame = z.infer<typeof ReplayFrameSchema>;

export const ReplayTraceSchema = z.object({
  slug: z.enum(REPLAY_TRACK_SLUGS),
  title: LocalizedStringSchema,
  transportSummary: LocalizedStringSchema,
  honestCalibrationNote: LocalizedStringSchema,
  verifiedStatus: CaseVerifiedStatusSchema,
  faultInjectionLabel: LocalizedStringSchema,
  faultInjectionSummary: LocalizedStringSchema,
  caseHref: z.string().startsWith("/projects/"),
  nominalFrames: z.array(ReplayFrameSchema).min(5),
  faultFrames: z.array(ReplayFrameSchema).min(5),
});

export type ReplayTrace = z.infer<typeof ReplayTraceSchema>;
