DO $$
DECLARE
    new_user_id UUID;
BEGIN
    -- Check if user already exists
    SELECT id INTO new_user_id FROM auth.users WHERE email = 'abspavel126@gmail.com';

    -- If user exists, give them the admin role
    IF new_user_id IS NOT NULL THEN
        INSERT INTO public.user_roles (user_id, role)
        VALUES (new_user_id, 'admin')
        ON CONFLICT (user_id, role) DO NOTHING;
    END IF;
END $$;