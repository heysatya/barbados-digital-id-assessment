'use client';
// File: src/components/dashboard/ExportButtons.tsx

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Download, Loader2, Database, AlertTriangle } from 'lucide-react';

type ExportMode = 'live' | 'test';

interface ButtonState {
  loading: boolean;
  error: string | null;
}

async function triggerExport(mode: ExportMode, token: string): Promise<void> {
  const res = await fetch(`/api/admin/export-responses?mode=${mode}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({})) as { error?: string };
    throw new Error(data.error ?? `Export failed with status ${res.status}`);
  }

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  a.href = url;
  a.download = `barbados_digital_id_assessment_${mode}_export_${dateStr}.xlsx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function ExportButtons() {
  const [liveState, setLiveState] = useState<ButtonState>({ loading: false, error: null });
  const [testState, setTestState] = useState<ButtonState>({ loading: false, error: null });

  const handleExport = async (mode: ExportMode) => {
    const setter = mode === 'live' ? setLiveState : setTestState;
    setter({ loading: true, error: null });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.access_token) {
      setter({ loading: false, error: 'Authentication required. Please log in.' });
      return;
    }

    try {
      await triggerExport(mode, session.access_token);
      setter({ loading: false, error: null });
    } catch (e) {
      setter({
        loading: false,
        error: e instanceof Error ? e.message : 'Export failed. Please try again.',
      });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 font-sans" role="group" aria-label="Data export actions">

      {/* ── Export Live Data ───────────────────────────────────────────────── */}
      <div className="flex flex-col gap-2 w-full sm:w-auto">
        <button
          id="export-live-btn"
          onClick={() => handleExport('live')}
          disabled={liveState.loading}
          className={`flex items-center justify-center gap-3 px-8 h-14 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-200 border shadow-sm outline-none focus:ring-2 focus:ring-green-600/20 active:scale-95
            ${liveState.loading
              ? 'opacity-60 cursor-not-allowed bg-green-50 border-green-200 text-green-700'
              : 'bg-green-50 border-green-200 text-green-700 hover:bg-green-600 hover:text-white hover:border-green-600 hover:shadow-md'
            }`}
        >
          {liveState.loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
          {liveState.loading ? 'Compiling Data...' : 'Export Live Data'}
        </button>
        {liveState.error && (
          <div className="flex items-start gap-2 text-[10px] font-bold text-red-700 px-4 py-2 bg-red-50 border border-red-200 rounded-lg">
            <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="leading-tight">{liveState.error}</span>
          </div>
        )}
      </div>

      {/* ── Export Test Data ───────────────────────────────────────────────── */}
      <div className="flex flex-col gap-2 w-full sm:w-auto">
        <button
          id="export-test-btn"
          onClick={() => handleExport('test')}
          disabled={testState.loading}
          className={`flex items-center justify-center gap-3 px-8 h-14 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-200 border shadow-sm outline-none focus:ring-2 focus:ring-[#003DA5]/20 active:scale-95
            ${testState.loading
              ? 'opacity-60 cursor-not-allowed bg-[#E8EEFA] border-[#003DA5]/20 text-[#003DA5]'
              : 'bg-[#E8EEFA] border-[#003DA5]/20 text-[#003DA5] hover:bg-[#003DA5] hover:text-white hover:border-[#003DA5] hover:shadow-md'
            }`}
        >
          {testState.loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
          {testState.loading ? 'Compiling Data...' : 'Export Test Data'}
        </button>
        {testState.error && (
          <div className="flex items-start gap-2 text-[10px] font-bold text-red-700 px-4 py-2 bg-red-50 border border-red-200 rounded-lg">
            <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="leading-tight">{testState.error}</span>
          </div>
        )}
      </div>

    </div>
  );
}