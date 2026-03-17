-- Creates a trigger that automatically inserts a new user profile upon Signup.
-- It assigns the "vendedor" role and grants only basic sales/client permissions.

CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  -- 1. Insert into public.usuarios
  INSERT INTO public.usuarios (id, email, nome, role, tipo_usuario, ativo, status)
  VALUES (
    new.id, 
    new.email, 
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)), 
    'vendedor', -- Default basic role
    'vendedor',
    true,
    true
  );

  -- 2. Grant initial limited permissions: Only see/create clients and see/create sales
  INSERT INTO public.permissoes_usuario (usuario_id, funcionalidade, permitido, data_atualizacao)
  VALUES 
    (new.id, 'ver_clientes', true, NOW()),
    (new.id, 'criar_cliente', true, NOW()),
    (new.id, 'ver_pedidos', true, NOW()),
    (new.id, 'criar_pedido', true, NOW());

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop the trigger if it exists to replace it safely
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create the trigger on the Supabase Auth table
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
