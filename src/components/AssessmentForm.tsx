"use client";

import { useState, Suspense, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { frameworkQuestions, FrameworkQuestion } from '@/data/frameworkQuestions';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Building2, 
  FileCheck2, 
  Send,
  Info,
  Lock,
  Loader2,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AssessmentFormProps {
  isStarted: boolean;
  survey_type: 'expert' | 'stakeholder';
}

function AssessmentFormContent({ isStarted, survey_type }: AssessmentFormProps) {
  const searchParams = useSearchParams();

  // URL parameters
  const mode = (searchParams.get('mode') as 'test' | 'live') || 'live';

  // State
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [evidence, setEvidence] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);

  const [details, setDetails] = useState({
    organization_name: '',
    organization_type: '',
    role_function: '',
    stakeholder_category: '',
    country: 'Barbados'
  });

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  // Initialize from localStorage if available
  useEffect(() => {
    const saved = localStorage.getItem(`assessment_progress_${survey_type}`);
    if (saved) {
      try {
        const { responses: r, evidence: e, details: d } = JSON.parse(saved);
        setResponses(r || {});
        setEvidence(e || {});
        setDetails(prev => ({ ...prev, ...d }));
      } catch (err: unknown) {
        console.error("Failed to load progress", err);
      }
    }
  }, [survey_type]);

  // Save to localStorage on change
  useEffect(() => {
    if (Object.keys(responses).length > 0 || details.organization_name) {
      localStorage.setItem(`assessment_progress_${survey_type}`, JSON.stringify({
        responses,
        evidence,
        details
      }));
    }
  }, [responses, evidence, details, survey_type]);

  // Filter questions by survey type
  const filteredQuestions = useMemo(() => {
    return frameworkQuestions.filter(q => q.survey_type === survey_type);
  }, [survey_type]);

  // Group by Pillars for navigation
  const activePillars = useMemo(() => {
    const pillars = new Map<string, string>();
    filteredQuestions.forEach(q => {
      pillars.set(q.pillar_code, q.pillar_name);
    });
    return Array.from(pillars.entries()).map(([code, name]) => ({ code, name }));
  }, [filteredQuestions]);

  const sections = ['profile', ...activePillars.map(p => p.code), 'review'];
  const currentSection = sections[currentSectionIndex];

  // Group current pillar's questions by sub-pillar
  const currentPillarQuestions = useMemo(() => {
    if (currentSection === 'profile' || currentSection === 'review') return {};

    const qs = filteredQuestions.filter(q => q.pillar_code === currentSection);
    return qs.reduce((acc, q) => {
      if (!acc[q.subpillar_name]) acc[q.subpillar_name] = [];
      acc[q.subpillar_name].push(q);
      return acc;
    }, {} as Record<string, FrameworkQuestion[]>);
  }, [currentSection, filteredQuestions]);

  // Validation
  const isProfileComplete = Boolean(
    details.organization_name && 
    details.organization_type && 
    details.role_function && 
    (survey_type === 'stakeholder' ? details.stakeholder_category : true)
  );

  const totalQuestions = filteredQuestions.length;
  const answeredCount = Object.keys(responses).length;
  const isAllAnswered = totalQuestions > 0 && answeredCount === totalQuestions;
  const isComplete = isAllAnswered && isProfileComplete && hasConsented;

  const progress = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;

  // Handlers
  const handleOptionChange = (qCode: string, score: number) => {
    setResponses(prev => ({ ...prev, [qCode]: score }));
  };

  const handleEvidenceChange = (qCode: string, text: string) => {
    setEvidence(prev => ({ ...prev, [qCode]: text }));
  };

  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setDetails(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = () => {
    if (currentSection === 'profile' && !isProfileComplete) return;
    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    if (!isComplete) return;
    setIsSubmitting(true);

    try {
      // 1. Create Assessment Session
      const { data: session, error: sessionError } = await supabase
        .from('assessment_sessions')
        .insert([{
          country: details.country,
          survey_type: survey_type,
          organization_name: details.organization_name,
          organization_type: details.organization_type,
          role_function: details.role_function,
          stakeholder_category: details.stakeholder_category || null,
          environment_mode: mode,
          rubric_version: '3.0',
          status: 'submitted'
        }])
        .select()
        .single();

      if (sessionError || !session) throw sessionError || new Error("Failed to create session");

      // 2. Insert Responses
      const responseInserts = filteredQuestions.map(q => ({
        assessment_id: session.id,
        q_code: q.q_code,
        pillar_code: q.pillar_code,
        subpillar_code: q.subpillar_code,
        score: responses[q.q_code],
        evidence_comment: evidence[q.q_code] || null
      }));

      const { error: responsesError } = await supabase
        .from('assessment_responses')
        .insert(responseInserts);

      if (responsesError) throw responsesError;

      // Clear progress
      localStorage.removeItem(`assessment_progress_${survey_type}`);
      
      // Redirect
      window.location.href = '/thank-you';
    } catch (err: unknown) {
      console.error("Submission error:", err);
      const message = err instanceof Error ? err.message : 'Unknown error';
      alert(`Error submitting assessment: ${message}`);
      setIsSubmitting(false);
    }
  };

  if (!isStarted) return null;

  return (
    <div className="min-h-screen bg-bg-secondary text-text-primary py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="sticky top-8 space-y-8 p-8 rounded-[2rem] bg-bg-primary border border-border-muted shadow-panel">
            <div>
              <h2 className="text-sm font-bold text-bbb-blue uppercase tracking-widest mb-6">
                Assessment Status
              </h2>
              <Progress value={progress} className="h-1.5 bg-bg-secondary" />
              <div className="flex justify-between mt-3 text-[10px] font-bold text-text-tertiary uppercase tracking-wider">
                <span>{answeredCount} / {totalQuestions} Indicators</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
            </div>

            <nav className="space-y-1.5">
              {sections.map((sec, idx) => {
                const isActive = idx === currentSectionIndex;
                let isCompleted = false;
                let label = "";
                let icon = <FileCheck2 className="w-4 h-4" />;

                if (sec === 'profile') {
                  isCompleted = isProfileComplete;
                  label = "Org Profile";
                  icon = <Building2 className="w-4 h-4" />;
                } else if (sec === 'review') {
                  isCompleted = isAllAnswered && hasConsented;
                  label = "Finalize";
                  icon = <Send className="w-4 h-4" />;
                } else {
                  const p = activePillars.find(ap => ap.code === sec);
                  label = p?.name || sec;
                  const pillarQs = filteredQuestions.filter(q => q.pillar_code === sec);
                  const answeredInSec = pillarQs.filter(q => responses[q.q_code]).length;
                  isCompleted = pillarQs.length > 0 && answeredInSec === pillarQs.length;
                }

                return (
                  <button
                    key={sec}
                    onClick={() => {
                      if (sec !== 'profile' && !isProfileComplete) return;
                      setCurrentSectionIndex(idx);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full flex items-center gap-3 p-3.5 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-bbb-blue-muted text-bbb-blue border border-bbb-blue/10' 
                        : 'text-text-tertiary hover:text-text-primary hover:bg-bg-secondary border border-transparent'
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg ${
                      isCompleted && !isActive ? 'bg-success-muted text-success' : 
                      isActive ? 'bg-bbb-blue text-white shadow-sm' : 'bg-bg-secondary'
                    }`}>
                      {isCompleted && !isActive ? <CheckCircle2 className="w-4 h-4" /> : icon}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.1em] truncate text-left">{label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="pt-6 border-t border-border-muted">
              <div className="flex items-center gap-2 text-[10px] font-bold text-text-tertiary uppercase tracking-widest">
                <div className={`w-2 h-2 rounded-full ${mode === 'live' ? 'bg-success shadow-[0_0_8px_rgba(34,197,94,0.3)]' : 'bg-warning'}`} />
                {mode} Environment
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="lg:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Profile Section */}
              {currentSection === 'profile' && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h1 className="text-4xl font-bold text-text-primary font-display">Organizational Context</h1>
                    <p className="text-text-secondary text-lg">Help us understand the framework of your evaluation. This data is strictly non-PII.</p>
                  </div>

                  <Card className="bg-bg-primary border-border-muted rounded-[2rem] shadow-panel overflow-hidden border-2">
                    <CardContent className="p-10 space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-label text-text-tertiary uppercase tracking-widest ml-1">Organization Name <span className="text-bbb-blue">*</span></label>
                          <input 
                            type="text" 
                            name="organization_name" 
                            value={details.organization_name} 
                            onChange={handleDetailsChange}
                            placeholder="e.g. Ministry of Industry"
                            className="w-full bg-bg-secondary border border-border-muted rounded-xl p-4 text-text-primary focus:ring-2 focus:ring-bbb-blue/20 focus:border-bbb-blue outline-none transition-all placeholder:text-text-tertiary/50"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-label text-text-tertiary uppercase tracking-widest ml-1">Organization Type <span className="text-bbb-blue">*</span></label>
                          <select 
                            name="organization_type" 
                            value={details.organization_type} 
                            onChange={handleDetailsChange}
                            className="w-full bg-bg-secondary border border-border-muted rounded-xl p-4 text-text-primary focus:ring-2 focus:ring-bbb-blue/20 focus:border-bbb-blue outline-none transition-all"
                          >
                            <option value="">Select Type</option>
                            <option value="Government">Government</option>
                            <option value="Private Sector">Private Sector</option>
                            <option value="Civil Society">Civil Society</option>
                            <option value="International Org">International Org</option>
                            <option value="Academic">Academic</option>
                          </select>
                        </div>
                        <div className="space-y-3">
                          <label className="text-label text-text-tertiary uppercase tracking-widest ml-1">Your Role / Function <span className="text-bbb-blue">*</span></label>
                          <input 
                            type="text" 
                            name="role_function" 
                            value={details.role_function} 
                            onChange={handleDetailsChange}
                            placeholder="e.g. Policy Advisor"
                            className="w-full bg-bg-secondary border border-border-muted rounded-xl p-4 text-text-primary focus:ring-2 focus:ring-bbb-blue/20 focus:border-bbb-blue outline-none transition-all placeholder:text-text-tertiary/50"
                          />
                        </div>
                        {survey_type === 'stakeholder' && (
                          <div className="space-y-3">
                            <label className="text-label text-text-tertiary uppercase tracking-widest ml-1">Stakeholder Category <span className="text-bbb-blue">*</span></label>
                            <select 
                              name="stakeholder_category" 
                              value={details.stakeholder_category} 
                              onChange={handleDetailsChange}
                              className="w-full bg-bg-secondary border border-border-muted rounded-xl p-4 text-text-primary focus:ring-2 focus:ring-bbb-blue/20 focus:border-bbb-blue outline-none transition-all"
                            >
                              <option value="">Select Category</option>
                              <option value="Government">Government</option>
                              <option value="Regulator">Regulator</option>
                              <option value="Private Sector">Private Sector</option>
                              <option value="Civil Society">Civil Society</option>
                              <option value="Academia">Academia</option>
                              <option value="Development Partner">Development Partner</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Pillar Questions */}
              {currentSection !== 'profile' && currentSection !== 'review' && (
                <div className="space-y-12">
                  <div className="space-y-3 border-b border-border-muted pb-8">
                    <h1 className="text-4xl font-bold text-text-primary font-display">
                      {activePillars.find(p => p.code === currentSection)?.name}
                    </h1>
                    <p className="text-text-secondary text-lg">Evaluate implementation status using the professional maturity rubric.</p>
                  </div>

                  {Object.entries(currentPillarQuestions).map(([subpillar, qs]) => (
                    <div key={subpillar} className="space-y-8">
                      <div className="flex items-center gap-4">
                        <h3 className="text-xs font-bold text-bbb-blue uppercase tracking-[0.25em] whitespace-nowrap">{subpillar}</h3>
                        <div className="h-px w-full bg-border-muted" />
                      </div>

                      <div className="space-y-8">
                        {qs.map((q) => (
                          <Card key={q.q_code} className="bg-bg-primary border-border-muted rounded-[2rem] overflow-hidden group hover:border-bbb-blue/30 transition-all shadow-panel hover:shadow-panel-hover">
                            <CardContent className="p-0">
                              <div className="p-10 space-y-8">
                                <div className="flex gap-6">
                                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-bbb-blue-muted text-bbb-blue flex items-center justify-center font-bold text-xs border border-bbb-blue/10">
                                    {q.q_code.split('.').pop()}
                                  </div>
                                  <h4 className="text-xl font-bold text-text-primary leading-tight font-display">{q.question_text}</h4>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                  {q.options.map(opt => (
                                    <button
                                      key={opt.score}
                                      onClick={() => handleOptionChange(q.q_code, opt.score)}
                                      className={`p-5 rounded-2xl border-2 text-left transition-all duration-300 ${
                                        responses[q.q_code] === opt.score 
                                          ? 'bg-bbb-blue/5 border-bbb-blue text-bbb-blue shadow-panel-hover' 
                                          : 'bg-bg-secondary border-transparent text-text-secondary hover:bg-bg-surface hover:border-bbb-blue/20'
                                      }`}
                                    >
                                      <div className="flex items-start gap-5">
                                        <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                                          responses[q.q_code] === opt.score ? 'border-bbb-blue bg-bbb-blue' : 'border-border-muted'
                                        }`}>
                                          {responses[q.q_code] === opt.score && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                                        </div>
                                        <div>
                                          <div className={`font-bold text-sm mb-1 ${responses[q.q_code] === opt.score ? 'text-bbb-blue' : 'text-text-primary'}`}>
                                            {opt.label}
                                          </div>
                                          <div className="text-xs opacity-70 leading-relaxed">{opt.description}</div>
                                        </div>
                                      </div>
                                    </button>
                                  ))}
                                </div>

                                <div className="pt-4">
                                  <button 
                                    onClick={() => {
                                      const el = document.getElementById(`evidence-${q.q_code}`);
                                      el?.classList.toggle('hidden');
                                    }}
                                    className="text-[10px] font-bold text-text-tertiary hover:text-bbb-blue uppercase tracking-widest flex items-center gap-2.5 transition-colors"
                                  >
                                    <Info className="w-3.5 h-3.5" />
                                    {evidence[q.q_code] ? 'Edit Support Evidence' : 'Add Narrative Evidence (Optional)'}
                                  </button>
                                  <textarea
                                    id={`evidence-${q.q_code}`}
                                    value={evidence[q.q_code] || ''}
                                    onChange={(e) => handleEvidenceChange(q.q_code, e.target.value)}
                                    placeholder="Provide justification, policy references, or data links..."
                                    className={`mt-5 w-full bg-bg-secondary border border-border-muted rounded-2xl p-5 text-text-primary text-sm focus:ring-2 focus:ring-bbb-blue/20 focus:border-bbb-blue outline-none transition-all resize-none placeholder:text-text-tertiary/50 ${evidence[q.q_code] ? '' : 'hidden'}`}
                                    rows={4}
                                  />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Review Section */}
              {currentSection === 'review' && (
                <div className="space-y-10">
                  <div className="text-center space-y-4 py-8">
                    <div className="w-20 h-20 bg-bbb-blue-muted rounded-[2rem] flex items-center justify-center mx-auto border border-bbb-blue/10 shadow-sm">
                      <ShieldCheck className="w-10 h-10 text-bbb-blue" />
                    </div>
                    <h1 className="text-4xl font-bold text-text-primary font-display">Validation & Submission</h1>
                    <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
                      Please confirm that all indicators have been evaluated according to the professional maturity rubric.
                    </p>
                  </div>

                  <Card className="bg-bg-primary border-border-muted rounded-[2.5rem] shadow-panel border-2 max-w-2xl mx-auto overflow-hidden">
                    <CardContent className="p-10 space-y-10">
                      <div className="space-y-6">
                        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-text-tertiary">
                          <span>Institutional Indicators</span>
                          <span className="text-text-primary">{answeredCount} / {totalQuestions}</span>
                        </div>
                        <Progress value={progress} className="h-1.5 bg-bg-secondary" />
                        {!isAllAnswered && (
                           <div className="flex items-center gap-2.5 text-warning text-[10px] font-bold uppercase tracking-widest justify-center bg-warning/5 p-3 rounded-xl border border-warning/10">
                            <Info className="w-4 h-4" />
                            {totalQuestions - answeredCount} indicators require evaluation
                          </div>
                        )}
                      </div>

                      <div className={`p-8 rounded-3xl border-2 transition-all duration-300 ${
                        hasConsented ? 'bg-bbb-blue-muted border-bbb-blue/20' : 'bg-bg-secondary border-border-muted'
                      }`}>
                        <div className="flex items-start gap-5">
                          <div className="relative flex items-center">
                            <input 
                              type="checkbox" 
                              id="consent"
                              checked={hasConsented}
                              onChange={(e) => setHasConsented(e.target.checked)}
                              className="w-6 h-6 rounded-lg border-border-muted bg-white text-bbb-blue focus:ring-bbb-blue cursor-pointer"
                            />
                          </div>
                          <label htmlFor="consent" className="text-sm text-text-secondary leading-relaxed cursor-pointer select-none">
                            <span className="text-text-primary font-bold block mb-1 text-base">Methodology Attestation</span>
                            I certify that these responses represent an accurate assessment of Barbados&apos; Digital ID governance maturity as of {new Date().toLocaleDateString()}.
                            <span className="block mt-4 text-bbb-blue font-bold text-[10px] uppercase tracking-[0.15em] flex items-center gap-2">
                              <Lock className="w-4 h-4" /> Strictly Anonymized Analysis
                            </span>
                          </label>
                        </div>
                      </div>

                      <button 
                        onClick={handleSubmit}
                        disabled={!isComplete || isSubmitting}
                        className="btn-primary w-full h-16 text-lg flex items-center justify-center gap-4 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-6 h-6 animate-spin" />
                            Finalizing...
                          </>
                        ) : (
                          "Submit Institutional Assessment"
                        )}
                      </button>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="flex justify-between items-center py-12 border-t border-border-muted">
                <Button
                  variant="ghost"
                  onClick={handlePrev}
                  disabled={currentSectionIndex === 0}
                  className="px-10 h-14 text-text-tertiary hover:text-text-primary hover:bg-bg-secondary rounded-xl font-bold uppercase tracking-widest text-[10px]"
                >
                  <ChevronLeft className="w-5 h-5 mr-3" /> Previous Section
                </Button>

                {currentSection !== 'review' && (
                  <Button
                    onClick={handleNext}
                    disabled={currentSection === 'profile' && !isProfileComplete}
                    className="btn-primary px-12 h-14"
                  >
                    Continue <ChevronRight className="w-5 h-5 ml-3" />
                  </Button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default function AssessmentForm(props: AssessmentFormProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-bg-secondary flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-bbb-blue" />
          <span className="font-sans text-[0.6875rem] font-semibold text-text-tertiary uppercase tracking-widest">Loading Framework</span>
        </div>
      </div>
    }>
      <AssessmentFormContent {...props} />
    </Suspense>
  );
}