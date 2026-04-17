"use client";
import React, { useState } from 'react';
import { ChatPanel } from './ChatPanel';
import styles from './ChatBubble.module.css';

export const ChatBubble: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className={styles.bubble} onClick={() => setIsOpen(!isOpen)}>
        💬
      </button>
      <ChatPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
