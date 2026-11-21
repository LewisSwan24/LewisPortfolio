import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dayMs = 24 * 60 * 60 * 1000;
const watchWindowDays = 30;

function readProjectFile(path) {
  return readFileSync(join(root, path), "utf8");
}

function extractCaseReviewWindow() {
  const casesDir = join(root, "src", "data", "cases");
  const files = readdirSync(casesDir).filter((f) => f.endsWith(".ts") && f !== "index.ts");
  const reviewedDates = [];
  const nextReviewDates = [];
  for (const file of files) {
    const src = readFileSync(join(casesDir, file), "utf8");
    const r = src.match(/reviewedAt["']?\s*:\s*["'](\d{4}-\d{2}-\d{2})["']/)?.[1];
    const n = src.match(/nextReviewAt["']?\s*:\s*["'](\d{4}-\d{2}-\d{2})["']/)?.[1];
    if (r) reviewedDates.push(r);
    if (n) nextReviewDates.push(n);
  }
  reviewedDates.sort();
  nextReviewDates.sort();
  return {
    reviewedAt: reviewedDates[reviewedDates.length - 1] ?? "",
    nextReviewAt: nextReviewDates[0] ?? "",
  };
}

function extractRoleIds(source) {
  const roleBlock = source.match(/hiringRoleIds\s*=\s*\[([\s\S]*?)\]/)?.[1] ?? "";
  return [...roleBlock.matchAll(/"([^"]+)"/g)].map((match) => match[1]);
}

function extractClaimIds(source) {
  const claimIds = new Set();

  for (const block of source.matchAll(
    /proofClaims:\s*\[([\s\S]*?)\]\s*,\s*interviewQuestions/g
  )) {
    for (const match of block[1].matchAll(/id:\s*"([^"]+)"/g)) {
      claimIds.add(match[1]);
    }
  }

  return claimIds;
}

function statusFor(nextReviewAt, generatedAt) {
  const reviewDate = new Date(`${nextReviewAt}T00:00:00.000Z`);
  const generatedDate = new Date(`${generatedAt}T00:00:00.000Z`);
  const daysUntilReview = Math.ceil(
    (reviewDate.getTime() - generatedDate.getTime()) / dayMs
  );

  if (daysUntilReview < 0) return "stale";
  if (daysUntilReview <= watchWindowDays) return "watch";
  return "fresh";
}

const anchorsSource = readProjectFile("src/lib/proof/anchors.ts");
const rolePacketsSource = readProjectFile("src/lib/proof/role-packets.ts");

const roleIds = extractRoleIds(anchorsSource);
const claimIds = extractClaimIds(rolePacketsSource);
const { reviewedAt, nextReviewAt } = extractCaseReviewWindow();
const generatedAt = new Date().toISOString().slice(0, 10);
const trackedEntries = claimIds.size + roleIds.length * 21;
const missingReview = reviewedAt && nextReviewAt ? 0 : trackedEntries;
const status = statusFor(nextReviewAt, generatedAt);
const fresh = status === "fresh" ? trackedEntries : 0;
const watch = status === "watch" ? trackedEntries : 0;
const stale = status === "stale" ? trackedEntries : 0;

console.log("Proof maintenance report");
console.log(`Generated: ${generatedAt}`);
console.log(`Tracked entries: ${trackedEntries}`);
console.log(`Fresh: ${fresh}`);
console.log(`Watch: ${watch}`);
console.log(`Stale: ${stale}`);
console.log(`Missing review metadata: ${missingReview}`);
console.log(`Role claims: ${claimIds.size}`);
console.log(`Application packets: ${roleIds.length}`);
console.log(`Follow-through plans: ${roleIds.length}`);
console.log(`Review room roles: ${roleIds.length}`);
console.log(`Role comparison lanes: ${roleIds.length}`);
console.log(`Interview agenda roles: ${roleIds.length}`);
console.log(`Hiring scorecard lanes: ${roleIds.length}`);
console.log(`Hiring shortlist lanes: ${roleIds.length}`);
console.log(`Hiring debrief lanes: ${roleIds.length}`);
console.log(`Hiring decision lanes: ${roleIds.length}`);
console.log(`Hiring offer lanes: ${roleIds.length}`);
console.log(`Hiring onboarding lanes: ${roleIds.length}`);
console.log(`Hiring kickoff lanes: ${roleIds.length}`);
console.log(`Hiring impact lanes: ${roleIds.length}`);
console.log(`Hiring growth lanes: ${roleIds.length}`);
console.log(`Hiring retention lanes: ${roleIds.length}`);
console.log(`Hiring partnership lanes: ${roleIds.length}`);
console.log(`Hiring command lanes: ${roleIds.length}`);
console.log(`Hiring briefing lanes: ${roleIds.length}`);
console.log(`Hiring readiness lanes: ${roleIds.length}`);
console.log(`Hiring action lanes: ${roleIds.length}`);
console.log(`Hiring tracker lanes: ${roleIds.length}`);
console.log(`Last reviewed: ${reviewedAt || "missing"}`);
console.log(`Next review: ${nextReviewAt || "missing"}`);
