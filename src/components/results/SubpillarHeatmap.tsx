'use client';

import React from 'react';
import type { SubpillarOutput } from '@/types/scoring';

interface SubpillarHeatmapProps {
  subpillars: SubpillarOutput[];
}

export default function SubpillarHeatmap({ subpillars }: SubpillarHeatmapProps) {
  // Group subpillars by pillar_code
  const pillars = Array.from(new Set(subpillars.map(s => s.pillar_code))).sort();

  return (
    <div className="w-full bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl p-6 relative overflow-hidden group">
      {/* Glow Effect */}
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-emerald-500/10 blur-[80px] group-hover:bg-emerald-500/20 transition-all duration-700" />
      
      <div className="relative z-10">
        <h3 className="text-lg font-bold text-slate-200 mb-6 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          Sub-pillar Maturity Heatmap
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map(pCode => (
            <div key={pCode} className="space-y-3">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">
                Pillar {pCode}
              </h4>
              <div className="space-y-2">
                {subpillars
                  .filter(s => s.pillar_code === pCode)
                  .map(sub => (
                    <div 
                      key={sub.code}
                      className="group/sub relative flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] transition-all"
                    >
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-300 group-hover/sub:text-white transition-colors">
                          {sub.name}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {sub.code}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-mono font-bold" style={{ color: sub.color }}>
                          {sub.score?.toFixed(1) ?? 'N/A'}
                        </span>
                        <div 
                          className="w-3 h-3 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                          style={{ 
                            backgroundColor: sub.color,
                            boxShadow: `0 0 10px ${sub.color}40`
                          }}
                          title={sub.maturity}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap gap-4 justify-center">
          {[
            { label: 'Basic', color: '#C00000' },
            { label: 'Opportunistic', color: '#FFC000' },
            { label: 'Systematic', color: '#FFFF00' },
            { label: 'Differentiating', color: '#92D050' },
            { label: 'Transformational', color: '#00B050' },
          ].map(b => (
            <div key={b.label} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: b.color }} />
              <span className="text-[10px] font-medium text-slate-500">{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
