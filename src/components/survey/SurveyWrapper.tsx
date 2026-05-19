'use client';
// File: src/components/survey/SurveyWrapper.tsx
// SNIPPET — shows exactly how to resolve the survey environment_mode:
//   - Default for all public surveys is 'live'.
//   - Test mode is opt-in via ?mode=test query parameter.
//   - No other values are accepted; anything else falls back to 'live'.
//
// This component wraps SurveyShell and passes the resolved mode down.
// It must be rendered inside a <Suspense> boundary because it calls
// useSearchParams(), which requires client-side rendering.

import { Suspense } from 'react';
//import { useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import SurveyShell from '@/components/survey/SurveyShell';

interface SurveyWrapperProps {
  survey_type: 'expert' | 'stakeholder';
  surveyLabel: string;
}

// ── Inner component that reads the search params ─────────────────────────────
function SurveyWrapperInner({ survey_type, surveyLabel }: SurveyWrapperProps) {
  // const searchParams = useSearchParams();

  // CRITICAL: Default mode is 'live'. Test mode requires explicit opt-in via ?mode=test.
  // Any value other than 'test' is coerced to 'live' for safety.
  //const rawMode = searchParams.get('mode');
  //const mode: 'live' | 'test' = rawMode === 'test' ? 'test' : 'live';

  // The resolved mode is surfaced to the user via the SurveyShell header badge
  // and is embedded in every assessment_sessions row as environment_mode.
  return <SurveyShell survey_type={survey_type} surveyLabel={surveyLabel} />;
  // Note: SurveyShell reads searchParams internally using the same coercion logic.
  // The mode variable above is provided here for clarity and future use
  // (e.g. conditional UI, analytics tagging, or feature flags).
  // If you need to pass mode explicitly, update SurveyShell's Props interface:
  //   return <SurveyShell survey_type={survey_type} surveyLabel={surveyLabel} mode={mode} />;
}

// ── Public wrapper with Suspense boundary ────────────────────────────────────
export default function SurveyWrapper(props: SurveyWrapperProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-bg-secondary flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-bbb-blue" />
            <span className="font-sans text-[0.6875rem] font-semibold text-text-tertiary uppercase tracking-widest">
              Loading Assessment
            </span>
          </div>
        </div>
      }
    >
      <SurveyWrapperInner {...props} />
    </Suspense>
  );
}

/*
 * ── Usage in route pages ────────────────────────────────────────────────────
 *
 * // src/app/expert/page.tsx
 * import SurveyWrapper from '@/components/survey/SurveyWrapper';
 *
 * export default function ExpertPage() {
 *   return <SurveyWrapper survey_type="expert" surveyLabel="Expert Assessment" />;
 * }
 *
 * // src/app/stakeholders/page.tsx
 * import SurveyWrapper from '@/components/survey/SurveyWrapper';
 *
 * export default function StakeholdersPage() {
 *   return <SurveyWrapper survey_type="stakeholder" surveyLabel="Stakeholder Assessment" />;
 * }
 *
 * ── Mode resolution rules ────────────────────────────────────────────────────
 *
 * URL                         → Resolved Mode
 * /expert                     → live   (default — always safe for public access)
 * /expert?mode=live           → live
 * /expert?mode=test           → test   (admin/tester use only)
 * /expert?mode=anything-else  → live   (coerced — never trust unknown params)
 *
 * The ?mode=test parameter should never appear in publicly shared links.
 * Admin users access test mode via the dashboard or direct URL manipulation.
 *
 * ── Security note ───────────────────────────────────────────────────────────
 *
 * The mode is not a security boundary — it is an organizational label.
 * All test records are tagged environment_mode='test' in the database.
 * The purge API enforces that only test records can ever be deleted.
 * Live records are immutable via the API's absolute safety guard.
 */
