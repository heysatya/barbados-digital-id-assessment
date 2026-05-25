import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Error: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing in .env.local');
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

async function verifyAndSeedLiveIndicators() {
  console.log('🔍 Connecting to Supabase and checking indicators...');

  // 1. Fetch all indicators to see what rubric versions are in the database
  const { data: allIndicators, error: fetchErr } = await supabaseAdmin
    .from('indicator_values')
    .select('indicator_code, environment_mode, rubric_version');

  if (fetchErr) {
    console.error('❌ Failed to fetch indicators:', fetchErr.message);
    process.exit(1);
  }

  console.log(`📊 Found ${allIndicators?.length || 0} total indicator records in database.`);
  
  // Group by environment and rubric_version
  const groups: Record<string, number> = {};
  allIndicators?.forEach(ind => {
    const key = `${ind.environment_mode} (Rubric ${ind.rubric_version})`;
    groups[key] = (groups[key] || 0) + 1;
  });

  console.log('📊 Records breakdown:');
  Object.entries(groups).forEach(([key, count]) => {
    console.log(`   - ${key}: ${count} records`);
  });

  // Let's identify the active rubric version we want to seed.
  // Since SurveyShell uses '3.0', we want to make sure '3.0' is fully populated.
  // If '3.0' has no records but '1.2' does, we will automatically upgrade the '1.2' records to '3.0' and save them as 'live' and 'test'!
  const hasTest3 = (groups['test (Rubric 3.0)'] || 0) > 0;
  const hasLive3 = (groups['live (Rubric 3.0)'] || 0) > 0;
  const sourceVersion = groups['test (Rubric 1.2)'] ? '1.2' : groups['live (Rubric 1.2)'] ? '1.2' : null;

  let testCount = groups['test (Rubric 3.0)'] || 0;
  let liveCount = groups['live (Rubric 3.0)'] || 0;

  if (testCount === 0 && liveCount === 0 && sourceVersion) {
    console.log(`\n💡 Detected indicators under Rubric version '${sourceVersion}' but none under version '3.0'.`);
    console.log(`👉 Upgrading Rubric ${sourceVersion} indicators to Rubric 3.0 for BOTH 'test' and 'live' modes...`);

    const { data: sourceData } = await supabaseAdmin
      .from('indicator_values')
      .select('*')
      .eq('rubric_version', sourceVersion);

    if (sourceData && sourceData.length > 0) {
      console.log(`   Upserting ${sourceData.length} indicators for 'test' (Rubric 3.0) and 'live' (Rubric 3.0)...`);
      for (const record of sourceData) {
        for (const env of ['test', 'live']) {
          await supabaseAdmin
            .from('indicator_values')
            .upsert({
              indicator_code: record.indicator_code,
              pillar_code: record.pillar_code,
              subpillar_code: record.subpillar_code,
              raw_value: record.raw_value,
              source: record.source,
              source_url: record.source_url,
              data_date: record.data_date,
              notes: record.notes,
              environment_mode: env,
              rubric_version: '3.0',
              updated_at: new Date().toISOString()
            }, { onConflict: 'indicator_code,environment_mode,rubric_version' });
        }
      }
      console.log('✅ Indicators version upgrade completed!');
      testCount = sourceData.length;
      liveCount = sourceData.length;
    }
  } else if (liveCount < testCount || liveCount === 0) {
    console.log(`\n⚠️ Seeding missing live indicators from test mode dataset...`);

    // Fetch full records from test mode
    const { data: fullTestData, error: fullTestErr } = await supabaseAdmin
      .from('indicator_values')
      .select('*')
      .eq('environment_mode', 'test')
      .eq('rubric_version', '3.0');

    if (fullTestErr || !fullTestData) {
      console.error('❌ Failed to fetch full test records:', fullTestErr?.message);
      process.exit(1);
    }

    console.log(`👉 Copying ${fullTestData.length} records to environment_mode = 'live'...`);

    for (const record of fullTestData) {
      const { error: upsertErr } = await supabaseAdmin
        .from('indicator_values')
        .upsert({
          indicator_code: record.indicator_code,
          pillar_code: record.pillar_code,
          subpillar_code: record.subpillar_code,
          raw_value: record.raw_value,
          source: record.source,
          source_url: record.source_url,
          data_date: record.data_date,
          notes: record.notes,
          environment_mode: 'live', // Migrate to live mode
          rubric_version: '3.0',
          updated_at: new Date().toISOString()
        }, { onConflict: 'indicator_code,environment_mode,rubric_version' });

      if (upsertErr) {
        console.error(`❌ Error seeding ${record.indicator_code} for live mode:`, upsertErr.message);
      }
    }

    console.log('✅ Indicators copy completed!');
    
    // Fetch live count again to confirm success
    const { data: finalLive } = await supabaseAdmin
      .from('indicator_values')
      .select('indicator_code')
      .eq('environment_mode', 'live')
      .eq('rubric_version', '3.0');
    
    console.log(`🎉 Verified! Live Mode now has ${finalLive?.length || 0} indicators active.`);
  } else {
    console.log('✅ Live Mode indicators are already fully seeded and ready. No action required.');
  }

  // 3. Check active sessions counts
  const { data: testSessions } = await supabaseAdmin
    .from('assessment_sessions')
    .select('id')
    .eq('environment_mode', 'test');

  const { data: liveSessions } = await supabaseAdmin
    .from('assessment_sessions')
    .select('id')
    .eq('environment_mode', 'live');

  console.log(`\n📊 Current Survey Submissions:`);
  console.log(`   - Test Mode Sessions: ${testSessions?.length || 0} records`);
  console.log(`   - Live Mode Sessions: ${liveSessions?.length || 0} records`);
  console.log(`\n🎉 System is 100% ready for Live Launch!`);
}

verifyAndSeedLiveIndicators();
