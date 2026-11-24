import type { RawResearchVaultRecord } from "@/lib/cases/research-vault-schema";
import { walkieResearchVault } from "./walkie";
import { lamplightResearchVault } from "./lamplight";
import { autofillResearchVault } from "./autofill";
import { mazeResearchVault } from "./maze";
import { onthebeatResearchVault } from "./onthebeat";
import { grasslandResearchVault } from "./grassland";

const ALL_RESEARCH_VAULTS: readonly RawResearchVaultRecord[] = [
  walkieResearchVault,
  lamplightResearchVault,
  autofillResearchVault,
  mazeResearchVault,
  onthebeatResearchVault,
  grasslandResearchVault,
];

const RESEARCH_VAULT_MAP = new Map<string, RawResearchVaultRecord>(
  ALL_RESEARCH_VAULTS.map((record) => [record.slug, record])
);

export function getCaseResearchVault(slug: string): RawResearchVaultRecord | null {
  return RESEARCH_VAULT_MAP.get(slug) ?? null;
}

export function getAllResearchVaults(): readonly RawResearchVaultRecord[] {
  return ALL_RESEARCH_VAULTS;
}
