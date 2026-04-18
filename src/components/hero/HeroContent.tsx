'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from './HeroContent.module.css';

/**
 * Overlay text content for the hero section.
 */
export default function HeroContent() {
  const [text, setText] = useState('');
  const fullText = "Full Stack Developer";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.overlay}>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Hello, I&apos;m <span className={styles.name}>Alex</span>
      </motion.h1>
      <div className={styles.typed}>{text}</div>
      <div className={styles.cta}>
        <button className={styles.btnPrimary}>View Projects</button>
        <button className={styles.btnSecondary}>Contact Me</button>
      </div>
    </div>
  );
}
