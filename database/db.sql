-- MyVet database schema -- PostgreSQL

CREATE TABLE IF NOT EXISTS clientes (
  id_cliente SERIAL PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  email VARCHAR(180) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  telefono VARCHAR(30),
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin'))
);

CREATE TABLE IF NOT EXISTS veterinarias (
  id_veterinaria SERIAL PRIMARY KEY,
  nombre VARCHAR(140) NOT NULL,
  direccion VARCHAR(200) NOT NULL,
  telefono VARCHAR(30),
  whatsapp VARCHAR(30),
  estado VARCHAR(60),
  rating DECIMAL(2,1) DEFAULT 0,
  imagen VARCHAR(255),
  zone VARCHAR(100),
  service_type VARCHAR(20) DEFAULT 'public' CHECK (service_type IN ('public', 'private')),
  is_24h BOOLEAN DEFAULT FALSE,
  latitude DECIMAL(10,7),
  longitude DECIMAL(10,7)
);

CREATE TABLE IF NOT EXISTS specialties (
  id_specialty SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS schedules (
  id_schedule SERIAL PRIMARY KEY,
  id_veterinaria INTEGER NOT NULL,
  day_of_week VARCHAR(10) NOT NULL CHECK (day_of_week IN ('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday')),
  open_time TIME,
  close_time TIME,
  is_open BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (id_veterinaria) REFERENCES veterinarias(id_veterinaria) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS animal_types (
  id_animal_type SERIAL PRIMARY KEY,
  name VARCHAR(80) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS guarderias (
  id_guarderia SERIAL PRIMARY KEY,
  nombre VARCHAR(140) NOT NULL,
  direccion VARCHAR(200) NOT NULL,
  telefono VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS refugios (
  id_refugio SERIAL PRIMARY KEY,
  nombre VARCHAR(140) NOT NULL,
  direccion VARCHAR(200) NOT NULL,
  telefono VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS mascotas (
  id_mascota SERIAL PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  especie VARCHAR(80) NOT NULL,
  raza VARCHAR(100),
  edad INTEGER CHECK (edad >= 0),
  id_cliente INTEGER NOT NULL,
  FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS visitas (
  id_visita SERIAL PRIMARY KEY,
  fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  diagnostico VARCHAR(255),
  medicamentos VARCHAR(255),
  chequeos VARCHAR(255),
  id_mascota INTEGER NOT NULL,
  id_veterinaria INTEGER NOT NULL,
  FOREIGN KEY (id_mascota) REFERENCES mascotas(id_mascota) ON DELETE CASCADE,
  FOREIGN KEY (id_veterinaria) REFERENCES veterinarias(id_veterinaria) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS emergencias (
  id_emergencia SERIAL PRIMARY KEY,
  fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  descripcion VARCHAR(255) NOT NULL,
  id_mascota INTEGER NOT NULL,
  id_veterinaria INTEGER NOT NULL,
  FOREIGN KEY (id_mascota) REFERENCES mascotas(id_mascota) ON DELETE CASCADE,
  FOREIGN KEY (id_veterinaria) REFERENCES veterinarias(id_veterinaria) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS emergency_messages (
  id_mensaje SERIAL PRIMARY KEY,
  mensaje TEXT NOT NULL,
  nombre_contacto VARCHAR(120) NOT NULL,
  telefono_contacto VARCHAR(30),
  canal VARCHAR(30) DEFAULT 'whatsapp',
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'resolved')),
  fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  id_veterinaria INTEGER NOT NULL,
  id_emergencia INTEGER,
  FOREIGN KEY (id_veterinaria) REFERENCES veterinarias(id_veterinaria) ON DELETE RESTRICT,
  FOREIGN KEY (id_emergencia) REFERENCES emergencias(id_emergencia) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS vet_specialties (
  id_veterinaria INTEGER NOT NULL,
  id_specialty INTEGER NOT NULL,
  PRIMARY KEY (id_veterinaria, id_specialty),
  FOREIGN KEY (id_veterinaria) REFERENCES veterinarias(id_veterinaria) ON DELETE CASCADE,
  FOREIGN KEY (id_specialty) REFERENCES specialties(id_specialty) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS vet_animal_types (
  id_veterinaria INTEGER NOT NULL,
  id_animal_type INTEGER NOT NULL,
  PRIMARY KEY (id_veterinaria, id_animal_type),
  FOREIGN KEY (id_veterinaria) REFERENCES veterinarias(id_veterinaria) ON DELETE CASCADE,
  FOREIGN KEY (id_animal_type) REFERENCES animal_types(id_animal_type) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_mascotas_cliente ON mascotas(id_cliente);
CREATE INDEX IF NOT EXISTS idx_visitas_mascota ON visitas(id_mascota);
CREATE INDEX IF NOT EXISTS idx_visitas_veterinaria ON visitas(id_veterinaria);
CREATE INDEX IF NOT EXISTS idx_emergencias_mascota ON emergencias(id_mascota);
CREATE INDEX IF NOT EXISTS idx_emergencias_veterinaria ON emergencias(id_veterinaria);
CREATE INDEX IF NOT EXISTS idx_emergency_messages_veterinaria ON emergency_messages(id_veterinaria);
CREATE INDEX IF NOT EXISTS idx_emergency_messages_emergencia ON emergency_messages(id_emergencia);
CREATE INDEX IF NOT EXISTS idx_schedules_veterinaria ON schedules(id_veterinaria);
CREATE INDEX IF NOT EXISTS idx_vet_specialties_veterinaria ON vet_specialties(id_veterinaria);
CREATE INDEX IF NOT EXISTS idx_vet_animal_types_veterinaria ON vet_animal_types(id_veterinaria);

-- Seed data

INSERT INTO clientes (nombre, email, password, telefono) VALUES
  ('Andres Restrepo',  'andres.restrepo@gmail.com',   '123456', '3046712893'),
  ('Camila Montoya',   'camila.montoya@hotmail.com',  '123456', '3113489205'),
  ('Juan Gomez',       'juangomez94@gmail.com',       '123456', '3204561738'),
  ('Natalia Herrera',  'nherrera.med@outlook.com',    '123456', '3157823046')
ON CONFLICT (email) DO NOTHING;

INSERT INTO veterinarias (nombre, direccion, telefono, whatsapp, estado, rating, imagen, zone, service_type, is_24h, latitude, longitude) VALUES
  ('Clinica Veterinaria El Poblado',      'Cra. 43A #16-22, El Poblado, Medellin',       '6042567890', '573193052287', 'Activa', 4.9, './frontend/assets/images/lllll.jpg', 'El Poblado',    'private', TRUE,  6.2086, -75.5659),
  ('Centro Medico Veterinario Laureles',  'Cra. 76 #33-45, Laureles, Medellin',          '6043234567', '573193052287', 'Activa', 4.8, './frontend/assets/images/lllll.jpg', 'Laureles',      'private', FALSE, 6.2442, -75.5906),
  ('Veterinaria Envigado',                'Cll. 38 Sur #43-12, Envigado, Antioquia',     '6044512380', '573193052287', 'Activa', 5.0, './frontend/assets/images/lllll.jpg', 'Envigado',      'public',  TRUE,  6.1700, -75.5920),
  ('Clinica Animal Belen',                'Cra. 76 #50-23, Belen, Medellin',             '6043987654', '573193052287', 'Activa', 4.7, './frontend/assets/images/lllll.jpg', 'Belen',         'public',  FALSE, 6.2364, -75.6108),
  ('VetSalud Sabaneta',                   'Cll. 77 Sur #43-10, Sabaneta, Antioquia',     '6044678901', '573193052287', 'Activa', 4.6, './frontend/assets/images/lllll.jpg', 'Sabaneta',      'private', FALSE, 6.1516, -75.6149),
  ('Veterinaria Bello Norte',             'Cra. 50 #45-67, Bello, Antioquia',            '6044234567', '573193052287', 'Activa', 4.4, './frontend/assets/images/lllll.jpg', 'Bello',         'public',  FALSE, 6.3295, -75.5593),
  ('Clinica Veterinaria Robledo',         'Cra. 80 #65-12, Robledo, Medellin',           '6042901234', '573193052287', 'Activa', 4.5, './frontend/assets/images/lllll.jpg', 'Robledo',       'public',  FALSE, 6.2722, -75.6100),
  ('Veterinaria La Candelaria',           'Cll. 44 #52-25, La Candelaria, Medellin',     '6042512345', '573193052287', 'Activa', 4.3, './frontend/assets/images/lllll.jpg', 'La Candelaria', 'public',  TRUE,  6.2518, -75.5636)
ON CONFLICT DO NOTHING;

INSERT INTO specialties (name) VALUES
  ('Vaccination'),
  ('Grooming'),
  ('Surgery'),
  ('X-Ray'),
  ('Dental'),
  ('Cardiology'),
  ('Laboratory'),
  ('Physiotherapy'),
  ('Emergency'),
  ('Boarding')
ON CONFLICT (name) DO NOTHING;

INSERT INTO animal_types (name) VALUES
  ('Dog'),
  ('Cat'),
  ('Bird'),
  ('Rabbit'),
  ('Exotic'),
  ('Reptile'),
  ('Fish')
ON CONFLICT (name) DO NOTHING;

INSERT INTO vet_specialties (id_veterinaria, id_specialty)
SELECT v.id_veterinaria, s.id_specialty FROM veterinarias v JOIN specialties s ON s.name IN ('Surgery','X-Ray','Dental','Emergency')        WHERE v.nombre = 'Clinica Veterinaria El Poblado'
UNION ALL
SELECT v.id_veterinaria, s.id_specialty FROM veterinarias v JOIN specialties s ON s.name IN ('Cardiology','Vaccination','Laboratory')       WHERE v.nombre = 'Centro Medico Veterinario Laureles'
UNION ALL
SELECT v.id_veterinaria, s.id_specialty FROM veterinarias v JOIN specialties s ON s.name IN ('Laboratory','Physiotherapy','Emergency')      WHERE v.nombre = 'Veterinaria Envigado'
UNION ALL
SELECT v.id_veterinaria, s.id_specialty FROM veterinarias v JOIN specialties s ON s.name IN ('Vaccination','Dental','Grooming')             WHERE v.nombre = 'Clinica Animal Belen'
UNION ALL
SELECT v.id_veterinaria, s.id_specialty FROM veterinarias v JOIN specialties s ON s.name IN ('Surgery','X-Ray','Boarding')                 WHERE v.nombre = 'VetSalud Sabaneta'
UNION ALL
SELECT v.id_veterinaria, s.id_specialty FROM veterinarias v JOIN specialties s ON s.name IN ('Vaccination','Grooming','Boarding')           WHERE v.nombre = 'Veterinaria Bello Norte'
UNION ALL
SELECT v.id_veterinaria, s.id_specialty FROM veterinarias v JOIN specialties s ON s.name IN ('Vaccination','Laboratory','Dental')           WHERE v.nombre = 'Clinica Veterinaria Robledo'
UNION ALL
SELECT v.id_veterinaria, s.id_specialty FROM veterinarias v JOIN specialties s ON s.name IN ('Surgery','Emergency','Cardiology')            WHERE v.nombre = 'Veterinaria La Candelaria'
ON CONFLICT DO NOTHING;

INSERT INTO mascotas (nombre, especie, raza, edad, id_cliente) VALUES
  ('Bruno',  'Dog', 'Golden Retriever', 3, 1),
  ('Mochi',  'Cat',  'Persian',            2, 1),
  ('Coco',   'Dog', 'French Bulldog',   4, 2),
  ('Nina',   'Cat',  'Siamese',           1, 3),
  ('Dante',  'Dog', 'Labrador',         6, 4)
ON CONFLICT DO NOTHING;
