import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load .env.local
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Missing Supabase credentials in .env.local');
  process.exit(1);
}

console.log(`Connecting to Supabase at: ${supabaseUrl}`);

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    // Try to query a basic auth or ping
    // We'll just list tables or do a basic select from a system view to see if auth works, or a dummy table
    const { error } = await supabase.from('profiles').select('id').limit(1);
    
    if (error) {
      if (error.code === '42P01') {
         console.log('Connection successful! (Table "profiles" does not exist yet, which is expected before migration)');
      } else {
         console.error('Connection failed or returned error:', error.message);
      }
    } else {
      console.log('Connection successful! (Table "profiles" exists)');
    }
  } catch (err) {
    console.error('Unexpected connection error:', err);
  }
}

testConnection();
