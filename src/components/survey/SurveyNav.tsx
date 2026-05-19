'use client';

import { CheckCircle2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { FrameworkQuestion } from '@/data/frameworkQuestions';

const PILLAR_COLORS: Record<string, string> = {
  P1: '#3B82F6', // blue
  P2: '#7C3AED', // purple
  P3: '#059669', // emerald
  P4: '#EA580C', // orange
  P5: '#E11D48', // rose
  P6: '#D97706', // amber
};

interface Pillar {
  code: string;
  name: string;
}

interface Props {
  pillars: Pillar[];
  filteredQuestions: FrameworkQuestion[];
  responses: Record<string, number>;
  currentSection: string;
  currentSectionIndex: number;
  sections: string[];
  isProfileComplete: boolean;
  answeredCount: number;
  totalQuestions: number;
  progress: number;
  mode: 'live' | 'test';
  onNavigate: (idx: number) => void;
}

export default function SurveyNav({
  pillars,
  filteredQuestions,
  responses,
  currentSectionIndex,
  sections,
  isProfileComplete,
  answeredCount,
  totalQuestions,
  progress,
  mode,
  onNavigate,
}: Props) {
  return (
    <nav className="flex flex-col h-full" aria-label="Assessment navigation">

      {/* Progress header */}
      <div className="p-5 border-b border-border-muted flex-shrink-0">
        <p className="font-sans font-semibold text-[1.125rem] text-text-primary mb-1 leading-tight">
          Assessment Progress
        </p>
        <div
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          className="mt-3"
        >
          <Progress value={progress} className="h-1.5 bg-bg-surface" />
        </div>
        <p className="mt-2 text-[0.75rem] text-text-tertiary font-sans">
          {answeredCount} of {totalQuestions} answered
        </p>
      </div>

      {/* Nav list */}
      <div className="flex-1 overflow-y-auto py-3">
        {sections.map((sec, idx) => {
          const isActive = idx === currentSectionIndex;
          const isLocked = sec !== 'profile' && !isProfileComplete;

          let label = '';
          let isComplete = false;
          let pillarColor = 'var(--color-bbb-blue)';

          if (sec === 'profile') {
            label = 'Organization Profile';
            isComplete = isProfileComplete;
            pillarColor = '#8A95A3';
          } else if (sec === 'review') {
            label = 'Finalize & Submit';
            pillarColor = '#8A95A3';
          } else {
            const p = pillars.find(ap => ap.code === sec);
            label = p?.name || sec;
            pillarColor = PILLAR_COLORS[sec] ?? 'var(--color-bbb-blue)';
            const pillarQs = filteredQuestions.filter(q => q.pillar_code === sec);
            const answeredInSec = pillarQs.filter(q => responses[q.q_code]).length;
            isComplete = pillarQs.length > 0 && answeredInSec === pillarQs.length;
          }

          return (
            <button
              key={sec}
              onClick={() => {
                if (isLocked) return;
                onNavigate(idx);
              }}
              disabled={isLocked}
              className={`w-full flex items-center gap-3 px-3 py-2.5 mx-2 rounded-lg text-left transition-colors duration-150 text-[0.875rem] disabled:opacity-40 disabled:cursor-not-allowed ${isActive
                ? 'bg-bbb-blue-muted text-bbb-blue font-semibold'
                : 'text-text-secondary hover:bg-bg-secondary hover:text-text-primary'
                }`}
              style={{ width: 'calc(100% - 1rem)' }}
            >
              {/* Pillar colour pip */}
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: isActive ? 'var(--color-bbb-blue)' : pillarColor }}
              />
              <span className="flex-1 truncate">{label}</span>
              {isComplete && !isActive && (
                <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" aria-label="Complete" />
              )}
            </button>
          );
        })}
      </div>

      {/* Mode indicator */}
      <div className="p-4 border-t border-border-muted flex-shrink-0">
        <div className="flex items-center gap-2 text-[0.75rem] text-text-tertiary font-sans">
          <span
            className={`w-2 h-2 rounded-full flex-shrink-0 ${mode === 'live' ? 'bg-success animate-pulse ring-2 ring-success/20' : 'bg-info ring-2 ring-info/20'
              }`}
          />
          {mode === 'live' ? 'Live Mode' : 'Test Mode'}
        </div>
      </div>
    </nav>
  );
}
