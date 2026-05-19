'use client';

import { ArrowRight, Lock, Shield } from 'lucide-react';

interface LandingHeroProps {
  title: string;
  description: string;
  type: 'expert' | 'stakeholder';
  onStart: () => void;
  pillarHighlights?: string[];
}

export default function LandingHero({
  title,
  description,
  type,
  onStart,
  pillarHighlights,
}: LandingHeroProps) {
  return (
    <div className="min-h-screen bg-bg-secondary flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-3xl w-full mx-auto text-center">

        {/* Framework tag */}
        <span className="inline-flex items-center gap-2 bg-bbb-blue-muted text-bbb-blue text-[0.6875rem] font-bold px-3 py-1 rounded-full mb-8 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-bbb-blue" />
          {type === 'expert' ? 'Expert Diagnostic Assessment' : 'Stakeholder Inclusion Survey'}
        </span>

        {/* Headline — DM Serif Display per Section 8 */}
        <h1 className="font-display text-[3.5rem] leading-[1.1] tracking-[-0.02em] text-text-primary mb-4">
          {title}
        </h1>

        <p className="font-sans text-[1.0625rem] leading-relaxed text-text-secondary max-w-2xl mx-auto mb-10">
          {description}
        </p>

        {/* Pillar highlights */}
        {pillarHighlights && pillarHighlights.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2.5 mb-12">
            {pillarHighlights.map((pillar, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-bg-primary border border-border-muted text-[0.875rem] font-medium text-text-secondary shadow-card"
              >
                <Shield className="w-3.5 h-3.5 text-bbb-blue flex-shrink-0" />
                <span>{pillar}</span>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <button
          onClick={onStart}
          className="inline-flex items-center gap-3 bg-bbb-blue hover:bg-bbb-blue-hover text-white font-semibold text-[1.0625rem] px-8 py-4 rounded-xl shadow-lg shadow-bbb-blue/20 transition-all duration-150 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-bbb-blue/30 focus-visible:outline-none"
        >
          Start Assessment
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Trust strip */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-[0.75rem] text-text-tertiary">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" />
            No PII Collected
          </span>
          <span className="hidden sm:block text-border-muted">·</span>
          <span>✓ Rights-Respecting Design</span>
          <span className="hidden sm:block text-border-muted">·</span>
          <span>⚙ v3.0 Scoring Engine</span>
        </div>

        <p className="mt-6 text-[0.6875rem] text-text-tertiary uppercase tracking-[0.08em]">
          Barbados Digital ID Governance Assessment Framework — v3.0
        </p>
      </div>
    </div>
  );
}
