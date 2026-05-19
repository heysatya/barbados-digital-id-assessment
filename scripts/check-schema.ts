import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = 'https://bubdgmlebrqvicdgwnha.supabase.co';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

async function checkSchema() {
  console.log('🔍 Checking database schema...');
  
  // Try to select from profiles
  const { data: profiles, error: pErr } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .limit(1);

  if (pErr) {
    console.error('❌ Profiles table error:', pErr.message);
    if (pErr.message.includes('does not exist')) {
      console.log('💡 Hint: The profiles table is missing.');
    }
  } else {
    console.log('✅ Profiles table exists.');
    console.log('Sample profile:', profiles);
  }

  // Check assessment_sessions
  const { error: sErr } = await supabaseAdmin
    .from('assessment_sessions')
    .select('id')
    .limit(1);

  if (sErr) {
    console.error('❌ Assessment sessions table error:', sErr.message);
  } else {
    console.log('✅ Assessment sessions table exists.');
  }
}

checkSchema();
