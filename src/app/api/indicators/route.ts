import { NextResponse } from 'next/server';
import { getIndicatorRegistry } from '@/data/indicatorRegistry';
import rubricConfig from '@/config/rubric_config.json';

export async function GET() {
  try {
    // We only select indicators that exist in Supabase.
    // If an indicator doesn't exist in Supabase, we still want to show it in the UI, 
    // so the UI will merge the registry with the DB values.
    
    // Admin check - usually handled by middleware or server-side auth, but since we rely on RLS, 
    // we can just use the anon client. The RLS policy for `indicator_values` is:
    // "Authenticated users can select indicators"
    // So anyone logged in can read them. Admin is needed to INSERT/UPDATE/DELETE.
    // However, since it's the admin UI, we'll try to fetch all.

    // Note: Since this API route is using the anon client, it relies on the user's cookie.
    // But in NextJS App Router server components/API routes, we should use createServerClient if we need the user session.
    // Wait, the client will fetch this directly via the browser, or the server will?
    // Let's assume the API route uses standard Supabase JS with no auth context unless passed.
    // Actually, it's better to just do this on the client-side directly using Supabase JS.
    // Or if we build an API, we need to pass the JWT.
    
    // Let's just return the registry from the API, and the client will fetch the DB values directly from Supabase.
    // That avoids auth passing issues in the API.
    
    const registry = getIndicatorRegistry();
    return NextResponse.json({ registry, version: rubricConfig.version });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
