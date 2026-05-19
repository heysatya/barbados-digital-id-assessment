'use client';

import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import type { PillarOutput } from '@/types/scoring';

interface RadarChartComponentProps {
  pillars: PillarOutput[];
}

export default function RadarChartComponent({ pillars }: RadarChartComponentProps) {
  // Map pillars for Recharts
  const data = pillars.map((p) => ({
    subject: p.name,
    score: p.score ?? 1.0, // Scale is 1-5, so 1.0 is the baseline
    fullMark: 5,
  }));

  return (
    <div className="w-full h-[400px] bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl p-6 relative overflow-hidden group">
      {/* Glow Effect */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/10 blur-[80px] group-hover:bg-blue-500/20 transition-all duration-700" />

      <div className="relative z-10 flex flex-col h-full">
        <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
          Pillar Maturity Radar
        </h3>

        <div className="flex-1 min-h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid stroke="#334155" strokeDasharray="3 3" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 500 }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[1, 5]}
                tick={{ fill: '#475569', fontSize: 10 }}
                axisLine={false}
              />
              <Radar
                name="Maturity"
                dataKey="score"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
                dot={{ r: 4, fill: '#3b82f6', fillOpacity: 1 }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <p className="text-[10px] text-slate-500 mt-2 italic">
          * Scaled 1.0 (Basic) to 5.0 (Transformational)
        </p>
      </div>
    </div>
  );
}
