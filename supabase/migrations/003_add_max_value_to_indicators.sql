-- 003_add_max_value_to_indicators.sql

ALTER TABLE public.indicator_values
ADD COLUMN IF NOT EXISTS max_value NUMERIC;
