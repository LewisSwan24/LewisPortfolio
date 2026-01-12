"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

interface ContactFormProps {
    dict: any;
}

export function ContactForm({ dict }: ContactFormProps) {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");

        try {
            const formEndpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT;
            
            if (!formEndpoint) {
                throw new Error("Contact form endpoint not configured");
            }
            
            const response = await fetch(formEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(formState),
            });

            if (response.ok) {
                setSubmitted(true);
                setFormState({ name: "", email: "", subject: "", message: "" });
            } else {
                throw new Error("Failed to send message");
            }
        } catch (err) {
            setError("Failed to send message. Please try again or email me directly.");
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    if (submitted) {
        return (
            <div className="rounded-2xl border border-border bg-card/50 p-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                    <svg
                        className="h-8 w-8 text-green-600 dark:text-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                    Message sent successfully!
                </h3>
                <p className="text-muted-foreground mb-4">
                    Thank you for reaching out. I&apos;ll get back to you as soon as possible.
                </p>
                <button
                    onClick={() => setSubmitted(false)}
                    className="text-sm text-accent hover:underline"
                >
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
                <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-foreground"
                >
                    {dict.contact.form.fields.name.label}
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    placeholder={dict.contact.form.fields.name.placeholder}
                    className={cn(
                        "w-full rounded-xl border border-border/60 bg-background/40 backdrop-blur-md",
                        "px-4 py-3 text-foreground placeholder:text-muted-foreground",
                        "shadow-sm shadow-black/5",
                        "focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20",
                        "transition-all duration-200"
                    )}
                />
            </div>

            {/* Email */}
            <div>
                <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-foreground"
                >
                    {dict.contact.form.fields.email.label}
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    placeholder={dict.contact.form.fields.email.placeholder}
                    className={cn(
                        "w-full rounded-xl border border-border/60 bg-background/40 backdrop-blur-md",
                        "px-4 py-3 text-foreground placeholder:text-muted-foreground",
                        "shadow-sm shadow-black/5",
                        "focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20",
                        "transition-all duration-200"
                    )}
                />
            </div>

            {/* Subject */}
            <div>
                <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-medium text-foreground"
                >
                    {dict.contact.form.fields.subject.label}
                </label>
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    placeholder={dict.contact.form.fields.subject.placeholder}
                    className={cn(
                        "w-full rounded-xl border border-border/60 bg-background/40 backdrop-blur-md",
                        "px-4 py-3 text-foreground placeholder:text-muted-foreground",
                        "shadow-sm shadow-black/5",
                        "focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20",
                        "transition-all duration-200"
                    )}
                />
            </div>

            {/* Message */}
            <div>
                <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-foreground"
                >
                    {dict.contact.form.fields.message.label}
                </label>
                <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder={dict.contact.form.fields.message.placeholder}
                    className={cn(
                        "w-full rounded-xl border border-border/60 bg-background/40 backdrop-blur-md",
                        "px-4 py-3 text-foreground placeholder:text-muted-foreground",
                        "shadow-sm shadow-black/5",
                        "focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20",
                        "transition-all duration-200",
                        "resize-none"
                    )}
                />
            </div>

            {/* Error Message */}
            {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4">
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={submitting}
                className={cn(
                    "w-full rounded-xl bg-gradient-to-r from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))]",
                    "px-6 py-3 text-sm font-medium text-accent-foreground",
                    "shadow-lg shadow-accent/25",
                    "transition-all duration-200",
                    "hover:shadow-xl hover:shadow-accent/30",
                    "focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    submitting && "animate-pulse"
                )}
            >
                {submitting ? "Sending..." : dict.contact.form.submit}
            </button>

            {/* Privacy Notice */}
            <p className="text-center text-xs text-muted-foreground">
                {dict.contact.form.privacyNotice || "Your information will be kept confidential and used only to respond to your inquiry."}
            </p>
        </form>
    );
}
