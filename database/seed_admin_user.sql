-- Ensure a single reserved admin account exists.
-- Reserved admin email: adminpaws@crudzaso.com
-- Default password (change after first login): AdminPaws2026!

BEGIN;

-- 1) Downgrade any other admin accounts.
UPDATE users
SET role = 'user'
WHERE role = 'admin'
  AND lower(email) <> 'adminpaws@crudzaso.com';

-- 2) Upsert reserved admin account.
-- Password hash was generated with bcrypt (10 rounds).
INSERT INTO users (name, email, password, role)
VALUES (
  'admin',
  'adminpaws@crudzaso.com',
  '$2b$10$lbQZ5L9QnXAvGx1XSviwl.0yU29pLGkW9zBaubTS3E2Zj8.Tozr9C',
  'admin'
)
ON CONFLICT (email)
DO UPDATE SET
  role = 'admin',
  name = EXCLUDED.name;

COMMIT;
