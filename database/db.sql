-- Schema de base de datos Veterinaria para PostgreSQL

-- Tabla de clientes/usuarios
CREATE TABLE IF NOT EXISTS clientes (
  id_cliente SERIAL PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  email VARCHAR(180) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  telefono VARCHAR(30)
);

-- Tabla de veterinarias/clínicas
CREATE TABLE IF NOT EXISTS veterinarias (
  id_veterinaria SERIAL PRIMARY KEY,
  nombre VARCHAR(140) NOT NULL,
  direccion VARCHAR(200) NOT NULL,
  telefono VARCHAR(30),
  whatsapp VARCHAR(30),
  estado VARCHAR(60),
  rating DECIMAL(2,1) DEFAULT 0,
  imagen VARCHAR(255)
);

-- Tabla de servicios que pueden ofrecer las veterinarias
CREATE TABLE IF NOT EXISTS servicios (
  id_servicio SERIAL PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  descripcion VARCHAR(255)
);

-- Tabla de guarderías
CREATE TABLE IF NOT EXISTS guarderias (
  id_guarderia SERIAL PRIMARY KEY,
  nombre VARCHAR(140) NOT NULL,
  direccion VARCHAR(200) NOT NULL,
  telefono VARCHAR(30)
);

-- Tabla de refugios
CREATE TABLE IF NOT EXISTS refugios (
  id_refugio SERIAL PRIMARY KEY,
  nombre VARCHAR(140) NOT NULL,
  direccion VARCHAR(200) NOT NULL,
  telefono VARCHAR(30)
);

-- Tabla de mascotas
CREATE TABLE IF NOT EXISTS mascotas (
  id_mascota SERIAL PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  especie VARCHAR(80) NOT NULL,
  raza VARCHAR(100),
  edad INTEGER CHECK (edad >= 0),
  id_cliente INTEGER NOT NULL,
  FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente) ON DELETE CASCADE
);

-- Tabla de visitas a veterinarias
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

-- Tabla de emergencias
CREATE TABLE IF NOT EXISTS emergencias (
  id_emergencia SERIAL PRIMARY KEY,
  fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  descripcion VARCHAR(255) NOT NULL,
  id_mascota INTEGER NOT NULL,
  id_veterinaria INTEGER NOT NULL,
  FOREIGN KEY (id_mascota) REFERENCES mascotas(id_mascota) ON DELETE CASCADE,
  FOREIGN KEY (id_veterinaria) REFERENCES veterinarias(id_veterinaria) ON DELETE RESTRICT
);

-- Tabla de mensajes de emergencia enviados a clínicas
CREATE TABLE IF NOT EXISTS emergency_messages (
  id_mensaje SERIAL PRIMARY KEY,
  mensaje TEXT NOT NULL,
  nombre_contacto VARCHAR(120) NOT NULL,
  telefono_contacto VARCHAR(30),
  canal VARCHAR(30) DEFAULT 'whatsapp',
  estado VARCHAR(30) DEFAULT 'enviado',
  fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  id_veterinaria INTEGER NOT NULL,
  id_emergencia INTEGER,
  FOREIGN KEY (id_veterinaria) REFERENCES veterinarias(id_veterinaria) ON DELETE RESTRICT,
  FOREIGN KEY (id_emergencia) REFERENCES emergencias(id_emergencia) ON DELETE SET NULL
);

-- Tabla de relación muchos a muchos entre veterinarias y servicios
CREATE TABLE IF NOT EXISTS veterinaria_servicios (
  id_veterinaria INTEGER NOT NULL,
  id_servicio INTEGER NOT NULL,
  PRIMARY KEY (id_veterinaria, id_servicio),
  FOREIGN KEY (id_veterinaria) REFERENCES veterinarias(id_veterinaria) ON DELETE CASCADE,
  FOREIGN KEY (id_servicio) REFERENCES servicios(id_servicio) ON DELETE CASCADE
);

-- Índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_mascotas_cliente ON mascotas(id_cliente);
CREATE INDEX IF NOT EXISTS idx_visitas_mascota ON visitas(id_mascota);
CREATE INDEX IF NOT EXISTS idx_visitas_veterinaria ON visitas(id_veterinaria);
CREATE INDEX IF NOT EXISTS idx_emergencias_mascota ON emergencias(id_mascota);
CREATE INDEX IF NOT EXISTS idx_emergencias_veterinaria ON emergencias(id_veterinaria);
CREATE INDEX IF NOT EXISTS idx_emergency_messages_veterinaria ON emergency_messages(id_veterinaria);
CREATE INDEX IF NOT EXISTS idx_emergency_messages_emergencia ON emergency_messages(id_emergencia);

-- ============================================================
-- DATOS REALES DE PRUEBA - Medellin, Colombia
-- ============================================================

INSERT INTO clientes (nombre, email, password, telefono) VALUES
  ('Andres Restrepo',  'andres.restrepo@gmail.com',   '123456', '3046712893'),
  ('Camila Montoya',   'camila.montoya@hotmail.com',  '123456', '3113489205'),
  ('Juan Gomez',       'juangomez94@gmail.com',       '123456', '3204561738'),
  ('Natalia Herrera',  'nherrera.med@outlook.com',    '123456', '3157823046')
ON CONFLICT (email) DO NOTHING;

INSERT INTO veterinarias (nombre, direccion, telefono, whatsapp, estado, rating, imagen) VALUES
  ('Clinica Veterinaria El Poblado',      'Cra. 43A #16-22, El Poblado, Medellin',       '6042567890', '573046712893', 'Activa', 4.9, './frontend/assets/images/lllll.jpg'),
  ('Centro Medico Veterinario Laureles',  'Cra. 76 #33-45, Laureles, Medellin',          '6043234567', '573113489205', 'Activa', 4.8, './frontend/assets/images/lllll.jpg'),
  ('Veterinaria Envigado',                'Cll. 38 Sur #43-12, Envigado, Antioquia',     '6044512380', '573204561738', 'Activa', 5.0, './frontend/assets/images/lllll.jpg'),
  ('Clinica Animal Belen',                'Cra. 76 #50-23, Belen, Medellin',             '6043987654', '573157823046', 'Activa', 4.7, './frontend/assets/images/lllll.jpg'),
  ('VetSalud Sabaneta',                   'Cll. 77 Sur #43-10, Sabaneta, Antioquia',     '6044678901', '573217890123', 'Activa', 4.6, './frontend/assets/images/lllll.jpg'),
  ('Veterinaria Bello Norte',             'Cra. 50 #45-67, Bello, Antioquia',            '6044234567', '573108901234', 'Activa', 4.4, './frontend/assets/images/lllll.jpg'),
  ('Clinica Veterinaria Robledo',         'Cra. 80 #65-12, Robledo, Medellin',           '6042901234', '573189012345', 'Activa', 4.5, './frontend/assets/images/lllll.jpg'),
  ('Veterinaria La Candelaria',           'Cll. 44 #52-25, La Candelaria, Medellin',     '6042512345', '573123456789', 'Activa', 4.3, './frontend/assets/images/lllll.jpg')
ON CONFLICT DO NOTHING;

INSERT INTO servicios (nombre, descripcion) VALUES
  ('Vacunacion',   'Aplicacion de vacunas preventivas'),
  ('Peluqueria',   'Corte y bano para mascotas'),
  ('Cirugia',      'Procedimientos quirurgicos'),
  ('Rayos X',      'Radiografias y diagnostico'),
  ('Dental',       'Limpieza y cuidado dental'),
  ('Cardiologia',  'Cuidado cardiovascular'),
  ('Laboratorio',  'Analisis clinicos'),
  ('Fisioterapia', 'Rehabilitacion fisica'),
  ('Urgencias',    'Atencion de emergencias 24/7'),
  ('Hospedaje',    'Estancia temporal para mascotas')
ON CONFLICT DO NOTHING;

INSERT INTO veterinaria_servicios (id_veterinaria, id_servicio)
SELECT v.id_veterinaria, s.id_servicio FROM veterinarias v JOIN servicios s ON s.nombre IN ('Cirugia','Rayos X','Dental','Urgencias')        WHERE v.nombre = 'Clinica Veterinaria El Poblado'
UNION ALL
SELECT v.id_veterinaria, s.id_servicio FROM veterinarias v JOIN servicios s ON s.nombre IN ('Cardiologia','Vacunacion','Laboratorio')         WHERE v.nombre = 'Centro Medico Veterinario Laureles'
UNION ALL
SELECT v.id_veterinaria, s.id_servicio FROM veterinarias v JOIN servicios s ON s.nombre IN ('Laboratorio','Fisioterapia','Urgencias')         WHERE v.nombre = 'Veterinaria Envigado'
UNION ALL
SELECT v.id_veterinaria, s.id_servicio FROM veterinarias v JOIN servicios s ON s.nombre IN ('Vacunacion','Dental','Peluqueria')               WHERE v.nombre = 'Clinica Animal Belen'
UNION ALL
SELECT v.id_veterinaria, s.id_servicio FROM veterinarias v JOIN servicios s ON s.nombre IN ('Cirugia','Rayos X','Hospedaje')                  WHERE v.nombre = 'VetSalud Sabaneta'
UNION ALL
SELECT v.id_veterinaria, s.id_servicio FROM veterinarias v JOIN servicios s ON s.nombre IN ('Vacunacion','Peluqueria','Hospedaje')            WHERE v.nombre = 'Veterinaria Bello Norte'
UNION ALL
SELECT v.id_veterinaria, s.id_servicio FROM veterinarias v JOIN servicios s ON s.nombre IN ('Vacunacion','Laboratorio','Dental')              WHERE v.nombre = 'Clinica Veterinaria Robledo'
UNION ALL
SELECT v.id_veterinaria, s.id_servicio FROM veterinarias v JOIN servicios s ON s.nombre IN ('Cirugia','Urgencias','Cardiologia')              WHERE v.nombre = 'Veterinaria La Candelaria'
ON CONFLICT DO NOTHING;

INSERT INTO mascotas (nombre, especie, raza, edad, id_cliente) VALUES
  ('Bruno',  'Perro', 'Golden Retriever', 3, 1),
  ('Mochi',  'Gato',  'Persa',            2, 1),
  ('Coco',   'Perro', 'French Bulldog',   4, 2),
  ('Nina',   'Gato',  'Siames',           1, 3),
  ('Dante',  'Perro', 'Labrador',         6, 4)
ON CONFLICT DO NOTHING;
