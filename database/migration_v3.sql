-- =============================================================
-- Migración V3 — PAWS
-- Aplica los 8 cambios del PDF de revisión a una base de datos
-- que ya tiene datos. Seguro correrlo múltiples veces (idempotente).
-- =============================================================

-- 1. businesses.status — agregar CHECK constraint
ALTER TABLE businesses
  DROP CONSTRAINT IF EXISTS businesses_status_check;
ALTER TABLE businesses
  ADD CONSTRAINT businesses_status_check
  CHECK (status IN ('active', 'inactive', 'suspended'));

-- 2. vets.business_id — agregar UNIQUE
ALTER TABLE vets
  DROP CONSTRAINT IF EXISTS vets_business_id_key;
ALTER TABLE vets
  ADD CONSTRAINT vets_business_id_key UNIQUE (business_id);

-- 3. daycare_slots — agregar UNIQUE compuesto
ALTER TABLE daycare_slots
  DROP CONSTRAINT IF EXISTS daycare_slots_daycare_id_day_of_week_start_time_key;
ALTER TABLE daycare_slots
  ADD CONSTRAINT daycare_slots_daycare_id_day_of_week_start_time_key
  UNIQUE (daycare_id, day_of_week, start_time);

-- 4. shelter_pets.intake_reason — reducir tamaño y agregar CHECK
ALTER TABLE shelter_pets
  DROP CONSTRAINT IF EXISTS shelter_pets_intake_reason_check;
ALTER TABLE shelter_pets
  ALTER COLUMN intake_reason TYPE VARCHAR(50);
ALTER TABLE shelter_pets
  ADD CONSTRAINT shelter_pets_intake_reason_check
  CHECK (intake_reason IN ('stray', 'owner_surrender', 'abandoned', 'rescue', 'transfer', 'other'));

-- 5. pets.species → animal_type_id (FK a animal_types)
--    Solo ejecutar si la columna species todavía existe
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'pets' AND column_name = 'species'
  ) THEN
    -- Agregar la nueva columna como nullable primero
    ALTER TABLE pets ADD COLUMN IF NOT EXISTS animal_type_id INTEGER;

    -- Mapear los valores existentes de species al ID correcto en animal_types
    UPDATE pets p
    SET animal_type_id = at.animal_type_id
    FROM animal_types at
    WHERE LOWER(p.species) = LOWER(at.name);

    -- Para filas que no coincidan exactamente, asignar 'Exotic' como fallback
    UPDATE pets
    SET animal_type_id = (SELECT animal_type_id FROM animal_types WHERE name = 'Exotic')
    WHERE animal_type_id IS NULL;

    -- Hacer la columna NOT NULL ahora que todos los datos están migrados
    ALTER TABLE pets ALTER COLUMN animal_type_id SET NOT NULL;

    -- Agregar la FK
    ALTER TABLE pets
      ADD CONSTRAINT pets_animal_type_id_fkey
      FOREIGN KEY (animal_type_id) REFERENCES animal_types(animal_type_id);

    -- Eliminar la columna vieja
    ALTER TABLE pets DROP COLUMN species;

    RAISE NOTICE 'Columna species migrada a animal_type_id correctamente.';
  ELSE
    RAISE NOTICE 'La columna species ya no existe, omitiendo migración.';
  END IF;
END $$;

-- 6. businesses.image_url — ampliar a VARCHAR(500)
ALTER TABLE businesses
  ALTER COLUMN image_url TYPE VARCHAR(500);

-- 7. medical_records.updated_at — agregar DEFAULT
ALTER TABLE medical_records
  ALTER COLUMN updated_at SET DEFAULT CURRENT_TIMESTAMP;

-- Función y trigger para auto-actualizar updated_at
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_medical_records_updated_at ON medical_records;
CREATE TRIGGER trg_medical_records_updated_at
  BEFORE UPDATE ON medical_records
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 8. Índice faltante en shelter_pets.status
CREATE INDEX IF NOT EXISTS idx_shelter_pets_status ON shelter_pets(status);
