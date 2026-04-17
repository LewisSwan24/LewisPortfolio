"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Comment } from '@/types/comment';
import CommentForm from './CommentForm';

export default function CommentList({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = async () => {
    const res = await fetch(`/api/comments?postId=${postId}`);
    const data = await res.json();
    setComments(data);
  };

  useEffect(() => { fetchComments(); }, [postId]);

  const deleteComment = async (id: string) => {
    await fetch(`/api/comments?id=${id}`, { method: 'DELETE' });
    fetchComments();
  };

  return (
    <div>
      <CommentForm postId={postId} onSuccess={fetchComments} />
      {comments.map((comment) => (
        <div key={comment.id} className="comment-card">
          <div className="header">
            <Image
              src={comment.author?.avatar || '/avatar.png'}
              alt={comment.author?.name || 'User'}
              width={32}
              height={32}
            />
            <span>{comment.author?.name}</span>
            <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
          </div>
          <div>{comment.content}</div>
          <button onClick={() => deleteComment(comment.id)}>Delete</button>

          {comment.replies?.map((reply: Comment) => (
            <div key={reply.id} className="reply">
              <p>{reply.content}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
