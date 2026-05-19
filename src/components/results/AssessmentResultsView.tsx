'use client';

import React, { useMemo } from 'react';

import { 
  ShieldAlert, 
  Database, 
  ArrowRightLeft, 
  Activity,
  Award,
  Calendar,
  Layers,
  Globe
} from 'lucide-react';
import type { DigitalIDAssessmentOutput, RubricConfig } from '@/types/scoring';
import rubricConfigJson from '@/config/rubric_config.json';
import RadarChartComponent from './RadarChartComponent';
import SubpillarHeatmap from './SubpillarHeatmap';
import ExportActions from './ExportActions';

const rubric = rubricConfigJson as unknown as RubricConfig;

interface AssessmentResultsViewProps {
  result: DigitalIDAssessmentOutput;
}

export default function AssessmentResultsView({ result }: AssessmentResultsViewProps) {
  const { overall, pillars, subpillars, metadata, assessment_id } = result;

  // Extract missing indicators from validation log
  const missingIndicators = useMemo(() => {
    const missingCodes = metadata.validation_log
      .filter(log => log.action === 'excluded_null' && log.reason === 'indicator data unavailable')
      .map(log => log.item);
    
    const uniqueCodes = Array.from(new Set(missingCodes));
    
    // Find names in rubric config
    const indicatorMap = new Map<string, string>();
    Object.values(rubric.subpillars).forEach(sp => {
      Object.entries(sp.questions).forEach(([qCode, qConfig]) => {
        if (qConfig.component === 'indicator' && qConfig.description) {
          indicatorMap.set(qCode, qConfig.description);
        }
      });
    });

    return uniqueCodes.map(code => ({
      code,
      name: indicatorMap.get(code) || code
    }));
  }, [metadata]);

  // Extract discrepancy gaps
  const discrepancyGaps = useMemo(() => {
    return subpillars
      .filter(sp => sp.expert_mean !== null && sp.survey_mean !== null)
      .map(sp => ({
        ...sp,
        gap: Math.abs((sp.expert_mean || 0) - (sp.survey_mean || 0))
      }))
      .filter(sp => sp.gap >= 1.0)
      .sort((a, b) => b.gap - a.gap);
  }, [subpillars]);

  return (
    <div className="min-h-screen bg-bg-secondary text-text-primary p-6 md:p-12 print:bg-white print:text-black print:p-0">
      {/* Background Decor (Hidden in Print) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none no-print">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-8 print:border-slate-200">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600/20 rounded-lg no-print">
                <Globe className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight">Assessment Results</h1>
                <p className="text-slate-500 text-sm flex items-center gap-2">
                  <Calendar className="w-3 h-3" />
                  Computed: {new Date(metadata.computed_at).toLocaleDateString()}
                  <span className="mx-2">|</span>
                  ID: {assessment_id}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl shadow-2xl print:bg-slate-50 print:border-slate-200 print:shadow-none">
            <div className="text-center">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Overall Score</p>
              <p className="text-5xl font-black font-mono leading-none" style={{ color: overall.color }}>
                {overall.score?.toFixed(2)}
              </p>
            </div>
            <div className="w-px h-12 bg-white/10 print:bg-slate-200" />
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Maturity Level</p>
              <p className="text-xl font-bold flex items-center gap-2" style={{ color: overall.color }}>
                <Award className="w-5 h-5" />
                {overall.maturity}
              </p>
            </div>
          </div>
        </header>

        {/* Top Actions (Hidden in Print) */}
        <div className="flex justify-end no-print">
          <ExportActions result={result} />
        </div>

        {/* Main Visuals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RadarChartComponent pillars={pillars} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Data Quality Flag */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl relative overflow-hidden group transition-all hover:bg-white/[0.07]">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-amber-500/10 rounded-2xl">
                  <Database className="w-6 h-6 text-amber-500" />
                </div>
                {result.subpillars.some(s => s.data_quality_flag.includes('⚠️')) && (
                  <span className="px-2 py-1 bg-amber-500/20 border border-amber-500/30 text-amber-500 text-[10px] font-bold rounded-lg animate-pulse">
                    ⚠️ ALERT
                  </span>
                )}
              </div>
              <h4 className="text-sm font-bold text-slate-300 mb-1">Data Quality Status</h4>
              <p className="text-xs text-slate-500 mb-4">
                Indicator coverage across 30 dimensions.
              </p>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Missing Indicators</span>
                  <span className="font-mono font-bold text-amber-500">{missingIndicators.length}</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-500 transition-all duration-1000" 
                    style={{ width: `${Math.max(0, 100 - (missingIndicators.length / 30) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Discrepancy Flag */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl relative overflow-hidden group transition-all hover:bg-white/[0.07]">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-indigo-500/10 rounded-2xl">
                  <ArrowRightLeft className="w-6 h-6 text-indigo-500" />
                </div>
                {result.subpillars.some(s => s.discrepancy_flag.includes('⚠️')) && (
                  <span className="px-2 py-1 bg-indigo-500/20 border border-indigo-500/30 text-indigo-500 text-[10px] font-bold rounded-lg animate-pulse">
                    ⚠️ ALERT
                  </span>
                )}
              </div>
              <h4 className="text-sm font-bold text-slate-300 mb-1">Stakeholder Discrepancy</h4>
              <p className="text-xs text-slate-500 mb-4">
                Gap between Expert and Stakeholder views.
              </p>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Critical Gaps (≥ 1.0)</span>
                  <span className="font-mono font-bold text-indigo-500">{discrepancyGaps.length}</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 transition-all duration-1000" 
                    style={{ width: `${Math.min(100, (discrepancyGaps.length / 10) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Heatmap Section */}
        <SubpillarHeatmap subpillars={subpillars} />

        {/* Detailed Findings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-12">
          {/* Missing Indicators List */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl print:border-slate-200">
            <h3 className="text-lg font-bold text-slate-200 mb-6 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-500" />
              Indicator Data Quality Audit
            </h3>
            {missingIndicators.length > 0 ? (
              <div className="space-y-3">
                <p className="text-sm text-slate-400 mb-4">
                  The following external indicators were unavailable for this assessment cycle. 
                  This justifies the Data Quality flag in the respective sub-pillars.
                </p>
                <div className="max-h-[300px] overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                  {missingIndicators.map(ind => (
                    <div key={ind.code} className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500/50" />
                      <div>
                        <p className="text-xs font-bold text-slate-300">{ind.name}</p>
                        <p className="text-[10px] font-mono text-slate-500 uppercase">{ind.code}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-12 text-center">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-6 h-6 text-emerald-500" />
                </div>
                <p className="text-slate-400">All indicators successfully retrieved.</p>
              </div>
            )}
          </div>

          {/* Critical Gaps List */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl print:border-slate-200">
            <h3 className="text-lg font-bold text-slate-200 mb-6 flex items-center gap-2">
              <ArrowRightLeft className="w-5 h-5 text-indigo-500" />
              Expert vs. Stakeholder Gaps
            </h3>
            {discrepancyGaps.length > 0 ? (
              <div className="space-y-4">
                <p className="text-sm text-slate-400 mb-4">
                  Sub-pillars where expert evaluations differ significantly from stakeholder survey means.
                </p>
                <div className="space-y-3">
                  {discrepancyGaps.slice(0, 5).map(gap => (
                    <div key={gap.code} className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-slate-300">{gap.name}</span>
                        <span className="text-xs font-mono font-bold text-indigo-400">Δ {gap.gap.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-widest">
                        <div className="flex-1 space-y-1">
                          <div className="flex justify-between text-slate-500">
                            <span>Expert</span>
                            <span>{gap.expert_mean?.toFixed(1)}</span>
                          </div>
                          <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500" style={{ width: `${(gap.expert_mean || 0) * 20}%` }} />
                          </div>
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex justify-between text-slate-500">
                            <span>Stakeholder</span>
                            <span>{gap.survey_mean?.toFixed(1)}</span>
                          </div>
                          <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500" style={{ width: `${(gap.survey_mean || 0) * 20}%` }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-12 text-center">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-6 h-6 text-emerald-500" />
                </div>
                <p className="text-slate-400">High consensus between expert and stakeholders.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Audit Info */}
        <footer className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between gap-6 text-[10px] text-slate-600 uppercase tracking-widest font-bold mb-12 print:border-slate-200">
          <div className="flex gap-6">
            <span className="flex items-center gap-2"><Layers className="w-3 h-3" /> Engine v{metadata.engine_version}</span>
            <span className="flex items-center gap-2"><ShieldAlert className="w-3 h-3" /> Rubric v{metadata.rubric_version}</span>
          </div>
          <div>© 2026 Barbados Digital ID Assessment Framework • Confidentality Notice: Anonymized Analysis</div>
        </footer>
      </div>

      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            background: white !important;
            color: black !important;
          }
          .custom-scrollbar {
            max-height: none !important;
            overflow: visible !important;
          }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
