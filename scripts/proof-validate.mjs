import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const pnpm = process.platform === "win32" ? "pnpm.cmd" : "pnpm";

function run(label, command) {
  console.log(`\n${label}`);

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

console.log("Proof validation gate");

// Call vitest directly rather than through `pnpm test --run`: pnpm 9 (which CI
// pins) parses --run as its own option and aborts with "Unknown option: 'run'",
// while pnpm 10 forwards it. Invoking the binary is version-agnostic.
run(
  "Running proof & unified case registry validation tests...",
  "vitest run tests/lib/proof-registry.test.ts tests/lib/proof-validation.test.ts tests/lib/case-registry.test.ts"
);

run("Running proof maintenance report...", `${pnpm} proof:maintenance`);

console.log("\nProof validation passed");
