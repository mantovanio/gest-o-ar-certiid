-- Migration: ensure_pedido_columns
-- Description: Ensures the 'desconto' and 'valor_final' columns exist in the 'pedidos' table as requested for order calculations.

ALTER TABLE public.pedidos
  ADD COLUMN IF NOT EXISTS desconto NUMERIC,
  ADD COLUMN IF NOT EXISTS valor_final NUMERIC;
