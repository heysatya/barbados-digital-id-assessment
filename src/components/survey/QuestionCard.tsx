'use client';

import MaturityOptions from '@/components/survey/MaturityOptions';
import { FrameworkQuestion } from '@/data/frameworkQuestions';

interface Props {
  question: FrameworkQuestion;
  questionIndex: number;
  totalInSubpillar: number;
  selectedScore: number | undefined;
  evidenceText: string;
  onScoreChange: (qCode: string, score: number) => void;
  onEvidenceChange: (qCode: string, text: string) => void;
}

export default function QuestionCard({
  question,
  questionIndex,
  totalInSubpillar,
  selectedScore,
  evidenceText,
  onScoreChange,
  onEvidenceChange,
}: Props) {
  return (
    <div className="bg-bg-primary border border-border-muted rounded-2xl p-8 shadow-card mb-6">

      {/* Metadata strip */}
      <div className="flex items-center justify-between mb-6">
        <span className="font-mono text-[0.75rem] bg-bg-surface text-text-tertiary px-2 py-1 rounded-md leading-none tracking-wide">
          {question.q_code}
        </span>
        <span className="text-[0.75rem] text-text-tertiary font-sans leading-none">
          Q {questionIndex + 1} of {totalInSubpillar} · {question.subpillar_code}
        </span>
      </div>

      {/* Question text — font-medium per Section 8.1 */}
      <h3 className="font-sans font-medium text-[1.125rem] leading-[1.4] text-text-primary mb-8">
        {question.question_text}
      </h3>

      {/* Maturity options — Section 7.5 */}
      <MaturityOptions
        qCode={question.q_code}
        selectedScore={selectedScore}
        options={question.options}
        onChange={(score) => onScoreChange(question.q_code, score)}
      />

      {/* Evidence field */}
      <div className="mt-6 pt-6 border-t border-border-muted">
        <p className="font-sans text-[0.875rem] font-medium text-text-secondary mb-1">
          Supporting evidence or context
        </p>
        <p className="font-sans text-[0.75rem] text-text-tertiary mb-2">
          Do not include personal information
        </p>
        <textarea
          value={evidenceText}
          onChange={(e) => onEvidenceChange(question.q_code, e.target.value)}
          placeholder="Provide justification, policy references, or data links…"
          rows={3}
          className="w-full border border-border-muted rounded-lg p-3 text-[0.875rem] text-text-primary bg-bg-primary placeholder:text-text-tertiary focus:border-bbb-blue focus:ring-1 focus:ring-bbb-blue/20 outline-none transition-colors resize-y min-h-[72px] font-sans"
        />
      </div>
    </div>
  );
}
