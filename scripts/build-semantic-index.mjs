#!/usr/bin/env node
/**
 * Precomputes compact quantized 64-dim int8 semantic vectors for all verified
 * evidence corpus chunks (EN + ZH) at build time, avoiding runtime bloat.
 */
import fs from "node:fs";
import path from "node:path";
import Module, { createRequire } from "node:module";
import ts from "typescript";
import { buildQuantizedVector, SEMANTIC_DIM } from "../src/lib/ai/vector-math-core.mjs";

const ROOT = process.cwd();
const OUT_FILE = path.join(ROOT, "src", "data", "ai", "semantic-index.generated.json");
const require = createRequire(import.meta.url);

// Resolve `@/*` and `@/content/*` aliases cleanly for Node CJS loading
const origResolveFilename = Module._resolveFilename;
Module._resolveFilename = function (request, parent, isMain, options) {
  let mapped = request;
  if (request.startsWith("@/content/")) {
    mapped = path.join(ROOT, "content", request.slice("@/content/".length));
  } else if (request.startsWith("@/")) {
    mapped = path.join(ROOT, "src", request.slice(2));
  }
  return origResolveFilename.call(this, mapped, parent, isMain, options);
};

for (const ext of [".ts", ".tsx"]) {
  require.extensions[ext] = (mod, filename) => {
    const source = fs.readFileSync(filename, "utf8");
    const { outputText } = ts.transpileModule(source, {
      fileName: filename,
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        esModuleInterop: true,
        resolveJsonModule: true,
      },
    });
    mod._compile(outputText, filename);
  };
}

const corpusMod = require(path.join(ROOT, "src", "lib", "ai", "evidence-corpus.ts"));
const items = corpusMod.EVIDENCE_CORPUS_ITEMS;

const entries = {};
for (const item of items) {
  entries[item.id] = {
    en: buildQuantizedVector(`${item.caseTitle.en} ${item.title.en} ${item.text.en}`),
    zh: buildQuantizedVector(`${item.caseTitle.zh} ${item.title.zh} ${item.text.zh}`),
  };
}

const payload = {
  version: "v5.2",
  dim: SEMANTIC_DIM,
  count: items.length,
  entries,
};

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, JSON.stringify(payload), "utf8");
console.log(
  `Built semantic index (${items.length} chunks, ${SEMANTIC_DIM}-dim int8) -> ${path.relative(ROOT, OUT_FILE)}`
);
