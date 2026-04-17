import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { Message } from "@/types/guestbook";
import styles from "./MessageCard.module.css";

interface MessageCardProps {
  message: Message;
}

export default function MessageCard({ message }: MessageCardProps) {
  const handleDelete = async () => {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/guestbook/${message.id}`, { method: "DELETE" });
  };

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        {message.author?.avatar && (
          <Image src={message.author.avatar} alt={message.author?.name || 'User'} width={32} height={32} />
        )}
        <span>{message.author?.name || 'Anonymous'}</span>
        <time>{formatDistanceToNow(new Date(message.createdAt))} ago</time>
      </div>
      <p>{message.message}</p>
      <button onClick={handleDelete} className={styles.deleteButton}>Delete</button>
    </article>
  );
}
