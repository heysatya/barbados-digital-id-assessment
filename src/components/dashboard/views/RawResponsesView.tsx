"use client";
// File: src/components/dashboard/views/RawResponsesView.tsx

import React, { useState, useMemo } from 'react';
import type { RawAssessmentSession, RawAssessmentResponse } from '@/lib/assessmentAggregation';
import { frameworkQuestions, type FrameworkQuestion } from '@/data/frameworkQuestions';
import { Download, Trash2, ChevronDown, ChevronUp, FileText, User, Building } from 'lucide-react';

interface Props {
  sessions: RawAssessmentSession[];
  responses: RawAssessmentResponse[];
  onDeleteResponse?: (responseId: string) => void; // Legacy
  onDeleteSession?: (sessionId: string) => void;   // New Phase 2
  activeMode?: 'live' | 'test';
}

export default function RawResponsesView({ sessions, responses, onDeleteSession }: Props) {
  const [filterType, setFilterType] = useState<'all' | 'expert' | 'stakeholder'>('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [expandedSession, setExpandedSession] = useState<string | null>(null);

  const PER_PAGE = 25;

  // Map questions for the deep-dive sub-table
  const questionMap = useMemo(() => {
    const map = new Map<string, FrameworkQuestion>();
    frameworkQuestions.forEach(q => map.set(q.q_code, q));
    return map;
  }, []);

  // Filter and Sort Sessions (Respondents)
  const filteredSessions = useMemo(() => {
    let result = sessions;

    if (filterType !== 'all') {
      result = result.filter(s => s.survey_type === filterType);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(s =>
        (s.organization_name || '').toLowerCase().includes(q) ||
        (s.id || '').toLowerCase().includes(q) ||
        (s.role_function || '').toLowerCase().includes(q)
      );
    }

    // Sort newest first
    return result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }, [sessions, filterType, search]);

  const pageCount = Math.ceil(filteredSessions.length / PER_PAGE);
  const currentSessions = filteredSessions.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  // Safely format dates
  const formatDate = (dateString: string) => {
    try {
      return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      }).format(new Date(dateString));
    } catch {
      return 'Unknown Date';
    }
  };

  // CSV Export (Updated to include full response text and evidence)
  const handleDownloadCSV = () => {
    const headers = [
      'Assessment ID', 'Survey Type', 'Organization', 'Org Type', 'Role',
      'Question Code', 'Pillar Code', 'Subpillar Code', 'Score', 'Question',
      'Selected Response', 'Evidence/Comment', 'Date'
    ];
    const csvRows = [headers.join(',')];

    const escapeCSV = (val: string | undefined | null) => `"${(val || '').replace(/"/g, '""')}"`;

    filteredSessions.forEach(s => {
      const sAnswers = responses.filter(r => r.assessment_id === s.id);
      sAnswers.forEach(r => {
        const qData = questionMap.get(r.q_code);

        // Map the correct text description for the score
        let rubricDescription = "Response text not available.";
        if (r.score === 9) {
          rubricDescription = "Respondent indicated they are unsure or lack data to answer.";
        } else if (qData?.options) {
          const opt = qData.options.find((o: { score: number; description: string }) => o.score === r.score);
          if (opt) rubricDescription = opt.description;
        }

        // Use strict type intersection instead of 'any' to satisfy the linter
        const evidence = (r as RawAssessmentResponse & { evidence_comment?: string }).evidence_comment || '';

        const row = [
          s.id,
          s.survey_type || '',
          escapeCSV(s.organization_name),
          escapeCSV(s.organization_type),
          escapeCSV(s.role_function),
          r.q_code,
          r.pillar_code,
          r.subpillar_code,
          r.score === 9 ? '?' : (r.score ?? '—'),
          escapeCSV(qData?.question_text),
          escapeCSV(rubricDescription),
          escapeCSV(evidence),
          s.created_at ? new Date(s.created_at).toLocaleDateString() : '—'
        ];
        csvRows.push(row.join(','));
      });
    });

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `digital_id_assessment_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 border border-[#DDE1E9] rounded-2xl shadow-sm">
        <div className="flex bg-[#F8F9FB] p-1 rounded-xl border border-[#DDE1E9]">
          <button onClick={() => { setFilterType('all'); setPage(0); }} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${filterType === 'all' ? 'bg-white text-[#003DA5] shadow-sm' : 'text-[#8A95A3] hover:text-[#4A5568]'}`}>All</button>
          <button onClick={() => { setFilterType('expert'); setPage(0); }} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${filterType === 'expert' ? 'bg-white text-[#003DA5] shadow-sm' : 'text-[#8A95A3] hover:text-[#4A5568]'}`}>Experts</button>
          <button onClick={() => { setFilterType('stakeholder'); setPage(0); }} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${filterType === 'stakeholder' ? 'bg-white text-[#003DA5] shadow-sm' : 'text-[#8A95A3] hover:text-[#4A5568]'}`}>Stakeholders</button>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search organization or ID..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            className="w-full sm:w-64 bg-[#F8F9FB] border border-[#DDE1E9] rounded-xl px-4 py-2 text-xs font-medium text-[#0D1117] outline-none focus:border-[#003DA5]"
          />
          <button
            onClick={handleDownloadCSV}
            className="flex items-center justify-center h-9 px-4 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors gap-2"
          >
            <Download className="w-3.5 h-3.5" /> CSV
          </button>
        </div>
      </div>

      {/* Respondent Data Table */}
      <div className="bg-white border border-[#DDE1E9] rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#DDE1E9]">
                <th className="p-4 text-[10px] font-black text-[#8A95A3] uppercase tracking-widest">Assessment ID</th>
                <th className="p-4 text-[10px] font-black text-[#8A95A3] uppercase tracking-widest">Organization / Role</th>
                <th className="p-4 text-[10px] font-black text-[#8A95A3] uppercase tracking-widest">Type</th>
                <th className="p-4 text-[10px] font-black text-[#8A95A3] uppercase tracking-widest">Date Submitted</th>
                <th className="p-4 text-[10px] font-black text-[#8A95A3] uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {currentSessions.map((session) => {
                const isExpanded = expandedSession === session.id;
                const sessionAnswers = responses.filter(r => r.assessment_id === session.id);

                return (
                  <React.Fragment key={session.id}>
                    {/* Master Respondent Row */}
                    <tr className={`hover:bg-[#F8FAFC]/50 transition-colors cursor-pointer ${isExpanded ? 'bg-[#F8FAFC]' : ''}`} onClick={() => setExpandedSession(isExpanded ? null : session.id)}>
                      <td className="p-4">
                        <span className="font-mono text-[10px] font-bold text-[#4A5568] bg-[#F1F5F9] px-2 py-1 rounded border border-[#E2E8F0]">
                          {session.id.split('-')[0].toUpperCase()}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-[#0D1117] flex items-center gap-1.5">
                            <Building className="w-3.5 h-3.5 text-[#003DA5]" /> {session.organization_name || 'N/A'}
                          </span>
                          <span className="text-[10px] font-bold text-[#8A95A3] uppercase tracking-wider flex items-center gap-1 mt-0.5">
                            <User className="w-3 h-3" /> {session.role_function || 'Unknown Role'}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest border ${session.survey_type === 'expert' ? 'bg-[#003DA5]/10 text-[#003DA5] border-[#003DA5]/20' : 'bg-purple-100 text-purple-700 border-purple-200'}`}>
                          {session.survey_type}
                        </span>
                      </td>
                      <td className="p-4 text-xs font-bold text-[#4A5568]">
                        {formatDate(session.created_at)}
                      </td>
                      <td className="p-4 flex items-center justify-end gap-3">
                        <button
                          className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg transition-colors ${isExpanded ? 'bg-[#0D1117] text-white' : 'bg-[#F1F5F9] text-[#4A5568] hover:bg-[#E2E8F0]'}`}
                        >
                          {isExpanded ? 'Close' : 'View Answers'}
                          {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (window.confirm(`Are you sure you want to archive the submission for ${session.organization_name || session.id}?`)) {
                              if (onDeleteSession) onDeleteSession(session.id);
                            }
                          }}
                          className="w-8 h-8 flex items-center justify-center text-[#8A95A3] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                          title="Archive Submission"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>

                    {/* The Deep Dive (Expanded Row) */}
                    {isExpanded && (
                      <tr>
                        <td colSpan={5} className="p-0 border-b border-[#DDE1E9] bg-white">
                          <div className="p-6 md:p-8 bg-[#F8F9FB] inset-shadow-sm border-t border-[#E2E8F0]">
                            <div className="flex items-center gap-2 mb-6">
                              <FileText className="w-4 h-4 text-[#003DA5]" />
                              <h4 className="text-xs font-black text-[#0D1117] uppercase tracking-widest">Full Survey Submission</h4>
                              <span className="ml-2 text-[10px] font-bold text-[#8A95A3] bg-white px-2 py-0.5 rounded-full border border-[#DDE1E9]">
                                {sessionAnswers.length} Responses Logged
                              </span>
                            </div>

                            <div className="bg-white border border-[#DDE1E9] rounded-xl overflow-hidden shadow-sm">
                              <table className="w-full text-left border-collapse">
                                <thead className="bg-[#F1F5F9] border-b border-[#DDE1E9]">
                                  <tr>
                                    <th className="px-6 py-3 text-[9px] font-black text-[#8A95A3] uppercase tracking-widest">Question & Selected Response</th>
                                    <th className="px-6 py-3 text-[9px] font-black text-[#8A95A3] uppercase tracking-widest text-right w-32 border-l border-[#DDE1E9]">Score</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-[#F1F5F9]">
                                  {sessionAnswers.map(ans => {
                                    const qDef = questionMap.get(ans.q_code);

                                    // Use strict type intersection instead of 'any' to satisfy the linter
                                    const evidence = (ans as RawAssessmentResponse & { evidence_comment?: string }).evidence_comment;

                                    // Extract the actual rubric text the user selected
                                    let rubricDescription = "Response text not available.";
                                    if (ans.score === 9) {
                                      rubricDescription = "Respondent indicated they are unsure or lack data to answer.";
                                    } else if (qDef?.options) {
                                      const opt = qDef.options.find((o: { score: number; description: string }) => o.score === ans.score);
                                      if (opt) rubricDescription = opt.description;
                                    }

                                    return (
                                      <tr key={ans.id} className="hover:bg-slate-50 transition-colors group">
                                        <td className="px-6 py-5 align-top">
                                          <div className="flex flex-col gap-3">
                                            {/* Question Line with Embedded Badge */}
                                            <div className="flex items-start gap-3">
                                              <span className="flex-shrink-0 text-[10px] font-black text-[#0D1117] bg-[#F1F5F9] px-1.5 py-0.5 rounded border border-[#DDE1E9] mt-0.5">
                                                {ans.q_code}
                                              </span>
                                              <p className="text-xs font-bold text-[#0D1117] leading-relaxed">
                                                {qDef?.question_text || 'Unknown Question'}
                                              </p>
                                            </div>

                                            {/* The "Quoted Reply" Response Block */}
                                            <div className="ml-10 flex items-stretch gap-3 bg-[#F8F9FB] p-3 rounded-xl border border-[#DDE1E9] group-hover:bg-white transition-colors">
                                              <div className="w-1 rounded-full bg-[#003DA5] shrink-0 opacity-50"></div>
                                              <p className="text-[11px] font-medium text-[#4A5568] leading-relaxed">
                                                {rubricDescription}
                                              </p>
                                            </div>

                                            {/* NEW: Evidence Block (Only shows if evidence exists) */}
                                            {evidence && (
                                              <div className="ml-10 flex items-start gap-3 bg-white p-3 rounded-xl border border-[#DDE1E9] border-l-2 border-l-[#D69E2E] shadow-sm">
                                                <div className="flex-1">
                                                  <span className="text-[9px] font-black text-[#D69E2E] uppercase tracking-widest block mb-1">Provided Evidence</span>
                                                  <p className="text-[11px] font-medium text-[#4A5568] leading-relaxed italic">
                                                    &quot;{evidence}&quot;
                                                  </p>
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                        </td>

                                        <td className="px-6 py-5 align-top text-right border-l border-[#DDE1E9]/50">
                                          <span className="inline-flex items-center justify-center text-xs font-black text-[#003DA5] bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 min-w-[3rem]">
                                            {ans.score === 9 ? '?' : (ans.score ?? '—')}
                                          </span>
                                        </td>
                                      </tr>
                                    );
                                  })}
                                  {sessionAnswers.length === 0 && (
                                    <tr>
                                      <td colSpan={2} className="p-8 text-center text-xs font-bold text-[#8A95A3]">No answers recorded for this session.</td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
              {currentSessions.length === 0 && (
                <tr><td colSpan={5} className="p-12 text-center text-sm text-[#8A95A3] font-bold">No survey respondents match the active criteria.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="flex items-center justify-between px-6 py-4 bg-white border border-[#DDE1E9] rounded-2xl shadow-sm">
          <span className="text-[10px] font-bold text-[#8A95A3] uppercase tracking-widest">Page {page + 1} of {pageCount}</span>
          <div className="flex gap-4">
            <button
              onClick={() => { setPage((p) => Math.max(0, p - 1)); window.scrollTo(0, 0); }}
              disabled={page === 0}
              className="px-6 py-2 border border-[#DDE1E9] rounded-xl text-[10px] font-bold text-[#0D1117] uppercase tracking-widest hover:bg-[#F8F9FB] disabled:opacity-30 disabled:grayscale transition-all"
            >
              Previous
            </button>
            <button
              onClick={() => { setPage((p) => Math.min(pageCount - 1, p + 1)); window.scrollTo(0, 0); }}
              disabled={page === pageCount - 1}
              className="px-6 py-2 bg-[#003DA5] border border-[#003DA5] rounded-xl text-[10px] font-bold text-white uppercase tracking-widest hover:bg-[#002A7A] disabled:opacity-50 transition-all"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}