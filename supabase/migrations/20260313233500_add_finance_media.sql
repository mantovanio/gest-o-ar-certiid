CREATE TABLE IF NOT EXISTS public.bank_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    active BOOLEAN DEFAULT true,
    bank_type TEXT,
    bank_number TEXT,
    agency TEXT,
    account_number TEXT,
    owner_document TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.financial_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type TEXT,
    status TEXT,
    due_date DATE,
    payment_date DATE,
    face_value NUMERIC,
    open_value NUMERIC,
    description TEXT,
    payee_payer TEXT,
    payment_method TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.media_inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    media_type TEXT,
    quantity INT,
    unit_cost NUMERIC,
    is_comodato BOOLEAN DEFAULT false,
    stock_date DATE,
    observation TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.bank_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_inventory ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all access bank_accounts" ON public.bank_accounts FOR ALL USING (true);
CREATE POLICY "Allow all access financial_transactions" ON public.financial_transactions FOR ALL USING (true);
CREATE POLICY "Allow all access media_inventory" ON public.media_inventory FOR ALL USING (true);
