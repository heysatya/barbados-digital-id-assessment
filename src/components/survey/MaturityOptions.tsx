'use client';

interface Option {
  score: 1 | 2 | 3 | 4 | 5 | 9;
  label: string;
  description: string;
}

interface Props {
  qCode: string;
  selectedScore: number | undefined;
  options: Option[];
  onChange: (score: number) => void;
}

const SCORE_MATURITY: Record<number, string> = {
  1: 'Basic',
  2: 'Opportunistic',
  3: 'Systematic',
  4: 'Differentiating',
  5: 'Transformational',
  9: "I don't know",
};

export default function MaturityOptions({ qCode, selectedScore, options, onChange }: Props) {
  const regularOptions = options.filter(o => o.score !== 9);
  const unknownOption = options.find(o => o.score === 9);

  return (
    <div className="space-y-2.5" role="radiogroup" aria-label="Maturity level selection">
      {regularOptions.map((opt) => {
        const isSelected = selectedScore === opt.score;
        return (
          <label
            key={opt.score}
            htmlFor={`${qCode}-opt-${opt.score}`}
            className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-150 min-h-[52px] ${
              isSelected
                ? 'bg-bbb-blue-muted border-bbb-blue shadow-focus/10'
                : 'bg-bg-primary border-border-muted hover:bg-bg-secondary hover:border-bbb-blue/30'
            }`}
          >
            <input
              type="radio"
              id={`${qCode}-opt-${opt.score}`}
              name={`q-${qCode}`}
              value={opt.score}
              checked={isSelected}
              onChange={() => onChange(opt.score)}
              className="sr-only"
            />
            {/* Custom radio circle */}
            <div
              className={`mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                isSelected
                  ? 'border-bbb-blue bg-bbb-blue'
                  : 'border-border-muted bg-bg-primary'
              }`}
              aria-hidden="true"
            >
              {isSelected && (
                <div className="w-2 h-2 rounded-full bg-white" />
              )}
            </div>

            {/* Label + description */}
            <div className="flex-1 min-w-0">
              <p className={`font-sans font-semibold text-[0.875rem] ${isSelected ? 'text-bbb-blue' : 'text-text-primary'}`}>
                {opt.score} — {SCORE_MATURITY[opt.score] ?? opt.label}
              </p>
              <p className="font-sans text-[0.875rem] text-text-secondary mt-0.5 leading-relaxed">
                {opt.description}
              </p>
            </div>
          </label>
        );
      })}

      {/* "I don't know" — styled distinctly */}
      {unknownOption && (
        <label
          htmlFor={`${qCode}-opt-9`}
          className={`flex items-center gap-4 p-4 rounded-xl border border-dashed cursor-pointer transition-all duration-150 min-h-[52px] ${
            selectedScore === 9
              ? 'border-text-tertiary bg-bg-surface'
              : 'border-border-muted bg-bg-secondary hover:border-text-tertiary'
          }`}
        >
          <input
            type="radio"
            id={`${qCode}-opt-9`}
            name={`q-${qCode}`}
            value={9}
            checked={selectedScore === 9}
            onChange={() => onChange(9)}
            className="sr-only"
          />
          <div
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
              selectedScore === 9
                ? 'border-text-tertiary bg-text-tertiary'
                : 'border-border-muted bg-bg-primary'
            }`}
            aria-hidden="true"
          >
            {selectedScore === 9 && <div className="w-2 h-2 rounded-full bg-white" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-sans font-semibold text-[0.875rem] text-text-secondary italic">
              I don&apos;t know / Unable to assess
            </p>
          </div>
        </label>
      )}
    </div>
  );
}
