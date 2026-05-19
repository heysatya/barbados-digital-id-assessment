import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testInsert() {
  console.log('Testing insert into assessment_sessions...');
  const { data, error } = await supabase
    .from('assessment_sessions')
    .insert([{
      survey_type: 'expert',
      environment_mode: 'test',
      rubric_version: '1.0'
    }])
    .select();

  if (error) {
    console.error('❌ Insert failed:', error.message);
    console.error('Error details:', JSON.stringify(error, null, 2));
  } else {
    console.log('✅ Insert successful:', data);
  }
}

testInsert();
