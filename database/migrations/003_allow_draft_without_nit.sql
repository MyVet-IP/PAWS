-- Migration: Allow draft businesses without NIT
-- This enables auto-creation of business profiles during vet registration

BEGIN;

-- Drop the old constraint
ALTER TABLE businesses DROP CONSTRAINT IF EXISTS chk_nit_required;

-- Add new constraint that allows draft status without NIT
ALTER TABLE businesses ADD CONSTRAINT chk_nit_required CHECK (
  (business_type = 'dog_walker' AND nit IS NULL AND nit_verified IS NULL)
  OR
  (status = 'draft')
  OR
  (business_type <> 'dog_walker' AND nit IS NOT NULL)
);

COMMIT;
