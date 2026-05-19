"use client";
// File: src/components/dashboard/views/ExecutiveSummaryView.tsx

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { DigitalIDAssessmentOutput } from '@/types/scoring';
import type { RawAssessmentSession, RawAssessmentResponse } from '@/lib/assessmentAggregation';
import { ShieldCheck, Activity, Target, Play, Info, Users, Layers } from 'lucide-react';

interface Props {
  result: DigitalIDAssessmentOutput | null;
  sessionCount?: number; // Legacy prop (Tainted with 202 - we will ignore it for the UI)
  sessions?: RawAssessmentSession[];
  responses?: RawAssessmentResponse[];
  activeMode: 'live' | 'test';
  onTriggerScore?: () => void;
  isScoring?: boolean;
}

const PILLAR_NAMES: Record<string, string> = {
  P1: 'Service Delivery & User Value',
  P2: 'Safeguards, Trust & Accountability',
  P3: 'Ecosystem & Innovation',
  P4: 'Technology & DPI Integration',
  P5: 'Legal & Regulatory Foundations',
  P6: 'Institutional Capacity & Governance',
};

const PILLAR_COLORS: Record<string, string> = {
  P1: '#003DA5', P2: '#D69E2E', P3: '#2F855A',
  P4: '#C53030', P5: '#805AD5', P6: '#319795',
};

const MATURITY_LEGEND_DATA = [
  { lo: 1.00, hi: 1.80, label: 'Basic', color: '#C00000' },
  { lo: 1.81, hi: 2.60, label: 'Opportunistic', color: '#FFC000' },
  { lo: 2.61, hi: 3.40, label: 'Systematic', color: '#FFFF00' },
  { lo: 3.41, hi: 4.20, label: 'Differentiating', color: '#92D050' },
  { lo: 4.21, hi: 5.00, label: 'Transformational', color: '#00B050' },
];

function MaturityLegend() {
  return (
    <div className="bg-white border border-[#DDE1E9] rounded-2xl px-6 py-4 mb-8 shadow-sm flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3 pr-6 border-r border-[#DDE1E9]">
        <div className="w-8 h-8 bg-[#F8F9FB] rounded-lg flex items-center justify-center border border-[#DDE1E9]">
          <Info className="w-4 h-4 text-[#003DA5]" />
        </div>
        <div>
          <h4 className="text-[10px] font-black text-[#0D1117] uppercase tracking-widest">Maturity Rubric</h4>
          <p className="text-[8px] font-bold text-[#8A95A3] uppercase tracking-wider">Benchmark Ranges</p>
        </div>
      </div>
      <div className="flex flex-1 flex-wrap items-center justify-around gap-6">
        {MATURITY_LEGEND_DATA.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: item.color }} />
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-[#0D1117] uppercase tracking-tight">{item.label}</span>
              <span className="text-[8px] font-bold text-[#8A95A3] font-mono tracking-tighter">{item.lo.toFixed(2)} – {item.hi.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScoreRing({ score, color }: { score: number | null; color: string }) {
  const pct = score !== null ? ((score - 1) / 4) * 100 : 0;
  const r = 54;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;

  return (
    <div className="relative flex items-center justify-center">
      <svg width="150" height="150" viewBox="0 0 140 140" className="rotate-[-90deg]">
        <circle cx="70" cy="70" r={r} fill="none" stroke="#F8F9FB" strokeWidth="12" />
        <motion.circle
          cx="70" cy="70" r={r} fill="none"
          stroke={color} strokeWidth="12"
          strokeLinecap="round"
          initial={{ strokeDasharray: `0 ${circ}` }}
          animate={{ strokeDasharray: `${dash} ${circ - dash}` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-3xl font-black text-[#0D1117] font-display">
          {score !== null ? score.toFixed(2) : '—'}
        </span>
        <span className="text-[8px] font-black text-[#8A95A3] uppercase tracking-[0.2em]">Index Score</span>
      </div>
    </div>
  );
}

export default function ExecutiveSummaryView({ result, sessions = [], responses = [], onTriggerScore, isScoring }: Props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const assessmentsCompleted = useMemo(() => {
    if (!responses.length || !sessions.length) return 0;

    const activeSessionIds = Array.from(new Set(responses.map(r => r.assessment_id)));
    const sessionMap = new Map(sessions.map(s => [s.id, s]));

    let validRespondents = 0;
    activeSessionIds.forEach(id => {
      const s = sessionMap.get(id);
      if (s?.survey_type === 'expert' || s?.survey_type === 'stakeholder') {
        validRespondents++;
      }
    });
    return validRespondents;
  }, [sessions, responses]);

  // 2. FIXED METRIC: "Questions Analyzed" (Calculates 170 correctly)
  const questionsAnalyzed = useMemo(() => {
    if (!result) return 0;
    return result.subpillars.reduce((acc, sp) => acc + sp.valid_count, 0);
  }, [result]);

  // 3. NEW METRIC: Framework Scope (Pillars / Sub-pillars)
  const frameworkScope = useMemo(() => {
    if (!result) return { pillars: 6, subpillars: 30 };
    return {
      pillars: result.pillars.length,
      subpillars: result.subpillars.length
    };
  }, [result]);

  if (!result) return <EmptyState onTrigger={onTriggerScore} isScoring={isScoring} />;

  return (
    <div className="font-sans max-w-[1600px] mx-auto pb-12">
      <MaturityLegend />

      <div className="space-y-8">
        <div className="bg-white border border-[#DDE1E9] rounded-[2.5rem] p-10 shadow-sm flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F8F9FB] rounded-full -mr-32 -mt-32 opacity-50" />

          <div className="relative flex-shrink-0">
            {isMounted && <ScoreRing score={result.overall.score} color={result.overall.color} />}
          </div>

          <div className="flex-1 text-center md:text-left z-10">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <ShieldCheck className="w-4 h-4 text-[#003DA5]" />
              <p className="text-[10px] font-black text-[#8A95A3] uppercase tracking-[0.2em]">Overall Digital ID Maturity Index</p>
            </div>

            <h2 className="text-5xl font-black text-[#0D1117] font-display leading-tight mb-8">
              {result.overall.maturity}
            </h2>

            {/* THREE STRATEGIC METRIC TABS */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">

              {/* Metric 1: Assessments Completed (Exact logic for 13) */}
              <div className="px-5 py-3 bg-[#F8F9FB] border border-[#DDE1E9] rounded-2xl flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-white border border-[#DDE1E9] flex items-center justify-center shadow-sm">
                  <Users className="w-4 h-4 text-[#003DA5]" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[9px] font-black text-[#8A95A3] uppercase tracking-widest leading-none mb-1.5">Assessments Completed</span>
                  <span className="text-xl font-black text-[#0D1117] leading-none">{assessmentsCompleted}</span>
                </div>
              </div>

              {/* Metric 2: Questions Analyzed (The 170 Value) */}
              <div className="px-5 py-3 bg-green-50 border border-green-100 rounded-2xl flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-white border border-green-200 flex items-center justify-center shadow-sm">
                  <Target className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[9px] font-black text-green-700 uppercase tracking-widest leading-none mb-1.5">Questions Analyzed</span>
                  <span className="text-xl font-black text-green-700 leading-none">{questionsAnalyzed}</span>
                </div>
              </div>

              {/* Metric 3: Framework Scope (The New Request) */}
              <div className="px-5 py-3 bg-purple-50 border border-purple-100 rounded-2xl flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-white border border-purple-200 flex items-center justify-center shadow-sm">
                  <Layers className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[9px] font-black text-purple-700 uppercase tracking-widest leading-none mb-1.5">Framework Scope</span>
                  <span className="text-xl font-black text-purple-700 leading-none">
                    {frameworkScope.pillars} Pillars <span className="opacity-50 mx-1">/</span> {frameworkScope.subpillars} Sub-pillars
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Pillar Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {result.pillars.map((p, idx) => (
              <motion.div
                key={p.code}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white border border-[#DDE1E9] rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="flex-1 pr-4">
                    <span className="text-[10px] font-black text-[#003DA5] uppercase tracking-[0.2em]">Pillar {p.code}</span>
                    <h3 className="text-base font-black text-[#0D1117] font-display leading-tight mt-1 line-clamp-2 uppercase">
                      {PILLAR_NAMES[p.code] || p.name}
                    </h3>
                  </div>
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-base font-black shadow-inner"
                    style={{ backgroundColor: `${PILLAR_COLORS[p.code] || p.color}10`, color: PILLAR_COLORS[p.code] || p.color }}
                  >
                    {p.score !== null ? p.score.toFixed(2) : '—'}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-[#4A5568]">
                    <span>Maturity Score</span>
                    <span style={{ color: PILLAR_COLORS[p.code] || p.color }}>{p.maturity}</span>
                  </div>
                  <div className="h-2.5 bg-[#F8F9FB] rounded-full overflow-hidden border border-[#DDE1E9]/50">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: p.score !== null ? `${((p.score - 1) / 4) * 100}%` : 0 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: PILLAR_COLORS[p.code] || p.color }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

const EmptyState = ({ onTrigger, isScoring }: { onTrigger?: () => void, isScoring?: boolean }) => (
  <div className="flex flex-col items-center justify-center py-40 text-center bg-white border border-[#DDE1E9] rounded-[3rem] shadow-sm font-sans">
    <div className="w-24 h-24 bg-[#F8F9FB] rounded-[2rem] flex items-center justify-center text-[#4A5568] mb-10 shadow-inner border border-[#DDE1E9]">
      <ShieldCheck className="w-10 h-10 text-[#003DA5]" />
    </div>
    <h3 className="text-3xl font-black text-[#0D1117] font-display mb-4 uppercase tracking-tight">Digital ID Assessment Framework — Awaiting Computation</h3>
    <p className="text-[#4A5568] font-medium text-base max-w-lg leading-relaxed mb-10">
      Please execute the scoring engine to visualize the digital ID maturity index.
    </p>
    {onTrigger && (
      <button
        onClick={onTrigger}
        disabled={isScoring}
        className="group relative inline-flex items-center gap-3 bg-[#003DA5] hover:bg-[#002B7A] text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl hover:shadow-2xl disabled:opacity-50"
      >
        {isScoring ? <Activity className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5 fill-current" />}
        {isScoring ? 'Processing...' : 'Execute Scoring Engine'}
      </button>
    )}
  </div>
);