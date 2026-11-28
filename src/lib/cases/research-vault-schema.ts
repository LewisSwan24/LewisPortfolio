import "@/lib/zod-jitless";
import { z } from "zod";
import { LocalizedStringSchema } from "@/lib/cases/schema";
import { CaseVerifiedStatusSchema } from "@/lib/cases/modules-schema";
import { CURRENT_PROJECT_SLUGS, isUnlistedProject } from "@/lib/project-routes";

export const ResearchTaskProbeSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  prompt: LocalizedStringSchema,
  whatWeWatchFor: LocalizedStringSchema,
  failureSignal: LocalizedStringSchema,
  verifiedStatus: CaseVerifiedStatusSchema,
});

export const ModeratorGuideSchema = z.object({
  protocolTitle: LocalizedStringSchema,
  cohortAndSetting: LocalizedStringSchema,
  openingBrief: LocalizedStringSchema,
  taskProbes: z.array(ResearchTaskProbeSchema).min(3),
  debriefQuestion: LocalizedStringSchema,
});

export const FieldObservationLogSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  sessionRef: LocalizedStringSchema,
  context: LocalizedStringSchema,
  observation: LocalizedStringSchema,
  designResponse: LocalizedStringSchema,
  verifiedStatus: CaseVerifiedStatusSchema,
});

export const ErgonomicsSpecRowSchema = z.object({
  dimension: LocalizedStringSchema,
  constraint: LocalizedStringSchema,
  rationale: LocalizedStringSchema,
  verifiedStatus: CaseVerifiedStatusSchema,
});

export const TriRoleTensionRowSchema = z.object({
  role: z.enum(["pm-product", "engineering-hardware", "end-user"]),
  roleLabel: LocalizedStringSchema,
  priority: LocalizedStringSchema,
  tension: LocalizedStringSchema,
  resolution: LocalizedStringSchema,
});

export const RebuildRetrospectiveItemSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  question: LocalizedStringSchema,
  answer: LocalizedStringSchema,
  verifiedStatus: CaseVerifiedStatusSchema,
});

export const RawResearchVaultRecordSchema = z.object({
  slug: z.enum(CURRENT_PROJECT_SLUGS).refine((slug) => !isUnlistedProject(slug), {
    message: "RawResearchVault must only exist for the 6 listed flagship cases.",
  }),
  studyStatus: CaseVerifiedStatusSchema,
  honestScopeNote: LocalizedStringSchema,
  moderatorGuide: ModeratorGuideSchema,
  observationLogs: z.array(FieldObservationLogSchema).min(3),
  ergonomicsOrStageSpec: z.object({
    title: LocalizedStringSchema,
    subtitle: LocalizedStringSchema,
    rows: z.array(ErgonomicsSpecRowSchema).min(3),
  }),
  triRoleTension: z.array(TriRoleTensionRowSchema).length(3),
  rebuildToday: z.array(RebuildRetrospectiveItemSchema).min(4),
});

export type RawResearchVaultRecord = z.infer<typeof RawResearchVaultRecordSchema>;
