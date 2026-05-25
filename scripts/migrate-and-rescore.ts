import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { buildAssessmentInput } from '../src/lib/assessmentAggregation';
import { scoreAssessment } from '../src/lib/scoring';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Error: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing in .env.local");
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

function standardizeIndicatorCode(code: string): string {
  const cleaned = code.startsWith('IND.') ? code.slice(4) : code;
  const parts = cleaned.split('.');
  if (parts.length === 3) {
    const pillar = parts[0]; // e.g. P5
    const subpillar = parts[1]; // e.g. 1
    const counter = parts[2]; // e.g. 1 or 01
    const paddedCounter = counter.padStart(2, '0');
    return `IND.${pillar}.${subpillar}.${paddedCounter}`;
  }
  return code;
}

async function runMigration() {
  console.log("=== Starting Database Migration & Re-Scoring (Rubric v1.2) ===");

  try {
    // ── 1. Fetching and migrating indicators ─────────────────────────────
    console.log("\n1. Fetching all indicator values to standardize codes...");
    const { data: indicators, error: indErr } = await supabaseAdmin
      .from('indicator_values')
      .select('*');

    if (indErr) throw indErr;
    console.log(`Fetched ${indicators.length} indicator values.`);

    // First delete any obsolete keys or non-standardized formats
    for (const ind of indicators) {
      const originalCode = ind.indicator_code;
      const standardizedCode = standardizeIndicatorCode(originalCode);

      if (originalCode !== standardizedCode) {
        console.log(`Deleting non-standardized indicator: ${originalCode} (${ind.environment_mode})`);
        const { error: delErr } = await supabaseAdmin
          .from('indicator_values')
          .delete()
          .eq('id', ind.id);
        if (delErr) throw delErr;
      }
    }

    // Now upsert standardized records for BOTH 'live' and 'test' environments to ensure complete test coverage!
    let upsertCount = 0;
    const uniqueCodes = new Set<string>();

    for (const ind of indicators) {
      const standardizedCode = standardizeIndicatorCode(ind.indicator_code);
      uniqueCodes.add(standardizedCode);
    }

    console.log(`Unique standardized indicator codes to process: ${uniqueCodes.size}`);

    for (const code of uniqueCodes) {
      // Find the best source data among matching indicators
      const matches = indicators.filter(ind => standardizeIndicatorCode(ind.indicator_code) === code);
      const match = matches[0]; // Take first match as source

      const envs: ('live' | 'test')[] = ['live', 'test'];
      for (const env of envs) {
        const { error: upsertErr } = await supabaseAdmin
          .from('indicator_values')
          .upsert({
            indicator_code: code,
            pillar_code: match.pillar_code,
            subpillar_code: match.subpillar_code,
            raw_value: match.raw_value,
            source: match.source,
            source_url: match.source_url,
            data_date: match.data_date,
            notes: match.notes,
            environment_mode: env,
            rubric_version: '1.2',
            updated_at: new Date().toISOString()
          }, { onConflict: 'indicator_code,environment_mode,rubric_version' });

        if (upsertErr) {
          console.error(`❌ Error upserting indicator code ${code} for environment ${env}:`, upsertErr.message);
          throw upsertErr;
        }
        upsertCount++;
      }
    }

    console.log(`✅ Standardized and expanded indicator registry: upserted ${upsertCount} records across live & test modes.`);

    // ── 2. Update rubric_version in assessment_sessions ─────────────────
    console.log("\n2. Updating rubric_version in assessment_sessions...");
    const { data: sessionsToUpdate, error: fetchSessErr } = await supabaseAdmin
      .from('assessment_sessions')
      .select('id, rubric_version');

    if (fetchSessErr) throw fetchSessErr;

    let updatedSessionCount = 0;
    for (const sess of sessionsToUpdate) {
      if (sess.rubric_version !== '1.2') {
        const { error: updateSessErr } = await supabaseAdmin
          .from('assessment_sessions')
          .update({ rubric_version: '1.2' })
          .eq('id', sess.id);

        if (updateSessErr) throw updateSessErr;
        updatedSessionCount++;
      }
    }
    console.log(`✅ Updated ${updatedSessionCount} assessment_sessions to rubric_version 1.2.`);

    // ── 3. Re-score all assessment results per environment mode ───────────
    console.log("\n3. Re-scoring assessment results...");
    const modes: ('live' | 'test')[] = ['live', 'test'];

    for (const mode of modes) {
      console.log(`\nProcessing mode: ${mode}`);

      // Fetch sessions for this mode
      const { data: sessions, error: sessErr } = await supabaseAdmin
        .from('assessment_sessions')
        .select('*')
        .eq('environment_mode', mode);

      if (sessErr) throw sessErr;
      if (!sessions || sessions.length === 0) {
        console.log(`No sessions found for mode ${mode}. Skipping.`);
        continue;
      }

      console.log(`Found ${sessions.length} sessions for mode ${mode}.`);
      const sessionIds = sessions.map(s => s.id);

      // Fetch all responses for these sessions
      const { data: responses, error: respErr } = await supabaseAdmin
        .from('assessment_responses')
        .select('*')
        .in('assessment_id', sessionIds);

      if (respErr) throw respErr;
      console.log(`Fetched ${responses?.length ?? 0} active responses.`);

      // Fetch indicator values for this mode under v1.2
      const { data: modeIndicators, error: modeIndErr } = await supabaseAdmin
        .from('indicator_values')
        .select('*')
        .eq('environment_mode', mode)
        .eq('rubric_version', '1.2');

      if (modeIndErr) throw modeIndErr;
      console.log(`Fetched ${modeIndicators.length} indicator values for mode ${mode}.`);

      // Build input structure
      const assessmentGroupId = `${mode}_1.2_${new Date().toISOString().slice(0, 10)}`;
      const input = buildAssessmentInput(
        sessions,
        responses ?? [],
        modeIndicators ?? [],
        assessmentGroupId
      );

      // Run scoring engine
      console.log("Running scoring engine...");
      const result = scoreAssessment(input);
      console.log(`Calculated Score: ${result.overall.score} (${result.overall.maturity})`);

      // Upsert results
      console.log("Upserting result into assessment_results...");
      const { error: upsertResErr } = await supabaseAdmin
        .from('assessment_results')
        .upsert({
          assessment_group_id: assessmentGroupId,
          country: input.country,
          environment_mode: mode,
          rubric_version: '1.2',
          input_json: input,
          output_json: result,
          computed_at: new Date().toISOString(),
          engine_version: '3.0'
        }, { onConflict: 'assessment_group_id' });

      if (upsertResErr) throw upsertResErr;
      console.log(`✅ Successfully updated assessment_results for mode: ${mode}`);
    }

    console.log("\n🎉 Database migration and re-scoring completed successfully with 0 errors!");
  } catch (err) {
    console.error("\n💥 Migration failed with error:", err);
    process.exit(1);
  }
}

runMigration();
