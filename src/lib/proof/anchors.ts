import type { HiringRoleId, ProjectEvidenceSlug } from "./types";

export const projectEvidenceSlugs = [
  "connect",
  "spectra",
  "maze",
  "vigil",
  "hoop",
] as const satisfies readonly ProjectEvidenceSlug[];

export const hiringRoleIds = [
  "ux-product",
  "ux-research",
  "ai-ux",
  "accessibility",
] as const satisfies readonly HiringRoleId[];

export const roleRouteParams = hiringRoleIds.map((role) => ({ role }));

export const projectLabels: Record<ProjectEvidenceSlug, string> = {
  connect: "UQ Connect",
  spectra: "Spectra Lens",
  maze: "MazeRunners",
  vigil: "Vigil",
  hoop: "Hoop Dream",
};
