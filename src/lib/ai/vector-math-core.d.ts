export const SEMANTIC_DIM: number;

export interface SemanticFeature {
  token: string;
  weight: number;
}

export function extractSemanticFeatures(raw: string): SemanticFeature[];
export function buildQuantizedVector(raw: string): number[];
export function quantizedCosineSimilarity(
  a: readonly number[],
  b: readonly number[]
): number;
