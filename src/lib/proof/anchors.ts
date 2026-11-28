import type { HiringRoleId, ProjectEvidenceSlug } from "./types";

export const projectEvidenceSlugs = [
  "connect",
  "spectra",
  "maze",
  "hoop",
  "pricewise",
  "gapmapper",
  "rules",
  "grassland",
  "onthebeat",
  "lamplight",
  "autofill",
  "walkie",
  "fencepost",
] as const satisfies readonly ProjectEvidenceSlug[];

export const hiringRoleIds = [
  "ux-product",
  "ux-research",
  "ai-ux",
  "accessibility",
] as const satisfies readonly HiringRoleId[];

