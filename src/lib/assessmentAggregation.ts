// File: src/lib/assessmentAggregation.ts
// Builds the §7.1 DigitalIDAssessmentInput from raw Supabase DB rows.
// Imports the v3.0 scoring engine from scoring.ts — does NOT rewrite it.

import rubricConfig from '@/config/rubric_config.json';
import {
  DigitalIDAssessmentInput,
  SurveyResponseInput,
  ExpertResponseInput,
  IndicatorValueInput,
  ResponseCounts,
} from '@/types/scoring';

// ─── Raw DB Row Types ────────────────────────────────────────────────────────

export interface RawAssessmentResponse {
  id: string;
  assessment_id: string;
  q_code: string;
  pillar_code: string;
  subpillar_code: string;
  score: number | null; // 1-5 or 9 (sentinel)
  evidence_comment?: string;
}

export interface RawIndicatorValue {
  id: string;
  indicator_code: string;
  pillar_code: string;
  subpillar_code: string;
  raw_value: number | null;
  environment_mode: string;
  rubric_version: string;
}

export interface RawAssessmentSession {
  id: string;
  survey_type: 'expert' | 'stakeholder';
  environment_mode: 'live' | 'test';
  organization_name?: string;
  organization_type?: string;
  role_function?: string;
  stakeholder_category?: string;
  country: string;
  rubric_version: string;
  submitted_at: string;
  created_at: string;
}

// ─── Pillar metadata from rubric ─────────────────────────────────────────────

const PILLAR_NAMES: Record<string, string> = {
  P1: 'Service Delivery & User Value',
  P2: 'Safeguards, Trust & Accountability',
  P3: 'Ecosystem & Innovation',
  P4: 'Technology & DPI Integration',
  P5: 'Legal & Regulatory Foundations',
  P6: 'Institutional Capacity & Governance',
};

export function getPillarName(code: string): string {
  return PILLAR_NAMES[code] ?? code;
}

// ─── Build §7.1 Input ────────────────────────────────────────────────────────

/**
 * Builds the §7.1 DigitalIDAssessmentInput from raw DB rows.
 *
 * - Expert sessions: one score per q_code (last submitted value used if duplicates)
 * - Stakeholder sessions: response counts aggregated per q_code (r1–r5 tally)
 * - Indicator values: passed through with raw_value as-is
 */
export function buildAssessmentInput(
  sessions: RawAssessmentSession[],
  responses: RawAssessmentResponse[],
  indicators: RawIndicatorValue[],
  assessmentGroupId: string
): DigitalIDAssessmentInput {
  // Partition sessions by type
  const expertSessionIds = new Set(
    sessions.filter((s) => s.survey_type === 'expert').map((s) => s.id)
  );
  const stakeholderSessionIds = new Set(
    sessions.filter((s) => s.survey_type === 'stakeholder').map((s) => s.id)
  );

  // ── Expert responses ──────────────────────────────────────────────────────
  // One score per q_code (latest response wins if multiple expert sessions exist)
  const expertMap = new Map<string, RawAssessmentResponse>();
  for (const r of responses) {
    if (expertSessionIds.has(r.assessment_id)) {
      expertMap.set(r.q_code, r); // overwrite with latest
    }
  }

  const expert_responses: ExpertResponseInput[] = Array.from(expertMap.values()).map((r) => ({
    q_code: r.q_code,
    subpillar_code: r.subpillar_code,
    pillar_code: r.pillar_code,
    score: (r.score as 1 | 2 | 3 | 4 | 5 | 9 | null) ?? null,
  }));

  // ── Stakeholder survey responses (aggregate into r1–r5 counts) ────────────
  const surveyCountsMap = new Map<
    string,
    { q_code: string; subpillar_code: string; pillar_code: string; counts: ResponseCounts }
  >();

  for (const r of responses) {
    if (!stakeholderSessionIds.has(r.assessment_id)) continue;
    if (r.score === null || r.score === 9) continue; // exclude sentinel & null
    if (r.score < 1 || r.score > 5) continue;

    if (!surveyCountsMap.has(r.q_code)) {
      surveyCountsMap.set(r.q_code, {
        q_code: r.q_code,
        subpillar_code: r.subpillar_code,
        pillar_code: r.pillar_code,
        counts: { r1: 0, r2: 0, r3: 0, r4: 0, r5: 0 },
      });
    }
    const entry = surveyCountsMap.get(r.q_code)!;
    const key = `r${r.score}` as keyof ResponseCounts;
    entry.counts[key] = (entry.counts[key] ?? 0) + 1;
  }

  const survey_responses: SurveyResponseInput[] = Array.from(surveyCountsMap.values()).map(
    (e) => ({
      q_code: e.q_code,
      subpillar_code: e.subpillar_code,
      pillar_code: e.pillar_code,
      response_counts: e.counts,
    })
  );

  // ── Indicator values ──────────────────────────────────────────────────────
  const indicator_values: IndicatorValueInput[] = indicators.map((ind) => ({
    indicator_code: ind.indicator_code,
    subpillar_code: ind.subpillar_code,
    pillar_code: ind.pillar_code,
    raw_value: ind.raw_value,
  }));

  return {
    assessment_id: assessmentGroupId,
    country: sessions[0]?.country ?? 'Barbados',
    survey_responses,
    expert_responses,
    indicator_values,
  };
}

// ─── Derive quick stats from raw responses (no v3.0 engine needed) ───────────

export interface QuestionAggRow {
  q_code: string;
  pillar_code: string;
  subpillar_code: string;
  r1: number;
  r2: number;
  r3: number;
  r4: number;
  r5: number;
  unknown: number;
  total_valid: number;
  mean_score: number | null;
  mode_score: number | null;
}

export function aggregateStakeholderResponses(
  responses: RawAssessmentResponse[],
  stakeholderSessionIds: Set<string>
): QuestionAggRow[] {
  const map = new Map<
    string,
    { q_code: string; pillar_code: string; subpillar_code: string; counts: number[]; unknowns: number }
  >();

  for (const r of responses) {
    if (!stakeholderSessionIds.has(r.assessment_id)) continue;

    if (!map.has(r.q_code)) {
      map.set(r.q_code, {
        q_code: r.q_code,
        pillar_code: r.pillar_code,
        subpillar_code: r.subpillar_code,
        counts: [0, 0, 0, 0, 0], // index 0=score1 … 4=score5
        unknowns: 0,
      });
    }
    const entry = map.get(r.q_code)!;
    if (r.score === 9 || r.score === null) {
      entry.unknowns++;
    } else if (r.score >= 1 && r.score <= 5) {
      entry.counts[r.score - 1]++;
    }
  }

  return Array.from(map.values())
    .map((e) => {
      const total = e.counts.reduce((a, b) => a + b, 0);
      const weightedSum = e.counts.reduce((sum, cnt, idx) => sum + cnt * (idx + 1), 0);
      const mean = total > 0 ? weightedSum / total : null;

      // Mode: score with highest count
      let modeScore: number | null = null;
      let maxCnt = 0;
      e.counts.forEach((cnt, idx) => {
        if (cnt > maxCnt) {
          maxCnt = cnt;
          modeScore = idx + 1;
        }
      });

      return {
        q_code: e.q_code,
        pillar_code: e.pillar_code,
        subpillar_code: e.subpillar_code,
        r1: e.counts[0],
        r2: e.counts[1],
        r3: e.counts[2],
        r4: e.counts[3],
        r5: e.counts[4],
        unknown: e.unknowns,
        total_valid: total,
        mean_score: mean !== null ? Math.round(mean * 100) / 100 : null,
        mode_score: total > 0 ? modeScore : null,
      };
    })
    .sort((a, b) => a.q_code.localeCompare(b.q_code));
}

// ─── Re-export rubric metadata helpers ────────────────────────────────────────

export interface SubpillarMeta {
  code: string;
  name: string;
  pillar_code: string;
  pillar_name: string;
}

export function getAllSubpillarMeta(): SubpillarMeta[] {
  return Object.entries(rubricConfig.subpillars).map(([code, sp]) => ({
    code,
    name: sp.name,
    pillar_code: sp.pillar,
    pillar_name: (sp as { pillar_name?: string }).pillar_name ?? getPillarName(sp.pillar),
  }));
}
