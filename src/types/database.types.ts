export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string;
                    email: string;
                    role: 'admin' | 'user' | 'guest';
                    created_at: string;
                };
                Insert: { id: string; email: string; role?: string; created_at?: string };
                Update: { id?: string; email?: string; role?: string; created_at?: string };
            };
            blog_posts: {
                Row: {
                    id: string;
                    title: string;
                    slug: string;
                    content: string;
                    published: boolean;
                    created_at: string;
                };
                Insert: { id?: string; title: string; slug: string; content: string; published?: boolean; created_at?: string };
                Update: { id?: string; title?: string; slug?: string; content?: string; published?: boolean; created_at?: string };
            };
            projects: {
                Row: {
                    id: string;
                    title: string;
                    description: string;
                    tech_stack: string[];
                    created_at: string;
                };
                Insert: { id?: string; title: string; description: string; tech_stack: string[]; created_at?: string };
                Update: { id?: string; title?: string; description?: string; tech_stack?: string[]; created_at?: string };
            };
            comments: {
                Row: {
                    id: string;
                    post_id: string;
                    user_id: string;
                    content: string;
                    created_at: string;
                };
                Insert: { id?: string; post_id: string; user_id: string; content: string; created_at?: string };
                Update: { id?: string; post_id?: string; user_id?: string; content?: string; created_at?: string };
            };
            reactions: {
                Row: {
                    id: string;
                    post_id: string;
                    user_id: string;
                    type: string;
                };
                Insert: { id?: string; post_id: string; user_id: string; type: string };
                Update: { id?: string; post_id?: string; user_id?: string; type?: string };
            };
            guestbook: {
                Row: {
                    id: string;
                    user_id: string;
                    message: string;
                    created_at: string;
                };
                Insert: { id?: string; user_id: string; message: string; created_at?: string };
                Update: { id?: string; user_id?: string; message?: string; created_at?: string };
            };
            newsletter: {
                Row: {
                    id: string;
                    email: string;
                    created_at: string;
                };
                Insert: { id?: string; email: string; created_at?: string };
                Update: { id?: string; email?: string; created_at?: string };
            };
        };
    };
}
