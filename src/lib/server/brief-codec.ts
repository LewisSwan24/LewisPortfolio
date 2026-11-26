import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { z } from "@/lib/zod";
import { RoleTrackSchema } from "@/lib/cases/schema";
import { CURRENT_PROJECT_SLUGS } from "@/lib/project-routes";

export const BriefPayloadSchema = z.object({
  company: z.string().trim().min(1).max(80),
  roleTrack: RoleTrackSchema,
  locale: z.enum(["en", "zh"]),
  intro: z.string().trim().min(1).max(500),
  slugs: z.array(z.enum(CURRENT_PROJECT_SLUGS)).min(1).max(4),
  createdAt: z.string().min(1),
});

export type BriefPayload = z.infer<typeof BriefPayloadSchema>;

export const CreateBriefInputSchema = BriefPayloadSchema.omit({ createdAt: true });
export type CreateBriefInput = z.infer<typeof CreateBriefInputSchema>;

function signPayload(encoded: string, secret: string): string {
  return createHmac("sha256", secret).update(encoded).digest("base64url").slice(0, 16);
}

export function generateShortBriefId(): string {
  return randomBytes(6).toString("base64url");
}

export function isShortBriefId(id: string): boolean {
  return /^[A-Za-z0-9_-]{6,32}$/.test(id) && !id.startsWith("s_");
}

export function encodeStatelessBrief(payload: BriefPayload, secret?: string): string {
  const compact = {
    c: payload.company,
    r: payload.roleTrack,
    l: payload.locale,
    i: payload.intro,
    s: payload.slugs,
    t: payload.createdAt,
  };
  const encoded = Buffer.from(JSON.stringify(compact), "utf8").toString("base64url");
  const trimmedSecret = secret?.trim();
  if (trimmedSecret) {
    return `s_${encoded}.${signPayload(encoded, trimmedSecret)}`;
  }
  return `s_${encoded}`;
}

export function decodeStatelessBrief(token: string, secret?: string): BriefPayload | null {
  if (!token.startsWith("s_")) return null;
  const body = token.slice(2);
  const dotIdx = body.indexOf(".");
  const encoded = dotIdx === -1 ? body : body.slice(0, dotIdx);
  const providedSig = dotIdx === -1 ? null : body.slice(dotIdx + 1);
  if (!encoded) return null;

  const trimmedSecret = secret?.trim();
  if (trimmedSecret) {
    if (!providedSig) return null;
    const expectedSig = signPayload(encoded, trimmedSecret);
    const a = Buffer.from(providedSig, "utf8");
    const b = Buffer.from(expectedSig, "utf8");
    if (a.length !== b.length || !timingSafeEqual(a, b)) {
      return null;
    }
  }

  try {
    const parsed = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as Record<
      string,
      unknown
    >;
    const candidate = {
      company: parsed.c,
      roleTrack: parsed.r,
      locale: parsed.l,
      intro: parsed.i,
      slugs: parsed.s,
      createdAt: parsed.t,
    };
    const result = BriefPayloadSchema.safeParse(candidate);
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}
