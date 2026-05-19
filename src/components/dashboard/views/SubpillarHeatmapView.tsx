"use client";
// File: src/components/dashboard/views/SubpillarHeatmapView.tsx

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine, CartesianGrid, LabelList } from 'recharts';
import type { DigitalIDAssessmentOutput } from '@/types/scoring';
import { LayoutGrid, AlertTriangle, CheckCircle2, ShieldAlert, BarChart2 } from 'lucide-react';

interface Props {
  result: DigitalIDAssessmentOutput | null;
}

// Strict consulting-grade color palette for distinct Pillar grouping
const PILLAR_COLORS: Record<string, string> = {
  P1: '#003DA5', // Blue
  P2: '#D69E2E', // Gold
  P3: '#2F855A', // Green
  P4: '#C53030', // Red
  P5: '#805AD5', // Purple
  P6: '#319795', // Teal
};

const PILLAR_NAMES: Record<string, string> = {
  P1: 'Service Delivery & User Value',
  P2: 'Safeguards, Trust & Accountability',
  P3: 'Ecosystem & Innovation',
  P4: 'Technology & DPI Integration',
  P5: 'Legal & Regulatory Foundations',
  P6: 'Institutional Capacity & Governance',
};

const MATURITY_LEVELS = [
  { value: 1, label: 'Basic' },
  { value: 2, label: 'Opportunistic' },
  { value: 3, label: 'Systematic' },
  { value: 4, label: 'Differentiating' },
  { value: 5, label: 'Transformational' }
];

// Custom Y-Axis tick to draw the vertical sub-pillar names
const VerticalTick = ({ x, y, payload }: { x?: number; y?: number; payload?: { value: string } }) => {
  const val = payload?.value;
  if (!val || val.startsWith('spacer')) return null;

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={14} textAnchor="end" fill="#4A5568" fontSize={10} fontWeight={800} transform="rotate(-90)">
        {val.length > 35 ? val.substring(0, 35) + '...' : val}
      </text>
    </g>
  );
};

export default function SubpillarHeatmapView({ result }: Props) {
  const [selectedSp, setSelectedSp] = useState<string | null>(null);

  // Strict Hydration Delay to permanently kill Next.js SSR -1 height crashes
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // DATA ENGINE: Inject invisible "Spacers" to force physical gaps between pillars
  const { chartData, pillarGroups } = useMemo(() => {
    if (!result) return { chartData: [], pillarGroups: [] };

    const data = [] as Array<Partial<DigitalIDAssessmentOutput['subpillars'][0]> & {
      isSpacer?: boolean; pillarCode?: string; pillarName?: string; fillColor?: string; score?: number | null; code: string; name?: string;
    }>;
    const groups: Array<{ code: string; name?: string; count: number; color?: string; isSpacer: boolean }> = [];
    let currentPillar = '';

    const sortedSps = result.subpillars
      .filter(sp => sp.score !== null && !isNaN(sp.score))
      .sort((a, b) => a.code.localeCompare(b.code));

    sortedSps.forEach((sp) => {
      const pCode = sp.code.split('.')[0];

      if (pCode !== currentPillar) {
        // If transitioning to a new pillar, inject a spacer to create the visual gap
        if (currentPillar !== '') {
          data.push({ code: `spacer-${currentPillar}-${pCode}`, name: '', score: 0, isSpacer: true });
          groups.push({ isSpacer: true, count: 1, code: `spacer-${currentPillar}-${pCode}` });
        }
        currentPillar = pCode;
        groups.push({ code: pCode, name: PILLAR_NAMES[pCode], count: 0, color: PILLAR_COLORS[pCode], isSpacer: false });
      }

      data.push({
        ...sp,
        pillarCode: pCode,
        pillarName: PILLAR_NAMES[pCode] || 'Unknown Pillar',
        fillColor: PILLAR_COLORS[pCode] || '#A0AEC0',
        isSpacer: false
      });
      groups[groups.length - 1].count++;
    });

    return { chartData: data, pillarGroups: groups };
  }, [result]);

  if (!result || chartData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center bg-white border border-[#DDE1E9] rounded-[3rem] shadow-sm font-sans">
        <div className="w-20 h-20 bg-[#F8F9FB] rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-[#DDE1E9]">
          <LayoutGrid className="w-8 h-8 text-[#4A5568]" />
        </div>
        <h3 className="text-2xl font-black text-[#0D1117] font-display mb-2">Maturity Profile Missing</h3>
        <p className="text-[#4A5568] font-medium text-sm">No valid scoring data found. Please trigger the assessment engine.</p>
      </div>
    );
  }

  const selectedDetail = selectedSp ? chartData.find(sp => sp.code === selectedSp && !sp.isSpacer) : null;

  return (
    <div className="space-y-8 font-sans max-w-[1600px] mx-auto pb-12">

      <div className="bg-white border border-[#DDE1E9] rounded-3xl p-8 shadow-sm">

        {/* Header & Print-Ready Full Legend */}
        <div className="flex flex-col xl:flex-row xl:items-start justify-between mb-10 gap-6">
          <div>
            <h3 className="text-xl font-black text-[#0D1117] font-display mb-1 uppercase tracking-tight">Sub-Pillar Maturity Profile</h3>
            <p className="text-[10px] text-[#8A95A3] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
              <BarChart2 className="w-3.5 h-3.5" />
              Visualizing the maturity skyline across all digital ID assessment domains (pillar/sub-pillars).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 bg-[#F8F9FB] px-5 py-4 rounded-2xl border border-[#DDE1E9] max-w-4xl">
            {Object.keys(PILLAR_COLORS).map(p => (
              <div key={p} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: PILLAR_COLORS[p] }}></div>
                <span className="text-[9px] font-black uppercase tracking-widest text-[#4A5568]">
                  <span className="text-[#0D1117] mr-1">{p}</span>
                  {PILLAR_NAMES[p]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* The Print-Ready Skyline Chart */}
        <div className="w-full relative">
          <div className="h-[550px]">
            {isMounted ? (
              <ResponsiveContainer width="100%" height="100%" minHeight={100} minWidth={100}>
                <BarChart
                  data={chartData}
                  margin={{ top: 30, right: 24, left: 24, bottom: 0 }}
                  onClick={(state: unknown) => {
                    const s = state as { activePayload?: Array<{ payload: { isSpacer?: boolean; code: string } }> };
                    if (s && s.activePayload && s.activePayload[0] && !s.activePayload[0].payload.isSpacer) {
                      setSelectedSp(s.activePayload[0].payload.code);
                    }
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />

                  <XAxis
                    dataKey="name"
                    interval={0}
                    tick={<VerticalTick />}
                    axisLine={{ stroke: '#DDE1E9' }}
                    tickLine={false}
                    height={200} // Locked height to fit the long vertical names without clipping
                  />

                  <YAxis
                    domain={[0, 5]}
                    ticks={[1, 2, 3, 4, 5]}
                    tickFormatter={(val: number) => MATURITY_LEVELS.find((m) => m.value === val)?.label || ''}
                    tick={{ fill: '#8A95A3', fontSize: 10, fontWeight: 700 }}
                    axisLine={false}
                    tickLine={false}
                    width={110}
                  />

                  {/* Visual Reference Anchors */}
                  {[1, 2, 3, 4, 5].map(level => (
                    <ReferenceLine key={level} y={level} stroke="#DDE1E9" strokeOpacity={0.5} />
                  ))}

                  <Tooltip cursor={{ fill: 'rgba(248, 249, 251, 0.5)' }} content={<CustomTooltip />} />

                  <Bar dataKey="score" radius={[4, 4, 0, 0]} maxBarSize={40} className="cursor-pointer transition-all hover:opacity-90">
                    {/* TS Error Bypass: 'any' allows us to safely check if the value is a number before formatting */}
                    <LabelList
                      dataKey="score"
                      position="top"
                      fill="#0D1117"
                      fontSize={11}
                      fontWeight={900}
                      formatter={(val: unknown) => (typeof val === 'number' && val > 0 ? val.toFixed(1) : '')}
                    />
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.isSpacer ? 'transparent' : entry.fillColor}
                        stroke={selectedSp === entry.code && !entry.isSpacer ? '#0D1117' : 'transparent'}
                        strokeWidth={selectedSp === entry.code ? 2 : 0}
                        style={{ pointerEvents: entry.isSpacer ? 'none' : 'auto' }}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#F8FAFC] border border-[#DDE1E9] rounded-2xl">
                <span className="text-xs font-bold text-[#8A95A3] uppercase tracking-widest">Rendering Maturity Profile...</span>
              </div>
            )}
          </div>

          {/* Mathematically Perfect Brackets 
            pl-[134px] perfectly matches Recharts margins (110px Y-Axis + 24px Left Margin)
            pr-[24px] perfectly matches Recharts right margin
          */}
          <div className="flex w-full pl-[134px] pr-[24px] pt-1">
            {pillarGroups.map((group) => {
              // Spacers receive exact flex allocation to keep the grid aligned
              if (group.isSpacer) return <div key={group.code} style={{ flex: group.count }} />;

              return (
                <div key={group.code} style={{ flex: group.count }} className="px-1">
                  <div className="pt-2.5 border-t-[3px] flex flex-col items-center text-center" style={{ borderTopColor: group.color }}>
                    <span className="text-[10px] font-black uppercase tracking-widest leading-[1.3]" style={{ color: group.color }}>
                      {group.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Drill-down Detail Panel */}
      <AnimatePresence mode="wait">
        {selectedDetail && (
          <motion.div
            key={selectedDetail.code}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white border border-[#DDE1E9] rounded-3xl p-6 md:p-8 shadow-sm mt-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 pb-6 border-b border-[#F1F5F9] gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-black text-white px-2.5 py-1 rounded-md uppercase tracking-widest shadow-sm" style={{ backgroundColor: selectedDetail.fillColor }}>
                    {selectedDetail.code}
                  </span>
                  <span className="text-[10px] font-bold text-[#4A5568] uppercase tracking-[0.1em]">
                    {selectedDetail.pillarName}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-black text-[#0D1117] font-display leading-tight">{selectedDetail.name}</h3>
              </div>
              <div className="flex items-center gap-4 bg-[#F8F9FB] p-3 rounded-2xl border border-[#DDE1E9]">
                <div className="text-right hidden sm:block pr-2">
                  <p className="text-[9px] font-black text-[#8A95A3] uppercase tracking-widest mb-0.5">Calculated Score</p>
                  <p className="text-sm font-bold text-[#0D1117]">{selectedDetail.maturity}</p>
                </div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black text-white shadow-md" style={{ backgroundColor: selectedDetail.fillColor }}>
                  {selectedDetail.score?.toFixed(1) || '—'}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="rounded-2xl p-4 text-center border bg-[#F8FAFC] border-[#DDE1E9]">
                <p className="text-[9px] text-[#4A5568] uppercase tracking-widest font-black mb-1">Expert Average</p>
                <p className="text-xl font-black text-[#0D1117]">{selectedDetail.expert_mean?.toFixed(2) || '—'}</p>
              </div>
              <div className="rounded-2xl p-4 text-center border bg-[#F8FAFC] border-[#DDE1E9]">
                <p className="text-[9px] text-[#4A5568] uppercase tracking-widest font-black mb-1">Stakeholder Avg</p>
                <p className="text-xl font-black text-[#0D1117]">{selectedDetail.survey_mean?.toFixed(2) || '—'}</p>
              </div>
              <div className="rounded-2xl p-4 text-center border bg-[#F8FAFC] border-[#DDE1E9]">
                <p className="text-[9px] text-[#4A5568] uppercase tracking-widest font-black mb-1">Coverage Index</p>
                <p className="text-xl font-black text-[#0D1117]">
                  {Math.round(((selectedDetail.valid_count || 0) / (selectedDetail.scoreable_count || 1)) * 100)}%
                </p>
              </div>
              <div className={`rounded-2xl p-4 text-center border flex flex-col items-center justify-center ${selectedDetail.data_quality_flag === '⚠️ Partial' ? 'bg-orange-50 border-orange-200 text-orange-700' : 'bg-green-50 border-green-200 text-green-700'}`}>
                <p className="text-[9px] uppercase tracking-widest font-black mb-1">Data Quality</p>
                <div className="flex items-center gap-1.5 font-black text-sm">
                  {selectedDetail.data_quality_flag === '⚠️ Partial' ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                  {selectedDetail.data_quality_flag === '⚠️ Partial' ? 'LOW COVERAGE' : 'VERIFIED'}
                </div>
              </div>
            </div>

            {selectedDetail.discrepancy_flag === '⚠️ Review' && (
              <div className="flex items-start gap-4 px-6 py-5 bg-red-50 border border-red-200 rounded-2xl text-sm text-red-800 shadow-sm">
                <ShieldAlert className="w-6 h-6 mt-0.5 text-red-600 flex-shrink-0" />
                <div className="font-medium leading-relaxed">
                  <strong className="block uppercase tracking-widest text-[10px] mb-1 font-black text-red-900">Critical Variance Detected</strong>
                  The Expert assessment ({selectedDetail.expert_mean?.toFixed(2)}) and Stakeholder perception ({selectedDetail.survey_mean?.toFixed(2)})
                  diverge significantly. Manual verification of qualitative evidence is required to reconcile this variance.
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Keep the Tooltip active but ignore the invisible spacers
const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: { isSpacer?: boolean; fillColor?: string; code?: string; name?: string; maturity?: string; score: number } }> }) => {
  if (active && payload && payload.length > 0) {
    const data = payload[0].payload;
    if (data.isSpacer) return null; // Don't show tooltip on the physical gaps

    return (
      <div className="bg-white border border-[#DDE1E9] rounded-2xl shadow-xl p-4 min-w-[240px] max-w-[300px]">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: data.fillColor }}></div>
          <span className="text-[9px] font-black text-[#8A95A3] uppercase tracking-widest">{data.code}</span>
        </div>
        <p className="font-bold text-[#0D1117] text-sm leading-tight mb-3">{data.name}</p>

        <div className="flex justify-between items-end pt-3 border-t border-[#F1F5F9]">
          <div>
            <p className="text-[9px] font-black text-[#8A95A3] uppercase tracking-widest">Maturity</p>
            <p className="text-xs font-bold text-[#4A5568]">{data.maturity}</p>
          </div>
          <p className="text-xl font-black" style={{ color: data.fillColor }}>{data.score.toFixed(2)}</p>
        </div>
      </div>
    );
  }
  return null;
};