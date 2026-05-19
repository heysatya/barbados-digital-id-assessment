import { describe, it, expect } from 'vitest';
import { 
  scoreAssessment, 
  mapMaturityV3 
} from './scoring';
import { DigitalIDAssessmentInput } from '@/types/scoring';

describe('Scoring Engine v3.0: Maturity Mapping', () => {
  it('maps scores to correct maturity labels and colors', () => {
    // Basic: 1.00 - 1.80
    expect(mapMaturityV3(1.00)).toEqual({ maturity: 'Basic', color: '#C00000' });
    expect(mapMaturityV3(1.80)).toEqual({ maturity: 'Basic', color: '#C00000' });
    
    // Opportunistic: 1.81 - 2.60
    expect(mapMaturityV3(1.81)).toEqual({ maturity: 'Opportunistic', color: '#FFC000' });
    expect(mapMaturityV3(2.60)).toEqual({ maturity: 'Opportunistic', color: '#FFC000' });
    
    // Systematic: 2.61 - 3.40
    expect(mapMaturityV3(2.61)).toEqual({ maturity: 'Systematic', color: '#FFFF00' });
    expect(mapMaturityV3(3.40)).toEqual({ maturity: 'Systematic', color: '#FFFF00' });
    
    // Differentiating: 3.41 - 4.20
    expect(mapMaturityV3(3.41)).toEqual({ maturity: 'Differentiating', color: '#92D050' });
    expect(mapMaturityV3(4.20)).toEqual({ maturity: 'Differentiating', color: '#92D050' });
    
    // Transformational: 4.21 - 5.00
    expect(mapMaturityV3(4.21)).toEqual({ maturity: 'Transformational', color: '#00B050' });
    expect(mapMaturityV3(5.00)).toEqual({ maturity: 'Transformational', color: '#00B050' });
  });

  it('handles rounding correctly at boundaries', () => {
    expect(mapMaturityV3(1.804)).toEqual({ maturity: 'Basic', color: '#C00000' });
    expect(mapMaturityV3(1.805)).toEqual({ maturity: 'Opportunistic', color: '#FFC000' });
  });
});

describe('Scoring Engine v3.0: Unified Weight Pool Aggregation', () => {
  const mockInput: DigitalIDAssessmentInput = {
    assessment_id: 'test-uuid',
    country: 'Barbados',
    survey_responses: [
      {
        q_code: 'P1.1.NE.Q1',
        subpillar_code: 'P1.1',
        pillar_code: 'P1',
        response_counts: { r5: 2, r4: 3, r3: 1 } // (2*5 + 3*4 + 1*3)/6 = 25/6 = 4.167
      },
      {
        q_code: 'P1.1.NE.Q2',
        subpillar_code: 'P1.1',
        pillar_code: 'P1',
        response_counts: { r4: 2, r3: 2 } // (2*4 + 2*3)/4 = 14/4 = 3.5
      }
    ],
    expert_responses: [
      { q_code: 'P1.1.EX.Q1', subpillar_code: 'P1.1', pillar_code: 'P1', score: 4 },
      { q_code: 'P1.1.EX.Q2', subpillar_code: 'P1.1', pillar_code: 'P1', score: 3 },
      { q_code: 'P1.1.EX.Q3', subpillar_code: 'P1.1', pillar_code: 'P1', score: 9 } // Sentinel 9 excluded
    ],
    indicator_values: [
      { indicator_code: 'IND.P1.1.01', subpillar_code: 'P1.1', pillar_code: 'P1', raw_value: 72 }, // 1 + (72/100)*4 = 3.88
      { indicator_code: 'IND.P1.1.02', subpillar_code: 'P1.1', pillar_code: 'P1', raw_value: 0.60 } // 1 + 0.60*4 = 3.4
    ]
  };

  it('calculates sub-pillar scores using correct weights and 1-5 scale', () => {
    // Weights from rubric_config.json for P1.1:
    // EX.Q1: 0.22
    // EX.Q2: 0.1925
    // EX.Q3: 0.1375 (excluded)
    // NE.Q1: 0.14
    // NE.Q2: 0.1225
    // NE.Q3: 0.0875 (missing)
    // IND.01: 0.06
    // IND.02: 0.04
    
    // Scores:
    // NE.Q1: 4.1666...
    // NE.Q2: 3.5
    // EX.Q1: 4.0
    // EX.Q2: 3.0
    // IND.01: 3.88
    // IND.02: 3.4
    
    // sumWeighted = (4.1666 * 0.14) + (3.5 * 0.1225) + (4.0 * 0.22) + (3.0 * 0.1925) + (3.88 * 0.06) + (3.4 * 0.04)
    // sumWeighted = 0.5833 + 0.42875 + 0.88 + 0.5775 + 0.2328 + 0.136 = 2.83835
    
    // sumValidWeights = 0.14 + 0.1225 + 0.22 + 0.1925 + 0.06 + 0.04 = 0.775
    
    // score = 2.83835 / 0.775 = 3.662...
    
    const output = scoreAssessment(mockInput);
    const spP11 = output.subpillars.find(s => s.code === 'P1.1');
    
    expect(spP11?.score).toBeCloseTo(3.66, 1);
    expect(spP11?.maturity).toBe('Differentiating');
  });

  it('verifies no triangulation bonus is applied', () => {
    // Even if 3+ stakeholders responded, the score should strictly follow weighted average
    const output = scoreAssessment(mockInput);
    const spP11 = output.subpillars.find(s => s.code === 'P1.1');
    
    // If triangulation (5% bonus) was applied, it would be around 3.84
    expect(spP11?.score).toBeLessThan(3.8);
  });

  it('correctly handles sentinel 9 (I don\'t know) by excluding it from weights', () => {
    const output = scoreAssessment(mockInput);

    
    // Check validation log for sentinel exclusion
    const sentinelLog = output.metadata.validation_log.find(l => l.item === 'P1.1.EX.Q3');
    expect(sentinelLog?.action).toBe('excluded_sentinel');
  });
});

describe('Scoring Engine v3.0: Weight Redistribution', () => {
  it('proportionally redistributes weight when data is missing', () => {
    const partialInput: DigitalIDAssessmentInput = {
      assessment_id: 'partial-uuid',
      country: 'Barbados',
      survey_responses: [
        {
          q_code: 'P1.1.NE.Q1',
          subpillar_code: 'P1.1',
          pillar_code: 'P1',
          response_counts: { r4: 10 } // Score 4.0, Weight 0.14
        }
      ],
      expert_responses: [], // All expert missing (Weight 0.55)
      indicator_values: [] // All indicator missing (Weight 0.10)
    };

    const output = scoreAssessment(partialInput);
    const spP11 = output.subpillars.find(s => s.code === 'P1.1');
    
    // Only one question valid. sumWeighted = 4.0 * 0.14. sumValidWeights = 0.14.
    // Result = (4.0 * 0.14) / 0.14 = 4.0
    expect(spP11?.score).toBe(4.0);
    expect(spP11?.data_quality_flag).toBe('⚠️ Partial');
  });
});
