-- ============================================================
-- MIGRATION 004: Agregar coordenadas geográficas a veterinarias
-- Proyecto: PAWS | Sprint 4 | Autor: Jose | Fecha: 2025-03-11
-- ============================================================
-- CÓMO EJECUTAR:
--   psql -U <tu_usuario> -d <tu_db> -f database/004_add_coords_veterinarias.sql
-- ============================================================

-- PASO 1: Agregar las columnas lat y lng a la tabla veterinarias
--   DECIMAL(10,8) → suficiente para latitud  (ej: 6.20000000)
--   DECIMAL(11,8) → suficiente para longitud (ej: -75.56000000)
--   IF NOT EXISTS → seguro para re-ejecutar sin errores

ALTER TABLE veterinarias
  ADD COLUMN IF NOT EXISTS lat DECIMAL(10,8),
  ADD COLUMN IF NOT EXISTS lng DECIMAL(11,8);

-- PASO 2: Poblar las coordenadas reales de cada clínica en Medellín
--   Coordenadas obtenidas de las direcciones reales del seed

UPDATE veterinarias SET lat =  6.2085, lng = -75.5664
  WHERE nombre = 'Clinica Veterinaria El Poblado';

UPDATE veterinarias SET lat =  6.2390, lng = -75.6022
  WHERE nombre = 'Centro Medico Veterinario Laureles';

UPDATE veterinarias SET lat =  6.1691, lng = -75.5907
  WHERE nombre = 'Veterinaria Envigado';

UPDATE veterinarias SET lat =  6.2228, lng = -75.6177
  WHERE nombre = 'Clinica Animal Belen';

UPDATE veterinarias SET lat =  6.1461, lng = -75.6162
  WHERE nombre = 'VetSalud Sabaneta';

UPDATE veterinarias SET lat =  6.3329, lng = -75.5563
  WHERE nombre = 'Veterinaria Bello Norte';

UPDATE veterinarias SET lat =  6.2669, lng = -75.6132
  WHERE nombre = 'Clinica Veterinaria Robledo';

UPDATE veterinarias SET lat =  6.2518, lng = -75.5636
  WHERE nombre = 'Veterinaria La Candelaria';

-- PASO 3: Índice para mejorar performance en queries de distancia
--   Solo aplica a filas que ya tienen coordenadas cargadas

CREATE INDEX IF NOT EXISTS idx_veterinarias_coords
  ON veterinarias (lat, lng)
  WHERE lat IS NOT NULL AND lng IS NOT NULL;

-- PASO 4: Verificación — debería mostrar 8 filas con lat/lng cargadas
SELECT nombre, lat, lng FROM veterinarias ORDER BY nombre;
