"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Message } from "@/types/guestbook";
import MessageForm from "./MessageForm";
import MessageCard from "./MessageCard";
import styles from "./Guestbook.module.css";

interface GuestbookClientProps {
  initialMessages: Message[];
}

export default function GuestbookClient({ initialMessages }: GuestbookClientProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const messagesRef = useRef(messages);
  const supabase = createClient();

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    const channel = supabase
      .channel("guestbook")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "GuestbookEntry" },
        async (payload: { new: Record<string, unknown> }) => {
          const newId = payload.new.id as string;
          // Verify existence to avoid duplicates
          if (messagesRef.current.some(m => m.id === newId)) return;

          // Fetch full entry from our API
          const res = await fetch('/api/guestbook');
          const latestMessages = await res.json() as Message[];
          const newMsg = latestMessages.find(m => m.id === newId);

          if (newMsg) {
            setMessages((prev) => {
              if (prev.some(m => m.id === newMsg.id)) return prev;
              return [newMsg, ...prev];
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  const handleMessagePosted = (newMessage: Message) => {
    setMessages((prev) => {
      if (prev.some(m => m.id === newMessage.id)) return prev;
      return [newMessage, ...prev];
    });
  };

  return (
    <section className={styles.container}>
      <MessageForm onMessagePosted={handleMessagePosted} />
      <div className={styles.list}>
        {messages.map((msg) => (
          <MessageCard key={msg.id} message={msg} />
        ))}
      </div>
    </section>
  );
}
