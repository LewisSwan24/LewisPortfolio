'use client';

import { ChatBubble } from './chat/ChatBubble';

/**
 * ChatWidget wrapper - renders the floating chat bubble
 * which self-manages its open/close state internally.
 */
export function ChatWidget() {
  return <ChatBubble />;
}
