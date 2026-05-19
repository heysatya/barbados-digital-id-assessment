-- 001_initial_barbados_schema.sql

-- Enable uuid-ossp extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. assessment_sessions
CREATE TABLE IF NOT EXISTS public.assessment_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    country TEXT NOT NULL DEFAULT 'Barbados',
    survey_type TEXT NOT NULL CHECK (survey_type IN ('expert', 'stakeholder')),
    organization_name TEXT,
    organization_type TEXT,
    role_function TEXT,
    stakeholder_category TEXT,
    environment_mode TEXT NOT NULL CHECK (environment_mode IN ('test', 'live')),
    status TEXT NOT NULL DEFAULT 'submitted',
    rubric_version TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. assessment_responses
CREATE TABLE IF NOT EXISTS public.assessment_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assessment_id UUID NOT NULL REFERENCES public.assessment_sessions(id) ON DELETE CASCADE,
    q_code TEXT NOT NULL,
    pillar_code TEXT NOT NULL,
    subpillar_code TEXT NOT NULL,
    score INT CHECK (score IN (1, 2, 3, 4, 5, 9)),
    evidence_comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. assessment_results
CREATE TABLE IF NOT EXISTS public.assessment_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assessment_group_id TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'Barbados',
    environment_mode TEXT NOT NULL CHECK (environment_mode IN ('test', 'live')),
    rubric_version TEXT NOT NULL,
    input_json JSONB NOT NULL,
    output_json JSONB NOT NULL,
    computed_at TIMESTAMPTZ DEFAULT NOW(),
    engine_version TEXT NOT NULL
);

-- 4. indicator_values
CREATE TABLE IF NOT EXISTS public.indicator_values (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    indicator_code TEXT NOT NULL,
    pillar_code TEXT NOT NULL,
    subpillar_code TEXT NOT NULL,
    raw_value NUMERIC,
    source TEXT,
    source_url TEXT,
    data_date DATE,
    notes TEXT,
    environment_mode TEXT NOT NULL CHECK (environment_mode IN ('test', 'live')),
    rubric_version TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(indicator_code, environment_mode, rubric_version)
);

-- 5. profiles
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('admin', 'viewer')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);
