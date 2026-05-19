"use client";
// File: src/components/dashboard/views/QuestionAggregationView.tsx

import React, { useState, useMemo, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import type { RawAssessmentResponse, RawAssessmentSession } from '@/lib/assessmentAggregation';
import { frameworkQuestions, type FrameworkQuestion } from '@/data/frameworkQuestions';
import { Search, ChevronDown, ChevronUp, MessageSquare, Users2, Layers, HelpCircle } from 'lucide-react';

interface Props {
  responses: RawAssessmentResponse[];
  sessions: RawAssessmentSession[];
  activeMode?: 'live' | 'test';
}

interface ChartDataItem {
  name: string;
  value: number;
  color: string;
  label: string;
}

type AggregatedQuestion = FrameworkQuestion & {
  counts: number[];
  dontKnowCount: number;
  validCount: number;
  meanScore: string;
  chartData: ChartDataItem[];
};

const MATURITY_LABELS = ['Basic', 'Opportunistic', 'Systematic', 'Differentiating', 'Transformational'];
const SCORE_COLORS = ['#C53030', '#C05621', '#B7791F', '#276749', '#1A365D'];

const PILLAR_COLORS: Record<string, { bg: string, text: string, border: string, dot: string }> = {
  'P1': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-400' },
  'P2': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-400' },
  'P3': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', dot: 'bg-purple-400' },
  'P4': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-400' },
  'P5': { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', dot: 'bg-rose-400' },
  'P6': { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200', dot: 'bg-cyan-400' },
};

export default function QuestionAggregationView({ responses, sessions }: Props) {
  // ANTI-CRASH: Hydration delay to guarantee no Recharts -1 / NaN bug during SSR
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const [perspective, setPerspective] = useState<'stakeholder' | 'expert'>('stakeholder');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterPillar, setFilterPillar] = useState('all');
  const [filterOrgType, setFilterOrgType] = useState('all');
  const [searchText, setSearchText] = useState('');

  const sessionMap = useMemo(() => new Map(sessions.map(s => [s.id, s])), [sessions]);

  // --- AIRTIGHT MATH: Calculate respondents ONLY from actual submitted data ---
  const globalStats = useMemo(() => {
    const activeSessionIds = Array.from(new Set(responses.map(r => r.assessment_id)));

    let expertCount = 0;
    let stakeholderCount = 0;

    activeSessionIds.forEach(id => {
      const s = sessionMap.get(id);
      if (s?.survey_type === 'expert') expertCount++;
      if (s?.survey_type === 'stakeholder') stakeholderCount++;
    });

    const pillarCount = new Set(frameworkQuestions.map(q => q.pillar_code)).size;
    const dynamicQuestionCount = frameworkQuestions.filter(q => q.survey_type === perspective).length;

    return {
      totalRespondents: expertCount + stakeholderCount,
      expertCount,
      stakeholderCount,
      pillarCount,
      dynamicQuestionCount
    };
  }, [responses, sessionMap, perspective]);

  // --- REACTIVE AGGREGATION ENGINE ---
  const aggregatedQuestions = useMemo(() => {
    const validQuestions: AggregatedQuestion[] = [];

    frameworkQuestions
      .filter(q => q.survey_type === perspective)
      .forEach(q => {
        if (filterPillar !== 'all' && q.pillar_code !== filterPillar) return;
        if (searchText && !q.question_text.toLowerCase().includes(searchText.toLowerCase())) return;

        const qResponses = responses.filter(r => {
          if (r.q_code !== q.q_code) return false;
          const s = sessionMap.get(r.assessment_id);
          if (!s) return false;
          if (filterOrgType !== 'all' && s.organization_type !== filterOrgType) return false;
          return true;
        });

        const counts = [0, 0, 0, 0, 0];
        let dontKnowCount = 0;
        let sum = 0;
        let validCount = 0;

        qResponses.forEach(r => {
          if (r.score === 9) dontKnowCount++;
          else if (r.score && r.score >= 1 && r.score <= 5) {
            counts[r.score - 1]++;
            sum += r.score;
            validCount++;
          }
        });

        if (validCount + dontKnowCount > 0) {
          validQuestions.push({
            ...q,
            counts,
            dontKnowCount,
            validCount,
            meanScore: validCount > 0 ? (sum / validCount).toFixed(2) : '0.00',
            chartData: [
              { name: "Don't know", value: dontKnowCount, color: '#94A3B8', label: "Don't Know" },
              ...counts.map((c, i) => ({
                name: q.options[i]?.description || MATURITY_LABELS[i],
                value: c,
                color: SCORE_COLORS[i],
                label: MATURITY_LABELS[i]
              }))
            ]
          });
        }
      });

    return validQuestions.sort((a, b) => a.q_code.localeCompare(b.q_code));
  }, [perspective, responses, sessionMap, filterPillar, filterOrgType, searchText]);

  // Dropdown lists
  const pillars = useMemo(() => {
    const pCodes = Array.from(new Set(frameworkQuestions.map(q => q.pillar_code))).sort();
    return pCodes.map(code => ({
      code,
      name: frameworkQuestions.find(q => q.pillar_code === code)?.pillar_name
    }));
  }, []);

  const orgTypes = useMemo(() => [
    'all',
    ...Array.from(new Set(sessions.map(s => s.organization_type).filter((t): t is string => !!t)))
  ], [sessions]);

  return (
    <div className="space-y-8 font-sans max-w-[1600px] mx-auto">

      {/* 1. Plain English Header Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<Users2 />}
          label="Total Respondents"
          value={String(globalStats.totalRespondents)}
          subtext={`${globalStats.expertCount} Experts • ${globalStats.stakeholderCount} Stakeholders`}
          color="#003DA5"
        />
        <StatCard
          icon={<Layers />}
          label="Assessment Framework"
          value={`${globalStats.pillarCount} Pillars`}
          subtext="Categorized logical groupings"
          color="#0D1117"
        />
        <StatCard
          icon={<HelpCircle />}
          label="Questions Analyzed"
          value={`${globalStats.dynamicQuestionCount} Questions`}
          subtext={`Assigned to ${perspective === 'expert' ? 'Experts' : 'Stakeholders'}`}
          color="#059669"
        />
      </div>

      {/* 2. Clean Interface Control Panel */}
      <div className="bg-white border border-[#DDE1E9] rounded-[2.5rem] p-8 shadow-sm space-y-6">

        {/* Top Row: Perspective Toggle & Semantic Dropdowns */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          <div className="flex p-1.5 bg-[#F1F5F9] rounded-2xl w-fit">
            <PerspectiveBtn active={perspective === 'stakeholder'} onClick={() => { setPerspective('stakeholder'); setExpandedId(null); }} label="Stakeholders" />
            <PerspectiveBtn active={perspective === 'expert'} onClick={() => { setPerspective('expert'); setExpandedId(null); }} label="Experts" />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <FilterItem label="Filter by Pillar" value={filterPillar} options={['all', ...pillars.map(p => p.code)]} onChange={setFilterPillar} names={pillars} />
            <FilterItem label="Filter by Organization" value={filterOrgType} options={orgTypes} onChange={setFilterOrgType} />
          </div>
        </div>

        {/* Bottom Row: Full-width Text Search */}
        <div className="relative group w-full">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search all active questions by keyword (e.g., 'inclusion', 'biometric', 'legal')..."
            className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-12 pr-6 py-4 text-[13px] font-bold text-[#0D1117] outline-none focus:border-[#003DA5] focus:bg-white transition-all shadow-sm"
          />
        </div>

      </div>

      {/* 3. The Evidence Accordion Feed */}
      <div className="space-y-4">
        {aggregatedQuestions.map((q) => {
          const isExpanded = expandedId === q.q_code;
          const pColor = PILLAR_COLORS[q.pillar_code] || PILLAR_COLORS['P1'];

          return (
            <div key={q.q_code} className={`bg-white border transition-all duration-200 overflow-hidden ${isExpanded ? 'border-[#003DA5]/30 shadow-md rounded-[2.5rem]' : 'border-[#DDE1E9] shadow-sm rounded-3xl hover:border-[#003DA5]/30'}`}>

              <div
                onClick={() => setExpandedId(isExpanded ? null : q.q_code)}
                className="px-8 py-7 cursor-pointer flex flex-col lg:flex-row lg:items-center justify-between gap-6 group"
              >
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0] rounded font-mono text-[9px] font-bold tracking-widest uppercase shadow-sm">
                      {q.q_code}
                    </span>
                    <span className={`px-2.5 py-1 rounded text-[9px] font-black uppercase tracking-[0.15em] border shadow-sm ${pColor.bg} ${pColor.text} ${pColor.border}`}>
                      {q.pillar_code}: {q.pillar_name}
                    </span>
                    <span className={`text-[10px] font-black uppercase tracking-[0.15em] flex items-center gap-2 ml-1 ${pColor.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${pColor.dot}`}></span>
                      {q.subpillar_code}: {q.subpillar_name}
                    </span>
                  </div>
                  <h3 className="text-[#0D1117] font-semibold text-[16px] leading-relaxed group-hover:text-[#003DA5] transition-colors pr-8">
                    {q.question_text}
                  </h3>
                </div>

                <div className="flex items-center gap-10 flex-shrink-0">
                  <div className="text-center">
                    <span className="block text-2xl font-black text-[#003DA5] font-display leading-none">{q.meanScore}</span>
                    <span className="block text-[9px] font-bold text-[#94A3B8] uppercase tracking-widest mt-1.5">Mean Score</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-2xl font-black text-[#0D1117] font-display leading-none">{q.validCount}</span>
                    <span className="block text-[9px] font-bold text-[#94A3B8] uppercase tracking-widest mt-1.5">Valid Inputs</span>
                  </div>
                  <div className={`p-2.5 rounded-full transition-colors ${isExpanded ? 'bg-[#E8EEFA] text-[#003DA5]' : 'bg-[#F8FAFC] text-[#94A3B8]'}`}>
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Diagnostic Detail Expanded */}
              {isExpanded && (
                <div className="px-8 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-[#F1F5F9]">

                  {/* Detailed Breakdown */}
                  <div className="lg:col-span-5 space-y-6">
                    <h4 className="text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.25em] mb-4 flex items-center gap-2">
                      <MessageSquare className="w-3.5 h-3.5" /> Detailed Response Data
                    </h4>
                    <div className="space-y-3.5">
                      {q.chartData.map((item: ChartDataItem, idx: number) => (
                        <div key={idx} className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-xl flex items-start justify-between gap-4 transition-all hover:border-[#003DA5]/20 hover:bg-white">
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0 shadow-sm" style={{ backgroundColor: item.color }}></div>
                            <div>
                              <span className="block text-[9px] font-black uppercase tracking-widest mb-1" style={{ color: item.color }}>{item.label}</span>
                              <p className="text-[11px] font-bold text-[#475569] leading-relaxed pr-4">{item.name}</p>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <span className="block text-sm font-black text-[#0D1117]">{item.value}</span>
                            <span className="block text-[10px] font-medium text-[#94A3B8]">
                              {q.validCount + q.dontKnowCount > 0 ? Math.round((item.value / (q.validCount + q.dontKnowCount)) * 100) : 0}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Horizontal Bar Chart with Bulletproof Recharts Config */}
                  <div className="lg:col-span-7 pt-4">
                    <div className="w-full bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-inner-soft">
                      {isMounted ? (
                        <ResponsiveContainer width="99%" height={400} debounce={50} minWidth={100} minHeight={100}>
                          <BarChart data={q.chartData} layout="vertical" margin={{ left: 10, right: 30, top: 20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#F1F5F9" />
                            <XAxis type="number" stroke="#94A3B8" fontSize={10} domain={[0, 'dataMax + 2']} tickFormatter={(val: number) => Math.round(val).toString()} axisLine={false} tickLine={false} />
                            <YAxis
                              dataKey="label"
                              type="category"
                              width={110}
                              tick={{ fontSize: 9, fill: '#64748B', fontWeight: 800 }}
                              axisLine={false}
                              tickLine={false}
                            />
                            <Tooltip cursor={{ fill: 'rgba(0,61,165,0.02)' }} content={<CustomTooltip />} />
                            <Bar dataKey="value" barSize={32} radius={[0, 6, 6, 0]}>
                              {q.chartData.map((entry: ChartDataItem, index: number) => (
                                <Cell key={index} fill={entry.color} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="w-full h-[400px] flex items-center justify-center bg-[#F8FAFC] rounded-2xl">
                          <span className="text-xs font-bold text-[#8A95A3] uppercase tracking-widest">Rendering Chart...</span>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- Internal Helper Components ---

function StatCard({ icon, label, value, subtext, color }: { icon: React.ReactNode, label: string, value: string, subtext: string, color: string }) {
  return (
    <div className="bg-white border border-[#DDE1E9] rounded-[2.5rem] p-8 flex items-center gap-6 shadow-sm">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl" style={{ backgroundColor: color }}>{icon}</div>
      <div className="flex flex-col">
        <span className="block text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.2em] mb-1">{label}</span>
        <span className="block text-3xl font-black text-[#0D1117] font-display leading-tight">{value}</span>
        <span className="block text-[10px] font-bold text-[#64748B] mt-1.5 bg-[#F1F5F9] px-2.5 py-1 rounded-md w-fit border border-[#E2E8F0]">{subtext}</span>
      </div>
    </div>
  );
}

function PerspectiveBtn({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${active ? 'bg-white text-[#003DA5] shadow-md' : 'text-[#64748B] hover:text-[#0D1117]'}`}
    >
      {label}
    </button>
  );
}

function FilterItem({ label, value, options, onChange, names }: { label: string, value: string, options: string[], onChange: (v: string) => void, names?: { code: string; name?: string }[] }) {
  return (
    <div className="flex flex-col gap-2 min-w-[220px]">
      <span className="text-[9px] font-black text-[#94A3B8] uppercase tracking-[0.25em] ml-1">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-5 py-3.5 text-[10px] font-bold text-[#0D1117] outline-none cursor-pointer uppercase tracking-wider focus:border-[#003DA5] shadow-sm"
      >
        {options.map(opt => {
          const name = names?.find(n => n.code === opt)?.name;
          return (
            <option key={opt} value={opt}>
              {opt === 'all' ? `All ${label.split(' ')[2]}s` : (name ? `${opt}: ${name}` : opt)}
            </option>
          );
        })}
      </select>
    </div>
  );
}

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ value: number; payload: ChartDataItem }> }) => {
  if (active && payload?.[0]) {
    return (
      <div className="bg-[#0D1117] text-white px-5 py-4 rounded-2xl shadow-2xl border border-white/10 max-w-[240px]">
        <p className="text-[9px] font-black uppercase tracking-widest opacity-60 mb-2">{payload[0].payload.name}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-black">{payload[0].value} Responses</span>
          <span className="bg-white/10 px-2 py-0.5 rounded text-[9px] font-bold">{payload[0].payload.label}</span>
        </div>
      </div>
    );
  }
  return null;
};