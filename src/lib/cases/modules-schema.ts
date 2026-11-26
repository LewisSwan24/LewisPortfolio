import "@/lib/zod-jitless";
import { z } from "zod";
import { LocalizedStringSchema } from "@/lib/cases/schema";
import { CURRENT_PROJECT_SLUGS, isUnlistedProject } from "@/lib/project-routes";

export const CaseVerifiedStatusSchema = z.enum([
  "observed",
  "bench-tested",
  "synthetic-gate",
  "unverified-hypothesis",
]);

export type CaseVerifiedStatus = z.infer<typeof CaseVerifiedStatusSchema>;

export const CaseModuleFocusTagSchema = z.enum([
  "ux-research",
  "systems-hardware",
  "ai-trust",
]);

export type CaseModuleFocusTag = z.infer<typeof CaseModuleFocusTagSchema>;

export const CaseStateTypeSchema = z.enum([
  "normal",
  "empty",
  "offline",
  "error",
  "refused",
]);

export type CaseStateType = z.infer<typeof CaseStateTypeSchema>;

export const REQUIRED_CASE_STATES: readonly CaseStateType[] = [
  "normal",
  "empty",
  "offline",
  "error",
  "refused",
] as const;

export const CaseJourneyStageSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  step: z.number().int().positive(),
  title: LocalizedStringSchema,
  /** Short name for the stage-progress strip; the full title stays on the card. */
  shortTitle: LocalizedStringSchema,
  trigger: LocalizedStringSchema,
  userMentalModel: LocalizedStringSchema,
  systemAction: LocalizedStringSchema,
  cognitiveFriction: LocalizedStringSchema,
  edgeRecovery: LocalizedStringSchema,
  focusTags: z.array(CaseModuleFocusTagSchema).min(1),
  verifiedStatus: CaseVerifiedStatusSchema,
});

export type CaseJourneyStage = z.infer<typeof CaseJourneyStageSchema>;

export const CaseStateSpecSchema = z.object({
  state: CaseStateTypeSchema,
  label: LocalizedStringSchema,
  entryCondition: LocalizedStringSchema,
  uiFeedback: LocalizedStringSchema,
  keyboardFocus: LocalizedStringSchema,
  fallbackGuarantee: LocalizedStringSchema,
  focusTags: z.array(CaseModuleFocusTagSchema).min(1),
  verifiedStatus: CaseVerifiedStatusSchema,
});

export type CaseStateSpec = z.infer<typeof CaseStateSpecSchema>;

export const CaseRejectionEntrySchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  round: LocalizedStringSchema,
  date: z.string().min(4),
  artifactBefore: LocalizedStringSchema,
  failureExposed: LocalizedStringSchema,
  fixApplied: LocalizedStringSchema,
  sourceReceipt: LocalizedStringSchema,
  focusTags: z.array(CaseModuleFocusTagSchema).min(1),
  verifiedStatus: CaseVerifiedStatusSchema,
});

export type CaseRejectionEntry = z.infer<typeof CaseRejectionEntrySchema>;

export const CaseModulesRecordSchema = z
  .object({
    slug: z.enum(CURRENT_PROJECT_SLUGS).refine((slug) => !isUnlistedProject(slug), {
      message: "Depth modules must only exist for publicly listed cases.",
    }),
    journey: z.array(CaseJourneyStageSchema).min(5).max(6),
    stateMatrix: z.array(CaseStateSpecSchema).length(5),
    rejectionArchive: z.array(CaseRejectionEntrySchema).min(2),
  })
  .superRefine((val, ctx) => {
    const steps = val.journey.map((stage) => stage.step);
    steps.forEach((step, idx) => {
      if (step !== idx + 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["journey", idx, "step"],
          message: `Journey stage step must equal sequential index ${idx + 1}, got ${step}`,
        });
      }
    });

    const states = val.stateMatrix.map((row) => row.state);
    for (const requiredState of REQUIRED_CASE_STATES) {
      if (!states.includes(requiredState)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["stateMatrix"],
          message: `Missing required state "${requiredState}" in 5-state matrix`,
        });
      }
    }
    if (new Set(states).size !== REQUIRED_CASE_STATES.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["stateMatrix"],
        message: "Duplicate state rows found in stateMatrix",
      });
    }
  });

export type CaseModulesRecord = z.infer<typeof CaseModulesRecordSchema>;
