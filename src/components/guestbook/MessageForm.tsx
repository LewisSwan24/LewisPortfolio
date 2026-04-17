import { useState } from "react";
import { z } from "zod";
import styles from "./MessageForm.module.css";

const schema = z.object({
  content: z.string().min(1).max(500),
});

interface MessageFormProps {
  onMessagePosted: (newMessage: any) => void;
}

export default function MessageForm({ onMessagePosted }: MessageFormProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    const result = schema.safeParse({ content });
    if (!result.success) return alert("Invalid message");

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      
      if (!response.ok) {
        if (response.status === 401) throw new Error("Unauthorized");
        throw new Error("Failed to post");
      }
      const data = await response.json();
      onMessagePosted(data);
      setContent("");
    } catch (error) {
      console.error(error);
      if (error instanceof Error && error.message !== "Unauthorized") {
         alert("Failed to post message");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={500}
        placeholder="Leave a message..."
        className={styles.textarea}
        required
      />
      <div className={styles.footer}>
        <span>{content.length}/500</span>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Posting..." : "Post"}
        </button>
      </div>
    </form>
  );
}
