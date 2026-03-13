DO $$
DECLARE
  new_user_id uuid;
BEGIN
  -- Seed Admin User
  new_user_id := gen_random_uuid();
  INSERT INTO auth.users (
    id, instance_id, email, encrypted_password, email_confirmed_at,
    created_at, updated_at, raw_app_meta_data, raw_user_meta_data,
    is_super_admin, role, aud,
    confirmation_token, recovery_token, email_change_token_new,
    email_change, email_change_token_current,
    phone, phone_change, phone_change_token, reauthentication_token
  ) VALUES (
    new_user_id,
    '00000000-0000-0000-0000-000000000000',
    'admin@gestaoar.com',
    crypt('Admin123!', gen_salt('bf')),
    NOW(), NOW(), NOW(),
    '{"provider": "email", "providers": ["email"]}',
    '{"name": "Admin Gestão AR"}',
    false, 'authenticated', 'authenticated',
    '', '', '', '', '', NULL, '', '', ''
  );

  -- Seed Certificates
  INSERT INTO public.certificates (
    id, user_id, client_name_rs, razao_social, documento, cnpj,
    certificado_tipo, status_renovacao, data_emissao, data_expiracao, valor_oportunidade
  ) VALUES 
  (gen_random_uuid(), new_user_id, 'Empresa Alfa Ltda', 'Empresa Alfa Ltda', '12345678901', '12.345.678/0001-90', 'A1', 'Emitido', '2025-03-01', '2026-03-01', 150.00),
  (gen_random_uuid(), new_user_id, 'Beto Comercio', 'Beto Comercio ME', '98765432100', '98.765.432/0001-10', 'A3', 'Emitido', '2024-04-15', '2025-04-15', 350.00),
  (gen_random_uuid(), new_user_id, 'Carlos Silva', 'Carlos Silva Informática', '11122233344', '11.122.233/0001-44', 'A1', 'Revogado', '2024-01-10', '2025-01-10', 150.00),
  (gen_random_uuid(), new_user_id, 'Delta Serviços', 'Delta Servicos SA', '55566677788', '55.566.677/0001-88', 'A3', 'Emitido', '2025-03-10', '2028-03-10', 450.00),
  (gen_random_uuid(), new_user_id, 'Eco Indústria', 'Eco Industria e Comercio', '99988877766', '99.988.877/0001-66', 'A1', 'Emitido', '2025-03-12', '2026-03-12', 150.00);

  -- Seed CRM Agente IA (Kanban)
  INSERT INTO public.crm_agente_ia (
    id, identificador_usuario, nome, whatsapp, "Produto", status_lead, data_vencimento_certificado
  ) VALUES 
  (gen_random_uuid(), 'lead-001', 'João Pereira', '+5511999990001', 'e-CPF A1', 'novo', '2024-05-20'),
  (gen_random_uuid(), 'lead-002', 'Maria Antonieta', '+5511999990002', 'e-CNPJ A3', 'em_atendimento', '2024-04-10'),
  (gen_random_uuid(), 'lead-003', 'Tech Solutions', '+5511999990003', 'e-CNPJ A1', 'novo', '2024-06-01'),
  (gen_random_uuid(), 'lead-004', 'Padaria Central', '+5511999990004', 'e-CNPJ A3', 'aguardando_doc', '2024-03-25'),
  (gen_random_uuid(), 'lead-005', 'Consultoria XP', '+5511999990005', 'e-CPF A3', 'em_emissao', '2024-03-30');

END $$;
