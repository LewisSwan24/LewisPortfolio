import { config } from "zod/v4/core";

/**
 * zod v4 checks for JIT support by calling `Function("")` the first time a
 * schema is built. The call is caught, yet Chrome still reports it as a CSP
 * `script-src 'eval'` violation, and our CSP does not allow eval. Turning JIT
 * off skips the probe; parsing results are the same, only without the
 * compiled fast path. The flag lives on `globalThis.__zod_globalConfig`, so
 * it reaches every zod import.
 *
 * Import this before zod in every module that builds a schema:
 *   import "@/lib/zod-jitless";
 *   import { z } from "zod";
 * (tests/lib/zod-jitless.test.ts). Keep importing `z` from "zod" directly; a
 * wrapper that re-exports `z` pulls all of zod into the client bundle.
 */
config({ jitless: true });
