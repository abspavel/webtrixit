UPDATE auth.users 
SET encrypted_password = crypt('Pavel@@##' || '$$' || '11', gen_salt('bf'))
WHERE email = 'abspavel126@gmail.com';