import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message } from '@/types/chat';
import styles from './ChatMessage.module.css';

interface Props {
  message: Message;
}

export const ChatMessage: React.FC<Props> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`${styles.wrapper} ${isUser ? styles.user : styles.ai}`}>
      <div className={styles.avatar}>{isUser ? 'U' : 'AI'}</div>
      <div className={styles.bubble}>
        <ReactMarkdown>{message.content}</ReactMarkdown>
        <div className={styles.footer}>
          {message.timestamp.toLocaleTimeString()}
          <button className={styles.copyBtn} onClick={() => navigator.clipboard.writeText(message.content)}>
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};
