import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { randomUUID } from 'node:crypto';
import { frameworkQuestions } from '../src/data/frameworkQuestions';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

const MATURITY_BANDS = [
  { label: 'Basic', targetScore: 1.4 },
  { label: 'Opportunistic', targetScore: 2.2 },
  { label: 'Systematic', targetScore: 3.0 },
  { label: 'Differentiating', targetScore: 3.8 },
  { label: 'Transformational', targetScore: 4.6 }
];

async function runStressTest() {
  console.log('🚀 Starting Balanced Spectrum Stress Test (200 Users)...');
  console.log('🔗 Connecting to:', supabaseUrl);
  const startTime = Date.now();

  // 1. Skip cleanup (requires admin)
  console.log('🧹 Skipping cleanup (requires admin privileges).');

  let totalSessions = 0;
  let totalResponses = 0;

  for (const band of MATURITY_BANDS) {
    console.log(`\n📊 Generating 40 sessions for maturity band: ${band.label} (Target Score: ${band.targetScore})`);

    // Prepare batch inserts to be faster and reduce RLS overhead
    const sessionInserts: Record<string, unknown>[] = [];
    const allResponseInserts: Record<string, unknown>[] = [];

    for (let i = 0; i < 40; i++) {
      const isExpert = i % 2 === 0;
      const surveyType = isExpert ? 'expert' : 'stakeholder';
      const sessionId = randomUUID();

      sessionInserts.push({
        id: sessionId,
        country: 'Barbados',
        survey_type: surveyType,
        organization_name: `Synthetic Org ${band.label} ${i}`,
        organization_type: 'Government',
        role_function: 'Quality Assurance',
        stakeholder_category: isExpert ? 'Regulator' : 'Civil Society',
        environment_mode: 'test',
        status: 'submitted',
        rubric_version: '3.0'
      });

      const questionsForType = frameworkQuestions.filter(q => q.survey_type === surveyType);

      const responseInserts = questionsForType.map(q => {
        const randomVariation = (Math.random() - 0.5);
        let score = Math.round(band.targetScore + randomVariation);
        score = Math.max(1, Math.min(5, score));

        return {
          assessment_id: sessionId,
          q_code: q.q_code,
          pillar_code: q.pillar_code,
          subpillar_code: q.subpillar_code,
          score: score,
          evidence_comment: `Synthetic data for ${band.label} band.`
        };
      });

      allResponseInserts.push(...responseInserts);
    }

    // Insert sessions in batch
    const { error: sessionError } = await supabase
      .from('assessment_sessions')
      .insert(sessionInserts);

    if (sessionError) {
      console.error(`❌ Error inserting sessions for ${band.label}:`, sessionError.message);
      continue;
    }

    // Insert responses in chunks to avoid payload limits
    const chunkSize = 500;
    for (let j = 0; j < allResponseInserts.length; j += chunkSize) {
      const chunk = allResponseInserts.slice(j, j + chunkSize);
      const { error: responseError } = await supabase
        .from('assessment_responses')
        .insert(chunk);

      if (responseError) {
        console.error(`❌ Error inserting responses chunk for ${band.label}:`, responseError.message);
      } else {
        totalResponses += chunk.length;
      }
    }

    totalSessions += sessionInserts.length;
    process.stdout.write('✅');
  }

  // 2. Skip indicators (requires admin)
  console.log('\n📈 Skipping indicator values (requires admin privileges).');

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`\n✅ Stress Test Data Injection Completed!`);
  console.log(`⏱️ Duration: ${duration}s`);
  console.log(`📦 Sessions: ${totalSessions}`);
  console.log(`📝 Responses: ${totalResponses}`);
  console.log(`🔍 All data tagged with environment_mode: 'test' and no PII.`);
  console.log(`💡 Note: You will need to trigger 'Rescore' from the Admin Dashboard to see updated results.`);
}

runStressTest().catch(console.error);
