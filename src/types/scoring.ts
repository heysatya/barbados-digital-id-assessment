// File: src/types/scoring.ts

export interface ResponseCounts {
  r1?: number;
  r2?: number;
  r3?: number;
  r4?: number;
  r5?: number;
}

export interface SurveyResponseInput {
  q_code: string;
  subpillar_code: string;
  pillar_code: string;
  response_counts: ResponseCounts;
}

export interface ExpertResponseInput {
  q_code: string;
  subpillar_code: string;
  pillar_code: string;
  score: 1 | 2 | 3 | 4 | 5 | 9 | null;
}

export interface IndicatorValueInput {
  indicator_code: string;
  subpillar_code: string;
  pillar_code: string;
  raw_value: number | null;
}

export interface DigitalIDAssessmentInput {
  assessment_id: string;
  country: string;
  survey_responses: SurveyResponseInput[];
  expert_responses: ExpertResponseInput[];
  indicator_values: IndicatorValueInput[];
}

export interface MetadataOutput {
  computed_at: string;
  engine_version: string;
  rubric_version: string;
  validation_log: { item: string; value: unknown; action: string; reason: string }[];
}

export interface OverallOutput {
  score: number | null;
  maturity: string;
  color: string;
}

export interface PillarOutput {
  code: string;
  name: string;
  score: number | null;
  maturity: string;
  color: string;
}

export interface SubpillarOutput {
  code: string;
  name: string;
  pillar_code: string;
  score: number | null;
  survey_mean: number | null;
  expert_mean: number | null;
  indicator_mean: number | null;
  discrepancy_flag: string;
  data_quality_flag: string;
  coverage_pct: number | null;
  valid_count: number;
  scoreable_count: number;
  maturity: string;
  color: string;
}

export interface DigitalIDAssessmentOutput {
  assessment_id: string;
  overall: OverallOutput;
  pillars: PillarOutput[];
  subpillars: SubpillarOutput[];
  metadata: MetadataOutput;
}

// Rubric Config Types
export interface NormalizationRule {
  formula: string;
  raw_range: [number, number] | string;
}

export interface QuestionConfig {
  weight: number;
  component: 'survey' | 'expert' | 'indicator';
  zero_weight: boolean;
  source?: string;
  normalization?: string;
  description?: string;
}

export interface SubpillarConfig {
  name: string;
  pillar: string;
  pillar_name?: string;
  weight_tier?: string;
  component_budgets?: Record<string, number>;
  questions: Record<string, QuestionConfig>;
}

export interface RubricConfig {
  version: string;
  description?: string;
  spec_reference?: string;
  normalization_rules: Record<string, NormalizationRule>;
  subpillars: Record<string, SubpillarConfig>;
}
