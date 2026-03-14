-- Migration: 20260314155540_notification_system.sql
-- Description: Create notification queue and triggers for WhatsApp notifications via Chatwoot

CREATE TABLE IF NOT EXISTS public.notification_queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone TEXT NOT NULL,
    message TEXT NOT NULL,
    reference_id UUID,
    notification_type TEXT,
    status TEXT DEFAULT 'pending',
    error_log TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    processed_at TIMESTAMPTZ
);

ALTER TABLE public.notification_queue ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all access notification_queue" ON public.notification_queue FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP TRIGGER IF EXISTS on_new_pedido ON public.pedidos;
DROP FUNCTION IF EXISTS trg_notify_new_pedido();

CREATE OR REPLACE FUNCTION trg_notify_new_pedido()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.telefone_cliente IS NOT NULL AND NEW.telefone_cliente != '' THEN
        INSERT INTO public.notification_queue (phone, message, reference_id, notification_type)
        VALUES (
            NEW.telefone_cliente,
            'Olá ' || COALESCE(NEW.cliente_nome, 'Cliente') || ', seu pedido ' || COALESCE(NEW.numero_pedido, '') || ' foi recebido com sucesso!',
            NEW.id,
            'ORDER_CONFIRMATION'
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_new_pedido
AFTER INSERT ON public.pedidos
FOR EACH ROW EXECUTE FUNCTION trg_notify_new_pedido();


DROP TRIGGER IF EXISTS on_cert_approval ON public.status_certificado;
DROP FUNCTION IF EXISTS trg_notify_cert_approval();

CREATE OR REPLACE FUNCTION trg_notify_cert_approval()
RETURNS TRIGGER AS $$
DECLARE
    v_telefone TEXT;
    v_nome TEXT;
BEGIN
    IF NEW.status ILIKE '%aprovado%' AND (TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND OLD.status IS DISTINCT FROM NEW.status)) THEN
        SELECT telefone_cliente, cliente_nome INTO v_telefone, v_nome FROM public.pedidos WHERE id = NEW.pedido_id;
        IF v_telefone IS NOT NULL AND v_telefone != '' THEN
            INSERT INTO public.notification_queue (phone, message, reference_id, notification_type)
            VALUES (
                v_telefone,
                'Olá ' || COALESCE(v_nome, 'Cliente') || ', seu certificado foi aprovado com sucesso!',
                NEW.pedido_id,
                'CERT_APPROVAL'
            );
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_cert_approval
AFTER INSERT OR UPDATE ON public.status_certificado
FOR EACH ROW EXECUTE FUNCTION trg_notify_cert_approval();


DROP TRIGGER IF EXISTS on_comissao_status ON public.comissoes;
DROP FUNCTION IF EXISTS trg_notify_comissao();

CREATE OR REPLACE FUNCTION trg_notify_comissao()
RETURNS TRIGGER AS $$
DECLARE
    v_telefone TEXT;
    v_nome TEXT;
BEGIN
    IF TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND OLD.status IS DISTINCT FROM NEW.status) THEN
        SELECT a.telefone, u.nome INTO v_telefone, v_nome 
        FROM public.usuarios u
        LEFT JOIN public.agents a ON a.email = u.email
        WHERE u.id = COALESCE(NEW.vendedor_id, NEW.agente_id)
        LIMIT 1;
        
        IF v_telefone IS NOT NULL AND v_telefone != '' THEN
            INSERT INTO public.notification_queue (phone, message, reference_id, notification_type)
            VALUES (
                v_telefone,
                'Olá ' || COALESCE(v_nome, 'Parceiro') || ', uma nova comissão foi calculada para você no valor de R$ ' || COALESCE(NEW.valor_comissao_liquido, 0),
                NEW.id,
                'COMMISSION_ALERT'
            );
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_comissao_status
AFTER INSERT OR UPDATE ON public.comissoes
FOR EACH ROW EXECUTE FUNCTION trg_notify_comissao();
