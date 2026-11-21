import { z } from "zod";
import { CURRENT_PROJECT_SLUGS } from "@/lib/project-routes";

export const RoleTrackSchema = z.enum([
  "product",
  "interaction",
  "design-eng",
  "ai-ux",
]);

export type RoleTrack = z.infer<typeof RoleTrackSchema>;

export const LocalizedStringSchema = z.object({
  en: z.string().min(1),
  zh: z.string().min(1),
});

export type LocalizedString = z.infer<typeof LocalizedStringSchema>;

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

export type CaseDemo = z.infer<typeof CaseDemoSchema>;

export const CaseLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  external: z.boolean().optional(),
});

export type CaseLink = z.infer<typeof CaseLinkSchema>;

export const CaseCoverSchema = z.object({
  src: z.string().startsWith("/projects/"),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  fit: z.enum(["cover", "contain"]),
  alt: LocalizedStringSchema,
});

export const CaseRecordSchema = z.object({
  slug: z.enum(CURRENT_PROJECT_SLUGS),
  status: z.enum(["listed", "unlisted"]),
  featuredOrder: z.number().int().positive().optional(),
  roleTracks: z.array(RoleTrackSchema).min(1),
  cover: CaseCoverSchema.optional(),
  links: z.array(CaseLinkSchema),
  media: CaseMediaSchema.optional(),
  demo: CaseDemoSchema.optional(),
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
