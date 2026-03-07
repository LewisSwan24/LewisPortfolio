/**
 * Shared validation utilities for API routes
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
    return EMAIL_REGEX.test(email);
}

/**
 * Sanitize user input to prevent XSS
 * Escapes HTML special characters
 */
export function sanitize(str: string): string {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;")
        .replace(/\//g, "&#x2F;")
        .trim();
}
