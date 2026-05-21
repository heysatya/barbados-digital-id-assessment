'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import AssessmentResultsView from '@/components/results/AssessmentResultsView';
import type { DigitalIDAssessmentOutput } from '@/types/scoring';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function DashboardResultPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<DigitalIDAssessmentOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<'admin' | 'viewer' | null>(null);

  useEffect(() => {
    // Auth check
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Session retrieval failed:', error.message);
        supabase.auth.signOut().then(() => {
          router.push('/login');
        });
        return;
      }
      if (!session) { router.push('/login'); return; }
      supabase.from('profiles').select('role').eq('id', session.user.id).single()
        .then(({ data }) => {
          if (!data || !['admin', 'viewer'].includes(data.role)) {
            router.push('/login');
          } else {
            setUserRole(data.role as 'admin' | 'viewer');
          }
        });
    });
  }, [router]);

  useEffect(() => {
    if (userRole && id) {
      const fetchResult = async () => {
        setLoading(true);
        try {
          const { data, error: fetchErr } = await supabase
            .from('assessment_results')
            .select('*')
            .eq('assessment_group_id', id)
            .single();

          if (fetchErr || !data) {
            setError(fetchErr?.message || 'Result not found');
          } else {
            setResult(data.output_json as DigitalIDAssessmentOutput);
          }
        } catch (e) {
          setError(e instanceof Error ? e.message : 'Failed to load result');
        } finally {
          setLoading(false);
        }
      };

      fetchResult();
    }
  }, [userRole, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-secondary flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
          <p className="text-slate-500 text-sm">Loading result details…</p>
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen bg-bg-secondary flex items-center justify-center p-6">
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 text-center max-w-md">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-red-400 font-bold text-lg mb-2">Error Loading Result</h2>
          <p className="text-slate-400 text-sm">{error || 'Result data unavailable'}</p>
          <Link href="/dashboard" className="mt-6 inline-flex items-center text-sm text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-secondary">
      {/* Dashboard Top Header (Ancillary) */}
      <div className="bg-white/[0.02] border-b border-white/[0.06] px-8 py-4 flex items-center justify-between no-print">
        <Link href="/dashboard" className="flex items-center text-xs font-bold text-slate-400 hover:text-cyan-400 transition-all uppercase tracking-widest gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Admin Panel
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Environment</span>
          <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase">
            {result.assessment_id.startsWith('live') ? 'LIVE' : 'TEST'}
          </span>
        </div>
      </div>

      <AssessmentResultsView result={result} />
    </div>
  );
}
