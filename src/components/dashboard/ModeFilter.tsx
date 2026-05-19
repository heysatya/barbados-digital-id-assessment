'use client';
// File: src/components/dashboard/ModeFilter.tsx
// Live/Test mode toggle for the admin dashboard.
// Usage: <ModeFilter activeMode={mode} onModeChange={setMode} />

interface ModeFilterProps {
  activeMode: 'live' | 'test';
  onModeChange: (mode: 'live' | 'test') => void;
}

export default function ModeFilter({ activeMode, onModeChange }: ModeFilterProps) {
  return (
    <div className="flex items-center gap-3" role="group" aria-label="Data environment filter">
      <span className="text-[10px] font-black text-text-tertiary uppercase tracking-[0.25em] mr-1">
        Mode
      </span>

      {/* Live button */}
      <button
        id="mode-filter-live"
        onClick={() => onModeChange('live')}
        aria-pressed={activeMode === 'live'}
        className={`flex items-center gap-2.5 px-5 py-2.5 rounded-2xl text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-300 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-success/40 ${
          activeMode === 'live'
            ? 'bg-success-muted border-success/25 text-success shadow-sm shadow-success/10'
            : 'bg-bg-primary border-border-muted text-text-tertiary hover:border-success/20 hover:text-success'
        }`}
      >
        <span
          className={`w-2 h-2 rounded-full flex-shrink-0 ${
            activeMode === 'live' ? 'bg-success animate-pulse' : 'bg-text-tertiary/40'
          }`}
          aria-hidden="true"
        />
        Live
      </button>

      {/* Test button */}
      <button
        id="mode-filter-test"
        onClick={() => onModeChange('test')}
        aria-pressed={activeMode === 'test'}
        className={`flex items-center gap-2.5 px-5 py-2.5 rounded-2xl text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-300 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bbb-blue/40 ${
          activeMode === 'test'
            ? 'bg-bbb-blue-muted border-bbb-blue/25 text-bbb-blue shadow-sm shadow-bbb-blue/10'
            : 'bg-bg-primary border-border-muted text-text-tertiary hover:border-bbb-blue/20 hover:text-bbb-blue'
        }`}
      >
        <span
          className={`w-2 h-2 rounded-full flex-shrink-0 ${
            activeMode === 'test' ? 'bg-bbb-blue' : 'bg-text-tertiary/40'
          }`}
          aria-hidden="true"
        />
        Test
      </button>
    </div>
  );
}
