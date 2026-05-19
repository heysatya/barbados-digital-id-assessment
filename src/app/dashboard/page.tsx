'use client';
// File: src/app/dashboard/page.tsx
// Main Admin Dashboard — orchestrator + data fetcher.
// Replaces legacy dashboard. All data fetched server-side via Supabase client.

import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

import DashboardShell, { type DashboardTab } from '@/components/dashboard/DashboardShell';
import ExecutiveSummaryView from '@/components/dashboard/views/ExecutiveSummaryView';
import PillarDashboardView from '@/components/dashboard/views/PillarDashboardView';
import SubpillarHeatmapView from '@/components/dashboard/views/SubpillarHeatmapView';
import QuestionAggregationView from '@/components/dashboard/views/QuestionAggregationView';
import ExpertResponseView from '@/components/dashboard/views/ExpertResponseView';
import DiscrepancyView from '@/components/dashboard/views/DiscrepancyView';
import DataQualityView from '@/components/dashboard/views/DataQualityView';
import RawResponsesView from '@/components/dashboard/views/RawResponsesView';
import ExportsView from '@/components/dashboard/views/ExportsView';
import AdminActionsView from '@/components/dashboard/views/AdminActionsView';
import LoginModal from '@/components/auth/LoginModal';

import {
  aggregateStakeholderResponses,
  type RawAssessmentSession,
  type RawAssessmentResponse,
  type RawIndicatorValue,
  type QuestionAggRow,
} from '@/lib/assessmentAggregation';

import type { DigitalIDAssessmentOutput } from '@/types/scoring';

// ─── Types ────────────────────────────────────────────────────────────────────

interface DashboardState {
  loading: boolean;
  error: string | null;
  userRole: 'admin' | 'viewer' | null;
  result: DigitalIDAssessmentOutput | null;
  computedAt: string | null;
  rubricVersion: string | null;
  sessions: RawAssessmentSession[];
  responses: RawAssessmentResponse[];
  indicators: RawIndicatorValue[];
  aggRows: QuestionAggRow[];
}

const EMPTY: DashboardState = {
  loading: true,
  error: null,
  userRole: null,
  result: null,
  computedAt: null,
  rubricVersion: null,
  sessions: [],
  responses: [],
  indicators: [],
  aggRows: [],
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('executive');
  const [activeMode, setActiveMode] = useState<'live' | 'test'>('live');
  const [state, setState] = useState<DashboardState>(EMPTY);
  const [isScoring, setIsScoring] = useState(false);

  // ── Auth check ──────────────────────────────────────────────────────────────
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        setState(s => ({ ...s, loading: false }));
        return;
      }
      // Trust the database, not a hardcoded email string
      supabase.from('profiles').select('role').eq('id', session.user.id).single()
        .then(({ data, error }) => {
          if (error) {
            console.error('Profile fetch failed:', error.message);
            setState(s => ({ ...s, loading: false, error: "Unauthorized: Profile record missing." }));
            return;
          }
          if (data && ['admin', 'viewer'].includes(data.role)) {
            setState((s) => ({ ...s, userRole: data.role as 'admin' | 'viewer' }));
          }
        });
    });
  }, []);

  // ── Fetch all data for the active mode ──────────────────────────────────────
  const fetchData = useCallback(async (mode: 'live' | 'test') => {
    setState((s) => ({ ...s, loading: true, error: null }));

    try {
      // Parallelize independent calls: Sessions, Results, and Indicators
      const [sessionsRes, resultsRes, indicatorsRes] = await Promise.all([
        supabase.from('assessment_sessions').select('*').eq('environment_mode', mode).neq('status', 'archived'),
        supabase.from('assessment_results').select('*').eq('environment_mode', mode).order('computed_at', { ascending: false }).limit(1),
        supabase.from('indicator_values').select('*').eq('environment_mode', mode)
      ]);

      if (sessionsRes.error) throw sessionsRes.error;

      const sessions = sessionsRes.data ?? [];
      const sessionIds = sessions.map(s => s.id);

      // Dependent call: Responses (only if we have sessions)
      let responses: RawAssessmentResponse[] = [];
      if (sessionIds.length > 0) {
        const { data: resp, error: rErr } = await supabase
          .from('assessment_responses')
          .select('*')
          .neq('status', 'archived')
          .in('assessment_id', sessionIds);
        if (rErr) throw rErr;
        responses = resp ?? [];
      }

      const latestResult = resultsRes.data?.[0];
      const aggRows = aggregateStakeholderResponses(responses, new Set(sessions.filter(s => s.survey_type === 'stakeholder').map(s => s.id)));

      setState((s) => ({
        ...s,
        loading: false,
        sessions,
        responses,
        indicators: indicatorsRes.data ?? [],
        result: latestResult?.output_json ?? null,
        computedAt: latestResult?.computed_at ?? null,
        rubricVersion: latestResult?.rubric_version ?? null,
        aggRows,
      }));
    } catch (err: unknown) {
      console.error("Fetch error:", err);
      setState(s => ({ ...s, loading: false, error: err instanceof Error ? err.message : String(err) }));
    }
  }, []);

  useEffect(() => {
    if (state.userRole) {
      fetchData(activeMode);
    }
  }, [activeMode, state.userRole, fetchData]);

  // ── Trigger rescore ─────────────────────────────────────────────────────────
  const handleTriggerScore = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) return;
    setIsScoring(true);
    try {
      const res = await fetch('/api/admin/rescore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ mode: activeMode }),
      });
      if (res.ok) await fetchData(activeMode);
    } finally {
      setIsScoring(false);
    }
  };

  const handleDeleteSession = async (sessionId: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) return;

    // 1. Archive the session
    const res = await fetch('/api/admin/archive-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
      body: JSON.stringify({ id: sessionId }),
    });

    if (res.ok) {
      // 2. Force the math engine to recalculate the national aggregates immediately
      await fetch('/api/admin/rescore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
        body: JSON.stringify({ mode: activeMode }),
      });

      // 3. Fetch the freshly computed snapshot for the UI
      await fetchData(activeMode);
    } else {
      const errorData = await res.json();
      alert(`Failed to archive: ${errorData.error}`);
    }
  };

  // ── Logout ──────────────────────────────────────────────────────────────────
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setState(s => ({ ...s, userRole: null }));
  };

  // ── Loading & Auth states ──────────────────────────────────────────────────
  if (state.loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-[#003DA5]/30 border-t-[#003DA5] rounded-full animate-spin" />
          <p className="text-[#4A5568] text-[10px] font-bold uppercase tracking-widest">Initializing Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!state.userRole) {
    return <LoginModal onSuccess={(role) => setState(s => ({ ...s, userRole: role }))} />;
  }

  if (state.error) {
    return (
      <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center font-sans">
        <div className="bg-red-50 border border-red-200 rounded-3xl p-10 text-center max-w-md shadow-sm">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-red-600 text-3xl mx-auto mb-6 shadow-sm border border-red-100">⚠️</div>
          <h2 className="text-[#0D1117] font-black text-xl mb-3 font-display">Data Access Error</h2>
          <p className="text-[#4A5568] text-sm leading-relaxed mb-8">{state.error}</p>
          <button onClick={() => fetchData(activeMode)}
            className="bg-[#003DA5] text-white text-[10px] font-bold uppercase tracking-widest px-8 py-3.5 rounded-xl hover:bg-[#1A56C4] transition-all shadow-md active:scale-95">
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  // ── Expert responses (filter from all responses) ────────────────────────────
  const dashboardExpertSessionIds = new Set(
    state.sessions.filter((s) => s.survey_type === 'expert').map((s) => s.id)
  );
  const expertResponses = state.responses.filter((r) => dashboardExpertSessionIds.has(r.assessment_id));

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <DashboardShell
      activeTab={activeTab}
      onTabChange={setActiveTab}
      userRole={state.userRole ?? 'viewer'}
      activeMode={activeMode}
      onModeChange={(m) => setActiveMode(m)}
      onLogout={handleLogout}
    >
      {activeTab === 'executive' && (
        <ExecutiveSummaryView
          result={state.result}
          sessionCount={state.sessions.length}
          sessions={state.sessions}
          responses={state.responses}
          activeMode={activeMode}
          onTriggerScore={state.userRole === 'admin' ? handleTriggerScore : undefined}
          isScoring={isScoring}
        />
      )}

      {activeTab === 'pillars' && (
        <PillarDashboardView result={state.result} />
      )}

      {activeTab === 'heatmap' && (
        <SubpillarHeatmapView result={state.result} />
      )}

      {activeTab === 'questions' && (
        <QuestionAggregationView
          responses={state.responses}
          sessions={state.sessions}
          activeMode={activeMode}
        />
      )}

      {activeTab === 'expert' && (
        <ExpertResponseView
          expertResponses={expertResponses}
          sessions={state.sessions}
        />
      )}

      {activeTab === 'discrepancy' && (
        <DiscrepancyView
          result={state.result}
          sessions={state.sessions}
          responses={state.responses}
        />
      )}

      {activeTab === 'quality' && (
        <DataQualityView
          result={state.result}
          sessionCount={state.sessions.length}
          sessions={state.sessions}
          responses={state.responses}
        />
      )}

      {activeTab === 'raw' && (
        <RawResponsesView
          sessions={state.sessions}
          responses={state.responses}
          onDeleteSession={handleDeleteSession}
        />
      )}

      {activeTab === 'exports' && (
        <ExportsView activeMode={activeMode} hasResult={state.result !== null} />
      )}

      {activeTab === 'admin' && (
        <AdminActionsView
          userRole={state.userRole ?? 'viewer'}
          activeMode={activeMode}
          onRescoreComplete={() => fetchData(activeMode)}
        />
      )}
    </DashboardShell>
  );
}