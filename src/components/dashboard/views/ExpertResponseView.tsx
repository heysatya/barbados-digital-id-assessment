"use client";
// File: src/components/dashboard/views/ExpertResponseView.tsx

import React, { useState, useMemo } from 'react';
import type { RawAssessmentResponse, RawAssessmentSession } from '@/lib/assessmentAggregation';
import { frameworkQuestions, type FrameworkQuestion } from '@/data/frameworkQuestions';
import { UserCheck, ChevronDown, ChevronUp, MessageSquare, Building2 } from 'lucide-react';

interface Props {
  expertResponses: RawAssessmentResponse[];
  sessions: RawAssessmentSession[];
}

const SCORE_LABELS: Record<number, string> = { 1: 'Basic', 2: 'Opportunistic', 3: 'Systematic', 4: 'Differentiating', 5: 'Transformational', 9: "Don't Know" };
const SCORE_COLOR: Record<number, string> = {
  1: '#C53030', 2: '#C05621', 3: '#B7791F', 4: '#276749', 5: '#1A365D', 9: '#8A95A3'
};

const PILLAR_COLORS: Record<string, { bg: string, text: string, border: string, dot: string }> = {
  'P1': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-400' },
  'P2': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-400' },
  'P3': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', dot: 'bg-purple-400' },
  'P4': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-400' },
  'P5': { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', dot: 'bg-rose-400' },
  'P6': { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200', dot: 'bg-cyan-400' },
};

export default function ExpertResponseView({ expertResponses, sessions }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const sessionMap = useMemo(() => new Map(sessions.map((s) => [s.id, s])), [sessions]);

  const groupedData = useMemo(() => {
    // FIXED: Replaced 'any' with the strict FrameworkQuestion interface
    const map = new Map<string, { question: FrameworkQuestion, responses: RawAssessmentResponse[], avgScore: number }>();

    frameworkQuestions.filter(q => q.survey_type === 'expert').forEach(q => {
      map.set(q.q_code, { question: q, responses: [], avgScore: 0 });
    });

    expertResponses.forEach(r => {
      if (map.has(r.q_code)) {
        map.get(r.q_code)!.responses.push(r);
      }
    });

    return Array.from(map.values())
      .filter(group => group.responses.length > 0)
      .map(group => {
        const scorable = group.responses.filter(r => r.score !== null && r.score !== 9);
        const sum = scorable.reduce((acc, r) => acc + (r.score || 0), 0);
        group.avgScore = scorable.length > 0 ? sum / scorable.length : 0;
        return group;
      })
      .sort((a, b) => a.question.q_code.localeCompare(b.question.q_code));
  }, [expertResponses]);

  if (expertResponses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center bg-white border border-[#DDE1E9] rounded-[3rem] shadow-sm">
        <div className="w-24 h-24 bg-[#F8F9FB] rounded-3xl flex items-center justify-center mb-8 shadow-inner">
          <UserCheck className="w-10 h-10 text-[#8A95A3]" />
        </div>
        <h3 className="text-2xl font-black text-[#0D1117] font-display mb-3">Expert Evidence Missing</h3>
        <p className="text-[#4A5568] text-base max-w-sm font-medium leading-relaxed">No expert survey responses detected as of now.</p>
      </div>
    );
  }

  // FIXED: Removed the unused 'responsesWithEvidence' variable to clear the lint warning

  return (
    <div className="space-y-8 font-sans max-w-[1600px] mx-auto">

      {/* Executive Summary Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-8 py-6 bg-white border border-[#DDE1E9] rounded-[2rem] shadow-sm">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 bg-[#E8EEFA] rounded-2xl flex items-center justify-center shadow-sm border border-[#003DA5]/10 flex-shrink-0">
            <MessageSquare className="w-6 h-6 text-[#003DA5]" />
          </div>
          <div>
            <p className="text-[10px] text-[#8A95A3] font-bold uppercase tracking-[0.3em] mb-1">Analysis of Expert Responses</p>
            <p className="text-sm font-medium text-[#0D1117]">
              Synthesizing <span className="text-[#003DA5] font-black">{new Set(expertResponses.map(r => r.assessment_id)).size} expert opinions</span> across <span className="text-[#003DA5] font-black">{groupedData.length} unique framework questions</span>.
            </p>
          </div>
        </div>
      </div>

      {/* The Question-Centric Accordion */}
      <div className="space-y-4">
        {groupedData.map(({ question, responses, avgScore }) => {
          const isExpanded = expandedId === question.q_code;
          const pColor = PILLAR_COLORS[question.pillar_code] || { bg: 'bg-[#F8F9FB]', text: 'text-[#4A5568]', border: 'border-[#DDE1E9]', dot: 'bg-[#8A95A3]' };

          return (
            <div key={question.q_code} className={`bg-white border transition-all duration-200 overflow-hidden ${isExpanded ? 'border-[#003DA5]/30 shadow-md rounded-[2rem]' : 'border-[#DDE1E9] shadow-sm rounded-3xl hover:border-[#003DA5]/30'}`}>

              {/* ACCORDION HEADER (Clickable) */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : question.q_code)}
                className="px-6 lg:px-8 py-6 cursor-pointer flex flex-col lg:flex-row lg:items-center justify-between gap-6 group"
              >
                <div className="flex-1 pr-4">

                  {/* THE MONOCHROMATIC THREAD: Q_Code -> Background Badge -> Colored Text */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0] rounded font-mono text-[9px] font-bold tracking-widest uppercase">
                      {question.q_code}
                    </span>
                    <span className={`px-2.5 py-1 rounded text-[9px] font-black uppercase tracking-[0.15em] border shadow-sm ${pColor.bg} ${pColor.text} ${pColor.border}`}>
                      {question.pillar_code}: {question.pillar_name}
                    </span>

                    {/* The Sub-pillar now perfectly inherits the exact text color of its parent Pillar */}
                    <span className={`text-[10px] font-black uppercase tracking-[0.15em] flex items-center gap-2 ml-1 ${pColor.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${pColor.dot}`}></span>
                      {question.subpillar_code}: {question.subpillar_name}
                    </span>
                  </div>

                  <h3 className="text-[#0D1117] font-semibold text-[15px] leading-relaxed group-hover:text-[#003DA5] transition-colors">
                    {question.question_text}
                  </h3>
                </div>

                <div className="flex items-center gap-6 flex-shrink-0">
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black text-[#8A95A3] uppercase tracking-widest mb-1">Expert Consensus</span>
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-black text-[#0D1117]">{avgScore > 0 ? avgScore.toFixed(1) : 'N/A'}</span>
                      <span className="px-3 py-1 bg-[#F8F9FB] border border-[#DDE1E9] rounded-lg text-[10px] font-bold text-[#4A5568]">
                        {responses.length} RESPONSES
                      </span>
                    </div>
                  </div>
                  <div className={`p-2 rounded-full transition-colors ${isExpanded ? 'bg-[#E8EEFA] text-[#003DA5]' : 'bg-[#F8F9FB] text-[#8A95A3] group-hover:bg-[#E8EEFA] group-hover:text-[#003DA5]'}`}>
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* ACCORDION BODY (Expanded State) */}
              {isExpanded && (
                <div className="bg-[#F8F9FB] border-t border-[#DDE1E9]/60 px-6 lg:px-8 py-8">
                  <h4 className="text-[10px] font-black text-[#8A95A3] uppercase tracking-[0.2em] mb-6">Expert Submissions for this Question</h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {responses.map((r) => {
                      const s = r.score ?? 0;
                      const color = SCORE_COLOR[s] ?? '#8A95A3';
                      const session = sessionMap.get(r.assessment_id);

                      // FIXED: Replaced 'any' with strict object shape for the option
                      const selectedOption = question.options.find((o: { score: number; description: string }) => o.score === r.score);

                      const hasEvidence = r.evidence_comment && r.evidence_comment.trim() !== '';

                      return (
                        <div key={r.id} className="bg-white border border-[#DDE1E9] rounded-2xl p-6 shadow-sm flex flex-col gap-5">

                          <div className="flex items-start gap-3">
                            <Building2 className="w-5 h-5 text-[#8A95A3] mt-0.5 flex-shrink-0" />
                            <div>
                              <h5 className="text-[#0D1117] font-black text-sm leading-tight mb-1">{session?.organization_name || 'Unknown Entity'}</h5>
                              <p className="text-[#4A5568] text-[10px] font-bold uppercase tracking-wider">
                                {session?.role_function || 'Unknown Role'} <span className="opacity-40 mx-1">•</span> {session?.organization_type || 'Unknown'}
                              </p>
                            </div>
                          </div>

                          <div className="bg-[#F8F9FB] border border-[#DDE1E9]/60 rounded-xl p-4 flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl font-black font-display leading-none" style={{ color: r.score === 9 ? '#8A95A3' : color }}>
                                {r.score === 9 ? '?' : (r.score ?? '—')}
                              </span>
                              <span className="px-2.5 py-1 rounded text-[9px] font-black uppercase tracking-[0.15em] border" style={{ backgroundColor: `${color}08`, color, borderColor: `${color}20` }}>
                                {SCORE_LABELS[s] ?? 'UNRANKED'}
                              </span>
                            </div>
                            <p className="text-[#4A5568] text-[11px] font-medium leading-relaxed italic">
                              {/* FIXED: Replaced unescaped quotes with HTML entities (&quot;) */}
                              &quot;{selectedOption?.description || 'No rubric description available.'}&quot;
                            </p>
                          </div>

                          {hasEvidence && (
                            <>
                              <hr className="border-t border-dashed border-[#DDE1E9]" />
                              <div className="flex flex-col gap-2.5">
                                <span className="text-[9px] font-black text-[#003DA5] uppercase tracking-widest flex items-center gap-1.5">
                                  <MessageSquare className="w-3 h-3" /> Qualitative Evidence
                                </span>
                                <p className="text-[#0D1117] font-medium text-[13px] leading-relaxed whitespace-pre-wrap">
                                  {r.evidence_comment}
                                </p>
                              </div>
                            </>
                          )}

                        </div>
                      );
                    })}
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