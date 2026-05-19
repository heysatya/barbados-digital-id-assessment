// File: src/app/api/admin/purge-test-data/route.ts
// Admin-only: Deletes records where environment_mode = 'test'.
// ABSOLUTE RULE: mode='live' or omitted → 403 Forbidden. Live records are NEVER touched.

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// ── Service-role client bypasses RLS entirely ──────────────────────────────────
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ── Admin authentication helper ────────────────────────────────────────────────
async function getAdminUser(request: Request) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;
  const token = authHeader.slice(7);

  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !user) return null;

  const { data: profile, error: profileError } = await supabaseAdmin
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profileError) {
    console.warn(`[purge] Profile lookup error for ${user.email}:`, profileError.message);
  }

  if (profile?.role === 'admin') return user;

  // Hardcoded fallback — safety net
  const allowedAdmins = ['trident-admin@dida.local', 'dida-admin@trident.local'];
  if (allowedAdmins.includes(user.email ?? '')) return user;

  return null;
}

// ── POST handler ───────────────────────────────────────────────────────────────
export async function POST(request: Request) {
  const user = await getAdminUser(request);
  if (!user) {
    return NextResponse.json({ error: 'Forbidden: admin role required' }, { status: 403 });
  }

  // ── Parse and validate body ──────────────────────────────────────────────────
  let body: { mode?: string; confirmBackup?: boolean; includeIndicators?: boolean };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { mode, confirmBackup, includeIndicators } = body;

  // ── ABSOLUTE SAFETY GUARD: Only 'test' mode is permissible ─────────────────
  if (mode !== 'test') {
    console.error(
      `[purge] BLOCKED: attempt to purge mode="${mode ?? 'undefined'}" by ${user.email}. ` +
        'Only mode="test" is permitted.'
    );
    return NextResponse.json(
      {
        error:
          'Forbidden: purge operations are restricted to mode="test" only. ' +
          'Live records are protected and may never be purged through this endpoint.',
      },
      { status: 403 }
    );
  }

  // ── Require explicit backup confirmation ─────────────────────────────────────
  if (confirmBackup !== true) {
    return NextResponse.json(
      {
        error:
          'Backup confirmation required. Set confirmBackup: true to acknowledge ' +
          'that you have secured an export of the test data before purging.',
      },
      { status: 400 }
    );
  }

  try {
    // ── Step 1: Find all test sessions (cascade deletes linked responses) ───────
    const { data: testSessions, error: sessErr } = await supabaseAdmin
      .from('assessment_sessions')
      .select('id')
      .eq('environment_mode', 'test');

    if (sessErr) throw sessErr;

    const testIds = (testSessions ?? []).map((s: { id: string }) => s.id);
    let deletedResponses = 0;
    let deletedSessions = 0;

    if (testIds.length > 0) {
      // ── Step 2: Delete assessment_responses for test sessions ────────────────
      const { count: rCount, error: rErr } = await supabaseAdmin
        .from('assessment_responses')
        .delete({ count: 'exact' })
        .in('assessment_id', testIds);

      if (rErr) throw rErr;
      deletedResponses = rCount ?? 0;

      // ── Step 3: Delete assessment_sessions ────────────────────────────────────
      const { count: sCount, error: sErr } = await supabaseAdmin
        .from('assessment_sessions')
        .delete({ count: 'exact' })
        .in('id', testIds);

      if (sErr) throw sErr;
      deletedSessions = sCount ?? 0;
    }

    // ── Step 4: Delete test assessment_results ────────────────────────────────
    const { count: resultCount, error: resultErr } = await supabaseAdmin
      .from('assessment_results')
      .delete({ count: 'exact' })
      .eq('environment_mode', 'test');

    if (resultErr) throw resultErr;
    const deletedResults = resultCount ?? 0;

    // ── Step 5: Optionally delete test indicator_values ───────────────────────
    let deletedIndicators = 0;
    if (includeIndicators === true) {
      const { count: iCount, error: iErr } = await supabaseAdmin
        .from('indicator_values')
        .delete({ count: 'exact' })
        .eq('environment_mode', 'test');

      if (iErr) throw iErr;
      deletedIndicators = iCount ?? 0;
    }

    console.log(
      `[purge] Completed by ${user.email}: ` +
        `sessions=${deletedSessions}, responses=${deletedResponses}, ` +
        `results=${deletedResults}, indicators=${deletedIndicators}`
    );

    return NextResponse.json({
      success: true,
      mode: 'test',
      deleted: {
        sessions: deletedSessions,
        responses: deletedResponses,
        results: deletedResults,
        indicators: deletedIndicators,
      },
      message: `Test environment purged. Sessions: ${deletedSessions}, Responses: ${deletedResponses}, Results: ${deletedResults}, Indicators: ${deletedIndicators}.`,
    });
  } catch (err) {
    console.error('[purge-test-data] Error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal Server Error' },
      { status: 500 }
    );
  }
}
