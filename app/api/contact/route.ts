import { NextResponse } from "next/server";
import { isRateLimited, getClientIp } from "@/lib/rate-limit";
import { isValidEmail, sanitize } from "@/lib/validators";

export async function POST(request: Request) {
    try {
        // Rate limiting
        const ip = getClientIp(request);

        if (isRateLimited(ip, { name: "contact", maxRequests: 3, windowMs: 60 * 1000 })) {
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
        const formEndpoint = process.env.CONTACT_FORM_ENDPOINT;

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
        console.log("Email: [REDACTED]");
        console.log("Subject:", sanitizedData.subject);
        console.log("Message: [REDACTED]");
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
