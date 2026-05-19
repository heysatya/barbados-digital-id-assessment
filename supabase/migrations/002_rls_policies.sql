-- 002_rls_policies.sql

-- Enable RLS on all tables
ALTER TABLE public.assessment_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.indicator_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 1. assessment_sessions
-- Public users can insert
CREATE POLICY "Public users can insert sessions" ON public.assessment_sessions FOR INSERT WITH CHECK (true);
-- Authenticated users can select
CREATE POLICY "Authenticated users can select sessions" ON public.assessment_sessions FOR SELECT TO authenticated USING (true);
-- Admin users can delete (test data only - enforced via API or trigger, but here we allow delete to admins)
CREATE POLICY "Admin users can delete sessions" ON public.assessment_sessions FOR DELETE TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 2. assessment_responses
-- Public users can insert
CREATE POLICY "Public users can insert responses" ON public.assessment_responses FOR INSERT WITH CHECK (true);
-- Authenticated users can select
CREATE POLICY "Authenticated users can select responses" ON public.assessment_responses FOR SELECT TO authenticated USING (true);
-- Admin users can delete
CREATE POLICY "Admin users can delete responses" ON public.assessment_responses FOR DELETE TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 3. assessment_results
-- Authenticated users can select
CREATE POLICY "Authenticated users can select results" ON public.assessment_results FOR SELECT TO authenticated USING (true);
-- Admin users can delete
CREATE POLICY "Admin users can delete results" ON public.assessment_results FOR DELETE TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 4. indicator_values
-- Authenticated users can select
CREATE POLICY "Authenticated users can select indicators" ON public.indicator_values FOR SELECT TO authenticated USING (true);
-- Admin users can insert/update/delete
CREATE POLICY "Admin users can insert indicators" ON public.indicator_values FOR INSERT TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admin users can update indicators" ON public.indicator_values FOR UPDATE TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admin users can delete indicators" ON public.indicator_values FOR DELETE TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 5. profiles
-- Authenticated users can read their own profile, or admins can read all
CREATE POLICY "Users can read own profile or admins all" ON public.profiles FOR SELECT TO authenticated USING (
    id = auth.uid() OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
-- Admins can update profiles
CREATE POLICY "Admin users can update profiles" ON public.profiles FOR UPDATE TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

