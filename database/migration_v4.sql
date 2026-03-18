-- Add persistent profile photo URL for users
ALTER TABLE users ADD COLUMN IF NOT EXISTS photo_url VARCHAR(500);
