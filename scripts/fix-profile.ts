import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

async function fixAdminProfile() {
  const userId = 'f5a2a10a-d6fc-4b37-adad-e69bc5f91e96';
  const email = 'trident-admin@dida.local';
  
  console.log(`🔧 Ensuring profile for user: ${email} (${userId})`);

  const { error } = await supabaseAdmin
    .from('profiles')
    .upsert({
      id: userId,
      email: email,
      role: 'admin',
      full_name: 'Trident Admin'
    }, { onConflict: 'id' });

  if (error) {
    console.error('❌ Failed to fix profile:', error.message);
  } else {
    console.log('✅ Profile fixed successfully!');
  }
}

fixAdminProfile();
