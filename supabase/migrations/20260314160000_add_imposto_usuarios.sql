-- Add percentual_imposto to usuarios for Commissions Module
ALTER TABLE public.usuarios 
ADD COLUMN IF NOT EXISTS percentual_imposto NUMERIC DEFAULT 0;
