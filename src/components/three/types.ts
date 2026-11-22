import type { CurrentProjectSlug } from "@/lib/project-routes";

export type ThreeLocale = "en" | "zh";
export type HardwareSpecimenSlug = "walkie" | "maze" | "onthebeat";

export interface ThreeCapabilityState {
  supported: boolean;
  checked: boolean;
  contextLost: boolean;
  reducedMotion: boolean;
}

export interface SpecimenNodeSpec {
  slug: Extract<
    CurrentProjectSlug,
    "walkie" | "lamplight" | "autofill" | "maze" | "onthebeat" | "grassland"
  >;
  title: string;
  axisCoords: readonly [number, number, number]; // [Human Friction, Boundary Stance, Physicality] in [-1, 1]
  svgPos: readonly [number, number]; // SVG percentage coordinates [cx, cy] in 640x360 viewBox
  colorLight: string;
  colorDark: string;
  mediumTag: { en: string; zh: string };
  thesisQuestion: { en: string; zh: string };
  decisionSummary: { en: string; zh: string };
  honestScope: { en: string; zh: string };
}
