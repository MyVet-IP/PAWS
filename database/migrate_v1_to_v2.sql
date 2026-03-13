-- Migration script from legacy schema (public) to V2 schema (paws_v2)
-- Run order:
--   1) Execute database/db.sql (legacy) in public schema
--   2) Execute database/db_v2.sql (new) to create paws_v2 schema
--   3) Execute this script

BEGIN;

-- 1) users from public.clientes
INSERT INTO paws_v2.users (legacy_cliente_id, name, email, password, phone, role)
SELECT c.id_cliente, c.nombre, c.email, c.password, c.telefono,
       CASE WHEN c.role IN ('admin') THEN 'admin' ELSE 'owner' END
FROM public.clientes c
ON CONFLICT (legacy_cliente_id) DO NOTHING;

-- 2) businesses from public.veterinarias
INSERT INTO paws_v2.businesses (
  legacy_veterinaria_id,
  business_name,
  phone,
  whatsapp,
  status,
  image_url,
  long_desc,
  is_verified,
  is_certified
)
SELECT
  v.id_veterinaria,
  v.nombre,
  v.telefono,
  v.whatsapp,
  CASE WHEN COALESCE(v.estado, 'Activa') ILIKE 'activa' THEN 'active' ELSE 'inactive' END,
  v.imagen,
  CONCAT('Direccion: ', COALESCE(v.direccion, 'N/A'),
         ' | Zona: ', COALESCE(v.zone, 'N/A'),
         ' | Lat: ', COALESCE(v.latitude::TEXT, 'N/A'),
         ' | Lng: ', COALESCE(v.longitude::TEXT, 'N/A')),
  TRUE,
  FALSE
FROM public.veterinarias v
ON CONFLICT (legacy_veterinaria_id) DO NOTHING;

-- 3) clinics from businesses linked to legacy veterinarias
INSERT INTO paws_v2.clinics (business_id, service_type, is_24h, rating)
SELECT
  b.business_id,
  CASE WHEN v.service_type IN ('public', 'private') THEN v.service_type ELSE 'public' END,
  COALESCE(v.is_24h, FALSE),
  COALESCE(v.rating, 0)
FROM paws_v2.businesses b
JOIN public.veterinarias v ON v.id_veterinaria = b.legacy_veterinaria_id
ON CONFLICT (business_id) DO NOTHING;

-- 4) categories from legacy catalogs
INSERT INTO paws_v2.specialties (name)
SELECT s.name FROM public.specialties s
ON CONFLICT (name) DO NOTHING;

INSERT INTO paws_v2.animal_types (name)
SELECT a.name FROM public.animal_types a
ON CONFLICT (name) DO NOTHING;

-- 5) clinic_specialties from legacy vet_specialties
INSERT INTO paws_v2.clinic_specialties (clinic_id, specialty_id)
SELECT c.clinic_id, ns.specialty_id
FROM public.vet_specialties vs
JOIN paws_v2.businesses b ON b.legacy_veterinaria_id = vs.id_veterinaria
JOIN paws_v2.clinics c ON c.business_id = b.business_id
JOIN public.specialties os ON os.id_specialty = vs.id_specialty
JOIN paws_v2.specialties ns ON ns.name = os.name
ON CONFLICT (clinic_id, specialty_id) DO NOTHING;

-- 6) clinic_animal_types from legacy vet_animal_types
INSERT INTO paws_v2.clinic_animal_types (clinic_id, animal_type_id)
SELECT c.clinic_id, na.animal_type_id
FROM public.vet_animal_types va
JOIN paws_v2.businesses b ON b.legacy_veterinaria_id = va.id_veterinaria
JOIN paws_v2.clinics c ON c.business_id = b.business_id
JOIN public.animal_types oa ON oa.id_animal_type = va.id_animal_type
JOIN paws_v2.animal_types na ON na.name = oa.name
ON CONFLICT (clinic_id, animal_type_id) DO NOTHING;

-- 7) schedules from legacy schedules (veterinaria -> business)
INSERT INTO paws_v2.schedules (business_id, day_of_week, open_time, close_time, is_open)
SELECT b.business_id, s.day_of_week, s.open_time, s.close_time, COALESCE(s.is_open, TRUE)
FROM public.schedules s
JOIN paws_v2.businesses b ON b.legacy_veterinaria_id = s.id_veterinaria
ON CONFLICT DO NOTHING;

-- 8) businesses/daycares from legacy guarderias
INSERT INTO paws_v2.businesses (legacy_guarderia_id, business_name, phone, status, is_verified)
SELECT g.id_guarderia, g.nombre, g.telefono, 'active', FALSE
FROM public.guarderias g
ON CONFLICT (legacy_guarderia_id) DO NOTHING;

INSERT INTO paws_v2.daycares (business_id)
SELECT b.business_id
FROM paws_v2.businesses b
WHERE b.legacy_guarderia_id IS NOT NULL
ON CONFLICT (business_id) DO NOTHING;

-- 9) businesses/shelters from legacy refugios
INSERT INTO paws_v2.businesses (legacy_refugio_id, business_name, phone, status, is_verified)
SELECT r.id_refugio, r.nombre, r.telefono, 'active', FALSE
FROM public.refugios r
ON CONFLICT (legacy_refugio_id) DO NOTHING;

INSERT INTO paws_v2.shelters (business_id)
SELECT b.business_id
FROM paws_v2.businesses b
WHERE b.legacy_refugio_id IS NOT NULL
ON CONFLICT (business_id) DO NOTHING;

-- 10) pets from legacy mascotas
INSERT INTO paws_v2.pets (legacy_mascota_id, user_id, name, species, breed, created_at)
SELECT
  m.id_mascota,
  u.user_id,
  m.nombre,
  m.especie,
  m.raza,
  CURRENT_TIMESTAMP
FROM public.mascotas m
JOIN paws_v2.users u ON u.legacy_cliente_id = m.id_cliente
ON CONFLICT (legacy_mascota_id) DO NOTHING;

-- 11) medical_records from legacy visitas
INSERT INTO paws_v2.medical_records (
  legacy_visita_id,
  pet_id,
  clinic_id,
  user_id,
  visit_date,
  reason,
  diagnosis,
  treatment,
  notes
)
SELECT
  v.id_visita,
  p.pet_id,
  c.clinic_id,
  p.user_id,
  COALESCE(v.fecha, CURRENT_TIMESTAMP),
  'legacy visit',
  v.diagnostico,
  v.medicamentos,
  v.chequeos
FROM public.visitas v
JOIN paws_v2.pets p ON p.legacy_mascota_id = v.id_mascota
JOIN paws_v2.businesses b ON b.legacy_veterinaria_id = v.id_veterinaria
JOIN paws_v2.clinics c ON c.business_id = b.business_id
ON CONFLICT (legacy_visita_id) DO NOTHING;

-- 12) emergencies from legacy emergencias
INSERT INTO paws_v2.emergencies (
  legacy_emergencia_id,
  pet_id,
  business_id,
  description,
  created_at,
  status
)
SELECT
  e.id_emergencia,
  p.pet_id,
  b.business_id,
  e.descripcion,
  COALESCE(e.fecha, CURRENT_TIMESTAMP),
  'resolved'
FROM public.emergencias e
JOIN paws_v2.pets p ON p.legacy_mascota_id = e.id_mascota
JOIN paws_v2.businesses b ON b.legacy_veterinaria_id = e.id_veterinaria
ON CONFLICT (legacy_emergencia_id) DO NOTHING;

-- 13) emergency_messages from legacy emergency_messages
INSERT INTO paws_v2.emergency_messages (
  legacy_mensaje_id,
  business_id,
  emergency_id,
  message,
  contact_name,
  contact_phone,
  channel,
  status,
  created_at
)
SELECT
  em.id_mensaje,
  b.business_id,
  ne.emergency_id,
  em.mensaje,
  em.nombre_contacto,
  em.telefono_contacto,
  COALESCE(em.canal, 'whatsapp'),
  CASE WHEN em.status IN ('pending', 'sent', 'resolved') THEN em.status ELSE 'pending' END,
  COALESCE(em.fecha, CURRENT_TIMESTAMP)
FROM public.emergency_messages em
JOIN paws_v2.businesses b ON b.legacy_veterinaria_id = em.id_veterinaria
LEFT JOIN paws_v2.emergencies ne ON ne.legacy_emergencia_id = em.id_emergencia
ON CONFLICT (legacy_mensaje_id) DO NOTHING;

COMMIT;
