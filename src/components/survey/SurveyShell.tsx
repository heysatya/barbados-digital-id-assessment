'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { frameworkQuestions, FrameworkQuestion } from '@/data/frameworkQuestions';
import { Progress } from '@/components/ui/progress';
import {
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Building2,
  Send,
  Info,
  Lock,
  AlertTriangle,
  CheckCircle2,
  Users,
  BookOpen,
  UserX
} from 'lucide-react';

interface Props {
  survey_type: 'expert' | 'stakeholder';
  surveyLabel: string;
}

const STORAGE_KEY = (type: string) => `bdigid_survey_progress_${type}`;

function SurveyShellContent({ survey_type, surveyLabel }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const modeParam = searchParams.get('mode');
  const mode = modeParam === 'live' ? 'live' : 'test';

  // ── State ────────────────────────────────────────────────────────────────
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [evidence, setEvidence] = useState<Record<string, string>>({});
  const [hasConsented, setHasConsented] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. SAVE ANXIETY STATE
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  const [details, setDetails] = useState({
    organization_name: '',
    organization_type: '',
    role_function: '',
    stakeholder_category: '',
    country: 'Barbados',
  });

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  // ACCORDION STATE: Tracks which question is currently expanded
  const [expandedQId, setExpandedQId] = useState<string | null>(null);

  // ── Hydrate from localStorage ─────────────────────────────────────────
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY(survey_type));
    if (saved) {
      try {
        const { responses: r, evidence: e, details: d } = JSON.parse(saved);
        if (r) setResponses(r);
        if (e) setEvidence(e);
        if (d) setDetails(prev => ({ ...prev, ...d }));
      } catch {
        // silent
      }
    }
  }, [survey_type]);

  // 2. AUTO-SAVE WITH ANXIETY INDICATOR
  useEffect(() => {
    if (Object.keys(responses).length > 0 || details.organization_name || Object.keys(evidence).length > 0) {
      setSaveStatus('saving');
      localStorage.setItem(STORAGE_KEY(survey_type), JSON.stringify({ responses, evidence, details }));

      const timer = setTimeout(() => {
        setSaveStatus('saved');
      }, 600); // 600ms fake delay to let the user visibly register the "saving" action

      return () => clearTimeout(timer);
    }
  }, [responses, evidence, details, survey_type]);

  // Warn before unload (Turns off if we are actively submitting)
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (isSubmitting) return; // Disable the warning if submission is in progress
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [isSubmitting]);

  // ── Derived data ─────────────────────────────────────────────────────
  const filteredQuestions = useMemo(
    () => frameworkQuestions.filter(q => q.survey_type === survey_type),
    [survey_type]
  );

  const activePillars = useMemo(() => {
    const map = new Map<string, string>();
    filteredQuestions.forEach(q => map.set(q.pillar_code, q.pillar_name));
    return Array.from(map.entries()).map(([code, name]) => ({ code, name }));
  }, [filteredQuestions]);

  const sections = useMemo(() => ['profile', ...activePillars.map(p => p.code), 'review'], [activePillars]);

  const currentSection = sections[currentSectionIndex];

  // Group questions by subpillar for the current section
  const currentPillarQuestions = useMemo<Record<string, FrameworkQuestion[]>>(() => {
    if (currentSection === 'profile' || currentSection === 'review') return {};
    const qs = filteredQuestions.filter(q => q.pillar_code === currentSection);
    return qs.reduce<Record<string, FrameworkQuestion[]>>((acc, q) => {
      (acc[q.subpillar_name] = acc[q.subpillar_name] ?? []).push(q);
      return acc;
    }, {});
  }, [currentSection, filteredQuestions]);

  // Flattened array of current section questions for accordion navigation
  const flatCurrentQuestions = useMemo(() => {
    if (currentSection === 'profile' || currentSection === 'review') return [];
    return filteredQuestions.filter(q => q.pillar_code === currentSection);
  }, [currentSection, filteredQuestions]);

  // Auto-expand the first unanswered question ONLY when switching into a new pillar
  useEffect(() => {
    if (flatCurrentQuestions.length > 0) {
      const firstUnanswered = flatCurrentQuestions.find(q => responses[q.q_code] === undefined);
      setExpandedQId(firstUnanswered ? firstUnanswered.q_code : flatCurrentQuestions[0].q_code);
    } else {
      setExpandedQId(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSectionIndex]); // Fixed: Removed 'responses' and 'flatCurrentQuestions'

  const isProfileComplete = Boolean(
    details.organization_name &&
    details.organization_type &&
    details.role_function &&
    (survey_type === 'stakeholder' ? details.stakeholder_category : true)
  );

  const totalQuestions = filteredQuestions.length;
  const answeredCount = filteredQuestions.filter(q => responses[q.q_code] !== undefined).length;
  const isAllAnswered = totalQuestions > 0 && answeredCount === totalQuestions;
  const isComplete = isAllAnswered && isProfileComplete && hasConsented;
  const progress = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;

  const sectionProgress = useMemo(() => {
    const progressMap: Record<string, { answered: number, total: number }> = {};
    sections.forEach(section => {
      if (section === 'profile') {
        progressMap[section] = { answered: isProfileComplete ? 1 : 0, total: 1 };
      } else if (section === 'review') {
        progressMap[section] = { answered: isComplete ? 1 : 0, total: 1 };
      } else {
        const qs = filteredQuestions.filter(q => q.pillar_code === section);
        const total = qs.length;
        const answered = qs.filter(q => responses[q.q_code] !== undefined).length;
        progressMap[section] = { answered, total };
      }
    });
    return progressMap;

  }, [sections, filteredQuestions, responses, isProfileComplete, isComplete]);

  // ── Handlers ─────────────────────────────────────────────────────────
  const handleOption = (qCode: string, score: number) => {
    setResponses(prev => ({ ...prev, [qCode]: score }));
  };

  const handleEvidence = (qCode: string, text: string) => {
    setEvidence(prev => ({ ...prev, [qCode]: text }));
  };

  // 3. AUTO-RESIZING TEXTAREA HANDLER
  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = 'auto'; // Reset height
    e.target.style.height = `${e.target.scrollHeight}px`; // Set to internal scroll height
  };

  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setDetails(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const navigateTo = (idx: number) => {
    setCurrentSectionIndex(idx);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    if (currentSection === 'profile' && !isProfileComplete) return;
    if (currentSectionIndex < sections.length - 1) navigateTo(currentSectionIndex + 1);
  };

  const handlePrev = () => {
    if (currentSectionIndex > 0) navigateTo(currentSectionIndex - 1);
  };

  // SMART ACCORDION ADVANCE: Finds the next question in the current pillar and expands it.
  const advanceAccordion = (currentQCode: string) => {
    const currentIndex = flatCurrentQuestions.findIndex(q => q.q_code === currentQCode);
    if (currentIndex >= 0 && currentIndex < flatCurrentQuestions.length - 1) {
      setExpandedQId(flatCurrentQuestions[currentIndex + 1].q_code);

      // Optional: Smooth scroll to the next question slightly offset so it sits nicely on screen
      setTimeout(() => {
        const el = document.getElementById(`q-${flatCurrentQuestions[currentIndex + 1].q_code}`);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 50);
    } else {
      // If it's the last question in the section, collapse all.
      setExpandedQId(null);
    }
  };

  const handleSubmit = async () => {
    if (!isComplete) return;
    setIsSubmitting(true);
    try {
      const sessionData = {
        country: details.country,
        survey_type,
        organization_name: details.organization_name,
        organization_type: details.organization_type,
        role_function: details.role_function,
        stakeholder_category: details.stakeholder_category || null,
        environment_mode: mode,
        rubric_version: '3.0',
        status: 'submitted',
      };

      const responsesData = filteredQuestions.map(q => ({
        q_code: q.q_code,
        pillar_code: q.pillar_code,
        subpillar_code: q.subpillar_code,
        score: responses[q.q_code],
        evidence_comment: evidence[q.q_code] || null,
      }));

      const res = await fetch('/api/assessment/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionData, responsesData }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to submit assessment');
      }

      const { sessionId } = await res.json();

      localStorage.removeItem(STORAGE_KEY(survey_type));
      router.push(`/thank-you?id=${sessionId}`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      alert(`Error submitting assessment: ${message}`);
      setIsSubmitting(false);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FB] text-[#0D1117] font-sans selection:bg-[#003DA5]/30">

      {/* ── Sticky site header ── */}
      <header className="sticky top-0 z-50 h-16 bg-white/95 backdrop-blur-sm border-b border-[#DDE1E9] flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#003DA5] rounded-lg flex items-center justify-center shadow-sm">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-display font-bold text-[#0D1117] text-sm md:text-base leading-tight">Barbados Trident</p>
              <p className="font-sans text-[0.65rem] text-[#4A5568] uppercase tracking-widest leading-tight">{surveyLabel}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            {/* SAVE ANXIETY INDICATOR */}
            <div className="hidden sm:flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold">
              {saveStatus === 'saving' && (
                <span className="flex items-center gap-1.5 text-[#003DA5]">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...
                </span>
              )}
              {saveStatus === 'saved' && (
                <span className="flex items-center gap-1.5 text-green-600">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Saved locally
                </span>
              )}
            </div>

            <div className="w-px h-4 bg-gray-200 hidden sm:block" />

            <div className="flex items-center gap-2 text-[0.75rem] text-[#4A5568]">
              <span className={`w-2 h-2 rounded-full ${mode === 'live' ? 'bg-green-500 animate-pulse' : 'bg-orange-500'}`} />
              <span className="uppercase tracking-widest font-bold hidden sm:inline">{mode} Mode</span>
            </div>
          </div>
        </div>
      </header>

      {/* Test Mode Warning Banner */}
      {mode === 'test' && (
        <div className="w-full bg-orange-100 border-b border-orange-200 py-2.5 px-4 flex justify-center items-center gap-2 shadow-inner z-40">
          <AlertTriangle className="w-4 h-4 text-orange-700 flex-shrink-0" />
          <span className="text-xs md:text-sm font-bold tracking-wide text-orange-800">
            TEST MODE ACTIVE: Responses will be flagged as test data.
          </span>
        </div>
      )}

      {/* ── Two-pane body ── */}
      <div className="flex flex-1 overflow-hidden max-w-7xl mx-auto w-full">

        {/* LEFT PANE — Sleek Sidebar Navigation */}
        <aside className="hidden md:flex w-72 flex-shrink-0 flex-col p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-[#DDE1E9] p-5 mb-6 sticky top-6">
            <div className="mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="flex justify-between text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">
                <span>Total Progress</span>
                <span className="text-[#003DA5]">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2 mb-2 bg-gray-200" />
              <div className="text-[11px] font-semibold text-gray-400">{answeredCount} of {totalQuestions} answered</div>
            </div>

            <nav className="space-y-2">
              {sections.map((section, idx) => {
                const isActive = currentSectionIndex === idx;
                const { answered, total } = sectionProgress[section];
                const isSectionComplete = answered === total;
                const isPillar = section !== 'profile' && section !== 'review';

                let label = section;
                if (section === 'profile') label = 'Respondent Profile';
                if (section === 'review') label = 'Review & Submit';
                if (isPillar) label = activePillars.find(p => p.code === section)?.name || section;

                return (
                  <button
                    key={section}
                    onClick={() => navigateTo(idx)}
                    className={`w-full flex flex-col text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 ${isActive
                      ? 'bg-[#003DA5] border-[#003DA5] text-white shadow-md'
                      : isSectionComplete
                        ? 'bg-gray-50 border-transparent text-gray-700 hover:bg-gray-100'
                        : 'bg-white border-[#DDE1E9] text-gray-600 hover:border-[#003DA5]/30'
                      }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className={`font-semibold text-xs md:text-sm leading-tight pr-2 ${isActive ? 'text-white' : 'text-[#0D1117]'}`}>
                        {label}
                      </span>
                      {isSectionComplete && (
                        <div className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${isActive ? 'bg-white/20 text-white' : 'bg-green-100 text-green-600'}`}>
                          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                      )}
                    </div>

                    {isPillar && (
                      <div className="w-full mt-1.5">
                        <div className="flex justify-between text-[9px] font-bold mb-1 opacity-80 uppercase tracking-widest">
                          <span>{answered} / {total} Answered</span>
                        </div>
                        <div className={`w-full h-1 rounded-full ${isActive ? 'bg-[#1A56C4]' : 'bg-gray-200'}`}>
                          <div
                            className={`h-1 rounded-full transition-all ${isActive ? 'bg-white' : 'bg-[#003DA5]'}`}
                            style={{ width: `${(answered / total) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* RIGHT PANE — Scrollable Content */}
        <main className="flex-1 overflow-y-auto flex flex-col pt-6 md:pt-10 pb-24 px-4 md:px-8">
          <div className="max-w-3xl mx-auto w-full">

            {/* ── PROFILE SECTION ── */}
            {currentSection === 'profile' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h1 className="font-display text-3xl md:text-4xl font-extrabold text-[#0D1117] leading-tight">
                  Organizational Context
                </h1>
                <p className="text-base text-[#4A5568] leading-relaxed">
                  Help us understand the framework of your evaluation. No personal names, emails, or phone numbers are collected.
                </p>

                <div className="bg-white border border-[#DDE1E9] rounded-3xl p-6 md:p-10 shadow-sm space-y-8 mt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#4A5568] uppercase tracking-widest">
                        Organization Name <span className="text-[#003DA5]">*</span>
                      </label>
                      <input
                        type="text"
                        name="organization_name"
                        value={details.organization_name}
                        onChange={handleDetailsChange}
                        placeholder="e.g. Ministry of Industry"
                        className="w-full border border-[#DDE1E9] rounded-xl px-4 py-3.5 text-sm font-medium text-[#0D1117] bg-gray-50 focus:bg-white focus:border-[#003DA5] focus:ring-2 focus:ring-[#003DA5]/15 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#4A5568] uppercase tracking-widest">
                        Organization Type <span className="text-[#003DA5]">*</span>
                      </label>
                      <select
                        name="organization_type"
                        value={details.organization_type}
                        onChange={handleDetailsChange}
                        className="w-full border border-[#DDE1E9] rounded-xl px-4 py-3.5 text-sm font-medium text-[#0D1117] bg-gray-50 focus:bg-white focus:border-[#003DA5] focus:ring-2 focus:ring-[#003DA5]/15 outline-none transition-all appearance-none"
                      >
                        <option value="">Select Type</option>
                        <option>Government</option>
                        <option>Regulator</option>
                        <option>Private Sector</option>
                        <option>Civil Society</option>
                        <option>Academia</option>
                        <option>Development Partner</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#4A5568] uppercase tracking-widest">
                        Your Role / Function <span className="text-[#003DA5]">*</span>
                      </label>
                      <input
                        type="text"
                        name="role_function"
                        value={details.role_function}
                        onChange={handleDetailsChange}
                        placeholder="e.g. Policy Advisor"
                        className="w-full border border-[#DDE1E9] rounded-xl px-4 py-3.5 text-sm font-medium text-[#0D1117] bg-gray-50 focus:bg-white focus:border-[#003DA5] focus:ring-2 focus:ring-[#003DA5]/15 outline-none transition-all"
                      />
                    </div>
                    {survey_type === 'stakeholder' && (
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-[#4A5568] uppercase tracking-widest">
                          Stakeholder Category <span className="text-[#003DA5]">*</span>
                        </label>
                        <select
                          name="stakeholder_category"
                          value={details.stakeholder_category}
                          onChange={handleDetailsChange}
                          className="w-full border border-[#DDE1E9] rounded-xl px-4 py-3.5 text-sm font-medium text-[#0D1117] bg-gray-50 focus:bg-white focus:border-[#003DA5] focus:ring-2 focus:ring-[#003DA5]/15 outline-none transition-all appearance-none"
                        >
                          <option value="">Select Category</option>
                          <option>Government</option>
                          <option>Regulator</option>
                          <option>Private Sector</option>
                          <option>Civil Society</option>
                          <option>Academia</option>
                          <option>Development Partner</option>
                          <option>Other</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ── QUESTIONS SECTION (SMART ACCORDION) ── */}
            {currentSection !== 'profile' && currentSection !== 'review' && (() => {
              let qNumber = 1;

              return (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="pb-6 border-b border-[#DDE1E9]">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#003DA5]" />
                      <span className="text-xs font-bold text-[#4A5568] uppercase tracking-widest">
                        {currentSection}
                      </span>
                    </div>
                    <h1 className="font-display text-3xl md:text-4xl font-extrabold text-[#0D1117] leading-tight">
                      {activePillars.find(p => p.code === currentSection)?.name}
                    </h1>
                  </div>

                  {Object.entries(currentPillarQuestions).map(([subpillar, qs]) => (
                    <div key={subpillar} className="space-y-6">
                      <div className="inline-flex items-center gap-2 bg-[#E8EEFA] text-[#003DA5] font-bold px-4 py-2 rounded-lg text-sm tracking-wide shadow-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#003DA5]" />
                        {subpillar}
                      </div>

                      {qs.map((q) => {
                        const currentQNum = qNumber++;
                        const isAnswered = responses[q.q_code] !== undefined;
                        const isExpanded = expandedQId === q.q_code;

                        return (
                          <div
                            key={q.q_code}
                            id={`q-${q.q_code}`}
                            className={`bg-white border transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md ${isExpanded ? 'border-[#003DA5] rounded-2xl ring-1 ring-[#003DA5]/20' : 'border-[#DDE1E9] rounded-xl hover:border-[#003DA5]/40'
                              }`}
                          >

                            {/* COLLAPSED HEADER (Click to toggle) */}
                            <div
                              onClick={() => setExpandedQId(isExpanded ? null : q.q_code)}
                              className={`p-5 md:p-6 cursor-pointer flex items-center justify-between gap-4 select-none ${isExpanded ? 'bg-white border-b border-gray-100' : 'bg-white'}`}
                            >
                              <div className="flex gap-4 items-center w-full">
                                <div className={`flex-shrink-0 w-8 h-8 rounded-lg font-bold flex items-center justify-center shadow-sm transition-colors ${isExpanded ? 'bg-[#003DA5] text-white' :
                                  isAnswered ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-gray-100 text-gray-500 border border-gray-200'
                                  }`}>
                                  {currentQNum}
                                </div>
                                <h3 className={`text-base md:text-lg font-bold leading-snug font-display flex-1 ${isExpanded ? 'text-[#0D1117]' : 'text-gray-600 line-clamp-1'
                                  }`}>
                                  {q.question_text}
                                </h3>
                              </div>
                            </div>

                            {/* EXPANDED BODY (Smart Accordion Content) */}
                            {isExpanded && (
                              <div className="p-6 md:p-8 bg-gray-50/50 space-y-6 animate-in slide-in-from-top-2 duration-300">

                                <div className="grid grid-cols-1 gap-3">
                                  {q.options.map((opt) => {
                                    const isSelected = responses[q.q_code] === opt.score;

                                    const rawText = opt.description || opt.label;
                                    let cleanText = rawText.replace(/^\d\s*[-:.]?\s*(Basic|Opportunistic|Systematic|Institutionalized|Optimized)?\s*[-:.]?\s*/i, '');
                                    if (opt.score === 9) cleanText = "I don't know / Unable to assess - Insufficient information to make an assessment.";

                                    return (
                                      <label
                                        key={opt.score}
                                        className={`flex items-start gap-4 p-4 md:p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 ${isSelected
                                          ? 'border-[#003DA5] bg-[#E8EEFA]/30 shadow-sm'
                                          : 'border-[#DDE1E9] hover:border-[#003DA5]/40 bg-white hover:bg-gray-50'
                                          }`}
                                      >
                                        <div className="pt-0.5 flex-shrink-0">
                                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-[#003DA5]' : 'border-gray-300'}`}>
                                            {isSelected && <div className="w-2.5 h-2.5 bg-[#003DA5] rounded-full" />}
                                          </div>
                                          <input
                                            type="radio"
                                            name={q.q_code}
                                            value={opt.score}
                                            checked={isSelected}
                                            onChange={() => handleOption(q.q_code, opt.score)}
                                            className="sr-only"
                                          />
                                        </div>
                                        <div className="flex-1">
                                          <span className={`block text-sm md:text-base leading-relaxed ${isSelected ? 'font-bold text-[#003DA5]' : 'font-medium text-gray-700'}`}>
                                            {cleanText}
                                          </span>
                                        </div>
                                      </label>
                                    );
                                  })}
                                </div>

                                <div className="pt-4 border-t border-gray-200/60">
                                  <label className="text-[10px] font-bold text-[#4A5568] uppercase tracking-widest mb-2 flex items-center gap-2">
                                    Contextual Evidence (Optional)
                                  </label>
                                  <textarea
                                    value={evidence[q.q_code] || ''}
                                    onChange={(e) => {
                                      handleEvidence(q.q_code, e.target.value);
                                      handleTextareaInput(e);
                                    }}
                                    placeholder="Provide brief justification, specific examples, or links to policy documents..."
                                    className="w-full p-4 border border-[#DDE1E9] rounded-xl focus:ring-2 focus:ring-[#003DA5] outline-none text-sm text-[#0D1117] bg-white transition-all resize-none overflow-hidden min-h-[100px]"
                                  />
                                </div>

                                {/* EXPLICIT ADVANCE BUTTON: Only shows if an answer is selected */}
                                {isAnswered && (
                                  <div className="flex justify-end pt-4 animate-in fade-in duration-300">
                                    <button
                                      onClick={() => advanceAccordion(q.q_code)}
                                      className="flex items-center gap-2 px-6 py-3 text-sm font-bold bg-[#003DA5] hover:bg-[#1A56C4] text-white rounded-xl transition-all shadow-md active:scale-95"
                                    >
                                      Next Question <ChevronRight className="w-4 h-4" />
                                    </button>
                                  </div>
                                )}

                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              );
            })()}

            {/* ── REVIEW SECTION ── */}
            {currentSection === 'review' && (
              <div className="flex flex-col items-center justify-center py-4 md:py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="w-full max-w-2xl bg-white border border-[#DDE1E9] rounded-[2rem] shadow-xl overflow-hidden">

                  {/* Top Header Area */}
                  <div className="bg-[#F8F9FB] border-b border-[#DDE1E9] p-8 md:p-10 text-center space-y-4">
                    <div className="w-16 h-16 bg-[#E8EEFA] rounded-2xl flex items-center justify-center mx-auto shadow-sm border border-[#003DA5]/10">
                      <ShieldCheck className="w-8 h-8 text-[#003DA5]" />
                    </div>
                    <h1 className="font-display text-2xl md:text-3xl font-extrabold text-[#0D1117]">
                      Ready to Submit?
                    </h1>
                    <p className="text-[#4A5568] text-sm md:text-base max-w-md mx-auto leading-relaxed">
                      Please review your progress and confirm the data handling terms before final submission.
                    </p>
                  </div>

                  <div className="p-6 md:p-10 space-y-8">

                    {/* Warnings */}
                    {!isProfileComplete && (
                      <div className="p-4 bg-red-50 text-red-800 rounded-xl border border-red-200 flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0 text-red-600" />
                        <div>
                          <h4 className="font-bold text-sm mb-1">Organization Profile is incomplete</h4>
                          <p className="text-xs">Please go back to the Respondent Profile section to complete required fields.</p>
                        </div>
                      </div>
                    )}

                    {/* Progress Summary */}
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-inner">
                      <div className="flex items-center gap-2 mb-5">
                        <BookOpen className="w-5 h-5 text-[#003DA5]" />
                        <h3 className="font-bold text-[#0D1117] text-sm uppercase tracking-widest">Assessment Progress</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-xs font-bold text-[#4A5568]">
                          <span>Questions Answered</span>
                          <span className="text-[#0D1117]">{answeredCount} of {totalQuestions}</span>
                        </div>
                        <Progress value={progress} className="h-2.5 bg-gray-200" />
                        {!isAllAnswered && (
                          <div className="flex items-center gap-2 text-orange-700 text-[10px] font-bold uppercase tracking-widest bg-orange-50 p-2.5 rounded-lg border border-orange-200 mt-2 w-fit shadow-sm">
                            <Info className="w-3.5 h-3.5" />
                            {totalQuestions - answeredCount} survey questions require your kind attention!
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Privacy Terms */}
                    <div className="space-y-5">
                      <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                        <Lock className="w-5 h-5 text-[#4A5568]" />
                        <h3 className="font-bold text-[#0D1117] text-sm md:text-base">Before submitting, please acknowledge:</h3>
                      </div>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3 text-sm text-[#4A5568] leading-relaxed">
                          <UserX className="w-5 h-5 text-[#003DA5] mt-0.5 flex-shrink-0" />
                          <span>We <strong>do not collect</strong> any personally identifiable information (PII) such as personal names, emails, or phone numbers.</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-[#4A5568] leading-relaxed">
                          <Users className="w-5 h-5 text-[#003DA5] mt-0.5 flex-shrink-0" />
                          <span>Your responses will be <strong>fully anonymized</strong> and aggregated with others for high-level diagnostic analysis.</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-[#4A5568] leading-relaxed">
                          <Building2 className="w-5 h-5 text-[#003DA5] mt-0.5 flex-shrink-0" />
                          <span>Organization names are recorded only for internal validation purposes and will <strong>not be used</strong> for any public attribution.</span>
                        </li>
                      </ul>
                    </div>

                    {/* Consent & Submit */}
                    <div className="pt-8 border-t border-gray-100 space-y-6">
                      <label className={`flex items-start gap-4 p-5 rounded-xl border-2 transition-all duration-200 cursor-pointer select-none group ${hasConsented ? 'bg-[#E8EEFA]/50 border-[#003DA5]/40 shadow-sm' : 'bg-white border-[#DDE1E9] hover:border-[#003DA5]/30'}`}>
                        <div className="pt-0.5 flex-shrink-0">
                          {/* Custom visual checkbox to match UI */}
                          <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${hasConsented ? 'border-[#003DA5] bg-[#003DA5]' : 'border-gray-300 group-hover:border-[#003DA5]/50'}`}>
                            {hasConsented && <CheckCircle2 className="w-4 h-4 text-white" />}
                          </div>
                          {/* Hidden real checkbox for state */}
                          <input
                            type="checkbox"
                            checked={hasConsented}
                            onChange={(e) => setHasConsented(e.target.checked)}
                            className="sr-only"
                          />
                        </div>
                        <div>
                          <span className={`block font-bold text-sm md:text-base transition-colors ${hasConsented ? 'text-[#003DA5]' : 'text-[#0D1117] group-hover:text-[#003DA5]'}`}>
                            I acknowledge the terms of data handling and consent to submit my responses.
                          </span>
                        </div>
                      </label>

                      <button
                        onClick={handleSubmit}
                        disabled={!isComplete || isSubmitting}
                        className="w-full h-14 bg-[#003DA5] hover:bg-[#1A56C4] text-white font-bold text-lg rounded-xl shadow-md flex items-center justify-center gap-3 transition-all duration-200 disabled:opacity-50 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:shadow-none active:scale-[0.98]"
                      >
                        {isSubmitting ? (
                          <><Loader2 className="w-5 h-5 animate-spin" /> Finalizing...</>
                        ) : (
                          <><Send className="w-5 h-5" /> Submit Assessment</>
                        )}
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ── Sticky Nav Footer ── */}
      <div className="fixed bottom-0 left-0 md:left-72 right-0 bg-white/90 backdrop-blur-md border-t border-[#DDE1E9] p-4 flex items-center justify-between z-40">
        <button
          onClick={handlePrev}
          disabled={currentSectionIndex === 0}
          className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-[#4A5568] hover:text-[#0D1117] hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        <span className="text-[10px] font-bold text-[#8A95A3] uppercase tracking-widest hidden sm:block">
          Step {currentSectionIndex + 1} of {sections.length}
        </span>

        {currentSection !== 'review' && (
          <button
            onClick={handleNext}
            disabled={currentSection === 'profile' && !isProfileComplete}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold bg-[#003DA5] hover:bg-[#1A56C4] text-white rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
          >
            {currentSectionIndex === sections.length - 2 ? 'Complete Evaluation' : 'Continue to Next Pillar'} <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

    </div>
  );
}

export default function SurveyShell(props: Props) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-[#003DA5]" />
          <span className="font-sans text-[10px] font-bold text-[#4A5568] uppercase tracking-widest">
            Loading Framework...
          </span>
        </div>
      </div>
    }>
      <SurveyShellContent {...props} />
    </Suspense>
  );
}