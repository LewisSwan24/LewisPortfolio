/**
 * Vercel Analytics serves its script from `/_vercel/insights/script.js`, which only
 * exists on Vercel. A local production build (`next start`) would request it, get a
 * 404 and fill the console with errors, so the component renders only where Vercel
 * sets `VERCEL=1` (build and runtime).
 */
export function shouldLoadVercelAnalytics(
  env: Record<string, string | undefined> = process.env
): boolean {
  return env.VERCEL === "1";
}
