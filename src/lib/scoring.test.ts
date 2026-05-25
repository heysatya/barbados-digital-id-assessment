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
      { q_code: 'P1.1.EX.Q2', subpillar_code: 'P1.1', pillar_code: 'P1', score: 3 }
    ],
    indicator_values: [
      { indicator_code: 'IND.P1.1.01', subpillar_code: 'P1.1', pillar_code: 'P1', raw_value: 72 }, // 1 + (72/100)*4 = 3.88
      { indicator_code: 'IND.P1.1.02', subpillar_code: 'P1.1', pillar_code: 'P1', raw_value: 0.60 } // 1 + (0.60/100)*4 = 1.024
    ]
  };

  it('calculates sub-pillar scores using correct weights and 1-5 scale', () => {
    // Weights from rubric_config.json v1.2 for P1.1:
    // P1.1.EX.Q1: 0.3025
    // P1.1.EX.Q2: 0.2475
    // P1.1.NE.Q1: 0.1925
    // P1.1.NE.Q2: 0.1575
    // IND.P1.1.01: 0.025
    // IND.P1.1.02: 0.025
    
    // Scores:
    // P1.1.NE.Q1: 4.1667
    // P1.1.NE.Q2: 3.5
    // P1.1.EX.Q1: 4.0
    // P1.1.EX.Q2: 3.0
    // IND.P1.1.01: 3.88
    // IND.P1.1.02: 1.024
    
    // sumWeighted = (4.16667 * 0.1925) + (3.5 * 0.1575) + (4.0 * 0.3025) + (3.0 * 0.2475) + (3.88 * 0.025) + (1.024 * 0.025)
    // sumWeighted = 0.80208 + 0.55125 + 1.21 + 0.7425 + 0.097 + 0.0256 = 3.42843
    // sumValidWeights = 0.1925 + 0.1575 + 0.3025 + 0.2475 + 0.025 + 0.025 = 0.95
    // score = 3.42843 / 0.95 = 3.60887 -> 3.61
    
    const output = scoreAssessment(mockInput);
    const spP11 = output.subpillars.find(s => s.code === 'P1.1');
    
    expect(spP11?.score).toBeCloseTo(3.61, 1);
    expect(spP11?.maturity).toBe('Differentiating');
  });

  it('verifies no triangulation bonus is applied', () => {
    const output = scoreAssessment(mockInput);
    const spP11 = output.subpillars.find(s => s.code === 'P1.1');
    expect(spP11?.score).toBeLessThan(3.8);
  });

  it('correctly handles sentinel 9 (I don\'t know) by excluding it from weights', () => {
    const sentinelInput: DigitalIDAssessmentInput = {
      ...mockInput,
      expert_responses: [
        { q_code: 'P1.1.EX.Q1', subpillar_code: 'P1.1', pillar_code: 'P1', score: 4 },
        { q_code: 'P1.1.EX.Q2', subpillar_code: 'P1.1', pillar_code: 'P1', score: 9 } // sentinel 9!
      ]
    };
    
    const output = scoreAssessment(sentinelInput);
    
    // Check validation log for sentinel exclusion of P1.1.EX.Q2
    const sentinelLog = output.metadata.validation_log.find(l => l.item === 'P1.1.EX.Q2');
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
          response_counts: { r4: 10 } // Score 4.0, Weight 0.1925
        }
      ],
      expert_responses: [], // All expert missing (Weight 0.55)
      indicator_values: [] // All indicator missing (Weight 0.10)
    };

    const output = scoreAssessment(partialInput);
    const spP11 = output.subpillars.find(s => s.code === 'P1.1');
    
    // Only one question valid. sumWeighted = 4.0 * 0.1925. sumValidWeights = 0.1925.
    // Result = (4.0 * 0.1925) / 0.1925 = 4.0
    expect(spP11?.score).toBe(4.0);
    expect(spP11?.data_quality_flag).toBe('⚠️ Partial');
  });
});
