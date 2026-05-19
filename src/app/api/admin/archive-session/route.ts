import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
    try {
        // 1. Parse the request body
        const body = await req.json();
        const { id } = body;

        if (!id) {
            return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
        }

        // 2. Extract the Auth token sent from the frontend
        const authHeader = req.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Unauthorized: Missing or invalid token' }, { status: 401 });
        }
        const token = authHeader.replace('Bearer ', '');

        // 3. Initialize the Supabase Admin Client
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

        if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
            console.warn('WARNING: SUPABASE_SERVICE_ROLE_KEY is not set. Falling back to anon key. This may cause RLS policy failures.');
        }

        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

        // 4. Verify the user's token is valid
        const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized: Invalid credentials' }, { status: 401 });
        }

        // --- 5. THE SILVER BULLET: ARCHIVE & CACHE CLEAR ---

        // 5A. Get the environment mode of the session being deleted
        const { data: targetSession } = await supabaseAdmin
            .from('assessment_sessions')
            .select('environment_mode')
            .eq('id', id)
            .single();

        const environmentMode = targetSession?.environment_mode || 'test';

        // 5B. Execute the Pure Soft Delete (Archive Parent Session & All Child Responses)
        const [sessionUpdate, responsesUpdate] = await Promise.all([
            supabaseAdmin.from('assessment_sessions').update({ status: 'archived' }).eq('id', id),
            supabaseAdmin.from('assessment_responses').update({ status: 'archived' }).eq('assessment_id', id)
        ]);

        if (sessionUpdate.error) {
            console.error('Session archive failed:', sessionUpdate.error);
            return NextResponse.json({ error: 'Failed to archive parent session' }, { status: 500 });
        }

        if (responsesUpdate.error) {
            console.error('Responses archive failed:', responsesUpdate.error);
        }

        // 5C. Check how many active sessions are left in this environment
        const { count, error: countError } = await supabaseAdmin
            .from('assessment_sessions')
            .select('*', { count: 'exact', head: true })
            .eq('environment_mode', environmentMode)
            .neq('status', 'archived');

        if (countError) throw countError;

        // 5D. If NO active sessions are left, delete the stranded snapshot cache!
        if (count === 0) {
            console.log(`0 active sessions remain in ${environmentMode}. Wiping stranded snapshot cache.`);
            await supabaseAdmin
                .from('assessment_results')
                .delete()
                .eq('environment_mode', environmentMode);
        }

        // 6. Return Success
        return NextResponse.json({ success: true, archived_id: id, remaining_sessions: count }, { status: 200 });

    } catch (error) {
        console.error('Archive Session API Error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}