// File: src/app/api/admin/rescore/route.ts
// Admin-only: Pull latest assessment_responses + indicator_values, run v3.0
// scoring engine, upsert result into assessment_results.

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { buildAssessmentInput, type RawAssessmentResponse } from '@/lib/assessmentAggregation';
import { scoreAssessment } from '@/lib/scoring';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function getAdminUser(request: Request) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    console.error('❌ API Auth: Missing Bearer Token');
    return null;
  }

  const token = authHeader.slice(7);
  const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);

  if (authError || !user) {
    console.error('❌ API Auth: Invalid Token or User not found', authError?.message);
    return null;
  }

  // 1. Database Check
  const { data: profile, error: profileError } = await supabaseAdmin
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profileError) {
    console.warn(`⚠️ API Auth: Profile lookup error for ${user.email}:`, profileError.message);
  }

  if (profile?.role === 'admin') {
    console.log(`✅ API Auth: Verified Admin via DB (${user.email})`);
    return user;
  }

  // 2. Hardcoded Fallback (Safety Net for both admins)
  const allowedAdmins = ['trident-admin@dida.local', 'dida-admin@trident.local'];
  if (allowedAdmins.includes(user.email || '')) {
    console.warn(`⚠️ API Auth: DB check failed, but allowing ${user.email} via fallback.`);
    return user;
  }

  console.error(`🚫 API Auth: Access Denied for ${user.email}. Role is: ${profile?.role}`);
  return null;
}

export async function POST(request: Request) {
  const user = await getAdminUser(request);
  if (!user) {
    return NextResponse.json({ error: 'Forbidden: admin role required' }, { status: 403 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const mode: 'live' | 'test' = body.mode === 'test' ? 'test' : 'live';
    const rubricVersion = body.rubric_version ?? '3.0';

    // ── 1. Fetch all active sessions for the given mode (excluding archived) ──
    const { data: sessions, error: sessErr } = await supabaseAdmin
      .from('assessment_sessions')
      .select('*')
      .eq('environment_mode', mode)
      .neq('status', 'archived');

    if (sessErr) throw sessErr;
    if (!sessions || sessions.length === 0) {
      console.log(`[rescore] 0 active sessions remain in ${mode}. Wiping results cache.`);
      await supabaseAdmin
        .from('assessment_results')
        .delete()
        .eq('environment_mode', mode);

      return NextResponse.json({
        success: true,
        cleared: true,
        message: `No active sessions remain for mode: ${mode}. Cache wiped.`,
      });
    }

    const sessionIds = sessions.map((s: { id: string }) => s.id);

    // ── 2. Fetch all responses for those sessions ─────────────────────────
    let allResponses: RawAssessmentResponse[] = [];
    let hasMore = true;
    let pageOffset = 0;
    const pageSize = 1000;

    while (hasMore) {
      const { data: resp, error: rErr } = await supabaseAdmin
        .from('assessment_responses')
        .select('*')
        .neq('status', 'archived')
        .in('assessment_id', sessionIds)
        .range(pageOffset * pageSize, (pageOffset + 1) * pageSize - 1);

      if (rErr) throw rErr;
      if (!resp || resp.length === 0) {
        hasMore = false;
      } else {
        allResponses = [...allResponses, ...resp as RawAssessmentResponse[]];
        if (resp.length < pageSize) {
          hasMore = false;
        } else {
          pageOffset++;
        }
      }
    }
    const responses = allResponses;

    // ── 3. Fetch indicator values for this mode ───────────────────────────
    const { data: indicators, error: indErr } = await supabaseAdmin
      .from('indicator_values')
      .select('*')
      .eq('environment_mode', mode);

    if (indErr) throw indErr;

    // ── 4. Build §7.1 input ───────────────────────────────────────────────
    const assessmentGroupId = `${mode}_${rubricVersion}_${new Date().toISOString().slice(0, 10)}`;

    const input = buildAssessmentInput(
      sessions,
      responses ?? [],
      indicators ?? [],
      assessmentGroupId
    );

    // ── 5. Run v3.0 scoring engine ────────────────────────────────────────
    const result = scoreAssessment(input);

    // ── 6. Upsert into assessment_results ─────────────────────────────────
    const { error: upsertErr } = await supabaseAdmin
      .from('assessment_results')
      .upsert(
        {
          assessment_group_id: assessmentGroupId,
          country: input.country,
          environment_mode: mode,
          rubric_version: rubricVersion,
          input_json: input,
          output_json: result,
          computed_at: new Date().toISOString(),
          engine_version: '3.0',
        },
        { onConflict: 'assessment_group_id' }
      );

    if (upsertErr) throw upsertErr;

    return NextResponse.json({
      success: true,
      assessment_group_id: assessmentGroupId,
      overall_score: result.overall.score,
      maturity: result.overall.maturity,
      computed_at: result.metadata.computed_at,
    });
  } catch (err) {
    console.error('[rescore] Error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal Server Error' },
      { status: 500 }
    );
  }
}
