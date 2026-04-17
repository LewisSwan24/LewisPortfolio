import { createClient } from '@/lib/supabase/server';

export interface Session {
    user: {
        id: string;
        email: string;
        name?: string;
        role?: string;
    };
}

/**
 * Get the current user session from Supabase Auth.
 * Use this in API routes and Server Components.
 */
export async function getServerSession(): Promise<Session | null> {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) return null;

    return {
        user: {
            id: user.id,
            email: user.email || '',
            name: user.user_metadata?.full_name || user.user_metadata?.name,
            role: user.user_metadata?.role || 'USER',
        },
    };
}
