import "@/lib/zod-jitless";
import { z } from "zod";
import { CURRENT_PROJECT_SLUGS } from "@/lib/project-routes";

export const RoleTrackSchema = z.enum([
  "product",
  "interaction",
  "design-eng",
  "ai-ux",
]);

export type RoleTrack = z.infer<typeof RoleTrackSchema>;

export const WorkTagSchema = z.enum(["flag", "research", "ai", "hardware"]);

export type WorkTag = z.infer<typeof WorkTagSchema>;

export const LocalizedStringSchema = z.object({
  en: z.string().min(1),
  zh: z.string().min(1),
});

export const CaseWorkSummarySchema = z.object({
  order: z.number().int().positive().optional(),
  tags: z.array(WorkTagSchema).min(1),
  year: z.string().min(1),
  dur: z.string().min(1),
  durZh: z.string().min(1).optional(),
  problem: LocalizedStringSchema,
  changed: LocalizedStringSchema,
});

export const CaseReviewMetaSchema = z.object({
  reviewedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  nextReviewAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  auditNote: z.string().min(1),
});

export type CaseReviewMeta = z.infer<typeof CaseReviewMetaSchema>;

export const CaseCardCopySchema = z.object({
  kicker: z.string().min(1),
  title: z.string().min(1),
  sub: z.string().min(1),
  role: z.string().min(1),
  date: z.string().min(1),
  m1: z.string().min(1),
  m2: z.string().min(1),
  m3: z.string().min(1),
});

export type CaseCardCopy = z.infer<typeof CaseCardCopySchema>;

export const CaseMethodItemSchema = z.object({
  t: z.string().min(1),
  b: z.string().min(1),
});

export const CaseOutcomeMetricSchema = z.object({
  v: z.string().min(1),
  label: z.string().min(1),
});

export const CaseNarrativeCopySchema = z.object({
  hero: z.object({
    title: z.string().min(1),
    sub: z.string().min(1),
  }),
  roleVal: z.string().min(1),
  timeVal: z.string().min(1),
  teamVal: z.string().min(1),
  toolsVal: z.string().min(1),
  ch: z.object({
    label: z.string().min(1),
    title: z.string().min(1),
    p: z.string().min(1),
  }),
  re: z.object({
    label: z.string().min(1),
    title: z.string().min(1),
    m1: CaseMethodItemSchema,
    m2: CaseMethodItemSchema,
    m3: CaseMethodItemSchema,
    quote: z.string().min(1).optional(),
    quoteWho: z.string().min(1).optional(),
  }),
  sy: z.object({
    label: z.string().min(1),
    title: z.string().min(1),
    p: z.string().min(1),
  }),
  id: z.object({
    label: z.string().min(1),
    p: z.string().min(1),
  }),
  pr: z.object({
    label: z.string().min(1),
    p: z.string().min(1),
  }),
  te: z.object({
    label: z.string().min(1),
    p: z.string().min(1),
  }),
  ou: z.object({
    label: z.string().min(1),
    p: z.string().min(1),
    m1: CaseOutcomeMetricSchema,
    m2: CaseOutcomeMetricSchema,
    m3: CaseOutcomeMetricSchema,
  }),
  rf: z.object({
    label: z.string().min(1),
    p: z.string().min(1),
  }),
});

export type CaseNarrativeCopy = z.infer<typeof CaseNarrativeCopySchema>;

export const CaseMediaImageSchema = z.object({
  src: z.string().startsWith("/projects/"),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  alt: z.string().min(1),
  altZh: z.string().min(1),
  caption: z.string().min(1),
  captionZh: z.string().min(1),
});

export const CaseMediaSchema = z.object({
  label: z.string().min(1),
  labelZh: z.string().min(1),
  blurb: z.string().min(1),
  blurbZh: z.string().min(1),
  images: z.array(CaseMediaImageSchema).min(1),
  video: z
    .object({
      src: z.string().startsWith("/projects/"),
      poster: z.string().startsWith("/projects/"),
      caption: z.string().min(1),
      captionZh: z.string().min(1),
    })
    .optional(),
});

export type CaseMedia = z.infer<typeof CaseMediaSchema>;

export const CaseDemoSchema = z.object({
  src: z.string().min(1),
  poster: z.string().startsWith("/projects/"),
  title: z.string().min(1),
  titleZh: z.string().min(1),
  posterAlt: z.string().min(1),
  posterAltZh: z.string().min(1),
  label: z.string().min(1),
  labelZh: z.string().min(1),
  blurb: z.string().min(1),
  blurbZh: z.string().min(1),
  action: z.string().min(1),
  actionZh: z.string().min(1),
});

export const CaseLinkSchema = z.object({
  label: z.string().min(1),
  labelZh: z.string().min(1).optional(),
  href: z.string().min(1),
  external: z.boolean().optional(),
});

export const CaseCoverSchema = z.object({
  src: z.string().startsWith("/projects/"),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  fit: z.enum(["cover", "contain"]),
  alt: LocalizedStringSchema,
});

export const CaseSimulatorIdSchema = z.enum([
  "maze-contact",
  "walkie-wrist",
  "lamplight-triage",
  "autofill-confidence",
  "fencepost-revoke",
  "connect-ia-reset",
  "grassland-rules",
  "onthebeat-handshake",
]);

export type CaseSimulatorId = z.infer<typeof CaseSimulatorIdSchema>;

export const CaseInteractiveDemoSchema = z.object({
  id: CaseSimulatorIdSchema,
  placement: z.enum(["after-summary", "mid-narrative"]),
  eyebrow: LocalizedStringSchema,
  title: LocalizedStringSchema,
  prompt: LocalizedStringSchema,
  takeaway: LocalizedStringSchema,
});

export type CaseInteractiveDemo = z.infer<typeof CaseInteractiveDemoSchema>;

export const CaseWireframeIdSchema = z.enum([
  "connect-ia",
  "pricewise-match",
  "hoop-style",
  "lamplight-log",
  "walkie-voice",
  "autofill-guess",
  "maze-solo",
  "onthebeat-radar",
  "grassland-auto",
]);

export type CaseWireframeId = z.infer<typeof CaseWireframeIdSchema>;

export const CaseQuoteCategorySchema = z.enum([
  "structure",
  "trust",
  "physical",
]);

export type CaseQuoteCategory = z.infer<typeof CaseQuoteCategorySchema>;

export const CaseMicroLoopIdSchema = z.enum([
  "onthebeat-wave",
  "walkie-relay",
  "grassland-rts",
  "lamplight-triage",
  "autofill-lanes",
  "maze-state",
]);

export const CaseScrubberSchema = z.object({
  eyebrow: LocalizedStringSchema,
  title: LocalizedStringSchema,
  summary: LocalizedStringSchema,
  beforeLabel: LocalizedStringSchema,
  afterLabel: LocalizedStringSchema,
  wireframeId: CaseWireframeIdSchema,
  /**
   * A photo of the earlier state. Only a photo-on-photo pair gets the drag
   * slider; a drawing with text renders as two side-by-side cards instead.
   */
  beforeImage: z
    .object({
      src: z.string().startsWith("/projects/"),
      alt: LocalizedStringSchema,
      width: z.number().int().positive(),
      height: z.number().int().positive(),
    })
    .optional(),
  afterImage: z.object({
    src: z.string().startsWith("/projects/"),
    alt: LocalizedStringSchema,
    width: z.number().int().positive(),
    height: z.number().int().positive(),
  }),
});

export type CaseScrubber = z.infer<typeof CaseScrubberSchema>;

export const CaseResearchQuoteItemSchema = z.object({
  id: z.string().min(1),
  category: CaseQuoteCategorySchema,
  quote: LocalizedStringSchema,
  context: LocalizedStringSchema,
  friction: LocalizedStringSchema,
  decision: LocalizedStringSchema,
});

export const CaseResearchQuotesSchema = z.object({
  eyebrow: LocalizedStringSchema,
  title: LocalizedStringSchema,
  items: z.array(CaseResearchQuoteItemSchema).min(1),
});

export type CaseResearchQuotes = z.infer<typeof CaseResearchQuotesSchema>;

export const CaseMicroLoopSchema = z.object({
  eyebrow: LocalizedStringSchema,
  title: LocalizedStringSchema,
  summary: LocalizedStringSchema,
  loopId: CaseMicroLoopIdSchema,
  steps: z
    .array(
      z.object({
        label: LocalizedStringSchema,
        detail: LocalizedStringSchema,
      })
    )
    .min(3),
});

export type CaseMicroLoopData = z.infer<typeof CaseMicroLoopSchema>;

export const CaseProcessArtifactsSchema = z.object({
  scrubber: CaseScrubberSchema.optional(),
  quotes: CaseResearchQuotesSchema.optional(),
  microLoop: CaseMicroLoopSchema.optional(),
});

export const DesignDecisionTradeoffSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  decisionTitle: LocalizedStringSchema,
  humanTension: LocalizedStringSchema,
  rejectedAlternatives: z
    .array(
      z.object({
        option: LocalizedStringSchema,
        flaw: LocalizedStringSchema,
      })
    )
    .min(1)
    .max(3),
  chosenTradeoff: LocalizedStringSchema,
  residualCostOrRisk: LocalizedStringSchema,
});

export type DesignDecisionTradeoff = z.infer<typeof DesignDecisionTradeoffSchema>;

export const CaseRecordSchema = z.object({
  slug: z.enum(CURRENT_PROJECT_SLUGS),
  status: z.enum(["listed", "unlisted"]),
  featuredOrder: z.number().int().positive().optional(),
  roleTracks: z.array(RoleTrackSchema).min(1),
  workSummary: CaseWorkSummarySchema,
  reviewMeta: CaseReviewMetaSchema,
  cover: CaseCoverSchema.optional(),
  links: z.array(CaseLinkSchema),
  media: CaseMediaSchema.optional(),
  demo: CaseDemoSchema.optional(),
  interactiveDemo: CaseInteractiveDemoSchema.optional(),
  processArtifacts: CaseProcessArtifactsSchema.optional(),
  designDecisions: z.array(DesignDecisionTradeoffSchema).optional(),
  card: z.object({
    en: CaseCardCopySchema,
    zh: CaseCardCopySchema,
  }),
  narrative: z.object({
    en: CaseNarrativeCopySchema,
    zh: CaseNarrativeCopySchema,
  }),
});

export type CaseRecord = z.infer<typeof CaseRecordSchema>;
