/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
// File: src/components/dashboard/views/PillarDashboardView.tsx

import React, { useState, useEffect, useMemo } from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  Text
} from 'recharts';
import type { DigitalIDAssessmentOutput } from '@/types/scoring';
import { Target, Activity } from 'lucide-react';

interface Props {
  result: DigitalIDAssessmentOutput | null;
  activeMode?: 'live' | 'test';
}

const PILLAR_NAMES: Record<string, string> = {
  P1: 'Service Delivery & User Value',
  P2: 'Safeguards, Trust & Accountability',
  P3: 'Ecosystem & Innovation',
  P4: 'Technology & DPI Integration',
  P5: 'Legal & Regulatory Foundations',
  P6: 'Institutional Capacity & Governance',
};

const MATURITY_STAGES = ['Basic', 'Opportunistic', 'Systematic', 'Differentiating', 'Transformational'];

const PILLAR_COLORS: Record<string, string> = {
  P1: '#003DA5', P2: '#D69E2E', P3: '#2F855A',
  P4: '#C53030', P5: '#805AD5', P6: '#319795',
};

/**
 * Maturity range definitions from the scoring rubric.
 */
const MATURITY_LEGEND_DATA = [
  { lo: 1.00, hi: 1.80, label: 'Basic', color: '#C00000' },
  { lo: 1.81, hi: 2.60, label: 'Opportunistic', color: '#FFC000' },
  { lo: 2.61, hi: 3.40, label: 'Systematic', color: '#FFFF00' },
  { lo: 3.41, hi: 4.20, label: 'Differentiating', color: '#92D050' },
  { lo: 4.21, hi: 5.00, label: 'Transformational', color: '#00B050' },
];

/**
 * Legend component displaying the maturity level benchmarks.
 */
function MaturityLegend() {
  return (
    <div className="bg-white border border-[#DDE1E9] rounded-2xl px-6 py-4 mb-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3 pr-6 border-r border-[#DDE1E9]">
        <div className="w-8 h-8 bg-[#F8F9FB] rounded-lg flex items-center justify-center border border-[#DDE1E9]">
          <Target className="w-4 h-4 text-[#003DA5]" />
        </div>
        <div>
          <h4 className="text-[10px] font-black text-[#0D1117] uppercase tracking-widest">Maturity Rubric</h4>
          <p className="text-[8px] font-bold text-[#8A95A3] uppercase tracking-wider">Benchmark Ranges</p>
        </div>
      </div>

      <div className="flex flex-1 flex-wrap items-center justify-around gap-6">
        {MATURITY_LEGEND_DATA.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full shadow-sm border border-black/5"
              style={{ backgroundColor: item.color }}
            />
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-[#0D1117] uppercase tracking-tight">
                {item.label}
              </span>
              <span className="text-[8px] font-bold text-[#8A95A3] font-mono tracking-tighter">
                {item.lo.toFixed(2)} – {item.hi.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * WORLD-CLASS UI: Quadrant-aware Radar Tick Engine
 */
const WrappedRadarTick = ({ payload, x, y, textAnchor, ...props }: any) => {
  const cx = x + (textAnchor === 'start' ? 12 : textAnchor === 'end' ? -12 : 0);
  const cy = y + (y > 250 ? 15 : y < 50 ? -15 : 0);

  return (
    <Text
      {...props}
      x={cx}
      y={cy}
      width={110}
      textAnchor={textAnchor}
      verticalAnchor="middle"
      style={{ fontSize: '10px', fontWeight: 800, fill: '#4A5568', lineHeight: '1.1' }}
    >
      {payload.value}
    </Text>
  );
};

/**
 * WORLD-CLASS UI: Explicitly rendered Pillar labels for the Y-Axis
 */
const WrappedBarTick = ({ x, y, payload }: any) => (
  <Text
    x={x}
    y={y}
    width={160}
    textAnchor="end"
    verticalAnchor="middle"
    style={{ fontSize: '10px', fontWeight: 900, fill: '#0D1117', textTransform: 'uppercase', letterSpacing: '0.02em', lineHeight: '1.1' }}
  >
    {payload.value}
  </Text>
);

/**
 * WORLD-CLASS UI: Rotated labels to prevent overlap and show all 5 maturity levels
 */
const CustomXTick = ({ x, y, payload }: any) => {
  const label = MATURITY_STAGES[payload.value - 1] || '';
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={18}
        textAnchor="end"
        fill="#8A95A3"
        fontSize={9}
        fontWeight={800}
        transform="rotate(-45)"
        style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}
      >
        {label}
      </text>
    </g>
  );
};

export default function PillarDashboardView({ result }: Props) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const { radarData, barData } = useMemo(() => {
    if (!result || !result.pillars) return { radarData: [], barData: [] };
    return {
      radarData: result.pillars.map((p) => ({ subject: PILLAR_NAMES[p.code] || p.code, score: Number(p.score?.toFixed(2)) || 0 })),
      barData: result.pillars.map((p) => ({
        fullName: PILLAR_NAMES[p.code] || p.code,
        score: Number(p.score?.toFixed(2)) || 0,
        fillColor: PILLAR_COLORS[p.code] || '#A0AEC0'
      })).sort((a, b) => b.score - a.score)
    };
  }, [result]);

  if (!result) return <EmptyState />;

  return (
    <div className="font-sans max-w-[1600px] mx-auto pb-8">
      {/* 0. Maturity Legend Bar */}
      <MaturityLegend />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* 1. Overall Framework Maturity (Radar) */}
        <div className="bg-white border border-[#DDE1E9] rounded-[2rem] p-6 shadow-sm flex flex-col h-[620px]">
          <div className="mb-4">
            <h3 className="text-2xl font-black text-[#0D1117] font-display mb-1 uppercase tracking-tight">Digital ID Maturity Profile</h3>
            <p className="text-[10px] font-bold text-[#8A95A3] uppercase tracking-[0.2em] flex items-center gap-2">
              <Activity className="w-3.5 h-3.5" /> Visualizing current maturity and progress across all digital ID assessment areas
            </p>
          </div>

          <div className="flex-1 relative">
            {isMounted ? (
              <ResponsiveContainer width="100%" height="100%" minHeight={100} minWidth={100}>
                <RadarChart cx="50%" cy="50%" outerRadius="85%" data={radarData} margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
                  <PolarGrid stroke="#E2E8F0" strokeDasharray="3 3" />
                  <PolarAngleAxis dataKey="subject" tick={<WrappedRadarTick />} />
                  <PolarRadiusAxis domain={[0, 5]} tick={{ fill: '#8A95A3', fontSize: 9, fontWeight: 700 }} tickCount={6} axisLine={false} />
                  <Tooltip content={<RadarTooltip />} />
                  <Radar dataKey="score" stroke="#003DA5" strokeWidth={3} fill="#003DA5" fillOpacity={0.12} activeDot={{ r: 6, fill: '#003DA5', stroke: '#fff', strokeWidth: 2 }} />
                </RadarChart>
              </ResponsiveContainer>
            ) : <SkeletonLoader />}
          </div>
        </div>

        {/* 2. Pillar Performance Comparison (Bar) */}
        <div className="bg-white border border-[#DDE1E9] rounded-[2rem] p-6 shadow-sm flex flex-col h-[620px]">
          <div className="mb-4">
            <h3 className="text-2xl font-black text-[#0D1117] font-display mb-1 uppercase tracking-tight">Pillar Performance Comparison</h3>
            <p className="text-[10px] font-bold text-[#8A95A3] uppercase tracking-[0.2em] flex items-center gap-2">
              <Target className="w-3.5 h-3.5" />Pillar score comparison highlighting strongest and weakest areas
            </p>
          </div>

          <div className="flex-1 relative">
            {isMounted ? (
              <ResponsiveContainer width="100%" height="100%" minHeight={100} minWidth={100}>
                <BarChart data={barData} layout="vertical" margin={{ left: 10, right: 40, top: 10, bottom: 100 }}>
                  <XAxis
                    type="number"
                    domain={[0, 5]}
                    ticks={[1, 2, 3, 4, 5]}
                    interval={0}
                    tick={<CustomXTick />}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    dataKey="fullName"
                    type="category"
                    width={180}
                    tick={<WrappedBarTick />}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip cursor={{ fill: '#F8F9FB' }} content={<BarTooltip />} />
                  <Bar dataKey="score" radius={[0, 8, 8, 0]} barSize={32}>
                    {barData.map((entry, index) => <Cell key={index} fill={entry.fillColor} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : <SkeletonLoader />}
          </div>
        </div>
      </div>
    </div>
  );
}

const RadarTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.[0]) return null;
  return (
    <div className="bg-white border border-[#DDE1E9] p-4 rounded-2xl shadow-xl">
      <p className="text-[10px] font-black text-[#8A95A3] uppercase tracking-widest mb-1">{payload[0].payload.subject}</p>
      <p className="text-lg font-black text-[#003DA5] font-display">{Number(payload[0].value).toFixed(2)}</p>
    </div>
  );
};

const BarTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.[0]) return null;
  const val = Number(payload[0].value);
  return (
    <div className="bg-white border border-[#DDE1E9] p-4 rounded-2xl shadow-xl">
      <p className="text-[10px] font-black text-[#8A95A3] uppercase tracking-widest mb-1">{payload[0].payload.fullName}</p>
      <div className="flex items-center gap-3">
        <p className="text-lg font-black text-[#0D1117] font-display">{val.toFixed(2)}</p>
        <span className="px-2 py-0.5 bg-[#F1F5F9] rounded text-[9px] font-bold text-[#4A5568] uppercase">
          {MATURITY_STAGES[Math.floor(val) - 1] || 'Basic'}
        </span>
      </div>
    </div>
  );
};

const SkeletonLoader = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-[#F8FAFC] rounded-2xl border border-dashed border-[#DDE1E9]">
    <span className="text-[10px] font-black text-[#8A95A3] uppercase tracking-[0.3em] animate-pulse">Processing Index...</span>
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-32 text-center bg-white border border-[#DDE1E9] rounded-[3rem] shadow-sm">
    <Target className="w-12 h-12 text-[#DDE1E9] mb-6" />
    <h3 className="text-xl font-black text-[#0D1117] uppercase tracking-tight">Index Not Initialized</h3>
    <p className="text-[#4A5568] text-sm mt-2 font-medium">Please execute the assessment engine to see current performance levels.</p>
  </div>
);