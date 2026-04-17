"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '@/hooks/useChat';
import { ChatMessage } from './ChatMessage';
import styles from './ChatPanel.module.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatPanel: React.FC<Props> = ({ isOpen, onClose }) => {
  const { messages, sendMessage, isLoading } = useChat();
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  if (!isOpen) return null;

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h3>AI Portfolio Assistant</h3>
        <button onClick={onClose}>Close</button>
      </div>
      <div className={styles.messages} ref={scrollRef}>
        {messages.map((m) => <ChatMessage key={m.id} message={m} />)}
        {isLoading && <div className={styles.typing}><span>.</span><span>.</span><span>.</span></div>}
      </div>
      <form className={styles.inputArea} onSubmit={(e) => { e.preventDefault(); sendMessage(input); setInput(''); }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything..." />
        <button type="submit" disabled={isLoading}>Send</button>
      </form>
    </div>
  );
};
