import GuestbookClient from "@/components/guestbook/GuestbookClient";
import type { Message } from "@/types/guestbook";

// Skip prerendering - requires database connection at runtime
export const dynamic = 'force-dynamic';

/**
 * Guestbook Page
 * Fetches initial messages and renders the client-side interactive component.
 */
export default async function GuestbookPage() {
  let messages: Message[] = [];

  try {
    const { prisma } = await import("@/lib/prisma/client");
    const data = await prisma.guestbookEntry.findMany({
      orderBy: { createdAt: "desc" },
      include: { author: true },
    });
    messages = data as unknown as Message[];
  } catch {
    // Database not available - client will fetch on mount
  }

  return (
    <main className="container">
      <h1>Guestbook</h1>
      <p>Leave a message for the world!</p>
      <GuestbookClient initialMessages={messages} />
    </main>
  );
}
