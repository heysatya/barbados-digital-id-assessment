"use client";
// File: src/components/dashboard/views/DataQualityView.tsx

import React, { useMemo, useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';
import type { DigitalIDAssessmentOutput } from '@/types/scoring';
import type { RawAssessmentSession, RawAssessmentResponse } from '@/lib/assessmentAggregation';
import { FileText, Layers, CheckCircle2, AlertTriangle, BarChart2, Search, Users } from 'lucide-react';

interface Props {
  result: DigitalIDAssessmentOutput | null;
  sessionCount: number;
  sessions?: RawAssessmentSession[];
  responses?: RawAssessmentResponse[];
}

// ANTI-CRASH UPGRADE: Extracted styling logic to prevent JSX template literal parsing errors
const getBadgeStyle = (action: string): string => {
  if (action === 'excluded_zero_weight') return 'bg-[#F8F9FB] text-[#8A95A3] border-[#DDE1E9]';
  if (action === 'excluded_sentinel') return 'bg-amber-50 text-amber-700 border-amber-200';
  if (action === 'excluded_null') return 'bg-red-50 text-red-700 border-red-200';
  return 'bg-[#E8EEFA] text-[#003DA5] border-[#003DA5]/20';
};

export default function DataQualityView({
  result,
  sessionCount,
  sessions = [],
  responses = []
}: Props) {

  // 1. Strict Hydration Guard to permanently kill Next.js SSR -1 errors
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // 2. Data Engine: Unique Participant Calculation
  const actualParticipantCount = useMemo(() => {
    const uniqueIds = new Set(responses.map(r => r.assessment_id));
    if (uniqueIds.size > 0) return uniqueIds.size;

    const uniqueSessions = new Set(sessions.map(s => s.id)).size;
    if (uniqueSessions > 0) return uniqueSessions;

    return sessionCount > 100 ? 0 : sessionCount;
  }, [responses, sessions, sessionCount]);

  // 3. Strict Memoization to resolve React exhaustive-deps warnings
  const sps = useMemo(() => result?.subpillars || [], [result]);

  // 4. Data Engine: Density Calculation
  const densityData = useMemo(() => {
    if (!responses.length || !sessions.length) return [];

    const densityMap = new Map<string, { expert: number, stakeholder: number }>();
    sps.forEach(sp => densityMap.set(sp.code, { expert: 0, stakeholder: 0 }));

    const sessionTypeMap = new Map(sessions.map(s => [s.id, s.survey_type]));
    const uniqueResponders = new Set<string>();

    responses.forEach(r => {
      const key = `${r.subpillar_code}-${r.assessment_id}`;
      if (!uniqueResponders.has(key)) {
        uniqueResponders.add(key);
        const type = sessionTypeMap.get(r.assessment_id);
        const current = densityMap.get(r.subpillar_code) || { expert: 0, stakeholder: 0 };
        if (type === 'expert') current.expert++;
        if (type === 'stakeholder') current.stakeholder++;
        densityMap.set(r.subpillar_code, current);
      }
    });

    return Array.from(densityMap.entries()).map(([code, counts]) => ({
      code,
      Expert: counts.expert,
      Stakeholder: counts.stakeholder,
    })).sort((a, b) => a.code.localeCompare(b.code));
  }, [responses, sessions, sps]);

  // 5. Safe Early Return: Placed strictly after all hooks to satisfy React standards
  if (!result) return <Empty />;

  // 6. Metric Calculations
  const good = sps.filter((s) => !s.data_quality_flag || s.data_quality_flag === '').length;
  const partial = sps.filter((s) => s.data_quality_flag === '⚠️ Partial').length;
  const na = sps.filter((s) => s.data_quality_flag === 'N/A').length;
  const avgCoverage = sps.length > 0
    ? sps.reduce((acc, s) => acc + (s.coverage_pct ?? 0), 0) / sps.length
    : 0;

  const coverageData = sps.map((sp) => ({
    code: sp.code,
    coverage: sp.coverage_pct ?? 0,
    flag: sp.data_quality_flag,
  }));

  return (
    <div className="space-y-10 font-sans">

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
        <KPI label="Total Surveys Completed" value={String(actualParticipantCount)} color="#003DA5" icon={<FileText className="w-8 h-8" />} />
        <KPI label="Sub-pillars Assessed" value={`${sps.length - na}/${sps.length}`} color="#0D1117" icon={<Layers className="w-8 h-8" />} />
        <KPI label="Topics Fully Answered" value={String(good)} color="#2F855A" icon={<CheckCircle2 className="w-8 h-8" />} />
        <KPI label="Topics Partially Answered" value={String(partial)} color="#D69E2E" icon={<AlertTriangle className="w-8 h-8" />} />
        <KPI label="Overall Completion Rate" value={`${Math.round(avgCoverage)}%`} color="#003DA5" icon={<BarChart2 className="w-8 h-8" />} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        {/* Coverage Spectrum Chart */}
        <div className="bg-[#FFFFFF] border border-[#DDE1E9] rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black text-[#0D1117] font-display">Coverage Spectrum</h3>
              <p className="text-[10px] text-[#8A95A3] font-black uppercase tracking-[0.2em] mt-1">Completeness per Topic</p>
            </div>
            <BarChart2 className="w-5 h-5 text-[#003DA5]" />
          </div>
          <div className="w-full h-[320px]">
            {isMounted ? (
              <ResponsiveContainer width="100%" height="100%" minHeight={100} minWidth={100}>
                <BarChart data={coverageData} margin={{ bottom: 20 }}>
                  <XAxis dataKey="code" tick={{ fill: '#8A95A3', fontSize: 9, fontWeight: 800 }} axisLine={false} tickLine={false} angle={-45} textAnchor="end" height={60} />
                  <YAxis domain={[0, 100]} tick={{ fill: '#8A95A3', fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                    contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #DDE1E9', borderRadius: '12px', fontSize: '11px', fontWeight: '800' }}
                    formatter={(val: unknown) => [`${typeof val === 'number' ? val.toFixed(0) : val}%`, 'COMPLETENESS']}
                  />
                  <Bar dataKey="coverage" radius={[6, 6, 0, 0]} barSize={24}>
                    {coverageData.map((d, i) => (
                      <Cell key={`cov-${i}`} fill={d.coverage >= 100 ? '#2F855A' : d.coverage >= 67 ? '#003DA5' : '#D69E2E'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#F8FAFC] border border-[#DDE1E9] rounded-2xl">
                <span className="text-xs font-bold text-[#8A95A3] uppercase tracking-widest">Rendering...</span>
              </div>
            )}
          </div>
        </div>

        {/* Respondent Density Chart */}
        <div className="bg-[#FFFFFF] border border-[#DDE1E9] rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black text-[#0D1117] font-display">Respondent Mix</h3>
              <p className="text-[10px] text-[#8A95A3] font-black uppercase tracking-[0.2em] mt-1">Participants per Topic</p>
            </div>
            <Users className="w-5 h-5 text-[#003DA5]" />
          </div>
          <div className="w-full h-[320px]">
            {isMounted && densityData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%" minHeight={100} minWidth={100}>
                <BarChart data={densityData} margin={{ bottom: 20 }}>
                  <XAxis dataKey="code" tick={{ fill: '#8A95A3', fontSize: 9, fontWeight: 800 }} axisLine={false} tickLine={false} angle={-45} textAnchor="end" height={60} />
                  <YAxis tick={{ fill: '#8A95A3', fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip cursor={{ fill: 'rgba(0,0,0,0.02)' }} contentStyle={{ borderRadius: '12px', fontSize: '11px', fontWeight: '800' }} />
                  <Legend wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', paddingTop: '10px' }} />
                  <Bar dataKey="Expert" stackId="a" fill="#003DA5" radius={[0, 0, 0, 0]} barSize={24} />
                  <Bar dataKey="Stakeholder" stackId="a" fill="#71A0F5" radius={[6, 6, 0, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-xs font-bold text-[#8A95A3] uppercase tracking-widest text-center">
                Awaiting detailed response breakdown
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Diagnostic Log */}
      {result.metadata.validation_log.length > 0 && (
        <div className="bg-[#FFFFFF] border border-[#DDE1E9] rounded-3xl overflow-hidden shadow-sm">
          <div className="px-8 py-6 border-b border-[#DDE1E9] flex items-center justify-between bg-[#F8F9FB]">
            <div>
              <h3 className="text-lg font-black text-[#0D1117] uppercase tracking-[0.2em] font-display">Data Quality Diagnostic Log</h3>
              <p className="text-[10px] text-[#8A95A3] font-black uppercase tracking-widest mt-1">Log of missing or invalid answers safely skipped.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black text-[#003DA5] bg-[#E8EEFA] px-4 py-2 rounded-xl uppercase tracking-[0.2em] border border-[#003DA5]/10">
                {result.metadata.validation_log.length} DIAGNOSTIC ENTRIES
              </span>
            </div>
          </div>
          <div className="max-h-[500px] overflow-y-auto divide-y divide-[#DDE1E9]">
            {result.metadata.validation_log.slice(0, 100).map((log, i) => (
              <div key={`log-${i}`} className="px-8 py-4 flex items-center gap-8 hover:bg-[#F8F9FB] transition-colors group">
                <span className="font-bold text-[#4A5568] w-36 flex-shrink-0 text-xs tracking-wider">{log.item}</span>
                <span className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest flex-shrink-0 border ${getBadgeStyle(log.action)}`}>
                  {log.action.replace(/_/g, ' ')}
                </span>
                <span className="text-[#0D1117] font-medium text-sm truncate">
                  {log.reason}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Helper Components
function KPI({ label, value, color, icon }: { label: string; value: string; color: string; icon: React.ReactNode }) {
  return (
    <div className="bg-[#FFFFFF] border border-[#DDE1E9] rounded-[2rem] p-6 text-center shadow-sm relative overflow-hidden group">
      <div className="absolute top-4 right-4 opacity-5 text-current transition-all duration-300 transform group-hover:scale-110 group-hover:opacity-10" style={{ color }}>
        {icon}
      </div>
      <p className="text-3xl font-black mb-1 font-display" style={{ color }}>{value}</p>
      <p className="text-[9px] text-[#8A95A3] font-bold uppercase tracking-[0.2em]">{label}</p>
    </div>
  );
}

function Empty() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center bg-[#FFFFFF] border border-[#DDE1E9] rounded-[3rem] shadow-sm">
      <div className="w-20 h-20 bg-[#F8F9FB] rounded-2xl flex items-center justify-center text-[#8A95A3] mb-6 border border-[#DDE1E9]">
        <Search className="w-8 h-8" />
      </div>
      <h3 className="text-2xl font-black text-[#0D1117] font-display mb-2">Diagnostic Data Unavailable</h3>
      <p className="text-[#4A5568] text-sm max-w-sm leading-relaxed">The scoring engine must be executed on the main dashboard to generate data quality metrics.</p>
    </div>
  );
}