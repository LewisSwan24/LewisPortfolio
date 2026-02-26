import { NextResponse } from "next/server";

// Rate limiting: simple in-memory store (use Redis/KV in production)
const rateLimit = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 3; // max 3 submissions per minute

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimit.get(ip);

    if (!entry || now - entry.lastReset > RATE_LIMIT_WINDOW) {
        rateLimit.set(ip, { count: 1, lastReset: now });
        return false;
    }

    if (entry.count >= MAX_REQUESTS) {
        return true;
    }

    entry.count++;
    return false;
}

// Validation helpers
function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitize(str: string): string {
    return str.replace(/[<>]/g, "").trim();
}

export async function POST(request: Request) {
    try {
        // Rate limiting
        const forwarded = request.headers.get("x-forwarded-for");
        const ip = forwarded?.split(",")[0]?.trim() || "anonymous";

        if (isRateLimited(ip)) {
            return NextResponse.json(
                { error: "Too many requests. Please try again later." },
                { status: 429 }
            );
        }

        const body = await request.json();
        const { name, email, subject, message } = body;

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: "All fields are required." },
                { status: 400 }
            );
        }

        // Validate field lengths
        if (name.length > 100 || email.length > 100 || subject.length > 200 || message.length > 5000) {
            return NextResponse.json(
                { error: "Field length exceeds maximum allowed." },
                { status: 400 }
            );
        }

        // Validate email format
        if (!isValidEmail(email)) {
            return NextResponse.json(
                { error: "Invalid email address." },
                { status: 400 }
            );
        }

        // Honeypot check: if a hidden field "_gotcha" is filled, it's a bot
        if (body._gotcha) {
            // Silently accept but don't process — fool the bot
            return NextResponse.json({ success: true });
        }

        // Sanitize inputs
        const sanitizedData = {
            name: sanitize(name),
            email: sanitize(email),
            subject: sanitize(subject),
            message: sanitize(message),
        };

        // Try external form endpoint first (Formspree, etc.)
        const formEndpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT;

        if (formEndpoint && !formEndpoint.includes("your-form-id")) {
            const response = await fetch(formEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(sanitizedData),
            });

            if (!response.ok) {
                console.error("Form endpoint error:", response.status);
                return NextResponse.json(
                    { error: "Failed to send message. Please try again." },
                    { status: 500 }
                );
            }

            return NextResponse.json({ success: true });
        }

        // Fallback: Log the message (in production, integrate with email service)
        console.log("=== Contact Form Submission ===");
        console.log("Name:", sanitizedData.name);
        console.log("Email:", sanitizedData.email);
        console.log("Subject:", sanitizedData.subject);
        console.log("Message:", sanitizedData.message);
        console.log("Timestamp:", new Date().toISOString());
        console.log("==============================");

        return NextResponse.json({
            success: true,
            message: "Message received. Thank you for reaching out!",
        });
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { error: "An unexpected error occurred. Please try again." },
            { status: 500 }
        );
    }
}
