import { z } from "zod";

/**
 * zod v4 checks for JIT support by calling `Function("")`. The call is caught,
 * yet Chrome still reports it as a CSP `script-src 'eval'` violation, and our
 * CSP does not allow eval. Turning JIT off skips the probe; parsing results
 * are the same, only without the compiled fast path.
 *
 * Import zod from here, never from "zod" directly (tests/lib/zod-jitless.test.ts).
 */
z.config({ jitless: true });

export { z };
