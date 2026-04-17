/**
 * Guestbook message type used across the application.
 */
export type GuestbookMessage = {
  id: string;
  message: string;
  authorId: string;
  createdAt: Date | string;
  author?: {
    id: string;
    email: string;
    name: string | null;
    avatar: string | null;
    role: string;
    createdAt: Date | string;
  };
};

export type Message = GuestbookMessage;
