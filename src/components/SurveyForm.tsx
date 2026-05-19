"use client";

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { frameworkQuestions, FrameworkQuestion } from '@/data/frameworkQuestions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle } from 'lucide-react';

interface SurveyFormProps {
  audience: 'expert' | 'stakeholder';
}

export default function SurveyForm({ audience }: SurveyFormProps) {
  const router = useRouter();

  // Load from local storage or initialize
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [details, setDetails] = useState({
    organization: '',
    stakeholder_type: '',
  });

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);

  // 1. URL-based Mode Selection (Defaults to Test)
  const [mode, setMode] = useState<'live' | 'test'>('test');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('mode') === 'live') {
        setMode('live');
      }
    }
  }, []);

  // Initialize from localStorage if exists
  useEffect(() => {
    const saved = localStorage.getItem(`survey_progress_${audience}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.responses) setResponses(parsed.responses);
        if (parsed.details) setDetails(parsed.details);
      } catch {
        console.error("Could not parse saved progress");
      }
    }
  }, [audience]);

  // Save to localStorage when responses or details change
  useEffect(() => {
    localStorage.setItem(`survey_progress_${audience}`, JSON.stringify({ responses, details }));
  }, [responses, details, audience]);

  // Warn before leaving
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const questions = useMemo(() => {
    return frameworkQuestions.filter(q => q.survey_type === audience);
  }, [audience]);

  const activePillars = useMemo(() => {
    return Array.from(new Set(questions.map(q => q.pillar_name)));
  }, [questions]);

  const sections = useMemo(() => ['profile', ...activePillars, 'review'], [activePillars]);
  const currentSection = sections[currentSectionIndex];

  const currentPillarQuestions = useMemo(() => {
    if (currentSection === 'profile' || currentSection === 'review') return {};

    const qs = questions.filter(q => q.pillar_name === currentSection);
    return qs.reduce((acc, q) => {
      if (!acc[q.subpillar_name]) acc[q.subpillar_name] = [];
      acc[q.subpillar_name].push(q);
      return acc;
    }, {} as Record<string, FrameworkQuestion[]>);
  }, [currentSection, questions]);

  const totalQuestions = questions.length;
  const answeredCount = questions.filter(q => responses[q.q_code] !== undefined).length;
  const progress = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;

  // Validation: NO PII
  const isDetailsComplete = Boolean(details.organization && details.stakeholder_type);
  const isAllAnswered = totalQuestions > 0 && answeredCount === totalQuestions;
  const isComplete = isAllAnswered && isDetailsComplete && hasConsented;

  const sectionProgress = useMemo(() => {
    const progressMap: Record<string, { answered: number, total: number }> = {};
    sections.forEach(section => {
      if (section === 'profile') {
        progressMap[section] = { answered: isDetailsComplete ? 1 : 0, total: 1 };
      } else if (section === 'review') {
        progressMap[section] = { answered: isComplete ? 1 : 0, total: 1 };
      } else {
        const qs = questions.filter(q => q.pillar_name === section);
        const total = qs.length;
        const answered = qs.filter(q => responses[q.q_code] !== undefined).length;
        progressMap[section] = { answered, total };
      }
    });
    return progressMap;
  }, [sections, questions, responses, isDetailsComplete, isComplete]);

  const handleOptionChange = (qCode: string, value: number) => {
    setResponses(prev => ({ ...prev, [qCode]: value }));
  };

  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setDetails(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!isComplete) return;
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/assessments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          details,
          responses,
          mode: mode // Dynamically uses 'test' or 'live'
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to submit');
      }

      // Extract the successful response data from your API
      const successData = await res.json();

      // Clear local storage
      localStorage.removeItem(`survey_progress_${audience}`);

      // Pass the ID returned by your API (assuming your API returns { id: '...' })
      router.push(`/thank-you?id=${successData.id}`);
    } catch (err: unknown) {
      console.error("Submission error:", err);
      alert(`Fatal Submission Error: ${err instanceof Error ? err.message : 'Unknown Error'}`);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 py-6 font-sans">

      {/* Test Mode Banner */}
      {mode === 'test' && (
        <div className="mb-8 flex items-center justify-center gap-3 bg-orange-100 border border-orange-300 text-orange-800 px-6 py-3 rounded-xl shadow-sm">
          <AlertTriangle className="w-5 h-5" />
          <span className="font-bold tracking-wide text-sm">
            TEST MODE ACTIVE: Responses will be flagged as test data. (Use <code className="bg-orange-200 px-1.5 py-0.5 rounded text-xs font-mono">?mode=live</code> to disable)
          </span>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Sidebar Navigation */}
        <div className="w-full md:w-80 flex-shrink-0">
          <div className="sticky top-6 bg-white rounded-2xl shadow-md border border-gray-200 p-5">
            <h2 className="text-xl font-bold text-[#0D1117] mb-2 capitalize font-display">{audience} Assessment</h2>

            <div className="mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="flex justify-between text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">
                <span>Total Progress</span>
                <span className="text-[#003DA5]">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2 mb-2 bg-gray-200" />
              <div className="text-[11px] font-semibold text-gray-400">{answeredCount} of {totalQuestions} completed</div>
            </div>

            <nav className="space-y-2">
              {sections.map((section, idx) => {
                const isActive = currentSectionIndex === idx;
                const { answered, total } = sectionProgress[section];
                const isSectionComplete = answered === total;
                const isPillar = section !== 'profile' && section !== 'review';
                const label = section === 'profile' ? 'Respondent Profile' : section === 'review' ? 'Review & Submit' : section;

                return (
                  <button
                    key={section}
                    onClick={() => setCurrentSectionIndex(idx)}
                    className={`w-full flex flex-col text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 ${isActive
                      ? 'bg-[#003DA5] border-[#003DA5] text-white shadow-md'
                      : isSectionComplete
                        ? 'bg-gray-50 border-transparent text-gray-700 hover:bg-gray-100'
                        : 'bg-white border-gray-100 text-gray-600 hover:border-[#003DA5]/30'
                      }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={`font-semibold text-sm truncate ${isActive ? 'text-white' : 'text-[#0D1117]'}`}>
                        {label}
                      </span>
                      {isSectionComplete && (
                        <div className={`flex-shrink-0 ml-2 w-5 h-5 rounded-full flex items-center justify-center ${isActive ? 'bg-white/20' : 'bg-green-100 text-green-600'}`}>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                      )}
                    </div>

                    {/* 2. Mini Pillar Progress Indicator */}
                    {isPillar && (
                      <div className="w-full mt-2">
                        <div className="flex justify-between text-[10px] font-bold mb-1 opacity-80">
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
        </div>

        {/* Right Main Content */}
        <div className="flex-1 min-w-0">

          {/* PROFILE SECTION */}
          {currentSection === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D1117] tracking-tight font-display">Respondent Profile</h2>
              <p className="text-base text-gray-600 mb-8 max-w-2xl">Please provide your organization details to begin. No personal names, emails, or phone numbers are collected.</p>

              <Card className="border border-gray-200 shadow-md bg-white rounded-3xl overflow-hidden">
                <CardContent className="space-y-8 p-8 md:p-10">
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Organization Name</label>
                    <input
                      type="text"
                      name="organization"
                      value={details.organization}
                      onChange={handleDetailsChange}
                      className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#003DA5] outline-none text-[#0D1117] bg-gray-50 focus:bg-white transition-all font-medium"
                      placeholder="e.g. Ministry of Innovation"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Stakeholder Type</label>
                    <div className="relative">
                      <select
                        name="stakeholder_type"
                        value={details.stakeholder_type}
                        onChange={handleDetailsChange}
                        className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#003DA5] outline-none text-[#0D1117] bg-gray-50 focus:bg-white transition-all appearance-none font-medium"
                      >
                        <option value="">Select Category...</option>
                        <option value="Government">Government</option>
                        <option value="Regulator">Regulator</option>
                        <option value="Private Sector">Private Sector</option>
                        <option value="Civil Society">Civil Society</option>
                        <option value="Academia">Academia</option>
                        <option value="Development Partner">Development Partner</option>
                        <option value="Other">Other</option>
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* QUESTIONS SECTION */}
          {currentSection !== 'profile' && currentSection !== 'review' && (() => {
            // 3. Question Numbering scoped to the active Pillar
            let qNumber = 1;

            return (
              <div className="space-y-8">
                <div className="border-b border-gray-200 pb-6 mb-8">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D1117] tracking-tight font-display">{currentSection}</h2>
                  <p className="text-base text-gray-600 mt-2">Answer the following questions to assess the maturity of this pillar.</p>
                </div>

                {Object.entries(currentPillarQuestions).map(([subpillar, qs]) => (
                  <div key={subpillar} className="space-y-6">
                    <div className="inline-flex items-center gap-2 bg-[#E8EEFA] text-[#003DA5] font-bold px-4 py-2 rounded-lg text-sm tracking-wide">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#003DA5]" />
                      {subpillar}
                    </div>

                    {qs.map((q) => {
                      const currentQNum = qNumber++;
                      return (
                        <Card key={q.q_code} className="border border-gray-200 shadow-sm bg-white rounded-2xl overflow-hidden hover:border-[#003DA5]/20 transition-colors">
                          <CardHeader className="bg-white border-b border-gray-100 pb-5 pt-6 px-6 md:px-8">
                            <div className="flex gap-4 items-start">
                              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#003DA5] text-white font-bold flex items-center justify-center mt-0.5 shadow-sm">
                                {currentQNum}
                              </div>
                              <div>
                                <CardTitle className="text-lg md:text-xl font-bold leading-snug text-[#0D1117] font-display">{q.question_text}</CardTitle>
                                <div className="inline-block mt-3 px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-md uppercase tracking-widest">
                                  {q.q_code}
                                </div>
                              </div>
                            </div>
                          </CardHeader>

                          <CardContent className="p-6 md:p-8 bg-gray-50/50">
                            <div className="grid grid-cols-1 gap-3">
                              {q.options.map((opt) => {
                                const isSelected = responses[q.q_code] === opt.score;

                                // 4. String Cleaner: Removes "1-Basic", "2 - Opportunistic:", etc.
                                const rawText = opt.description || opt.label;
                                let cleanText = rawText.replace(/^\d\s*[-:.]?\s*(Basic|Opportunistic|Systematic|Institutionalized|Optimized)?\s*[-:.]?\s*/i, '');

                                if (opt.score === 9) {
                                  cleanText = "I don't know / Unable to assess - Insufficient information to make an assessment.";
                                }

                                return (
                                  <label
                                    key={opt.score}
                                    className={`flex items-start gap-4 p-4 md:p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 ${isSelected
                                      ? 'border-[#003DA5] bg-[#E8EEFA]/30 shadow-sm'
                                      : 'border-gray-200 hover:border-[#003DA5]/40 bg-white hover:bg-gray-50'
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
                                        onChange={() => handleOptionChange(q.q_code, opt.score)}
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
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                ))}
              </div>
            );
          })()}

          {/* REVIEW SECTION */}
          {currentSection === 'review' && (
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D1117] tracking-tight font-display">Review & Submit</h2>

              <Card className="border border-gray-200 shadow-md bg-white rounded-3xl overflow-hidden">
                <CardContent className="space-y-6 p-8 md:p-10">
                  {!isDetailsComplete && (
                    <div className="p-5 bg-red-50 text-red-800 rounded-xl border border-red-200 flex items-start gap-3">
                      <AlertTriangle className="w-6 h-6 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-lg mb-1">Organization Profile is incomplete</h4>
                        <p className="text-sm">Please go back to the Respondent Profile section and provide your Organization Name and Stakeholder Type.</p>
                      </div>
                    </div>
                  )}

                  {!isAllAnswered && (
                    <div className="p-5 bg-yellow-50 text-yellow-800 rounded-xl border border-yellow-200 flex items-start gap-3">
                      <AlertTriangle className="w-6 h-6 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-lg mb-1">Incomplete Assessment</h4>
                        <p className="text-sm">You have answered {answeredCount} out of {totalQuestions} questions. Please complete all questions (select &quot;I don&apos;t know / Unable to access&quot; if you are unsure).</p>
                      </div>
                    </div>
                  )}

                  <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 space-y-4">
                    <h4 className="font-bold text-[#0D1117] text-lg font-display">Privacy Notice & Consent</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#003DA5]/40 mt-1.5 mr-3 flex-shrink-0" />
                        No personal name, email, or phone number is collected.
                      </li>
                      <li className="flex items-start text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#003DA5]/40 mt-1.5 mr-3 flex-shrink-0" />
                        Responses will be aggregated for assessment analysis.
                      </li>
                      <li className="flex items-start text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#003DA5]/40 mt-1.5 mr-3 flex-shrink-0" />
                        Organization names may be used for internal validation but not public attribution.
                      </li>
                    </ul>

                    <label className="flex items-center gap-4 pt-6 border-t border-gray-200 mt-6 cursor-pointer group">
                      <div className="pt-0.5">
                        <input
                          type="checkbox"
                          checked={hasConsented}
                          onChange={(e) => setHasConsented(e.target.checked)}
                          className="w-6 h-6 rounded border-gray-300 text-[#003DA5] focus:ring-[#003DA5] cursor-pointer"
                        />
                      </div>
                      <span className="font-bold text-[#0D1117] text-base md:text-lg group-hover:text-[#003DA5] transition-colors">
                        I agree to submit my responses under these terms.
                      </span>
                    </label>
                  </div>

                  <Button
                    onClick={handleSubmit}
                    disabled={!isComplete || isSubmitting}
                    className="w-full py-8 text-lg font-bold rounded-xl mt-4 bg-[#003DA5] hover:bg-[#1A56C4] disabled:bg-gray-300 disabled:text-gray-500 shadow-md transition-all"
                  >
                    {isSubmitting ? "Submitting securely..." : "Submit Assessment"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Footer Navigation */}
          <div className="flex justify-between items-center pt-8 mt-8 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => {
                if (currentSectionIndex > 0) {
                  setCurrentSectionIndex(p => p - 1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              disabled={currentSectionIndex === 0}
              className="px-8 py-6 text-sm font-bold rounded-xl border-2 border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              Back
            </Button>
            <Button
              onClick={() => {
                if (currentSectionIndex < sections.length - 1) {
                  setCurrentSectionIndex(p => p + 1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              disabled={currentSectionIndex === sections.length - 1 || (currentSection === 'profile' && !isDetailsComplete)}
              className="px-8 py-6 text-sm font-bold rounded-xl bg-[#003DA5] hover:bg-[#1A56C4] text-white shadow-md disabled:bg-gray-200 disabled:text-gray-400"
            >
              Continue to Next Pillar
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}