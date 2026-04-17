import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/types/database.types';

/**
 * Creates a Supabase browser client.
 * Uses a singleton pattern to ensure a single instance is used throughout the client lifecycle.
 */
let browserSupabase: ReturnType<typeof createBrowserClient<Database>> | null = null;

export const createClient = () => {
    if (browserSupabase) return browserSupabase;

    browserSupabase = createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    return browserSupabase;
};
