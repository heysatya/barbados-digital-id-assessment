import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = 'https://bubdgmlebrquvicdgwnha.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1YmRnbWxlYnJxdmljZGd3bmhhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDg0OTM5MywiZXhwIjoyMDkwNDI1MzkzfQ.-qOceofz4YUllw5MR8X0ZihW8Fe90Wo9gg1oU6KDnTQ';

console.log('URL:', supabaseUrl);
console.log('Key (first 10 chars):', supabaseServiceKey.substring(0, 10));

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testConnection() {
  const { data, error } = await supabase.from('assessment_sessions').select('count', { count: 'exact', head: true });
  if (error) {
    console.error('❌ Connection failed:', error.message);
  } else {
    console.log('✅ Connection successful. Row count:', data);
  }
}

testConnection();
