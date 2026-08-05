DO $$
DECLARE
    new_user_id UUID;
BEGIN
    SELECT id INTO new_user_id FROM auth.users WHERE email = 'abspavel126@gmail.com';

    IF new_user_id IS NULL THEN
        INSERT INTO auth.users (
            instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
            raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
            confirmation_token, recovery_token, email_change_token_new, email_change
        )
        VALUES (
            '00000000-0000-0000-0000-000000000000', gen_random_uuid(), 'authenticated', 'authenticated', 
            'abspavel126@gmail.com', crypt('AdminPavel123', gen_salt('bf')), now(),
            '{"provider":"email","providers":["email"]}', '{}', now(), now(),
            '', '', '', ''
        )
        RETURNING id INTO new_user_id;
    END IF;

    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'user_roles') THEN
        INSERT INTO public.user_roles (user_id, role)
        VALUES (new_user_id, 'admin')
        ON CONFLICT (user_id, role) DO NOTHING;
    END IF;
END $$;