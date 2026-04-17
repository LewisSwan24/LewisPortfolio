export type Comment = {
  id: string;
  postId: string;
  authorId: string;
  parentId: string | null;
  content: string;
  createdAt: Date;
  author?: {
    name: string | null;
    avatar: string | null;
  };
  replies?: Comment[];
};
