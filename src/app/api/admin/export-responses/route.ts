// File: src/app/api/admin/export-responses/route.ts
// Admin-only: Generates a multi-sheet xlsx workbook filtered by ?mode=test|live.
// Sheets: Sessions | Raw Responses | Aggregations | Results | Indicators
// Filename: barbados_digital_id_assessment_[mode]_export_YYYYMMDD.xlsx

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import * as XLSX from 'xlsx';

// ── Service-role client bypasses RLS entirely ──────────────────────────────────
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ── Admin authentication helper (mirrors rescore route) ────────────────────────
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
    console.warn(`[export] Profile lookup error for ${user.email}:`, profileError.message);
  }

  if (profile?.role === 'admin') return user;

  // Hardcoded fallback — safety net
  const allowedAdmins = ['trident-admin@dida.local', 'dida-admin@trident.local'];
  if (allowedAdmins.includes(user.email ?? '')) return user;

  return null;
}

// ── Types ──────────────────────────────────────────────────────────────────────
interface SessionRow {
  id: string;
  country: string;
  survey_type: string;
  organization_name: string | null;
  organization_type: string | null;
  role_function: string | null;
  stakeholder_category: string | null;
  environment_mode: string;
  status: string;
  rubric_version: string;
  created_at: string;
  submitted_at: string;
}

interface ResponseRow {
  id: string;
  assessment_id: string;
  q_code: string;
  pillar_code: string;
  subpillar_code: string;
  score: number | null;
  evidence_comment: string | null;
  created_at: string;
}

interface ResultRow {
  id: string;
  assessment_group_id: string;
  country: string;
  environment_mode: string;
  rubric_version: string;
  computed_at: string;
  engine_version: string;
  output_json: Record<string, unknown>;
}

interface IndicatorRow {
  id: string;
  indicator_code: string;
  pillar_code: string;
  subpillar_code: string;
  raw_value: number | null;
  source: string | null;
  source_url: string | null;
  data_date: string | null;
  notes: string | null;
  environment_mode: string;
  rubric_version: string;
  created_at: string;
  updated_at: string;
}

// ── GET handler ────────────────────────────────────────────────────────────────
export async function GET(request: Request) {
  const user = await getAdminUser(request);
  if (!user) {
    return NextResponse.json({ error: 'Forbidden: admin role required' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const rawMode = searchParams.get('mode');
  const mode: 'live' | 'test' = rawMode === 'test' ? 'test' : 'live';

  try {
    // ── 1. Fetch Sessions ────────────────────────────────────────────────────
    const { data: sessions, error: sessErr } = await supabaseAdmin
      .from('assessment_sessions')
      .select('*')
      .eq('environment_mode', mode)
      .order('submitted_at', { ascending: false });

    if (sessErr) throw sessErr;

    const sessionRows = (sessions ?? []) as SessionRow[];
    const sessionIds = sessionRows.map((s) => s.id);

    // ── 2. Fetch Raw Responses ───────────────────────────────────────────────
    let responseRows: ResponseRow[] = [];
    if (sessionIds.length > 0) {
      let allResponses: ResponseRow[] = [];
      let hasMore = true;
      let pageOffset = 0;
      const pageSize = 1000;

      while (hasMore) {
        const { data: resp, error: rErr } = await supabaseAdmin
          .from('assessment_responses')
          .select('*')
          .neq('status', 'archived')
          .in('assessment_id', sessionIds)
          .order('created_at', { ascending: true })
          .range(pageOffset * pageSize, (pageOffset + 1) * pageSize - 1);

        if (rErr) throw rErr;
        if (!resp || resp.length === 0) {
          hasMore = false;
        } else {
          allResponses = [...allResponses, ...resp as ResponseRow[]];
          if (resp.length < pageSize) {
            hasMore = false;
          } else {
            pageOffset++;
          }
        }
      }
      responseRows = allResponses;
    }

    // ── 3. Fetch Assessment Results ──────────────────────────────────────────
    const { data: results, error: resErr } = await supabaseAdmin
      .from('assessment_results')
      .select('*')
      .eq('environment_mode', mode)
      .order('computed_at', { ascending: false });

    if (resErr) throw resErr;

    const resultRows = (results ?? []) as ResultRow[];

    // ── 4. Fetch Indicator Values ────────────────────────────────────────────
    const { data: indicators, error: indErr } = await supabaseAdmin
      .from('indicator_values')
      .select('*')
      .eq('environment_mode', mode)
      .order('indicator_code', { ascending: true });

    if (indErr) throw indErr;

    const indicatorRows = (indicators ?? []) as IndicatorRow[];

    // ── Build Workbook ───────────────────────────────────────────────────────
    const wb = XLSX.utils.book_new();

    // ── Sheet 1: Sessions ────────────────────────────────────────────────────
    const sessionsSheetData: (string | number | null)[][] = [
      [
        'Session ID',
        'Country',
        'Survey Type',
        'Organization Name',
        'Organization Type',
        'Role / Function',
        'Stakeholder Category',
        'Environment Mode',
        'Status',
        'Rubric Version',
        'Created At',
        'Submitted At',
      ],
      ...sessionRows.map((s) => [
        s.id,
        s.country,
        s.survey_type,
        s.organization_name ?? '',
        s.organization_type ?? '',
        s.role_function ?? '',
        s.stakeholder_category ?? '',
        s.environment_mode,
        s.status,
        s.rubric_version,
        s.created_at,
        s.submitted_at,
      ]),
    ];
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(sessionsSheetData), 'Sessions');

    // ── Sheet 2: Raw Responses ────────────────────────────────────────────────
    const rawSheetData: (string | number | null)[][] = [
      [
        'Response ID',
        'Session ID',
        'Q Code',
        'Pillar Code',
        'Sub-Pillar Code',
        'Score',
        'Evidence / Comment',
        'Created At',
      ],
      ...responseRows.map((r) => [
        r.id,
        r.assessment_id,
        r.q_code,
        r.pillar_code,
        r.subpillar_code,
        r.score ?? '',
        r.evidence_comment ?? '',
        r.created_at,
      ]),
    ];
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(rawSheetData), 'Raw Responses');

    // ── Sheet 3: Aggregations ─────────────────────────────────────────────────
    // Group all responses by q_code; count occurrences of score 1-5 and sentinel 9.
    type AggBucket = { r1: number; r2: number; r3: number; r4: number; r5: number; r9: number };
    const aggMap = new Map<string, AggBucket>();

    for (const r of responseRows) {
      if (!aggMap.has(r.q_code)) {
        aggMap.set(r.q_code, { r1: 0, r2: 0, r3: 0, r4: 0, r5: 0, r9: 0 });
      }
      const bucket = aggMap.get(r.q_code)!;
      if (r.score === 1) bucket.r1++;
      else if (r.score === 2) bucket.r2++;
      else if (r.score === 3) bucket.r3++;
      else if (r.score === 4) bucket.r4++;
      else if (r.score === 5) bucket.r5++;
      else if (r.score === 9) bucket.r9++;
    }

    const aggSheetData: (string | number)[][] = [
      [
        'Q Code',
        'Count Score 1',
        'Count Score 2',
        'Count Score 3',
        'Count Score 4',
        'Count Score 5',
        "Count Score 9 (I don't know)",
        'Total Valid Responses',
        'Mean Score (excl. 9)',
      ],
      ...Array.from(aggMap.entries()).map(([qCode, bucket]) => {
        const totalValid = bucket.r1 + bucket.r2 + bucket.r3 + bucket.r4 + bucket.r5;
        const weightedSum = bucket.r1 * 1 + bucket.r2 * 2 + bucket.r3 * 3 + bucket.r4 * 4 + bucket.r5 * 5;
        const mean = totalValid > 0 ? Math.round((weightedSum / totalValid) * 1000) / 1000 : '';
        return [
          qCode,
          bucket.r1,
          bucket.r2,
          bucket.r3,
          bucket.r4,
          bucket.r5,
          bucket.r9,
          totalValid,
          mean,
        ];
      }),
    ];
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(aggSheetData), 'Aggregations');

    // ── Sheet 4: Results ──────────────────────────────────────────────────────
    const resultsSheetData: (string | number | null)[][] = [
      [
        'Result ID',
        'Assessment Group ID',
        'Country',
        'Environment Mode',
        'Rubric Version',
        'Engine Version',
        'Computed At',
        'Overall Score',
        'Overall Maturity',
      ],
      ...resultRows.map((r) => {
        const out = r.output_json as {
          overall?: { score?: number | null; maturity?: string };
        };
        return [
          r.id,
          r.assessment_group_id,
          r.country,
          r.environment_mode,
          r.rubric_version,
          r.engine_version,
          r.computed_at,
          out?.overall?.score ?? '',
          out?.overall?.maturity ?? '',
        ];
      }),
    ];
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(resultsSheetData), 'Results');

    // ── Sheet 5: Indicators ────────────────────────────────────────────────────
    const indicatorsSheetData: (string | number | null)[][] = [
      [
        'Indicator ID',
        'Indicator Code',
        'Pillar Code',
        'Sub-Pillar Code',
        'Raw Value',
        'Source',
        'Source URL',
        'Data Date',
        'Notes',
        'Environment Mode',
        'Rubric Version',
        'Created At',
        'Updated At',
      ],
      ...indicatorRows.map((i) => [
        i.id,
        i.indicator_code,
        i.pillar_code,
        i.subpillar_code,
        i.raw_value ?? '',
        i.source ?? '',
        i.source_url ?? '',
        i.data_date ?? '',
        i.notes ?? '',
        i.environment_mode,
        i.rubric_version,
        i.created_at,
        i.updated_at,
      ]),
    ];
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(indicatorsSheetData), 'Indicators');

    // ── Serialize and respond ─────────────────────────────────────────────────
    const xlsxBuffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const bodyInit = new Blob([xlsxBuffer as any], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const filename = `barbados_digital_id_assessment_${mode}_export_${dateStr}.xlsx`;

    return new Response(bodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('[export-responses] Error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal Server Error' },
      { status: 500 }
    );
  }
}
