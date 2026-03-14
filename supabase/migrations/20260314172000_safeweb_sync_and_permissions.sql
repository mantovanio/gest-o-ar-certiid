-- Assign 'rastreamento' and 'tabelas_preco' permissions to existing admins
DO $$ 
DECLARE
  u RECORD;
BEGIN
  FOR u IN SELECT id FROM public.usuarios WHERE role = 'admin' LOOP
    -- Rastreamento
    IF NOT EXISTS (SELECT 1 FROM public.permissoes_usuario WHERE usuario_id = u.id AND funcionalidade = 'rastreamento') THEN
      INSERT INTO public.permissoes_usuario (usuario_id, funcionalidade, permitido, data_atualizacao)
      VALUES (u.id, 'rastreamento', true, NOW());
    END IF;
    
    -- Tabelas de Preço
    IF NOT EXISTS (SELECT 1 FROM public.permissoes_usuario WHERE usuario_id = u.id AND funcionalidade = 'tabelas_preco') THEN
      INSERT INTO public.permissoes_usuario (usuario_id, funcionalidade, permitido, data_atualizacao)
      VALUES (u.id, 'tabelas_preco', true, NOW());
    END IF;
  END LOOP;
END $$;

-- Setup pg_cron to call the edge function hourly
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Safely schedule the edge function relying on pg_net capabilities
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pg_cron') AND EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pg_net') THEN
    -- Remove if already exists to safely replace
    BEGIN
      PERFORM cron.unschedule('sincronizar-safeweb-job');
    EXCEPTION WHEN OTHERS THEN
      -- Ignore error if job does not exist
    END;
    
    PERFORM cron.schedule(
      'sincronizar-safeweb-job',
      '0 * * * *',
      $cron$
        SELECT net.http_post(
          url:='https://gikcraaqjwyfucqgwzfx.supabase.co/functions/v1/sincronizar-safeweb',
          headers:='{"Content-Type": "application/json"}'::jsonb
        );
      $cron$
    );
  END IF;
END $$;
