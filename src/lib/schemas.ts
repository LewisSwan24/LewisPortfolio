import { z } from 'zod';

/**
 * Zod schema for comment creation
 */
export const CommentSchema = z.object({
  postId: z.string().uuid(),
  content: z.string().min(1).max(1000),
  parentId: z.string().uuid().optional().nullable(),
});

/**
 * Zod schema for reaction toggling
 */
export const ReactionSchema = z.object({
  postId: z.string().uuid(),
  emoji: z.enum(['fire', 'clap', 'mind-blown', 'lightbulb']),
});
