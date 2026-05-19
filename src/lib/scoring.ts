// File: src/lib/scoring.ts
// v3.0 SCORING ENGINE — implements SCORING_LOGIC_v3.0.md §1–§9
// Reads weights from rubric_config.json. All scores strictly on 1–5 scale.

import rubricConfigJson from '@/config/rubric_config.json';
import type {
  DigitalIDAssessmentInput,
  DigitalIDAssessmentOutput,
  PillarOutput,
  SubpillarOutput,
  RubricConfig,
} from '@/types/scoring';

const rubric = rubricConfigJson as unknown as RubricConfig;

// ── §6 Maturity Band Mapping ────────────────────────────────────────────────
const MATURITY_BANDS_V3 = [
  { lo: 1.00, hi: 1.80, label: 'Basic',            color: '#C00000' },
  { lo: 1.81, hi: 2.60, label: 'Opportunistic',    color: '#FFC000' },
  { lo: 2.61, hi: 3.40, label: 'Systematic',       color: '#FFFF00' },
  { lo: 3.41, hi: 4.20, label: 'Differentiating',  color: '#92D050' },
  { lo: 4.21, hi: 5.00, label: 'Transformational', color: '#00B050' },
];

export function mapMaturityV3(score: number | null): { maturity: string; color: string } {
  if (score === null) return { maturity: 'N/A', color: '#374151' };
  const s = Math.round(score * 100) / 100;
  for (const b of MATURITY_BANDS_V3) {
    if (s >= b.lo && s <= b.hi) return { maturity: b.label, color: b.color };
  }
  if (s < 1.00) return { maturity: 'Basic', color: '#C00000' };
  return { maturity: 'Transformational', color: '#00B050' };
}

// ── §3.3 Indicator Normalization ────────────────────────────────────────────
function normalizeIndicatorV3(rawValue: number | null, normMethod: string): number | null {
  if (rawValue === null || rawValue === undefined) return null;
  if (normMethod === 'pct_to_5') return 1 + (rawValue / 100) * 4;
  if (normMethod === 'index_to_5') return 1 + rawValue * 4;
  const rules = rubric.normalization_rules;
  if (normMethod === 'custom' && rules.custom && Array.isArray(rules.custom.raw_range)) {
    const [min, max] = rules.custom.raw_range as [number, number];
    return max > min ? 1 + ((rawValue - min) / (max - min)) * 4 : null;
  }
  return 1 + (rawValue / 100) * 4; // fallback: treat as percentage
}

// ── §3.1 Survey question score ──────────────────────────────────────────────
function scoreSurveyQuestion(counts: { r1?: number; r2?: number; r3?: number; r4?: number; r5?: number }): number | null {
  const total = (counts.r1 ?? 0) + (counts.r2 ?? 0) + (counts.r3 ?? 0) + (counts.r4 ?? 0) + (counts.r5 ?? 0);
  if (total === 0) return null;
  const weighted = (counts.r1 ?? 0) * 1 + (counts.r2 ?? 0) * 2 + (counts.r3 ?? 0) * 3 + (counts.r4 ?? 0) * 4 + (counts.r5 ?? 0) * 5;
  return weighted / total;
}

// ── §2 Validation ───────────────────────────────────────────────────────────
function isValidScoreV3(s: number | null | undefined): s is 1 | 2 | 3 | 4 | 5 {
  return s !== null && s !== undefined && [1, 2, 3, 4, 5].includes(s);
}

const PILLAR_NAMES_V3: Record<string, string> = {
  P1: 'Service Delivery & User Value',
  P2: 'Safeguards, Trust & Accountability',
  P3: 'Ecosystem & Innovation',
  P4: 'Technology & DPI Integration',
  P5: 'Legal & Regulatory Foundations',
  P6: 'Institutional Capacity & Governance',
};

// ── Main v3.0 engine ────────────────────────────────────────────────────────
export function scoreAssessment(input: DigitalIDAssessmentInput): DigitalIDAssessmentOutput {
  const validationLog: { item: string; value: unknown; action: string; reason: string }[] = [];

  const surveyMap = new Map(input.survey_responses.map((r) => [r.q_code, r]));
  const expertMap = new Map(input.expert_responses.map((r) => [r.q_code, r]));
  const indicatorMap = new Map(input.indicator_values.map((v) => [v.indicator_code, v]));

  const subpillarOutputs: SubpillarOutput[] = [];
  const pillarBuckets = new Map<string, number[]>();

  for (const [spCode, spConfig] of Object.entries(rubric.subpillars)) {
    const pillarCode = spConfig.pillar;
    let sumWeighted = 0;
    let sumValidWeights = 0;
    const surveyScores: number[] = [];
    const expertScores: number[] = [];
    const indicatorScores: number[] = [];
    let scoreable = 0;
    let valid = 0;

    for (const [qCode, qConfig] of Object.entries(spConfig.questions)) {
      if (qConfig.zero_weight || qConfig.weight === 0) {
        validationLog.push({ item: qCode, value: 0, action: 'excluded_zero_weight', reason: 'rubric weight = 0' });
        continue;
      }
      scoreable++;
      let score: number | null = null;

      if (qConfig.component === 'survey') {
        const r = surveyMap.get(qCode);
        if (r) { score = scoreSurveyQuestion(r.response_counts); if (score !== null) surveyScores.push(score); }
        if (score === null) validationLog.push({ item: qCode, value: null, action: 'excluded_null', reason: 'no survey responses' });
      } else if (qConfig.component === 'expert') {
        const r = expertMap.get(qCode);
        if (r) {
          if (r.score === 9) {
            validationLog.push({ item: qCode, value: 9, action: 'excluded_sentinel', reason: "I don't know" });
          } else if (isValidScoreV3(r.score)) {
            score = r.score; expertScores.push(score);
          } else if (r.score !== null) {
            validationLog.push({ item: qCode, value: r.score, action: 'excluded_invalid', reason: 'score outside 1–5' });
          } else {
            validationLog.push({ item: qCode, value: null, action: 'excluded_null', reason: 'expert response missing' });
          }
        } else {
          validationLog.push({ item: qCode, value: null, action: 'excluded_null', reason: 'expert response missing' });
        }
      } else if (qConfig.component === 'indicator') {
        const iv = indicatorMap.get(qCode);
        if (iv) {
          score = normalizeIndicatorV3(iv.raw_value, qConfig.normalization ?? 'pct_to_5');
          if (score !== null) indicatorScores.push(score);
        }
        if (score === null) validationLog.push({ item: qCode, value: null, action: 'excluded_null', reason: 'indicator data unavailable' });
      }

      if (score !== null) {
        sumWeighted += qConfig.weight * score;
        sumValidWeights += qConfig.weight;
        valid++;
      }
    }

    const spScore = valid > 0 && sumValidWeights > 0 ? sumWeighted / sumValidWeights : null;
    const coveragePct = scoreable > 0 ? (valid / scoreable) * 100 : 0;
    let dataQualityFlag = '';
    if (valid === 0) dataQualityFlag = 'N/A';
    else if (coveragePct < 67) dataQualityFlag = '⚠️ Partial';

    const surveyMean = surveyScores.length > 0 ? surveyScores.reduce((a, b) => a + b, 0) / surveyScores.length : null;
    const expertMean = expertScores.length > 0 ? expertScores.reduce((a, b) => a + b, 0) / expertScores.length : null;
    const indicatorMean = indicatorScores.length > 0 ? indicatorScores.reduce((a, b) => a + b, 0) / indicatorScores.length : null;

    let discrepancyFlag = '';
    if (surveyMean === null || expertMean === null) discrepancyFlag = 'N/A';
    else if (Math.abs(surveyMean - expertMean) >= 1.0) discrepancyFlag = '⚠️ Review';

    const { maturity, color } = mapMaturityV3(spScore);

    subpillarOutputs.push({
      code: spCode, name: spConfig.name, pillar_code: pillarCode,
      score: spScore !== null ? Math.round(spScore * 100) / 100 : null,
      survey_mean: surveyMean !== null ? Math.round(surveyMean * 100) / 100 : null,
      expert_mean: expertMean !== null ? Math.round(expertMean * 100) / 100 : null,
      indicator_mean: indicatorMean !== null ? Math.round(indicatorMean * 100) / 100 : null,
      discrepancy_flag: discrepancyFlag, data_quality_flag: dataQualityFlag,
      coverage_pct: Math.round(coveragePct * 100) / 100,
      valid_count: valid, scoreable_count: scoreable, maturity, color,
    });

    if (spScore !== null) {
      if (!pillarBuckets.has(pillarCode)) pillarBuckets.set(pillarCode, []);
      pillarBuckets.get(pillarCode)!.push(spScore);
    }
  }

  const pillars: PillarOutput[] = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'].map((pCode) => {
    const scores = pillarBuckets.get(pCode) ?? [];
    const pScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : null;
    const { maturity, color } = mapMaturityV3(pScore);
    return { code: pCode, name: PILLAR_NAMES_V3[pCode] ?? pCode, score: pScore !== null ? Math.round(pScore * 100) / 100 : null, maturity, color };
  });

  const validPillarScores = pillars.filter((p) => p.score !== null).map((p) => p.score as number);
  const overallRaw = validPillarScores.length > 0 ? validPillarScores.reduce((a, b) => a + b, 0) / validPillarScores.length : null;
  const overallRounded = overallRaw !== null ? Math.round(overallRaw * 100) / 100 : null;
  const { maturity: overallMaturity, color: overallColor } = mapMaturityV3(overallRounded);

  return {
    assessment_id: input.assessment_id,
    overall: { score: overallRounded, maturity: overallMaturity, color: overallColor },
    pillars,
    subpillars: subpillarOutputs,
    metadata: { computed_at: new Date().toISOString(), engine_version: '3.0', rubric_version: rubric.version, validation_log: validationLog },
  };
}