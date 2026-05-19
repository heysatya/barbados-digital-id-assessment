import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { sessionData, responsesData } = body;

        if (!sessionData || !responsesData || !Array.isArray(responsesData)) {
            return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
        }

        // Initialize Supabase Admin Client
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

        if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
            console.warn('WARNING: SUPABASE_SERVICE_ROLE_KEY is not set. Falling back to anon key. This may cause RLS policy failures.');
        }

        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

        // 1. Insert Session
        const { data: session, error: sessionError } = await supabaseAdmin
            .from('assessment_sessions')
            .insert([sessionData])
            .select()
            .single();

        if (sessionError || !session) {
            console.error('Session insert error:', sessionError);
            return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
        }

        // 2. Inject the new session ID into responses
        const responseInserts = responsesData.map((res: Record<string, unknown>) => ({
            ...res,
            assessment_id: session.id
        }));

        // 3. Insert Responses
        const { error: responsesError } = await supabaseAdmin
            .from('assessment_responses')
            .insert(responseInserts);

        if (responsesError) {
            console.error('Responses insert error:', responsesError);
            // Optional: you could attempt to delete the session here to rollback if desired
            return NextResponse.json({ error: 'Failed to insert responses' }, { status: 500 });
        }

        return NextResponse.json({ success: true, sessionId: session.id }, { status: 200 });

    } catch (error) {
        console.error('Submit API Error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
