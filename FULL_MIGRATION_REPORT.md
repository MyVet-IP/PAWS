# PAWS — Reporte completo de migración de base de datos

Este documento explica todo lo que se hizo para migrar el proyecto PAWS desde su esquema de base de datos viejo (mezcla de español e inglés, llamado "MyVet") al nuevo diseño basado en el ERD actualizado (23 tablas, nombres en inglés).

Esto fue hecho como parte de un proyecto académico universitario. PAWS es una plataforma de servicios veterinarios construida con Node.js, Express, PostgreSQL (SQL directo con `pg`) y un frontend en JavaScript vanilla.

---

## 1. Descripción general del proyecto

PAWS es una aplicación web donde los dueños de mascotas pueden buscar clínicas veterinarias, registrar sus mascotas, ver historiales médicos y enviar mensajes de emergencia a las clínicas. El backend es un servidor Node.js con Express que se conecta a PostgreSQL usando la librería `pg` directamente (sin ORM). El frontend es una SPA (Single Page Application) que usa rutas basadas en hash.

**Tecnologías usadas:**
- Backend: Node.js + Express 4.18
- Base de datos: PostgreSQL con `pg` 8.11 (consultas SQL directas)
- Frontend: JavaScript vanilla + Tailwind CSS (por CDN)
- Punto de entrada: `backend/app.js`
- Esquema: `database/db.sql`

---

## 2. Archivos que realmente usa la aplicación

Estos son los archivos de los que la app depende cuando se ejecuta. Son los que importan de verdad:

| Archivo | Qué hace |
|---------|----------|
| `backend/app.js` | Servidor Express, todas las rutas de la API (inline), lógica de inicio |
| `backend/storage.js` | Capa de acceso a datos — aquí viven todas las consultas SQL |
| `backend/storage/db.js` | Pool de conexión a PostgreSQL + auto-inicialización del esquema |
| `backend/middleware/index.js` | Exporta el manejador de errores, el 404 y el validador de body |
| `backend/middleware/errorHandler.js` | Atrapa errores y devuelve respuestas HTTP con el código correcto |
| `backend/middleware/notFound.js` | Devuelve 404 para rutas API que no existen |
| `backend/middleware/validateBody.js` | Verifica que los campos obligatorios estén en el body del request |
| `database/db.sql` | Esquema de la base de datos + datos de prueba |
| `.env.example` | Plantilla de variables de entorno |
| `package.json` | Dependencias y scripts de npm |
| `index.html` | Página de entrada del frontend (SPA) |
| `frontend/src/main.js` | Inicializador del frontend |
| `frontend/src/router.js` | Router de la SPA basado en hash |
| `frontend/src/views/*.js` | 8 archivos de vistas (páginas) |

---

## 3. Archivos obsoletos o que no se usan

Estos archivos existen en el repositorio pero **no son importados ni usados** por la aplicación cuando se ejecuta. La mayoría parece que fueron generados por otra IA durante un intento de refactorización anterior que nunca se terminó.

| Archivo | Por qué no es relevante |
|---------|------------------------|
| `backend/server.js` | Punto de entrada viejo con bcrypt, passport, Google OAuth — ninguno de esos paquetes está instalado |
| `backend/routes/*.js` (13 archivos) | Archivos de rutas definidos pero **ninguno es importado** en `app.js`. Todas las rutas están inline en `app.js`. |
| `backend/controllers/*.js` (13 archivos) | Lo mismo — los controllers existen pero nunca se llaman. Varios son duplicados (clientesController vs clientsController, mascotasController vs petsController, etc.) |
| `backend/storage/clientesStorage.js` | Módulo de storage individual, no importado en ningún lado |
| `backend/storage/mascotasStorage.js` | Igual |
| `backend/storage/visitasStorage.js` | Igual |
| `backend/storage/emergencyStorage.js` | Igual |
| `backend/storage/veterinariasStorage.js` | Igual |
| `backend/storage/serviciosStorage.js` | Igual |
| `backend/storage/authStorage.js` | Archivo vacío |
| `backend/services/api.js` | En realidad es código del lado del cliente, mal ubicado en backend |
| `frontend/src/playground-1.mongodb.js` | Archivo de prueba de MongoDB — el proyecto usa PostgreSQL |
| `frontend/config/menuByRole.js` | Vacío (1 línea) |
| `admin.html` | Panel de admin independiente, no conectado a la SPA principal |

**Recomendación:** Todos estos archivos se pueden borrar para limpiar el proyecto. Solo generan confusión y hacen que parezca que la app tiene más estructura de la que realmente tiene.

---

## 4. Errores encontrados en el código actual

El proyecto estaba roto antes de esta migración. Estos son los problemas que encontramos:

### Error 1: Faltaba el import de `storage` en `app.js`
`app.js` llama a `storage.getAllClientes()`, `storage.getVeterinariaById()`, etc. por todo el archivo, pero nunca importa el módulo de storage. Solo tenía `const db = require('./db')`. La línea `const storage = require('./storage')` no existía.

### Error 2: Ruta de `require('./db')` rota
El archivo `backend/db.js` fue eliminado (git muestra `D backend/db.js`) y movido a `backend/storage/db.js`. Pero tanto `app.js` como `storage.js` todavía tenían `require('./db')` apuntando al archivo borrado. Esto hacía que la app se cayera al iniciar con `MODULE_NOT_FOUND`.

### Error 3: Conflicto de nombres `servicios` vs `specialties`
En `app.js` línea 89, el código hacía `vet.servicios.map(s => s.nombre.toUpperCase())`. Pero `storage.js` guardaba el campo como `vet.specialties` (no `servicios`), y los objetos de especialidad tienen `name` (no `nombre`). Esto lanzaría un error `Cannot read properties of undefined` al ejecutarse.

### Error 4: Ruta del esquema incorrecta en `db.js`
Después de mover `db.js` de `backend/db.js` a `backend/storage/db.js`, la variable `SCHEMA_PATH` era `path.join(__dirname, '..', 'database', 'db.sql')`. Desde `backend/storage/`, un `..` sube a `backend/`, y luego `database/db.sql` sería `backend/database/db.sql` — que no existe. El archivo real del esquema está en la raíz del proyecto: `database/db.sql`.

### Error 5: Ruta de dotenv incorrecta
`require('dotenv').config({ path: '../.env' })` usa una ruta relativa, pero dotenv la resuelve relativa al directorio de trabajo actual (CWD), no a `__dirname`. Cuando se ejecuta `npm start` desde la raíz del proyecto, `../.env` apunta arriba del proyecto. La app probablemente funcionaba de todas formas porque `db.js` tenía valores por defecto hardcodeados.

### Error 6: `module.exports` duplicado en `db.js`
El archivo tenía `module.exports = pool;` en la línea 12 y después `module.exports = database;` en la línea 145. El segundo sobreescribe al primero, pero el export muerto del pool en la línea 12 genera confusión.

**Los 6 errores fueron corregidos en esta migración.**

---

## 5. Resumen de la base de datos vieja

13 tablas con nombres mezclados en español e inglés:

| Tabla | Idioma | Qué almacenaba |
|-------|--------|----------------|
| `clientes` | Español | Usuarios / dueños de mascotas |
| `veterinarias` | Español | Clínicas veterinarias (mezclaba campos de negocio con campos de clínica) |
| `specialties` | Inglés | Tipos de servicio (Vaccination, Surgery, etc.) |
| `schedules` | Inglés | Horarios semanales de las clínicas |
| `animal_types` | Inglés | Catálogo de especies de mascotas |
| `guarderias` | Español | Guarderías — **solo existía la tabla, nunca se usó en el backend** |
| `refugios` | Español | Refugios — **solo existía la tabla, nunca se usó en el backend** |
| `mascotas` | Español | Mascotas |
| `visitas` | Español | Visitas veterinarias / historial médico |
| `emergencias` | Español | Eventos de emergencia |
| `emergency_messages` | Mixto | Mensajes de contacto de emergencia |
| `vet_specialties` | Inglés | Tabla puente: veterinarias ↔ specialties |
| `vet_animal_types` | Inglés | Tabla puente: veterinarias ↔ animal_types |

Problemas principales:
- Mezcla de español e inglés por todas partes
- La tabla `veterinarias` mezclaba info de negocio (dirección, teléfono, ubicación) con info específica de clínica (is_24h, rating) — sin separación
- No había concepto de diferentes tipos de negocio (clínicas, refugios, tiendas, etc.)
- No existían los veterinarios como profesionales con entidad propia
- `visitas` era muy simple — solo diagnóstico, medicamentos y chequeos como strings cortos
- `guarderias` y `refugios` eran tablas vacías sin llaves foráneas y sin código en el backend
- Las contraseñas se guardaban en texto plano

---

## 6. Resumen de la base de datos nueva

23 tablas, todas con nombres en inglés, centradas en una abstracción de `businesses` (negocios):

**Entidades principales:** `users`, `businesses`, `pets`

**Tipos de negocio (cada uno extiende `businesses`):**
- `clinics` — clínicas veterinarias con service_type, is_24h, rating
- `shelters` — refugios de animales
- `petshops` — tiendas de mascotas
- `dog_walkers` — paseadores de perros
- `daycares` — guarderías de mascotas

**Dominio clínico:** `medical_records`, `clinic_specialties`, `clinic_animal_types`, `vets`, `vet_specialties`, `vet_animal_types`

**Dominio de refugio/adopción:** `shelter_pets`, `adoptions`

**Dominio de emergencias:** `emergencies`, `emergency_messages`

**Dominio de guardería:** `daycare_slots`, `daycare_bookings`

**Compartidas:** `specialties`, `animal_types`, `schedules`

El cambio arquitectónico principal es que `veterinarias` se dividió en `businesses` (campos comunes como nombre, dirección, teléfono, ubicación) + `clinics` (campos específicos de clínica). Esto permite que el sistema soporte diferentes tipos de negocio con la misma estructura base.

---

## 7. Mapeo de esquema (viejo → nuevo)

| Tabla vieja | Acción | Tabla(s) nueva(s) |
|-------------|--------|-------------------|
| `clientes` | **Renombrada** | `users` — `id_cliente`→`user_id`, `nombre`→`name`, `telefono`→`phone`, se agregó `created_at` |
| `veterinarias` | **Dividida** | `businesses` + `clinics` — los campos de negocio van a `businesses`, los campos de clínica (service_type, is_24h, rating) van a `clinics` |
| `mascotas` | **Renombrada** | `pets` — `id_mascota`→`pet_id`, `nombre`→`name`, `especie`→`species`, `raza`→`breed`, `edad`(int)→`birth_date`(date), se agregó `weight_kg` |
| `visitas` | **Renombrada y expandida** | `medical_records` — `id_visita`→`record_id`, `diagnostico`→`diagnosis`, `medicamentos`→`treatment`, `chequeos`→`notes`, se agregaron visit_type, reason, campos de archivos adjuntos, campos de seguimiento |
| `emergencias` | **Renombrada** | `emergencies` — columnas de español a inglés, `id_veterinaria`→`business_id`, se agregaron `status` y `resolved_at` |
| `emergency_messages` | **Columnas renombradas** | `emergency_messages` — `id_mensaje`→`message_id`, `mensaje`→`message`, `nombre_contacto`→`contact_name`, etc. |
| `specialties` | **Se mantuvo igual** | `specialties` |
| `animal_types` | **Se mantuvo igual** | `animal_types` |
| `vet_specialties` | **Reemplazada** | `clinic_specialties` (ahora enlaza clinics↔specialties en vez de veterinarias↔specialties) |
| `vet_animal_types` | **Reemplazada** | `clinic_animal_types` |
| `schedules` | **FK actualizada** | `schedules` — `id_veterinaria`→`business_id` |
| `guarderias` | **Eliminada** | Reemplazada por `businesses`+`daycares` (diseño correcto) |
| `refugios` | **Eliminada** | Reemplazada por `businesses`+`shelters` (diseño correcto) |

**Tablas completamente nuevas (no existían antes):**
`businesses`, `clinics`, `shelters`, `shelter_pets`, `adoptions`, `petshops`, `dog_walkers`, `daycares`, `daycare_slots`, `daycare_bookings`, `vets`, `vet_specialties` (nuevo significado), `vet_animal_types` (nuevo significado), `clinic_specialties`, `clinic_animal_types`

---

## 8. Qué cambió en el código

### `backend/storage/db.js` — Corregido
- Se eliminó el export muerto del `pool` que estaba al inicio (era sobreescrito de todas formas)
- Se corrigió la ruta de dotenv para usar ruta absoluta: `path.join(__dirname, '..', '..', '.env')`
- Se corrigió SCHEMA_PATH para subir dos niveles: `path.join(__dirname, '..', '..', 'database', 'db.sql')`
- Se cambió el nombre de BD por defecto de `myvet_db` a `paws_db`
- Se eliminaron las credenciales hardcodeadas de los valores por defecto
- Se agregó soporte SSL para Azure (`DB_SSL=true` activa `ssl: { rejectUnauthorized: false }`)
- Se limpiaron los métodos para usar async/await en vez de Promises manuales

### `backend/storage.js` — Reescritura completa
- Todos los nombres de métodos cambiaron de español a inglés: `getAllClientes`→`getAllUsers`, `getMascotaById`→`getPetById`, etc.
- Todas las consultas SQL actualizadas con los nuevos nombres de tablas y columnas
- Las consultas de clínicas ahora hacen JOIN entre `businesses` y `clinics`
- Las consultas de historial médico hacen JOIN a través de `clinics` → `businesses` para obtener nombres de clínicas
- Las consultas de emergencias ahora usan `business_id` en vez de `id_veterinaria`
- `getUserDashboard` retorna `{ user, pets }` en vez de `{ cliente, mascotas }`
- `getSpecialtiesByClinic` reemplaza a `getSpecialtiesByVeterinaria`
- `createClinic` inserta en ambas tablas: `businesses` y `clinics`

### `backend/app.js` — Reescritura completa
- **Corregido** el import faltante de `storage`
- **Corregida** la ruta del import de `db`: `require('./storage/db')` en vez de `require('./db')`
- **Corregida** la ruta de dotenv
- Todas las rutas renombradas:
  - `/api/clientes` → `/api/users`
  - `/api/clinics` se mantiene pero usa los nuevos métodos del storage
  - `/api/veterinarias` → `/api/clinics` (POST)
  - `/api/servicios` → `/api/specialties`
  - `/api/mascotas` → `/api/pets`
  - `/api/visitas` → `/api/medical-records`
  - `/api/emergencias` → `/api/emergencies`
  - `/api/emergency` → `/api/emergency-messages` (POST)
- Todos los nombres de campos en request/response actualizados a inglés
- El código roto `vet.servicios.map(s => s.nombre.toUpperCase())` fue reemplazado con `c.specialties.map(s => s.name.toUpperCase())`
- Se agregaron `specialties_list`, `image`, `location` como alias en las respuestas de clínicas para compatibilidad con el frontend

### `database/db.sql` — Reemplazo completo
- 23 tablas en vez de 13
- Todos los nombres en inglés
- Datos de prueba adaptados a la nueva estructura (los users tienen IDs 1-5, businesses/clinics IDs 1-8, pets referencia los nuevos user IDs)

### `.env.example` — Actualizado
- Nombre de BD cambiado a `paws_db`
- Se agregó la opción `DB_SSL=false`
- Se agregaron comentarios de configuración para Azure
- Se eliminaron credenciales hardcodeadas

---

## 9. Archivos modificados

| Archivo | Tipo de cambio |
|---------|---------------|
| `backend/app.js` | Reescritura completa — se corrigieron errores, se renombraron todas las rutas y campos |
| `backend/storage.js` | Reescritura completa — todas las consultas actualizadas para el nuevo esquema |
| `backend/storage/db.js` | Se corrigieron rutas, se eliminó código muerto, se agregó soporte SSL |
| `database/db.sql` | Reemplazo completo — 23 tablas + datos de prueba actualizados |
| `.env.example` | Se actualizó nombre de BD, se agregó opción SSL |

## 10. Archivos creados

| Archivo | Para qué sirve |
|---------|---------------|
| `database/migration.sql` | Script de referencia que muestra cómo transformar datos viejos al esquema nuevo |
| `FULL_MIGRATION_REPORT.md` | Este documento |

---

## 11. Qué falta por hacer

### Actualizaciones del frontend
Los archivos JavaScript del frontend hacen llamadas `fetch()` a los endpoints viejos y usan los nombres de campos viejos. Esto necesita actualizarse:

| Archivo del frontend | Qué hay que cambiar |
|---------------------|---------------------|
| `frontend/src/views/login.js` | El endpoint sigue siendo `/api/login` pero los campos de respuesta cambian: `id_cliente`→`user_id`, `nombre`→`name` |
| `frontend/src/views/register.js` | El endpoint cambia: `/api/clientes` → `/api/users`, campos del body: `nombre`→`name`, `telefono`→`phone` |
| `frontend/src/views/clinics-view.js` | La forma de la respuesta cambia — nuevos campos como `image_url` en vez de `imagen`, `address` en vez de `direccion`. Se agregó el alias `specialties_list` para compatibilidad. |
| `frontend/src/views/user-dashboard.js` | La respuesta cambia: `cliente`→`user`, `mascotas`→`pets`, `visitas`→`medical_records` |
| `frontend/src/views/emergency.js` | Campos del body cambian: `mensaje`→`message`, `nombre_contacto`→`contact_name`, `id_veterinaria`→`business_id` |
| `frontend/src/views/pet-profile.js` | Campos de respuesta: `nombre`→`name`, `especie`→`species`, `raza`→`breed`, `edad`→`birth_date` |
| Todas las vistas que usan localStorage | El objeto de usuario guardado ahora tiene `user_id` en vez de `id_cliente` |

### Funcionalidades nuevas (las tablas existen pero todavía no hay endpoints)
Estas tablas se crearon en el esquema pero todavía no tienen endpoints CRUD porque no hay frontend para ellas:
- `shelters`, `shelter_pets`, `adoptions`
- `petshops`, `dog_walkers`
- `daycares`, `daycare_slots`, `daycare_bookings`
- `vets`, `vet_specialties`, `vet_animal_types`

Cuando el frontend esté listo para estas funcionalidades, se pueden agregar endpoints siguiendo el mismo patrón de los que ya existen (método en storage + ruta en app.js).

### Hasheo de contraseñas
Las contraseñas todavía se guardan en texto plano. Antes de ir a producción, se debería agregar `bcrypt` para hashear las contraseñas al registrarse y compararlas al iniciar sesión.

---

## 12. Cómo configurar la base de datos nueva en local

```bash
# 1. Crear la base de datos nueva
createdb paws_db

# 2. Copiar .env.example a .env y poner tus credenciales
cp .env.example .env
# Editar .env con tu usuario y contraseña de postgres local

# 3. Iniciar el servidor — inicializa el esquema automáticamente
npm run dev

# O ejecutar el esquema manualmente:
psql -U postgres -d paws_db -f database/db.sql
```

---

## 13. Conexión a Azure — Guía paso a paso

### Aclaración importante

Yo (el asistente) **no tengo acceso a tu cuenta de Azure**. No puedo crear recursos, ejecutar comandos ni desplegar nada directamente. Todo lo que sigue son instrucciones y comandos listos para copiar y pegar que tú tienes que ejecutar en tu terminal o en el portal de Azure.

Voy a ser honesto: si en algún paso algo no funciona o no aplica para tu caso específico, es mejor revisar la documentación oficial de Azure que inventar una solución.

---

### 13.1 Opciones de cuenta de Azure — Cuál conviene para este proyecto

Hay tres opciones principales. Las pongo en orden de mejor a peor para un proyecto universitario:

#### Opción 1: Azure para Estudiantes (la mejor)
- **Crédito:** $100 USD gratis
- **Duración:** 12 meses (se puede renovar si sigues siendo estudiante)
- **Tarjeta de crédito:** NO se necesita
- **Requisitos:** Tener un correo institucional (.edu, o el que use tu universidad) y ser mayor de 18 años
- **Enlace:** https://azure.microsoft.com/es-es/free/students/

Con $100 USD alcanza para como 6 meses de una base de datos PostgreSQL en el tier más barato. Para un proyecto de universidad es más que suficiente.

#### Opción 2: Cuenta gratuita de Azure (plan B)
- **Crédito:** $200 USD pero solo por 30 días
- **Después:** Algunos servicios son gratis por 12 meses, pero PostgreSQL Flexible Server NO está incluido en los servicios gratuitos permanentes
- **Tarjeta de crédito:** SÍ se necesita (no te cobran mientras no te pases del crédito)
- **Enlace:** https://azure.microsoft.com/es-es/free/

Esta opción sirve si no tienes correo universitario, pero los $200 se acaban en 30 días y después toca pagar.

#### Opción 3: Pagar directamente (último recurso)
Si no aplicas para ninguna opción gratuita, el tier más barato para PostgreSQL en Azure cuesta aproximadamente $16.50 USD al mes (B1ms + 32GB storage).

**Recomendación para este proyecto:** Usar Azure para Estudiantes si tienes correo institucional. Si no, la cuenta gratuita de $200 funciona para hacer las pruebas en 30 días.

---

### 13.2 Cómo verificar si puedes usar Azure para Estudiantes

1. Ir a https://azure.microsoft.com/es-es/free/students/
2. Hacer clic en "Empezar gratis"
3. Iniciar sesión con tu correo institucional (el de la universidad)
4. Azure va a intentar verificar que eres estudiante. Generalmente lo hace automático con el dominio del correo. Si no funciona automático, puede pedir verificación manual (subir constancia de matrícula o algo así)
5. Si todo sale bien, te va a dar acceso al portal de Azure con $100 USD de crédito

**Si tu correo no es reconocido:** Algunas universidades no están registradas en el sistema de Azure. En ese caso, intenta con la cuenta gratuita normal (Opción 2) o pregunta en tu universidad si tienen algún convenio con Microsoft.

Para verificar que el crédito quedó activado:
1. Entrar al portal de Azure: https://portal.azure.com
2. Buscar "Suscripciones" en la barra de búsqueda
3. Debería aparecer algo como "Azure para Estudiantes" con el crédito disponible
4. También se puede ver en "Administración de costos + facturación"

---

### 13.3 Instalar Azure CLI

Para ejecutar los comandos que vienen más adelante, necesitas tener Azure CLI instalado en tu máquina.

**En Windows:**
```bash
# Opción 1: Con winget (Windows 11)
winget install -e --id Microsoft.AzureCLI

# Opción 2: Descargar el instalador .msi desde:
# https://learn.microsoft.com/es-es/cli/azure/install-azure-cli-windows
```

**Verificar que quedó instalado:**
```bash
az --version
```

**Iniciar sesión:**
```bash
az login
```

Esto abre el navegador para que inicies sesión con tu cuenta de Azure. Después de autenticarte, la terminal va a mostrar la información de tu suscripción.

---

### 13.4 Crear el grupo de recursos

Un grupo de recursos es como una carpeta en Azure donde van todos los recursos del proyecto.

```bash
az group create --name rg-paws --location eastus
```

Usamos `eastus` porque tiene buena latencia desde Colombia. También se puede usar `brazilsouth` (São Paulo) si prefieres.

---

### 13.5 Crear el servidor de PostgreSQL

Aquí es donde se gasta la mayor parte del crédito. Vamos a usar el tier más barato posible.

```bash
az postgres flexible-server create ^
  --resource-group rg-paws ^
  --name paws-db-server ^
  --location eastus ^
  --admin-user pawsadmin ^
  --admin-password "TuPasswordSeguro123!" ^
  --sku-name Standard_B1ms ^
  --tier Burstable ^
  --storage-size 32 ^
  --version 16 ^
  --yes
```

> **Nota para Windows:** En CMD se usa `^` para saltos de línea. En PowerShell se usa `` ` ``. En Git Bash o WSL se usa `\`. Acá pongo la versión de CMD. Si usas Git Bash, cambia los `^` por `\`.

**Cosas importantes:**
- El `--name` tiene que ser único en todo Azure. Si `paws-db-server` ya está tomado, ponle algo como `paws-db-xime` o `paws-db-tunombre`.
- El password tiene que tener al menos 8 caracteres, con mayúsculas, minúsculas, números y símbolos. **Anotalo en algún lado seguro.**
- Este comando se tarda como 3-5 minutos. Hay que esperar.
- El SKU `Standard_B1ms` es el más barato: 1 vCPU, 2 GB RAM, ~$12.99 USD/mes.

**Costo aproximado:**

| Recurso | Costo mensual |
|---------|--------------|
| Servidor B1ms (cómputo) | ~$12.99 USD |
| Almacenamiento 32 GB | ~$3.68 USD |
| **Total** | **~$16.67 USD/mes** |

Con los $100 de Azure para Estudiantes, alcanza para **aproximadamente 6 meses**.

---

### 13.6 Crear la base de datos dentro del servidor

El paso anterior crea el servidor de PostgreSQL, pero todavía no tiene nuestra base de datos. Hay que crearla:

```bash
az postgres flexible-server db create ^
  --resource-group rg-paws ^
  --server-name paws-db-server ^
  --database-name paws_db
```

---

### 13.7 Configurar reglas de firewall (acceso por IP)

Por defecto, Azure bloquea todas las conexiones externas. Para poder conectarte desde tu computador, necesitas agregar tu IP al firewall.

**Agregar tu IP actual:**

En Git Bash o WSL:
```bash
MY_IP=$(curl -s ifconfig.me)
echo "Tu IP es: $MY_IP"

az postgres flexible-server firewall-rule create \
  --resource-group rg-paws \
  --name paws-db-server \
  --rule-name mi-ip-local \
  --start-ip-address $MY_IP \
  --end-ip-address $MY_IP
```

En CMD de Windows (si no tienes curl):
1. Ir a https://ifconfig.me en el navegador y anotar tu IP
2. Ejecutar (reemplazando `TU.IP.AQUI` con tu IP real):
```bash
az postgres flexible-server firewall-rule create ^
  --resource-group rg-paws ^
  --name paws-db-server ^
  --rule-name mi-ip-local ^
  --start-ip-address TU.IP.AQUI ^
  --end-ip-address TU.IP.AQUI
```

**Si tu IP cambia seguido** (internet residencial con IP dinámica), puedes abrir temporalmente para todas las IPs para hacer pruebas:

```bash
az postgres flexible-server firewall-rule create ^
  --resource-group rg-paws ^
  --name paws-db-server ^
  --rule-name temp-todas-las-ips ^
  --start-ip-address 0.0.0.0 ^
  --end-ip-address 255.255.255.255
```

**Esto es inseguro y solo debe ser temporal para pruebas.** Cuando termines de probar, borra esa regla:

```bash
az postgres flexible-server firewall-rule delete ^
  --resource-group rg-paws ^
  --name paws-db-server ^
  --rule-name temp-todas-las-ips ^
  --yes
```

---

### 13.8 Obtener la cadena de conexión

El hostname de tu servidor es:
```
paws-db-server.postgres.database.azure.com
```

(Reemplazando `paws-db-server` con el nombre que hayas usado en el paso 13.5)

Para probar la conexión con `psql`:

```bash
psql "host=paws-db-server.postgres.database.azure.com port=5432 dbname=paws_db user=pawsadmin sslmode=require"
```

Te va a pedir el password. Si conecta bien, vas a ver el prompt `paws_db=>`. Escribe `\q` para salir.

Si no tienes `psql` instalado, puedes instalarlo con:
- Windows: Instalar PostgreSQL desde https://www.postgresql.org/download/windows/ (incluye psql)
- O usar el Azure Cloud Shell desde el portal web de Azure

---

### 13.9 Configurar el `.env` del proyecto

Editar (o crear) el archivo `.env` en la raíz del proyecto PAWS:

```env
DB_HOST=paws-db-server.postgres.database.azure.com
DB_PORT=5432
DB_NAME=paws_db
DB_USER=pawsadmin
DB_PASSWORD=TuPasswordSeguro123!
DB_SSL=true
PORT=3000
```

**Puntos importantes:**
- `DB_SSL=true` es **obligatorio** para Azure. Sin esto, la conexión se rechaza con un error de SSL.
- `DB_USER` es solo el nombre de usuario, sin `@servidor`. En Flexible Server ya no se necesita ese sufijo.
- **Nunca subir el archivo `.env` a git.** Verificar que `.env` esté en el `.gitignore`.

---

### 13.10 Ejecutar el esquema en Azure

Hay dos formas de cargar las tablas y los datos de prueba:

**Forma A — Automática (la más fácil):**

El archivo `backend/storage/db.js` tiene una función que detecta si la base de datos está vacía y ejecuta `database/db.sql` automáticamente. Solo hay que iniciar el servidor:

```bash
npm start
```

Si todo está bien configurado, va a mostrar algo como:
```
Connected to PostgreSQL
Database: paws_db @ paws-db-server.postgres.database.azure.com
No tables found — initializing schema...
Schema initialized successfully.
PAWS server started
URL: http://localhost:3000
```

**Forma B — Manual con psql:**

Si prefieres hacerlo manualmente o la forma automática no funcionó:

```bash
psql "host=paws-db-server.postgres.database.azure.com port=5432 dbname=paws_db user=pawsadmin sslmode=require" -f database/db.sql
```

Te pide el password. Si ejecuta sin errores, las 23 tablas y los datos de prueba quedan creados.

**Si necesitas ejecutar el script de migración** (solo si tenías datos reales en el esquema viejo):

```bash
psql "host=paws-db-server.postgres.database.azure.com port=5432 dbname=paws_db user=pawsadmin sslmode=require" -f database/migration.sql
```

Pero para este proyecto, como los datos viejos son solo datos de prueba, es mejor usar directamente el `db.sql` nuevo que ya trae datos de prueba equivalentes.

---

### 13.11 Verificar que la conexión funciona

1. **Iniciar el servidor local:**
```bash
npm run dev
```

Debe mostrar:
```
Connected to PostgreSQL
Database: paws_db @ paws-db-server.postgres.database.azure.com
Database already has 23 tables.
PAWS server started
```

2. **Probar el health check:**
```bash
curl http://localhost:3000/api/health
```
Respuesta esperada: `{"ok":true,"message":"PAWS API running"}`

3. **Probar que hay datos:**
```bash
curl http://localhost:3000/api/users
curl http://localhost:3000/api/clinics
curl http://localhost:3000/api/pets
```

Cada uno debería devolver un JSON con los datos de prueba.

4. **Probar desde el navegador:** Abrir `http://localhost:3000` y navegar por la aplicación.

---

### 13.12 Errores comunes y cómo resolverlos

#### `no pg_hba.conf entry for host "XX.XX.XX.XX"`
**Qué significa:** Tu IP no está en las reglas de firewall del servidor de Azure.
**Solución:** Repetir el paso 13.7 con tu IP actual. Si tu IP cambió (pasa seguido con internet residencial), hay que actualizar la regla.

#### `SSL connection is required`
**Qué significa:** Azure requiere SSL y tu app no lo tiene habilitado.
**Solución:** Verificar que en el `.env` tengas `DB_SSL=true`. Si ya lo tienes y sigue fallando, verificar que `backend/storage/db.js` tenga la lógica de SSL:
```js
if (process.env.DB_SSL === 'true') {
  DB_CONFIG.ssl = { rejectUnauthorized: false };
}
```

#### `password authentication failed for user "pawsadmin"`
**Qué significa:** La contraseña es incorrecta.
**Solución:** Verificar que el password en `.env` coincida exactamente con el que pusiste al crear el servidor. Si lo perdiste, se puede resetear:
```bash
az postgres flexible-server update ^
  --resource-group rg-paws ^
  --name paws-db-server ^
  --admin-password "NuevoPassword456!"
```
Y actualizar el `.env` con el password nuevo.

#### `database "paws_db" does not exist`
**Qué significa:** El servidor existe pero la base de datos no se creó.
**Solución:** Ejecutar el paso 13.6 (crear la base de datos).

#### `relation "users" does not exist`
**Qué significa:** La base de datos existe pero las tablas no se crearon.
**Solución:** Ejecutar el paso 13.10 (ejecutar el esquema).

#### `self-signed certificate` o `SELF_SIGNED_CERT_IN_CHAIN`
**Qué significa:** Node.js está rechazando el certificado SSL de Azure.
**Solución:** Esto lo maneja el `db.js` con `rejectUnauthorized: false`. Si sigue saliendo, verificar que `DB_SSL=true` esté en el `.env` y que el `db.js` actualizado esté guardado.

#### `connect ETIMEDOUT` o `could not connect to server`
**Qué significa:** No se puede llegar al servidor. Puede ser firewall, servidor apagado, o hostname incorrecto.
**Solución:**
1. Verificar el hostname: ¿el nombre del servidor en `.env` coincide con el que creaste?
2. Verificar las reglas de firewall: `az postgres flexible-server firewall-rule list --resource-group rg-paws --name paws-db-server`
3. Verificar que el servidor esté corriendo: `az postgres flexible-server show --resource-group rg-paws --name paws-db-server --query state`

#### `MODULE_NOT_FOUND: Cannot find module './db'`
**Qué significa:** Algún archivo del proyecto todavía tiene el import viejo.
**Solución:** Verificar que `backend/app.js` tenga `require('./storage/db')` y que `backend/storage.js` tenga `require('./storage/db')`.

---

### 13.13 Cómo monitorear el gasto del crédito

Es importante revisar cuánto crédito te queda para no llevarte sorpresas.

1. Ir a https://portal.azure.com
2. Buscar "Administración de costos + facturación"
3. Click en tu suscripción (Azure para Estudiantes)
4. Ver "Crédito de Azure" o "Saldo de crédito"

También se puede ver por CLI:
```bash
az account show --query "{name:name, state:state}"
```

**Tip para ahorrar crédito:** Si no vas a usar la base de datos por un tiempo (vacaciones, por ejemplo), puedes detener el servidor:

```bash
# Detener (deja de cobrar cómputo, solo cobra almacenamiento)
az postgres flexible-server stop ^
  --resource-group rg-paws ^
  --name paws-db-server

# Reiniciar cuando lo necesites
az postgres flexible-server start ^
  --resource-group rg-paws ^
  --name paws-db-server
```

Cuando el servidor está detenido, no se cobra el cómputo (~$13/mes) sino solo el almacenamiento (~$3.68/mes). Eso ayuda a estirar el crédito.

---

### 13.14 Si la opción gratuita no alcanza

Si se te acabó el crédito de estudiante o no pudiste acceder a ninguna opción gratuita, hay algunas alternativas:

1. **Renovar Azure para Estudiantes:** Se puede renovar el crédito cada 12 meses mientras sigas siendo estudiante.
2. **Usar PostgreSQL local:** Para desarrollo y pruebas, PostgreSQL local en tu máquina es gratis y funciona perfectamente. Solo necesitas Azure para el despliegue final.
3. **Pedir ayuda a la universidad:** Algunas universidades tienen laboratorios de Azure o licencias de Microsoft que incluyen créditos extra.
4. **Usar otro servicio gratuito de PostgreSQL para pruebas:** Servicios como Neon (https://neon.tech) o Supabase (https://supabase.com) ofrecen PostgreSQL gratis con limitaciones — no es Azure, pero sirve para probar que la app funciona con una base de datos remota antes de hacer el despliegue final en Azure.

---

### 13.15 Resumen rápido de comandos de Azure (para copiar y pegar)

Estos son todos los comandos en orden, listos para ejecutar. Reemplazar los valores entre `< >` con los tuyos:

```bash
# 1. Login
az login

# 2. Grupo de recursos
az group create --name rg-paws --location eastus

# 3. Servidor PostgreSQL
az postgres flexible-server create ^
  --resource-group rg-paws ^
  --name <tu-nombre-servidor> ^
  --location eastus ^
  --admin-user pawsadmin ^
  --admin-password "<TuPasswordSeguro123!>" ^
  --sku-name Standard_B1ms ^
  --tier Burstable ^
  --storage-size 32 ^
  --version 16 ^
  --yes

# 4. Base de datos
az postgres flexible-server db create ^
  --resource-group rg-paws ^
  --server-name <tu-nombre-servidor> ^
  --database-name paws_db

# 5. Firewall (reemplazar con tu IP)
az postgres flexible-server firewall-rule create ^
  --resource-group rg-paws ^
  --name <tu-nombre-servidor> ^
  --rule-name mi-ip ^
  --start-ip-address <TU.IP> ^
  --end-ip-address <TU.IP>

# 6. Probar conexión con psql
psql "host=<tu-nombre-servidor>.postgres.database.azure.com port=5432 dbname=paws_db user=pawsadmin sslmode=require"

# 7. Ejecutar esquema (manual)
psql "host=<tu-nombre-servidor>.postgres.database.azure.com port=5432 dbname=paws_db user=pawsadmin sslmode=require" -f database/db.sql

# 8. Configurar .env y arrancar el proyecto
npm run dev
```

---

### 13.16 Limpieza — Cómo borrar todo si ya no lo necesitas

Si ya terminaste el proyecto y quieres dejar de gastar crédito, puedes borrar todo el grupo de recursos (esto borra el servidor, la base de datos y todo lo que esté dentro):

```bash
az group delete --name rg-paws --yes --no-wait
```

Esto es irreversible. Solo hacerlo cuando estés seguro de que ya no necesitas nada.

---

*Reporte generado como parte del proyecto de migración de base de datos PAWS.*
