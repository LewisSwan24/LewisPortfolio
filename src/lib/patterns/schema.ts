import "@/lib/zod-jitless";
import { z } from "zod";
import {
  CaseSimulatorIdSchema,
  LocalizedStringSchema,
  RoleTrackSchema,
} from "@/lib/cases/schema";
import { CaseVerifiedStatusSchema } from "@/lib/cases/modules-schema";
import { CURRENT_PROJECT_SLUGS, isUnlistedProject } from "@/lib/project-routes";

export const PatternCategorySchema = z.enum([
  "ai-boundaries",
  "physical-hardware",
  "state-architecture",
  "social-consent",
]);

export type PatternCategory = z.infer<typeof PatternCategorySchema>;

export const PatternCodeSnippetSchema = z.object({
  filename: z.string().min(1),
  language: z.enum(["tsx", "css", "ts"]),
  caption: LocalizedStringSchema,
  code: z.string().min(40),
});

export type PatternCodeSnippet = z.infer<typeof PatternCodeSnippetSchema>;

export const InteractionPatternSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  order: z.number().int().positive(),
  category: PatternCategorySchema,
  roleTracks: z.array(RoleTrackSchema).min(1),
  sourceCaseSlug: z
    .enum(CURRENT_PROJECT_SLUGS)
    .refine((slug) => !isUnlistedProject(slug), {
      message: "Pattern Atlas must only cite publicly listed cases.",
    }),
  liveWidgetId: CaseSimulatorIdSchema,
  title: LocalizedStringSchema,
  tagline: LocalizedStringSchema,
  humanTension: LocalizedStringSchema,
  commonAntiPattern: LocalizedStringSchema,
  chosenRule: LocalizedStringSchema,
  a11yGuarantees: z.array(LocalizedStringSchema).min(2),
  metricsCeiling: z.object({
    verifiedStatus: CaseVerifiedStatusSchema,
    summary: LocalizedStringSchema,
  }),
  codeSnippet: PatternCodeSnippetSchema,
});

export type InteractionPattern = z.infer<typeof InteractionPatternSchema>;
