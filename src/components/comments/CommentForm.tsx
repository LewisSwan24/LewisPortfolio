"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import styles from './CommentForm.module.css';

interface Props {
  postId: string;
  parentId?: string;
  onSuccess: () => void;
}

export default function CommentForm({ postId, parentId, onSuccess }: Props) {
  const [content, setContent] = useState('');
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUser({ id: data.user.id, email: data.user.email || '' });
    });
  }, [supabase.auth]);

  if (!user) {
    return (
      <div className={styles.authGate}>
        <p>Please sign in to join the conversation.</p>
        <button onClick={() => supabase.auth.signInWithOAuth({ provider: 'github' })}>Sign In</button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ postId, content, parentId }),
      headers: { 'Content-Type': 'application/json' },
    });
    setContent('');
    onSuccess();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        className={styles.textarea}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."
        required
      />
      <button className={styles.submitBtn} type="submit" disabled={!content.trim()}>Post</button>
    </form>
  );
}
