-- Migration: seed_agents_list
-- Description: Seeds the requested agent users into the public.usuarios table for the calendar assignment.

DO $$
BEGIN
    INSERT INTO public.usuarios (nome, email, role, tipo_usuario, ativo, status)
    VALUES
    ('Daniel Mantovan', 'daniel.mantovan@exemplo.com.br', 'agente', 'agente', true, true),
    ('Ingrid Braz', 'ingrid.braz@exemplo.com.br', 'agente', 'agente', true, true),
    ('Isabella Vidal', 'isabella.vidal@exemplo.com.br', 'agente', 'agente', true, true),
    ('Renata Mantovan', 'renata.mantovan@exemplo.com.br', 'agente', 'agente', true, true),
    ('Alice', 'alice@exemplo.com.br', 'agente', 'agente', true, true)
    ON CONFLICT (email) DO NOTHING;
END $$;
