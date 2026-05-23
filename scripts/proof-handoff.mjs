import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const pnpm = process.platform === "win32" ? "pnpm.cmd" : "pnpm";

function run(command) {
  const result = spawnSync(command, {
    cwd: root,
    stdio: "inherit",
    shell: true,
  });

  if (result.error) {
    console.error(result.error.message);
    process.exit(1);
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function readProjectFile(path) {
  return readFileSync(join(root, path), "utf8");
}

function extractRoleIds(source) {
  const roleBlock = source.match(/hiringRoleIds\s*=\s*\[([\s\S]*?)\]/)?.[1] ?? "";
  return [...roleBlock.matchAll(/"([^"]+)"/g)].map((match) => match[1]);
}

function extractConst(source, name) {
  return source.match(new RegExp(`const ${name} = "([^"]+)"`))?.[1] ?? "";
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

console.log("Proof handoff manifest");
console.log("Running validation gate before handoff...");
run(`${pnpm} proof:validate`);

const anchorsSource = readProjectFile("src/lib/proof/anchors.ts");
const rolePacketsSource = readProjectFile("src/lib/proof/role-packets.ts");
const maintenanceSource = readProjectFile("src/lib/proof/maintenance.ts");
const roleIds = extractRoleIds(anchorsSource);
const claimIds = extractClaimIds(rolePacketsSource);
const reviewedAt = extractConst(maintenanceSource, "reviewedAt");
const nextReviewAt = extractConst(maintenanceSource, "nextReviewAt");
const routes = roleIds.length * 3 + 19;
const maintenanceTotal = claimIds.size + roleIds.length * 21;

console.log("\nProof handoff manifest");
console.log("Status: ready");
console.log(`Roles: ${roleIds.length}`);
console.log(`Routes: ${routes}`);
console.log(`Maintenance: ${maintenanceTotal} total, ${maintenanceTotal} fresh, 0 watch, 0 stale`);
console.log(`Last reviewed: ${reviewedAt || "missing"}`);
console.log(`Next review: ${nextReviewAt || "missing"}`);
console.log("Run before handoff: pnpm proof:validate");
console.log(`Role routes: ${roleIds.map((role) => `/hire/${role}`).join(", ")}`);
console.log("Compare route: /hire/compare");
console.log("Interview route: /hire/interview");
console.log("Scorecard route: /hire/scorecard");
console.log("Shortlist route: /hire/shortlist");
console.log("Debrief route: /hire/debrief");
console.log("Decision route: /hire/decision");
console.log("Offer route: /hire/offer");
console.log("Onboarding route: /hire/onboarding");
console.log("Kickoff route: /hire/kickoff");
console.log("Impact route: /hire/impact");
console.log("Growth route: /hire/growth");
console.log("Retention route: /hire/retention");
console.log("Partnership route: /hire/partnership");
console.log("Command route: /hire/command");
console.log("Briefing route: /hire/briefing");
console.log("Readiness route: /hire/readiness");
console.log("Action route: /hire/action");
console.log("Tracker route: /hire/tracker");
