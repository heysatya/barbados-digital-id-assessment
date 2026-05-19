"use client";
// File: src/components/dashboard/views/AdminActionsView.tsx

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ShieldAlert, AlertTriangle, Cpu, Trash2 } from 'lucide-react';

interface Props {
  userRole: 'admin' | 'viewer';
  activeMode: 'live' | 'test';
  onRescoreComplete?: () => void;
}

export default function AdminActionsView({ userRole, activeMode, onRescoreComplete }: Props) {
  if (userRole !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center bg-white border border-[#DDE1E9] rounded-[3rem] shadow-sm font-sans">
        <div className="w-24 h-24 bg-red-50 rounded-3xl flex items-center justify-center mb-8 shadow-inner border border-red-100">
          <ShieldAlert className="w-10 h-10 text-red-600" />
        </div>
        <h3 className="text-3xl font-black text-[#0D1117] mb-3 font-display">Access Denied</h3>
        <p className="text-[#4A5568] text-base max-w-sm font-medium leading-relaxed">Admin privileges are required to access dashboard controls and data management.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl font-sans">
      <div className="px-6 py-5 bg-orange-50 border border-orange-200 rounded-[1.5rem] text-[10px] font-bold text-orange-800 uppercase tracking-[0.15em] flex items-center gap-4 shadow-sm">
        <AlertTriangle className="w-5 h-5 flex-shrink-0" />
        <span className="leading-relaxed">Warning: Administrative actions are irreversible. Data deletion is restricted to the test environment only.</span>
      </div>

      <div className="grid gap-8">
        <RescoreAction activeMode={activeMode} onComplete={onRescoreComplete} />
        <PurgeAction activeMode={activeMode} />
      </div>
    </div>
  );
}

// ── Rescore Action ────────────────────────────────────────────────────────────

function RescoreAction({ activeMode, onComplete }: {
  activeMode: 'live' | 'test';
  onComplete?: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleRescore = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/admin/rescore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ mode: activeMode }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
      setResult({
        success: true,
        message: `Dashboard scores successfully updated.`,
      });
      onComplete?.();
    } catch (e) {
      setResult({ success: false, message: `Update failed: ${e instanceof Error ? e.message : 'Unknown technical error'}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-[#DDE1E9] rounded-[2.5rem] p-8 md:p-10 shadow-sm space-y-8">
      <div className="flex items-start gap-6">
        <div className="w-16 h-16 bg-[#003DA5] rounded-2xl flex items-center justify-center shadow-lg shadow-[#003DA5]/20 flex-shrink-0">
          <Cpu className="w-7 h-7 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h3 className="text-xl md:text-2xl font-black text-[#0D1117] font-display">Recalculate Dashboard Scores</h3>
            <span className="px-3 py-1 bg-[#E8EEFA] text-[#003DA5] text-[9px] font-bold rounded-full uppercase tracking-widest">{activeMode}</span>
          </div>
          <p className="text-sm text-[#4A5568] font-medium leading-relaxed max-w-2xl">
            Update the dashboard charts and metrics to reflect the most recently submitted survey responses. This process updates all {activeMode} data.
          </p>
        </div>
      </div>

      {result && (
        <div className={`px-6 py-4 rounded-xl text-[10px] font-bold uppercase tracking-[0.15em] border transition-all ${result.success ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
          {result.message}
        </div>
      )}

      <button
        onClick={handleRescore}
        disabled={loading}
        className="w-full sm:w-auto px-10 h-14 bg-[#003DA5] hover:bg-[#1A56C4] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl transition-all shadow-md disabled:opacity-50 transform active:scale-95"
      >
        {loading ? 'Updating...' : 'Recalculate Now'}
      </button>
    </div>
  );
}

// ── Purge Action ──────────────────────────────────────────────────────────────

function PurgeAction({ activeMode }: {
  activeMode: 'live' | 'test';
}) {
  const [includeIndicators, setIncludeIndicators] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const isLive = activeMode === 'live';

  const handlePurge = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token || !confirmed) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/admin/purge-test-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
        body: JSON.stringify({ include_indicators: includeIndicators, mode: activeMode, confirmBackup: true }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
      setResult({
        success: true,
        message: `Test data successfully deleted.`,
      });
      setConfirmed(false);
    } catch (e) {
      setResult({ success: false, message: `Deletion Error: ${e instanceof Error ? e.message : 'Operation failed'}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`bg-white border rounded-[2.5rem] p-8 md:p-10 space-y-8 shadow-sm transition-all ${isLive ? 'border-[#DDE1E9] opacity-70' : 'border-[#DDE1E9] hover:border-red-200'}`}>
      <div className="flex items-start gap-6">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-md flex-shrink-0 ${isLive ? 'bg-gray-200' : 'bg-red-600'}`}>
          <Trash2 className="w-7 h-7 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-black text-[#0D1117] font-display mb-2">Clear Test Data</h3>
          <p className="text-sm text-[#4A5568] font-medium leading-relaxed max-w-2xl">
            Delete all test submissions and reset the dashboard. This action cannot be undone.
          </p>
          {isLive && (
            <div className="mt-4 flex items-center gap-2 text-red-700 font-bold uppercase tracking-widest text-[10px] bg-red-50 p-3 rounded-lg border border-red-100 w-fit">
              <ShieldAlert className="w-4 h-4" /> Deletion is disabled in live production mode.
            </div>
          )}
        </div>
      </div>

      {!isLive && (
        <div className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="flex items-center gap-4 p-5 bg-[#F8F9FB] border border-[#DDE1E9] rounded-2xl cursor-pointer group hover:border-[#003DA5]/30 transition-all shadow-sm">
              <input type="checkbox" checked={includeIndicators} onChange={(e) => setIncludeIndicators(e.target.checked)}
                className="w-5 h-5 rounded border-[#DDE1E9] text-[#003DA5] focus:ring-[#003DA5]/20 cursor-pointer" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-[#0D1117] uppercase tracking-widest">Include Indicators</span>
                <span className="text-[9px] text-[#8A95A3] font-bold uppercase tracking-wider">Delete metadata</span>
              </div>
            </label>

            <label className="flex items-center gap-4 p-5 bg-red-50 border border-red-200 rounded-2xl cursor-pointer group hover:bg-red-100 transition-all shadow-sm">
              <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)}
                className="w-5 h-5 rounded border-red-300 text-red-600 focus:ring-red-200 cursor-pointer" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-red-700 uppercase tracking-widest">Confirm Deletion</span>
                <span className="text-[9px] text-red-600/70 font-bold uppercase tracking-wider">Permanent action</span>
              </div>
            </label>
          </div>

          {result && (
            <div className={`px-6 py-4 rounded-xl text-[10px] font-bold uppercase tracking-[0.15em] border transition-all ${result.success ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
              {result.message}
            </div>
          )}

          <button
            onClick={handlePurge}
            disabled={loading || !confirmed}
            className="w-full sm:w-auto px-10 h-14 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl transition-all shadow-md disabled:opacity-40 transform active:scale-95"
          >
            {loading ? 'Deleting...' : 'Delete Test Data'}
          </button>
        </div>
      )}
    </div>
  );
}