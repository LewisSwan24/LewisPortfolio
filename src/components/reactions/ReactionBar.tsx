"use client";

import { useState } from 'react';

const EMOJIS = { fire: '🔥', clap: '👏', 'mind-blown': '🤯', lightbulb: '💡' };

export default function ReactionBar({ postId }: { postId: string }) {
  const [reactions, setReactions] = useState<Record<string, number>>({});

  const toggleReaction = async (emoji: string) => {
    await fetch('/api/reactions', {
      method: 'POST',
      body: JSON.stringify({ postId, emoji }),
      headers: { 'Content-Type': 'application/json' },
    });
  };

  return (
    <div className="flex gap-2">
      {Object.entries(EMOJIS).map(([key, icon]) => (
        <button key={key} onClick={() => toggleReaction(key)}>
          {icon} {reactions[key] || 0}
        </button>
      ))}
    </div>
  );
}
