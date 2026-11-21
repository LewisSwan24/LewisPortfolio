import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { siteConfig } from "@/lib/site";
import { isKvConfigured, kvSetJson } from "@/lib/server/kv";
import { checkContactRateLimit, extractClientIp } from "@/lib/server/rate-limit";

const THIRTY_DAYS_SECONDS = 60 * 60 * 24 * 30;

const ContactSubmissionSchema = z.object({
  name: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(120),
  companyOrRole: z.string().trim().max(100).optional().default(""),
  message: z.string().trim().min(10).max(2000),
  locale: z.enum(["en", "zh"]).optional().default("en"),
  website: z.string().optional().default(""), // honeypot
});

function buildMailtoHref(input: {
  name: string;
  companyOrRole: string;
  message: string;
  locale: "en" | "zh";
}): string {
  const subjectPrefix = input.locale === "zh" ? "来自作品集的联系" : "Portfolio Inquiry";
  const subject = input.companyOrRole
    ? `${subjectPrefix} — ${input.companyOrRole}`
    : `${subjectPrefix} — ${input.name}`;
  const body = `${input.name}${input.companyOrRole ? ` (${input.companyOrRole})` : ""}\n\n${input.message}`;
  return `mailto:${siteConfig.author.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export async function POST(req: Request) {
  const ip = extractClientIp(req.headers);
  const limitCheck = await checkContactRateLimit(ip, 3, 600);
  if (!limitCheck.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many messages submitted. Please wait 10 minutes before retrying." },
      { status: 429 }
    );
  }

  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON payload." }, { status: 400 });
  }

  const parsed = ContactSubmissionSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check your name, email, and message (min 10 characters)." },
      { status: 400 }
    );
  }

  // Silently accept honeypot traps without writing to KV or webhook
  if (parsed.data.website.trim().length > 0) {
    return NextResponse.json({ ok: true, mode: "ignored" });
  }

  const { name, email, companyOrRole, message, locale } = parsed.data;
  const mailtoHref = buildMailtoHref({ name, companyOrRole, message, locale });

  let kvSaved = false;
  if (isKvConfigured()) {
    const id = randomBytes(6).toString("base64url");
    kvSaved = await kvSetJson(
      `contact:msg:${id}`,
      {
        id,
        name,
        email,
        companyOrRole,
        message,
        locale,
        receivedAt: new Date().toISOString(),
      },
      THIRTY_DAYS_SECONDS
    );
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim();
  let webhookSent = false;
  if (webhookUrl) {
    try {
      const hookRes = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "portfolio.contact",
          locale,
          companyOrRole: companyOrRole || "general",
          kvSaved,
          receivedAt: new Date().toISOString(),
        }),
        cache: "no-store",
      });
      webhookSent = hookRes.ok;
    } catch {
      // Never log PII or secrets on webhook failures
    }
  }

  if (kvSaved || webhookSent) {
    return NextResponse.json({
      ok: true,
      mode: kvSaved ? "kv" : "webhook",
      mailtoHref,
    });
  }

  return NextResponse.json({
    ok: true,
    mode: "fallback",
    mailtoHref,
  });
}
