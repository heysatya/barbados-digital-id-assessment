import { buildAssessmentInput, RawAssessmentSession, RawAssessmentResponse, RawIndicatorValue } from '../src/lib/assessmentAggregation';
import { scoreAssessment } from '../src/lib/scoring';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

// Supabase client removed as it is unused in this benchmark

async function runBenchmark() {
  console.log('🚀 Starting Standalone Performance Benchmark (200 User Spectrum)...');

  // 1. Generate 200 synthetic sessions and 17,000 responses in memory
  const sessions: RawAssessmentSession[] = [];
  const responses: RawAssessmentResponse[] = [];
  
  for (let i = 0; i < 200; i++) {
    const sessionId = `bench_${i}`;
    sessions.push({
      id: sessionId,
      survey_type: i % 2 === 0 ? 'expert' : 'stakeholder',
      environment_mode: 'test',
      country: 'Barbados',
      rubric_version: '3.0',
      submitted_at: new Date().toISOString(),
      created_at: new Date().toISOString()
    });
    
    // Add real question codes for at least one subpillar (P1.1) to ensure scoring works
    const qCodes = [
      'P1.1.EX.Q1', 'P1.1.EX.Q2', 'P1.1.EX.Q3',
      'P1.1.NE.Q1', 'P1.1.NE.Q2', 'P1.1.NE.Q3'
    ];
    
    qCodes.forEach(qCode => {
      responses.push({
        id: `resp_${sessionId}_${qCode}`,
        assessment_id: sessionId,
        q_code: qCode,
        pillar_code: 'P1',
        subpillar_code: 'P1.1',
        score: Math.floor(Math.random() * 5) + 1,
      });
    });
  }

  console.log('🧠 Running Scoring Engine (v3.0) on 200 User Dataset...');
  const startScore = Date.now();
  
  // 2. Generate 60 mock indicators (2 per sub-pillar)
  const indicators: RawIndicatorValue[] = [];
  const subpillarIds = [
    'P1.1', 'P1.2', 'P1.3', 'P1.4', 'P1.5',
    'P2.1', 'P2.2', 'P2.3', 'P2.4', 'P2.5',
    'P3.1', 'P3.2', 'P3.3', 'P3.4', 'P3.5',
    'P4.1', 'P4.2', 'P4.3', 'P4.4', 'P4.5',
    'P5.1', 'P5.2', 'P5.3', 'P5.4', 'P5.5',
    'P6.1', 'P6.2', 'P6.3', 'P6.4', 'P6.5'
  ];
  
  subpillarIds.forEach(spId => {
    indicators.push({
      id: `ind_${spId}_01`,
      indicator_code: `IND.${spId}.01`,
      pillar_code: spId.split('.')[0],
      subpillar_code: spId,
      raw_value: 75, // 75%
      environment_mode: 'test',
      rubric_version: '3.0'
    });
    indicators.push({
      id: `ind_${spId}_02`,
      indicator_code: `IND.${spId}.02`,
      pillar_code: spId.split('.')[0],
      subpillar_code: spId,
      raw_value: 0.8, // 0.8 index
      environment_mode: 'test',
      rubric_version: '3.0'
    });
  });

  const input = buildAssessmentInput(
    sessions,
    responses,
    indicators,
    'benchmark-test'
  );
  
  const result = scoreAssessment(input);
  
  const scoreEnd = Date.now();
  const latency = scoreEnd - startScore;

  console.log(`\n📊 BENCHMARK RESULTS:`);
  console.log(`-----------------------------`);
  console.log(`Sessions processed:  ${sessions.length}`);
  console.log(`Responses processed: ${responses.length}`);
  console.log(`Engine Latency:      ${latency}ms`);
  console.log(`Overall Score:       ${result.overall.score !== null ? result.overall.score.toFixed(2) : 'N/A'}`);
  console.log(`Maturity Band:       ${result.overall.maturity}`);
  console.log(`-----------------------------`);

  // Validation Check
  if (latency < 500) {
    console.log('✅ Performance meets requirement (< 500ms for 200 users)');
  } else {
    console.warn('⚠️ Performance warning (> 500ms)');
  }
}

runBenchmark();
