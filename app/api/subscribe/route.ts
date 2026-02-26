import { NextResponse } from "next/server";

// Rate limiting: simple in-memory store (resets on cold start)
const submissions = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT = 3; // max subscriptions per IP per window
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const record = submissions.get(ip);

    if (!record || now - record.lastReset > RATE_WINDOW) {
        submissions.set(ip, { count: 1, lastReset: now });
        return false;
    }

    if (record.count >= RATE_LIMIT) {
        return true;
    }

    record.count++;
    return false;
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, honeypot } = body;

        // Honeypot check — bots fill hidden fields
        if (honeypot) {
            // Return success to the bot to avoid detection
            return NextResponse.json({ success: true });
        }

        // Rate limiting
        const ip =
            request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
            request.headers.get("x-real-ip") ||
            "unknown";

        if (isRateLimited(ip)) {
            return NextResponse.json(
                { error: "Too many requests. Please try again later." },
                { status: 429 }
            );
        }

        // Validate email
        if (!email || typeof email !== "string") {
            return NextResponse.json(
                { error: "Email is required." },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format." },
                { status: 400 }
            );
        }

        // Store subscription
        // For now, log the subscription. In production, integrate with:
        // - Buttondown API: https://api.buttondown.email/v1/subscribers
        // - ConvertKit API: https://api.convertkit.com/v3/forms/{form_id}/subscribe
        // - Mailchimp API: https://usX.api.mailchimp.com/3.0/lists/{list_id}/members
        console.log(`[Newsletter] New subscriber: ${email} from IP: ${ip}`);

        // Example Buttondown integration (uncomment when API key is set):
        // const buttondownKey = process.env.BUTTONDOWN_API_KEY;
        // if (buttondownKey) {
        //   const res = await fetch("https://api.buttondown.email/v1/subscribers", {
        //     method: "POST",
        //     headers: {
        //       Authorization: `Token ${buttondownKey}`,
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ email, type: "regular" }),
        //   });
        //   if (!res.ok) {
        //     const data = await res.json();
        //     return NextResponse.json(
        //       { error: data.detail || "Subscription failed." },
        //       { status: res.status }
        //     );
        //   }
        // }

        return NextResponse.json({
            success: true,
            message: "Thanks for subscribing!",
        });
    } catch {
        return NextResponse.json(
            { error: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}
