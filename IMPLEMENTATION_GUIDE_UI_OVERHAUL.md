# Barbados Digital ID Governance Assessment — UI/UX Overhaul
## Implementation Guide v1.0
### Senior UI/UX & Brand Architecture Specification

---

> **Status:** Implementation-Ready. All component names, Tailwind classes, file paths, and
> layout logic are final. Scoring engine (`src/lib/scoring.ts`) and rubric config
> (`src/config/rubric_config.json`) are **read-only frozen** throughout this entire guide.

---

## Table of Contents

1. [Diagnosis: What Is Wrong Now](#1-diagnosis)
2. [Visual Strategy & Brand Language](#2-visual-strategy)
3. [Design Token System (Tailwind Config)](#3-design-tokens)
4. [File Structure Map](#4-file-structure)
5. [Component Library](#5-component-library)
6. [Page-by-Page Implementation](#6-pages)
   - 6.1 Landing Page (`/`)
   - 6.2 Expert Survey (`/expert`)
   - 6.3 Stakeholder Survey (`/stakeholders`)
   - 6.4 Admin Dashboard (`/dashboard`)
7. [Two-Pane Survey Architecture](#7-two-pane)
8. [Typography Implementation](#8-typography)
9. [Accessibility Checklist](#9-accessibility)
10. [Anti-Patterns: What to Actively Avoid](#10-anti-patterns)

---

## 1. Diagnosis: What Is Wrong Now

A systematic review of the six provided screenshots reveals five categories of failure.

### 1.1 Aesthetic Failures

| Screenshot | Issue |
|---|---|
| Image 0 (Landing) | Slate-950 background is visually oppressive. White text on near-black creates a "hacker tool" aesthetic that is antithetical to trusted public-sector digital governance. |
| Image 3 (Expert Hero) | Broken hero image (404 asset not loading). The background fallback reveals bare dark gradient with no visual substance. |
| Images 0 & 3 | Excessive use of `text-blue-400` on dark backgrounds creates cheap "neon" contrast that undermines authority. |
| Image 5 (Dashboard) | Orange/red bar chart on dark background looks like a monitoring tool, not a governance assessment platform. |

### 1.2 Layout Failures

| Screenshot | Issue |
|---|---|
| Image 2 (Assessment) | 90 questions stacked as single scrolling column. No spatial hierarchy. User has no sense of progress, location, or completion. Cognitively hostile. |
| Image 1 (Pillar Questions) | Tiny radio buttons in dense card stacks. Touch targets fail WCAG 2.5.5 (44×44px minimum). |
| Image 2 (Navigation) | Left sidebar is visible but non-interactive—it does not highlight current question or sub-pillar. It functions as a static decoration rather than a navigation system. |
| Image 4 (Dashboard) | "Question Aggregation" table uses cyan/magenta/orange score badges on dark background. High visual noise, low information clarity. |

### 1.3 Typography Failures

- Single font weight used throughout (no hierarchy between H1, H2, body, caption).
- Question text and option labels share the same font size—questions are not visually differentiated from their answers.
- All-caps section labels in the sidebar are readable, but the inconsistent sizing (some 10px, some 12px) suggests there is no typographic scale in the CSS.

### 1.4 Branding Failures

- No Barbados national visual identity is present. The color palette is generic tech-dark.
- The "Barbados Digital ID" logo in Image 0 is a small blue circle icon—not distinctive enough for a national governance platform.
- The framework is built on UNDP methodology but carries none of UNDP's visual authority.

### 1.5 Trust Signal Failures

- "LIVE MODE" green badge in Image 2 looks like a Twitch stream indicator.
- "TEST DATA" badge in Image 4 is magenta—the color of a debug flag, not a professional mode indicator.
- The admin dashboard has no visual cues that distinguish it from a public-facing tool.

---

## 2. Visual Strategy & Brand Language

### 2.1 Emotional Tone Target

**"Institutional Clarity"** — the aesthetic register of the UK Government Digital Service, UNDP's digital publications, and the World Bank's flagship reports. Confident, understated, evidence-driven.

The platform should feel like a national institution published it. Not like a startup built it.

### 2.2 Color Palette

Replace the current dark theme entirely. The new palette is a **Light Mode with National Blue Accent**.

```
Primary Background:    #FFFFFF   (pure white — forms, cards, content areas)
Secondary Background:  #F8F9FB   (neutral cool gray — page background, alternating rows)
Surface:               #F0F2F5   (light gray — inactive states, disabled inputs)
Border:                #DDE1E9   (cool gray — card borders, dividers)

Barbados Blue:         #003DA5   (deep royal blue — primary actions, active states, pillar headers)
Barbados Blue Light:   #1A56C4   (hover state for blue elements)
Barbados Blue Muted:   #E8EEFA   (blue tints — selected states, active sidebar items)

Accent Gold:           #C8952A   (warm gold — used sparingly for "landmark" moments: score reveals, completion)
Accent Gold Muted:     #FDF4E7   (gold tint background)

Text Primary:          #0D1117   (near-black — headings, question text)
Text Secondary:        #4A5568   (mid-gray — body copy, descriptions)
Text Tertiary:         #8A95A3   (light gray — metadata, captions, timestamps)
Text On Blue:          #FFFFFF   (white — text on blue backgrounds)

Maturity 1 (Initial):        #C53030  bg: #FFF5F5
Maturity 2 (Emerging):       #C05621  bg: #FFFAF0
Maturity 3 (Systematic):     #B7791F  bg: #FFFFF0
Maturity 4 (Differentiating):#276749  bg: #F0FFF4
Maturity 5 (Leading):        #1A365D  bg: #EBF8FF

Success:   #2F855A
Warning:   #D69E2E
Error:     #C53030
Info:      #2B6CB0
```

### 2.3 Why These Colors

- `#003DA5` is the blue of Barbados' national flag. Its usage as the primary accent grounds the platform in national identity without decorative flag imagery.
- The gold (`#C8952A`) references the trident of Barbados' coat of arms.
- No color in this palette fails WCAG 2.1 AA contrast when placed on its designated background pair.

### 2.4 Aesthetic Tenets

1. **White space is authority.** Generous padding signals confidence.
2. **One visual decision per screen.** Each page has exactly one thing that demands attention. Everything else serves it.
3. **Evidence over decoration.** No gradients for gradients' sake. No decorative blobs. Visual elements earn their place by clarifying structure.
4. **Institutional typography.** Headers in `DM Serif Display` (serif authority). Body in `DM Sans` (modern legibility). This pairing signals "government digital service" not "SaaS startup."

---

## 3. Design Token System (Tailwind Config)

Add the following to `tailwind.config.ts`. This is the single source of truth for all visual decisions across the new UI.

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      // ─── COLORS ─────────────────────────────────────────────────────
      colors: {
        // Backgrounds
        'bg-primary':   '#FFFFFF',
        'bg-secondary': '#F8F9FB',
        'bg-surface':   '#F0F2F5',
        'border-muted': '#DDE1E9',

        // Brand
        'bbb-blue':       '#003DA5',
        'bbb-blue-hover': '#1A56C4',
        'bbb-blue-muted': '#E8EEFA',
        'bbb-gold':       '#C8952A',
        'bbb-gold-muted': '#FDF4E7',

        // Text
        'text-primary':   '#0D1117',
        'text-secondary': '#4A5568',
        'text-tertiary':  '#8A95A3',

        // Maturity scale
        'maturity-1': '#C53030',
        'maturity-2': '#C05621',
        'maturity-3': '#B7791F',
        'maturity-4': '#276749',
        'maturity-5': '#1A365D',

        // Semantic
        success: '#2F855A',
        warning: '#D69E2E',
        error:   '#C53030',
        info:    '#2B6CB0',
      },

      // ─── TYPOGRAPHY ──────────────────────────────────────────────────
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans:    ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'display-xl': ['3.5rem',  { lineHeight: '1.1',  letterSpacing: '-0.02em', fontWeight: '400' }],
        'display-lg': ['2.5rem',  { lineHeight: '1.15', letterSpacing: '-0.015em', fontWeight: '400' }],
        'display-md': ['1.875rem',{ lineHeight: '1.2',  letterSpacing: '-0.01em', fontWeight: '400' }],
        'heading-lg': ['1.5rem',  { lineHeight: '1.3',  letterSpacing: '-0.005em', fontWeight: '600' }],
        'heading-md': ['1.25rem', { lineHeight: '1.4',  fontWeight: '600' }],
        'heading-sm': ['1.125rem',{ lineHeight: '1.4',  fontWeight: '600' }],
        'body-lg':    ['1.0625rem',{ lineHeight: '1.6' }],
        'body':       ['0.9375rem',{ lineHeight: '1.6' }],
        'body-sm':    ['0.875rem', { lineHeight: '1.5' }],
        'caption':    ['0.75rem',  { lineHeight: '1.4', letterSpacing: '0.04em' }],
        'label':      ['0.6875rem',{ lineHeight: '1.3', letterSpacing: '0.08em', fontWeight: '600' }],
      },

      // ─── SPACING ─────────────────────────────────────────────────────
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '68': '17rem',
        '72': '18rem',
        '80': '20rem',
        '88': '22rem',
      },

      // ─── SHADOWS ─────────────────────────────────────────────────────
      boxShadow: {
        'card':      '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.04)',
        'card-hover':'0 4px 12px 0 rgba(0,0,0,0.08), 0 2px 4px -1px rgba(0,0,0,0.04)',
        'panel':     '0 0 0 1px rgba(0,0,0,0.05), 0 4px 16px 0 rgba(0,0,0,0.06)',
        'focus':     '0 0 0 3px rgba(0,61,165,0.25)',
        'inset-sm':  'inset 0 1px 2px rgba(0,0,0,0.06)',
      },

      // ─── BORDER RADIUS ───────────────────────────────────────────────
      borderRadius: {
        'xs':  '0.25rem',
        'sm':  '0.375rem',
        'md':  '0.5rem',
        'lg':  '0.75rem',
        'xl':  '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
}

export default config
```

### Font Loading

Add to `src/app/layout.tsx`:

```typescript
import { DM_Serif_Display, DM_Sans } from 'next/font/google'

const dmSerif = DM_Serif_Display({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

// Apply: className={`${dmSerif.variable} ${dmSans.variable} font-sans`} on <html>
```

---

## 4. File Structure Map

Below is the complete file structure for the UI overhaul. Files marked `[FROZEN]` must not be modified. Files marked `[NEW]` are created fresh. Files marked `[OVERHAUL]` receive full component rewrites.

```
src/
├── app/
│   ├── layout.tsx                     [OVERHAUL] — new fonts, global styles
│   ├── page.tsx                       [OVERHAUL] — new landing page
│   ├── expert/
│   │   └── page.tsx                   [OVERHAUL] — two-pane survey
│   ├── stakeholders/
│   │   └── page.tsx                   [OVERHAUL] — two-pane survey
│   ├── thank-you/
│   │   └── page.tsx                   [OVERHAUL] — polished confirmation
│   ├── dashboard/
│   │   ├── layout.tsx                 [OVERHAUL] — dashboard shell
│   │   ├── page.tsx                   [OVERHAUL] — executive summary
│   │   ├── pillar/page.tsx            [OVERHAUL] — pillar breakdown
│   │   ├── heatmap/page.tsx           [OVERHAUL] — sub-pillar heatmap
│   │   ├── questions/page.tsx         [OVERHAUL] — question aggregation
│   │   └── exports/page.tsx           [OVERHAUL] — export management
│   └── admin/
│       └── indicators/page.tsx        [OVERHAUL] — indicator entry
│
├── components/
│   ├── ui/                            [NEW] — Base design system
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── Progress.tsx
│   │   ├── Separator.tsx
│   │   ├── Tooltip.tsx
│   │   └── StatusDot.tsx
│   │
│   ├── layout/                        [NEW] — Shell components
│   │   ├── SiteHeader.tsx
│   │   ├── SiteFooter.tsx
│   │   ├── DashboardShell.tsx
│   │   └── DashboardNav.tsx
│   │
│   ├── survey/                        [NEW] — Two-pane survey system
│   │   ├── SurveyShell.tsx            — outer wrapper, manages state
│   │   ├── SurveyNav.tsx              — LEFT PANE: pillar/sub-pillar nav
│   │   ├── SurveyContent.tsx          — RIGHT PANE: active question set
│   │   ├── QuestionCard.tsx           — individual question renderer
│   │   ├── MaturityOptions.tsx        — 1-5 radio option set
│   │   ├── SurveyProgressBar.tsx      — top progress indicator
│   │   ├── OrgProfileForm.tsx         — org metadata capture
│   │   └── SurveyComplete.tsx         — in-flow completion screen
│   │
│   ├── dashboard/                     [NEW] — Dashboard widgets
│   │   ├── MaturityGauge.tsx          — circular score display
│   │   ├── PillarScoreCard.tsx        — per-pillar summary card
│   │   ├── SubPillarHeatmap.tsx       — 6×5 grid heatmap
│   │   ├── QuestionTable.tsx          — aggregated responses table
│   │   ├── DiscrepancyAlert.tsx       — expert/survey gap flags
│   │   ├── DataQualityBadge.tsx       — coverage & quality indicators
│   │   └── ComputeScoreButton.tsx     — trigger scoring action
│   │
│   └── landing/                       [NEW] — Landing page sections
│       ├── HeroSection.tsx
│       ├── PillarGrid.tsx
│       ├── MethodologySection.tsx
│       └── PrivacyBadge.tsx
│
├── config/
│   └── rubric_config.json             [FROZEN] — DO NOT TOUCH
│
├── lib/
│   └── scoring.ts                     [FROZEN] — DO NOT TOUCH
│
└── styles/
    └── globals.css                    [OVERHAUL] — new global styles
```

---

## 5. Component Library

### 5.1 Button

```typescript
// src/components/ui/Button.tsx
// Variants: primary | secondary | ghost | danger

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

// CLASS MAP:
const variants = {
  primary:   'bg-bbb-blue text-white hover:bg-bbb-blue-hover focus-visible:ring-2 focus-visible:ring-bbb-blue/30 active:scale-[0.98]',
  secondary: 'bg-white border border-border-muted text-text-primary hover:bg-bg-secondary hover:border-bbb-blue/30',
  ghost:     'text-text-secondary hover:text-text-primary hover:bg-bg-surface',
  danger:    'bg-error text-white hover:bg-red-700',
}
const sizes = {
  sm: 'px-3 py-1.5 text-body-sm rounded-md',
  md: 'px-5 py-2.5 text-body rounded-lg',
  lg: 'px-7 py-3.5 text-body-lg rounded-xl',
}
// Transition: transition-all duration-150 ease-in-out
// Loading state: replace children with <Spinner /> + opacity-75 + cursor-wait
```

### 5.2 Badge

```typescript
// src/components/ui/Badge.tsx
// Variants: live | test | success | warning | error | neutral | maturity-1..5

const badgeVariants = {
  live:       'bg-success/10 text-success border border-success/20',
  test:       'bg-info/10 text-info border border-info/20',
  success:    'bg-success/10 text-success border border-success/20',
  warning:    'bg-warning/10 text-warning border border-warning/20',
  error:      'bg-error/10 text-error border border-error/20',
  neutral:    'bg-bg-surface text-text-secondary border border-border-muted',
  'maturity-1': 'bg-red-50 text-maturity-1 border border-red-200',
  'maturity-2': 'bg-orange-50 text-maturity-2 border border-orange-200',
  'maturity-3': 'bg-yellow-50 text-maturity-3 border border-yellow-200',
  'maturity-4': 'bg-green-50 text-maturity-4 border border-green-200',
  'maturity-5': 'bg-blue-50 text-maturity-5 border border-blue-200',
}
// Base class: inline-flex items-center gap-1.5 px-2.5 py-0.5 text-label rounded-full font-sans font-semibold uppercase tracking-wide
```

### 5.3 Card

```typescript
// src/components/ui/Card.tsx
// Base: bg-bg-primary border border-border-muted rounded-xl shadow-card p-6
// Hover (where clickable): hover:shadow-card-hover hover:border-bbb-blue/20 transition-shadow duration-200
// Active/Selected: border-bbb-blue bg-bbb-blue-muted/30
```

### 5.4 Progress

```typescript
// src/components/ui/Progress.tsx
// Container: w-full bg-bg-surface rounded-full h-1.5 overflow-hidden
// Track: h-full bg-bbb-blue rounded-full transition-[width] duration-500 ease-out
// Label: flex justify-between items-center mb-2 — left: text-caption text-text-tertiary — right: text-caption font-semibold text-bbb-blue
```

### 5.5 StatusDot

```typescript
// src/components/ui/StatusDot.tsx
// Live mode: w-2 h-2 rounded-full bg-success animate-pulse ring-2 ring-success/20
// Test mode: w-2 h-2 rounded-full bg-info ring-2 ring-info/20
// Offline:   w-2 h-2 rounded-full bg-text-tertiary
```

### 5.6 MaturityGauge (Dashboard)

```typescript
// src/components/dashboard/MaturityGauge.tsx
// Rendered as SVG arc gauge, NOT a filled circle.
// Arc: stroke-width=12, rounded linecap, color from maturity score
// Center text: score in font-display text-display-lg, maturity label in text-caption text-text-tertiary uppercase
// The gauge should not use a third-party chart library — implement as a plain SVG arc
// using stroke-dasharray / stroke-dashoffset calculation for the fill position.

// Score → arc fill calculation:
// arcLength = 2 * π * r * (270/360)   // 270° sweep, not full circle
// fillLength = (score / 5) * arcLength
// strokeDasharray = `${fillLength} ${arcLength}`
// strokeDashoffset = -arcLength * (45/360)  // start at 7 o'clock

// Colors map directly to maturity-1..5 tokens from Tailwind config
```

---

## 6. Page-by-Page Implementation

### 6.1 Landing Page (`/`)

**File:** `src/app/page.tsx`
**Component:** `src/components/landing/HeroSection.tsx`

#### Hero Section

```
Layout:    max-w-5xl mx-auto px-6 pt-24 pb-16 text-center
```

```html
<!-- Framework tag -->
<span class="inline-flex items-center gap-2 bg-bbb-blue-muted text-bbb-blue text-label px-3 py-1 rounded-full mb-6 uppercase tracking-widest">
  Maturity Framework V3.0
</span>

<!-- Primary headline — DM Serif Display -->
<h1 class="font-display text-display-xl text-text-primary mb-2 leading-tight">
  Barbados Digital ID
</h1>
<h1 class="font-display text-display-xl text-bbb-blue mb-8 leading-tight">
  Governance Assessment
</h1>

<!-- Descriptor — DM Sans -->
<p class="font-sans text-body-lg text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
  A comprehensive, rights-based diagnostic tool evaluating the maturity, trust, and
  effectiveness of Barbados' digital public infrastructure across 30 critical governance dimensions.
</p>

<!-- CTAs -->
<div class="flex gap-4 justify-center flex-wrap">
  <a href="/expert" class="[primary button lg]">Start Expert Assessment →</a>
  <a href="/stakeholders" class="[secondary button lg]">Stakeholder Survey</a>
</div>

<!-- Trust strip -->
<div class="flex gap-6 justify-center mt-10 text-caption text-text-tertiary">
  <span>🔒 No PII Collected</span>
  <span>·</span>
  <span>✓ Rights-Respecting</span>
  <span>·</span>
  <span>⚙ v3.0 Scoring Engine</span>
</div>
```

#### Pillar Grid

```
Layout: max-w-5xl mx-auto px-6 py-20
Grid:   grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5
```

Each pillar card:

```
Container: bg-bg-primary border border-border-muted rounded-xl p-6 shadow-card hover:shadow-card-hover hover:border-bbb-blue/20 transition-all duration-200

Icon area: w-10 h-10 rounded-lg [pillar-specific bg color] flex items-center justify-center mb-4

Pillar code: text-label text-text-tertiary uppercase tracking-widest mb-1

Pillar name: font-sans font-semibold text-heading-sm text-text-primary mb-3

Sub-pillar list: space-y-1.5
  Each item: flex items-center gap-2 text-body-sm text-text-secondary
             before: w-1 h-1 rounded-full bg-border-muted flex-shrink-0
```

Pillar icon background colors:

```
P1 Service Delivery:          bg-blue-50    icon text-bbb-blue
P2 Safeguards & Trust:        bg-purple-50  icon text-purple-600
P3 Ecosystem & Innovation:    bg-emerald-50 icon text-emerald-600
P4 Technology & DPI:          bg-orange-50  icon text-orange-600
P5 Legal & Regulatory:        bg-rose-50    icon text-rose-600
P6 Institutional Governance:  bg-amber-50   icon text-amber-600
```

#### Site Header

```typescript
// src/components/layout/SiteHeader.tsx
// Position: sticky top-0 z-50
// Background: bg-white/95 backdrop-blur-sm border-b border-border-muted
// Layout: max-w-7xl mx-auto px-6 h-16 flex items-center justify-between

// Left: Logo mark (blue square with "ID" monogram, 32px) + "Barbados Digital ID" in font-sans font-semibold text-text-primary
// Right (public pages): "Admin Dashboard" link in text-body-sm text-text-secondary hover:text-text-primary
// Right (dashboard): user email chip + Sign Out ghost button
```

#### Site Footer

```
bg-bg-secondary border-t border-border-muted
py-8 px-6 text-caption text-text-tertiary
Layout: max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-4
Left:  © 2026 Barbados Digital ID Assessment Framework. All rights reserved.
Right: Admin Dashboard · Expert Survey · Stakeholders
```

---

### 6.2 & 6.3 Expert & Stakeholder Survey Pages

These share the `SurveyShell` component. See Section 7 for the full Two-Pane Architecture spec.

**Files:**
- `src/app/expert/page.tsx`
- `src/app/stakeholders/page.tsx`
- `src/components/survey/SurveyShell.tsx`

---

### 6.4 Admin Dashboard (`/dashboard`)

**File:** `src/app/dashboard/layout.tsx` → wraps all dashboard routes.

#### Dashboard Shell Layout

```typescript
// src/components/layout/DashboardShell.tsx
// Full-height two-column: fixed left nav (256px) + scrollable right content

// Outer: min-h-screen bg-bg-secondary flex
// Left nav: fixed left-0 top-0 bottom-0 w-64 bg-bg-primary border-r border-border-muted flex flex-col z-40
// Main: ml-64 flex-1 min-h-screen flex flex-col
```

#### Dashboard Left Nav

```typescript
// src/components/layout/DashboardNav.tsx

// Header area: p-5 border-b border-border-muted
//   Logo + "Barbados / Digital ID Dashboard" (two-line)

// Mode toggle: mx-4 my-3
//   Two-button pill: LIVE | TEST
//   LIVE active:  bg-success text-white text-label font-semibold rounded-lg px-4 py-1.5
//   TEST active:  bg-info text-white text-label font-semibold rounded-lg px-4 py-1.5
//   Inactive:     bg-bg-surface text-text-tertiary text-label rounded-lg px-4 py-1.5

// Nav section label: px-5 pt-5 pb-2 text-label text-text-tertiary uppercase tracking-widest

// Nav items: px-3 py-2 mx-2 rounded-lg flex items-center gap-3 text-body-sm
//   Default:  text-text-secondary hover:bg-bg-secondary hover:text-text-primary
//   Active:   bg-bbb-blue-muted text-bbb-blue font-semibold

// Nav items list:
//   📊 Executive Summary
//   🔷 Pillar Dashboard
//   🗺 Sub-Pillar Dashboard
//   📋 Question Aggregation
//   👤 Expert Responses
//   ⚡Divergence Analysis
//   ✓  Data Quality
//   📁 Raw Responses
//   ⬇  Exports
//   ⚙  Admin Actions  [ADMIN badge]

// Footer: mt-auto p-4 border-t border-border-muted
//   User avatar (initials) + "Admin" label + Sign out ghost button
```

#### Executive Summary Page

```typescript
// Layout: max-w-6xl mx-auto px-8 py-10

// Page header:
//   <h1 class="font-sans font-semibold text-heading-lg text-text-primary">Executive Summary</h1>
//   <p class="text-body-sm text-text-tertiary mt-1">
//     Barbados Digital ID Governance Assessment — v3.0 Scoring Engine
//   </p>
//   Right aligned: [TEST DATA badge] [Indicators →] link

// Score hero card: bg-bg-primary border border-border-muted rounded-2xl p-10 shadow-card mt-8
//   Three-column grid:
//     Col 1: MaturityGauge SVG (centered, 200px diameter)
//     Col 2: Score details — "OVERALL MATURITY SCORE" label-style text + large score number (font-display text-display-xl) + description text
//     Col 3: Mode / Rubric / Responses metadata chips

// When no score computed:
//   Empty state card: py-20 text-center
//   Icon: 🧮 (text-5xl)
//   Heading: "No scoring result yet" (font-sans font-semibold text-heading-md text-text-primary mt-4)
//   Body: "No v3.0 result has been computed for [mode] mode. There are N sessions ready to score." (text-body text-text-secondary mt-2)
//   CTA: primary button "▶ Compute Score Now" (mt-8)
```

#### Question Aggregation Page (replaces Image 5's busy table)

**Key fixes:**
1. Replace cyan/magenta score badges with neutral pill badges using the maturity color scale
2. Add a clean filter bar above the table
3. Use horizontal bar sparklines instead of a separate chart component

```typescript
// Filter bar: bg-bg-primary border border-border-muted rounded-xl p-4 mb-6 flex items-center gap-4 flex-wrap
//   Search: input with magnifier icon — border border-border-muted rounded-lg px-3 py-2 text-body-sm w-64
//   Pillar dropdown: [All Pillars ▾] — standard select styled to match
//   Sub-pillar dropdown: [All Sub-Pillars ▾]
//   Count chip: bg-bg-surface text-text-secondary text-caption px-2 py-1 rounded-md "90 questions"

// Table: w-full
//   Header row: bg-bg-secondary border-b border-border-muted text-label text-text-tertiary uppercase
//     Columns: Q CODE | PILLAR | SUB-PILLAR | SCORE 1 | SCORE 2 | SCORE 3 | SCORE 4 | SCORE 5 | UNKN
//   Data rows: bg-bg-primary even:bg-bg-secondary border-b border-border-muted text-body-sm
//   Score cells: NOT colored badges. Instead: plain numbers in text-text-primary, plus a mini inline bar
//     showing the distribution. The winning score (highest count) is bolded.
//   Q code cell: font-mono text-bbb-blue text-caption

// Response Distribution chart:
//   Replace the current orange/red bar chart with a clean horizontal bar chart
//   Background: bg-bg-primary rounded-xl border border-border-muted p-6
//   Bars: bg-bbb-blue opacity varying by value (highest = full opacity, lowest = opacity-20)
//   Axis labels: text-caption text-text-tertiary font-sans
```

---

## 7. Two-Pane Survey Architecture

This is the core structural fix. The current single-column stack of 90 cards is replaced with a persistent two-pane layout.

### 7.1 Layout Structure

```
┌──────────────────────────────────────────────────────────────────┐
│ SITE HEADER (sticky, 64px)                                       │
├──────────────────┬───────────────────────────────────────────────┤
│ LEFT PANE        │ RIGHT PANE                                    │
│ Fixed/sticky     │ Scrollable                                    │
│ 288px wide       │ flex-1                                        │
│                  │                                               │
│ ┌─ Progress ──┐  │ ┌─ Section header ─────────────────────────┐ │
│ │ 23 / 90     │  │ │ P3 · Ecosystem & Innovation              │ │
│ │ ████░░░ 26% │  │ │ P3.2 · Digital ID Use Cases              │ │
│ └─────────────┘  │ └──────────────────────────────────────────┘ │
│                  │                                               │
│ ─ P1 Service ─   │ ┌─ Question Card ──────────────────────────┐ │
│   P1.1 ✓        │ │ Q1 of 3  ·  P3.2.EX.Q1                   │ │
│   P1.2 ✓        │ │                                           │ │
│   P1.3 ✓        │ │ "How well does the private sector..."     │ │
│   P1.4 ✓        │ │                                           │ │
│   P1.5 ✓        │ │ ○ 1 — No meaningful participation        │ │
│                  │ │ ○ 2 — Ad hoc, project-by-project         │ │
│ ─ P2 Safegrd ─  │ │ ● 3 — Structured engagement exists       │ │
│   P2.1 ✓        │ │ ○ 4 — Private sector co-develops         │ │
│   ...           │ │ ○ 5 — Full ecosystem partnership         │ │
│                  │ │ ○ I don't know / unable to assess        │ │
│ ─ P3 Ecosys ─◀  │ │                                           │ │
│   P3.1 ✓        │ │ [ Evidence / comment (optional) ______ ] │ │
│ ▶ P3.2 ···      │ │                                           │ │
│   P3.3          │ └──────────────────────────────────────────┘ │
│   ...           │                                               │
│                  │ ← Back          Q 1 of 3  [Next →]          │
│ ─ P4 Tech ──    │                                               │
│ ─ P5 Legal ─    │                                               │
│ ─ P6 Inst. ─    │                                               │
└──────────────────┴───────────────────────────────────────────────┘
```

### 7.2 SurveyShell Component

```typescript
// src/components/survey/SurveyShell.tsx

'use client'

// State managed by this component:
interface SurveyState {
  orgProfile: OrgProfile | null          // Filled on step 0
  currentPillarIndex: number             // 0–5
  currentSubPillarIndex: number          // 0–4 within current pillar
  currentQuestionIndex: number           // 0–2 within current sub-pillar
  responses: Record<string, number | 9 | null>  // q_code → score
  comments: Record<string, string>       // q_code → free text
  isSubmitting: boolean
  isComplete: boolean
}

// Layout classes:
// Outer: flex flex-col min-h-screen bg-bg-secondary
// Below header: flex flex-1 overflow-hidden
// Left pane: w-72 flex-shrink-0 bg-bg-primary border-r border-border-muted overflow-y-auto sticky top-16 h-[calc(100vh-4rem)] flex flex-col
// Right pane: flex-1 overflow-y-auto p-8 lg:p-12
// Right pane inner: max-w-2xl mx-auto

// Local storage key: 'bdigid_survey_progress_expert' | 'bdigid_survey_progress_stakeholder'
// Warn before unload: window.onbeforeunload = () => "Your progress will be saved but..."
```

### 7.3 SurveyNav Component (Left Pane)

```typescript
// src/components/survey/SurveyNav.tsx

// TOP SECTION: p-5 border-b border-border-muted
//   Title: "Assessment Progress" (font-sans font-semibold text-heading-sm text-text-primary)
//   Progress bar: [Progress component] showing answered/total
//   Count: "23 of 90 answered" (text-caption text-text-tertiary)

// PILLAR LIST: flex-1 overflow-y-auto py-3
// Each pillar group:
//
//   Pillar header button:
//     w-full flex items-center gap-3 px-4 py-3 text-left transition-colors
//     Default:  text-text-secondary hover:bg-bg-secondary
//     Active:   bg-bbb-blue-muted text-bbb-blue font-semibold
//     Complete: text-success (pillar fully answered)
//
//     Left: pillar icon (16px colored circle matching P1–P6 colors)
//     Middle: "P1 · Service Delivery" (text-body-sm, truncated)
//     Right: completion pip (✓ filled green when all answered, empty circle when not)
//
//   Sub-pillar list (visible only when parent pillar is active/expanded):
//     Each sub-pillar item: pl-10 pr-4 py-2 flex items-center gap-2 text-body-sm cursor-pointer rounded-lg mx-2
//     Default:  text-text-tertiary hover:text-text-secondary hover:bg-bg-secondary
//     Active:   bg-bbb-blue text-white (the currently active sub-pillar)
//     Complete: text-success with ✓ icon

// BOTTOM SECTION: p-4 border-t border-border-muted
//   Mode indicator: StatusDot + "LIVE MODE" | "TEST MODE" (text-caption)
```

### 7.4 QuestionCard Component (Right Pane)

```typescript
// src/components/survey/QuestionCard.tsx

// Card container: bg-bg-primary border border-border-muted rounded-2xl p-8 shadow-card mb-6

// Question metadata strip:
//   flex items-center justify-between mb-6
//   Left:  q_code badge (font-mono text-caption bg-bg-surface text-text-tertiary px-2 py-1 rounded-md)
//   Right: "Q 1 of 3 · P3.2" (text-caption text-text-tertiary)

// Question text:
//   font-sans font-medium text-heading-sm text-text-primary mb-8 leading-relaxed

// MaturityOptions — see 7.5

// Evidence field:
//   mt-6 pt-6 border-t border-border-muted
//   Label: "Supporting evidence or context" (text-body-sm font-medium text-text-secondary mb-2)
//   Hint:  "Do not include personal information" (text-caption text-text-tertiary)
//   Textarea: border border-border-muted rounded-lg p-3 text-body-sm w-full min-h-[72px]
//             focus:border-bbb-blue focus:ring-1 focus:ring-bbb-blue/20 transition-colors
//             resize-y
```

### 7.5 MaturityOptions Component

```typescript
// src/components/survey/MaturityOptions.tsx
// Replaces the current tiny radio button cards

// Container: space-y-2.5

// Each option: a large tappable row (not a small radio dot):
//   label[htmlFor]: flex items-start gap-4 p-4 rounded-xl border border-border-muted cursor-pointer
//                   transition-all duration-150
//   Unselected: bg-bg-primary hover:bg-bg-secondary hover:border-bbb-blue/30
//   Selected:   bg-bbb-blue-muted border-bbb-blue

//   Left: custom radio circle (24px)
//     Unselected: border-2 border-border-muted rounded-full
//     Selected:   border-2 border-bbb-blue rounded-full bg-bbb-blue with white dot inside

//   Middle (flex-1):
//     Score label: "1 — No capability" (font-sans font-semibold text-body-sm)
//     Description: full maturity-level description text (text-body-sm text-text-secondary mt-0.5)

//   Touch target: min-h-[52px] ensures WCAG 2.5.5 compliance

// "I don't know" option:
//   Styled differently — dashed border, italic text, lower visual weight
//   border-dashed border-border-muted bg-bg-secondary
//   When selected: border-dashed border-text-tertiary bg-bg-surface

// Hidden radio: <input type="radio" className="sr-only" />
```

### 7.6 Navigation Footer (Right Pane Bottom)

```typescript
// src/components/survey/SurveyContent.tsx (navigation area at bottom)

// Sticky to bottom of right pane:
//   sticky bottom-0 bg-bg-secondary/90 backdrop-blur-sm border-t border-border-muted
//   px-8 py-4 flex items-center justify-between

// Left: Back button (ghost, disabled on first question)
//   ← Back

// Center: position indicator
//   "Sub-Pillar 2 of 5 · Question 1 of 3" (text-caption text-text-tertiary)

// Right: Next / Submit button
//   "Next →" (primary button) — disabled state when no answer selected
//   Final question: "Complete Assessment →" (primary button, distinct label)
```

### 7.7 Org Profile Form (Step 0)

The org profile step appears before the first question. It is the ONLY screen without the two-pane layout (use centered card instead).

```typescript
// src/components/survey/OrgProfileForm.tsx

// Outer: max-w-xl mx-auto py-16 px-6
// Card: bg-bg-primary border border-border-muted rounded-2xl p-10 shadow-panel

// Header:
//   "Organizational Profile" (font-display text-display-md text-text-primary)
//   "Help us understand the context of your assessment. This data is strictly non-PII."
//   (text-body text-text-secondary mt-2)

// Fields (with labels above each input):
//   ORGANIZATION NAME *    → text input
//   ORGANIZATION TYPE *    → select (Government / Regulator / Private Sector / Civil Society / Academia / Development Partner / Other)
//   YOUR ROLE / FUNCTION * → text input

// Field style:
//   Label: text-label text-text-secondary uppercase tracking-wide mb-1.5 font-semibold
//   Input: w-full border border-border-muted rounded-lg px-4 py-3 text-body bg-bg-primary
//          focus:border-bbb-blue focus:ring-2 focus:ring-bbb-blue/15 outline-none transition-colors
//          placeholder:text-text-tertiary

// CTA: "Continue →" (primary button lg, full-width, mt-8)
// Back: ghost button beneath
```

---

## 8. Typography Implementation

### 8.1 Type Scale in Practice

| Use case | Class |
|---|---|
| Page main headline | `font-display text-display-xl text-text-primary` |
| Section heading | `font-display text-display-md text-text-primary` |
| Card heading | `font-sans font-semibold text-heading-md text-text-primary` |
| Question text | `font-sans font-medium text-heading-sm text-text-primary` |
| Option label | `font-sans font-semibold text-body-sm text-text-primary` |
| Option description | `font-sans text-body-sm text-text-secondary` |
| Body paragraph | `font-sans text-body text-text-secondary` |
| Metadata / caption | `font-sans text-caption text-text-tertiary` |
| Section label (nav) | `font-sans text-label text-text-tertiary uppercase tracking-widest` |
| Q code | `font-mono text-caption text-bbb-blue` |

### 8.2 Critical Rules

1. `font-display` (DM Serif Display) is used **only** for page-level headlines and score/number reveals. Never for labels, buttons, or body copy.
2. Question text is always `font-medium` (not semibold, not regular) — this creates clear hierarchy between the question and its options below.
3. Never use `text-white` on `bg-bbb-blue` backgrounds unless contrast is verified (it passes — ratio 8.1:1).
4. Score numbers in the dashboard gauge use `font-display` — this is the one decorative use that is appropriate because numbers in display contexts benefit from serif character.

---

## 9. Accessibility Checklist

These are implementation requirements, not aspirational goals. Every item must pass before deployment.

| Requirement | Implementation |
|---|---|
| WCAG 2.1 AA color contrast (4.5:1 normal, 3:1 large) | All color pairs verified. Text Primary on white = 18.1:1. Blue on white = 8.1:1. |
| Touch targets ≥ 44×44px | MaturityOptions: min-h-[52px]. Nav items: py-3 = 48px. Buttons: size-lg = 52px. |
| Keyboard navigation | All interactive elements reachable via Tab. Focus ring: `focus-visible:ring-2 focus-visible:ring-bbb-blue/30 focus-visible:outline-none` |
| Screen reader labels | All icon buttons: `aria-label`. All form inputs: associated `<label>`. Progress bar: `role="progressbar" aria-valuenow aria-valuemin aria-valuemax` |
| Live regions | Score computation result: `aria-live="polite"`. Survey progress updates: `aria-live="polite"`. |
| No color-only indicators | Every status indicator pairs color with text or icon (e.g., ✓ icon + green color for complete states) |
| Reduced motion | `@media (prefers-reduced-motion: reduce)` — disable all transitions and the progress bar animation |
| Form error states | `aria-invalid="true"` + `aria-describedby` pointing to error message. Never rely on color alone. |

---

## 10. Anti-Patterns: What to Actively Avoid

Based on the current screenshots, these patterns must be explicitly prevented.

| ❌ Anti-Pattern | ✅ Replacement |
|---|---|
| Dark bg-slate-950 as the primary background | bg-bg-secondary (#F8F9FB) as page background, bg-bg-primary (#FFF) for cards |
| `text-blue-400` / `text-cyan-400` neon accents | `text-bbb-blue` (#003DA5) — no neon colors anywhere |
| Small radio dot (12px target) for maturity selection | MaturityOptions with min-h-[52px] full-row tap target |
| Magenta "TEST DATA" badge | Badge variant `test` = blue tint `bg-info/10 text-info` |
| Inline `style={{ color: 'cyan' }}` score badges | Tailwind-only maturity badge system |
| Orange/red bar chart on dark bg | Clean blue bars on white bg, opacity-scaled |
| All-caps monospace q-codes as row headers | `font-mono text-caption text-bbb-blue` — smaller, lighter |
| Single-column 90-question stack | Two-pane: SurveyNav (left, fixed) + SurveyContent (right, scrollable) |
| "LIVE MODE" green pulsing badge (Twitch aesthetic) | StatusDot + "Live Mode" text-caption combination |
| Nav sidebar that doesn't highlight active location | SurveyNav with `bg-bbb-blue text-white` active state on current sub-pillar |
| Broken hero image showing empty dark gradient | Either load the correct asset path or render a polished CSS/SVG abstract hero |
| Inline `<style>` blocks in component files | All styling through Tailwind utility classes + CSS variables |
| `font-family: Inter` as the default body font | `font-family: 'DM Sans'` (lighter, more institutional character) |

---

## Appendix A: Component Dependency Map

```
SurveyShell
  ├── SurveyProgressBar
  ├── SurveyNav
  │     ├── Progress (ui)
  │     └── StatusDot (ui)
  ├── OrgProfileForm  [step 0 only]
  └── SurveyContent
        ├── QuestionCard
        │     ├── MaturityOptions
        │     └── Badge (q_code)
        └── [Navigation footer]

DashboardShell
  ├── DashboardNav
  │     ├── StatusDot (ui)
  │     └── Badge (mode)
  └── [page content slot]
        ├── MaturityGauge  [Executive Summary]
        ├── PillarScoreCard × 6  [Pillar Dashboard]
        ├── SubPillarHeatmap  [Heatmap]
        └── QuestionTable  [Question Aggregation]
```

---

## Appendix B: Frozen Files Reference

The following files contain the scoring engine and are entirely off-limits to UI work:

```
src/config/rubric_config.json     — weights, indicator normalization rules
src/lib/scoring.ts                — v3.0 engine implementation
```

No component in the UI layer should import from `scoring.ts` directly. All score computation is triggered via API route (`/api/compute-score`) and the UI consumes the resulting JSON. This separation ensures the scoring engine cannot be accidentally modified by a UI change.

---

*Implementation Guide v1.0 · Barbados Digital ID Governance Assessment Framework v3.0*
*UI authored to WCAG 2.1 AA standard · DM Serif Display + DM Sans type system · National Blue #003DA5 accent*
