import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testInsertNoSelect() {
  console.log('Testing insert into assessment_sessions (no select)...');
  const { error } = await supabase
    .from('assessment_sessions')
    .insert([{
      survey_type: 'expert',
      environment_mode: 'test',
      rubric_version: '3.0',
      organization_name: 'Test Org'
    }]);

  if (error) {
    console.error('❌ Insert failed:', error.message);
  } else {
    console.log('✅ Insert successful (likely, since no error returned)');
  }
}

testInsertNoSelect();
