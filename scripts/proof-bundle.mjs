import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const pnpm = process.platform === "win32" ? "pnpm.cmd" : "pnpm";

function run(command) {
  const result = spawnSync(command, {
    cwd: root,
    encoding: "utf8",
    shell: true,
  });

  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);

  if (result.error) {
    console.error(result.error.message);
    process.exit(1);
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }

  return result.stdout;
}

function readProjectFile(path) {
  return readFileSync(join(root, path), "utf8");
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

function countProofAnchors() {
  const files = [
    "src/lib/proof/role-packets.ts",
    "src/lib/proof/application-packets.ts",
    "src/lib/proof/follow-through.ts",
  ];

  return files.reduce((total, path) => {
    const source = readProjectFile(path);
    return total + [...source.matchAll(/"\/projects\/[^"]+#[^"]+"/g)].length;
  }, 0);
}

function extractMarkdown(output) {
  const start = output.indexOf("# Proof Handoff Manifest");

  if (start === -1) {
    console.error("Could not find proof handoff Markdown in proof:export output.");
    process.exit(1);
  }

  return `${output.slice(start).trimEnd()}\n`;
}

function byteLength(content) {
  return Buffer.byteLength(content, "utf8");
}

console.log("Proof release bundle");
console.log("Running proof export before bundle...");

const exportOutput = run(`${pnpm} proof:export`);
const markdown = extractMarkdown(exportOutput);
const generatedAt = markdown.match(/^Generated: ([^\n]+)$/m)?.[1] ?? new Date().toISOString().slice(0, 10);
const label = `proof-release-${generatedAt}`;
const outputDir = `docs/proof-release/${generatedAt}`;
const absoluteOutputDir = join(root, outputDir);
const handoffFilename = `proof-handoff-${generatedAt}.md`;
const manifestFilename = `${label}.json`;
const roleIds = extractRoleIds(readProjectFile("src/lib/proof/anchors.ts"));
const claimIds = extractClaimIds(readProjectFile("src/lib/proof/role-packets.ts"));

const bundleManifest = {
  generatedAt,
  label,
  status: "ready",
  outputDir,
  summary: {
    roles: roleIds.length,
    routes: roleIds.length * 3 + 8,
    anchors: countProofAnchors(),
    maintenanceEntries: claimIds.size + roleIds.length * 10,
  },
  commands: [
    "pnpm proof:validate",
    "pnpm proof:handoff",
    "pnpm proof:export",
    "pnpm proof:bundle",
  ],
  artifacts: [
    {
      kind: "handoff-markdown",
      filename: handoffFilename,
      format: "markdown",
      bytes: byteLength(markdown),
    },
    {
      kind: "release-manifest",
      filename: manifestFilename,
      format: "json",
      bytes: 0,
    },
  ],
};

let manifestJson = `${JSON.stringify(bundleManifest, null, 2)}\n`;
bundleManifest.artifacts[1].bytes = byteLength(manifestJson);
manifestJson = `${JSON.stringify(bundleManifest, null, 2)}\n`;
bundleManifest.artifacts[1].bytes = byteLength(manifestJson);
manifestJson = `${JSON.stringify(bundleManifest, null, 2)}\n`;

mkdirSync(absoluteOutputDir, { recursive: true });
writeFileSync(join(absoluteOutputDir, handoffFilename), markdown, "utf8");
writeFileSync(join(absoluteOutputDir, manifestFilename), manifestJson, "utf8");

console.log("\nProof release bundle written");
console.log(`- ${outputDir}/${handoffFilename}`);
console.log(`- ${outputDir}/${manifestFilename}`);
