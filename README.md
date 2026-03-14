# 🐾 VetCare - Plataforma Veterinaria SPA

### ✅ **Estado actual: SPA FUNCIONAL**

Una Single Page Application (SPA) completa para conectar dueños de mascotas con clínicas veterinarias.

## 🚀 **Características implementadas**

### ✅ **Core SPA**
- ✅ Router funcional con hash routing
- ✅ Navegación entre vistas sin recargar
- ✅ Landing page completamente funcional
- ✅ Vista de clínicas con búsqueda
- ✅ Perfiles de mascotas
- ✅ Dashboard de usuario

### ✅ **Funcionalidades**
- ✅ Búsqueda de clínicas por ubicación
- ✅ Filtros de especialidades
- ✅ Sistema de navegación completo
- ✅ Botones interactivos
- ✅ API service preparado
- ✅ Utilidades y helpers
- ✅ Controllers para navegación

### ✅ **UI/UX**
- ✅ Diseño responsivo con Tailwind CSS 
- ✅ Animaciones y transiciones
- ✅ Notificaciones toast
- ✅ Loading spinners
- ✅ Cards de clínicas interactivas

## 📂 **Estructura del proyecto**

```
MyVet/
├── index.html                 # Entry point
├── frontend/
│   ├── css/
│   │   ├── landing.css       # Estilos principales
│   │   └── task-manager.css  # Estilos adicionales
│   └── src/
│       ├── main.js           # 🎯 Inicializador principal
│       ├── router.js         # 🎯 Sistema de rutas
│       ├── utils.js          # 🎯 Utilidades generales
│       ├── controllers/
│       │   └── navbar.js     # 🎯 Control de navegación
│       ├── services/
│       │   └── api.js        # 🎯 Servicio API
│       └── views/
│           ├── landing-page.js    # 🎯 Página principal
│           ├── clinics-view.js    # 🎯 Vista de clínicas
│           ├── pet-profile.js     # 🎯 Perfil de mascotas
│           └── user-dashboard.js  # 🎯 Dashboard usuario
├── backend/                   # Backend Node.js (preparado)
└── database/                 # Base de datos SQL
```

## 🎯 **Rutas disponibles**

| Ruta | Descripción | Estado |
|------|-------------|---------|
| `/#/` o `/#/landing` | Página principal | ✅ Funcional |
| `/#/clinicas` | Lista de clínicas | ✅ Funcional |
| `/#/pet-profile` | Perfil de mascota | ✅ Funcional |
| `/#/user-dashboard` | Dashboard usuario | ✅ Funcional |
| `/#/emergencias` | Emergencias 24/7 | 🚧 En desarrollo |
| `/#/tips` | Tips de salud | 🚧 En desarrollo |

## 🚀 **Cómo usar**

### 1. **Iniciar la aplicación**
```bash
# Solo abrir index.html en el navegador
# O usar un servidor local:
python -m http.server 8000
# Luego ir a: http://localhost:8000
```

### 2. **Navegación**
- **Desde Landing**: Botones "Ingresar", "Buscar", enlaces del navbar
- **Búsqueda**: Campo de búsqueda funcional con parámetros URL
- **Clínicas**: Filtros, vista de detalles, reservas
- **Programática**: `window.location.hash = '/#/ruta'`

### 3. **Funcionalidades principales**

#### 🔍 **Búsqueda de clínicas**
```javascript
// Desde cualquier lugar:
window.searchClinics();

// Con ubicación específica:
window.location.hash = '/#/clinicas?location=Polanco';
```

#### 🏥 **Interacción con clínicas**
```javascript
// Ver detalles
window.viewClinicDetails(clinicId);

// Reservar cita
window.bookAppointment(clinicId);
```

## 🛠️ **Tecnologías**

- **Frontend**: Vanilla JavaScript ES6+, HTML5, CSS3
- **Styling**: Tailwind CSS
- **Architecture**: SPA con routing hash-based
- **Backend**: Node.js (preparado en `/backend`)
- **Database**: SQL (esquema en `/database`)

## 🎨 **Componentes implementados**

### ✅ **Landing Page**
- Hero section con búsqueda
- Cards de clínicas destacadas
- Call-to-action buttons
- Footer completo
- Navegación funcional

### ✅ **Vista de Clínicas**
- Barra de búsqueda con parámetros
- Filtros por especialidad
- Grid de clínicas
- Ordenamiento
- Botones de acción

### ✅ **Sistema de Navegación**
- Router hash-based
- Controllers de navegación
- Enlaces activos
- Navegación programática
- Breadcrumbs automáticos

## 🔧 **APIs preparadas**

```javascript
// Servicios disponibles
apiService.getClinics(location)
apiService.getClinicById(id)
apiService.getPetProfile(petId)
apiService.bookAppointment(data)
apiService.getUserDashboard(userId)

// Mock data disponible
apiService.getMockClinics()
```

## 🚀 **Próximos pasos**

### 🟡 **Para conectar con backend**
1. Actualizar `API_BASE_URL` en `services/api.js`
2. Implementar autenticación
3. Conectar endpoints reales

### 🟡 **Características pendientes**
- [ ] Autenticación de usuarios
- [ ] Vista de detalles de clínica individual
- [ ] Sistema de reservas completo
- [ ] Perfil de usuario editable
- [ ] Chat en vivo
- [ ] Notificaciones push
- [ ] Geolocalización
- [ ] Pagos integrados

## 📱 **Responsive & PWA Ready**

- ✅ Mobile-first responsive design
- ✅ Touch-friendly interactions
- ✅ Fast loading with minimal dependencies
- 🚧 PWA predictive caching (próximamente)

---

## 🎉 **¡Tu SPA está completa y funcionando!**

**Características principales implementadas:**
1. ✅ Router SPA funcional
2. ✅ Navegación completa 
3. ✅ Landing page operativo
4. ✅ Vista de clínicas con búsqueda
5. ✅ Servicios API preparados
6. ✅ Utilidades y controllers
7. ✅ Diseño responsivo y moderno

**Simplemente abre `index.html` y disfruta tu aplicación VetCare funcionando completamente como SPA.**

# MyVet - Gestión de Clínicas Veterinarias

Esto es un proyecto web para manejar clínicas veterinarias en Medellín. Básicamente ayuda a llevar control de mascotas, citas, servicios y esas cosas.

## Qué necesitas tener instalado

Antes que nada, asegúrate de tener estas cositas instaladas:

- Node.js (versión 14 o más nueva)
- PostgreSQL (yo uso la versión 12 pero cualquiera reciente debería funcionar)
- DBeaver (o algún otro programa para manejar PostgreSQL, pero yo prefiero DBeaver porque es más visual)
- npm (que ya viene con Node.js)

## Configurando la base de datos (con DBeaver)

### 1. Instalar PostgreSQL (si no lo tienes)

Primero lo primero, bájate PostgreSQL de su página oficial: [postgresql.org](https://www.postgresql.org/download/)

**OJO:** Cuando lo estés instalando, te va a pedir una contraseña para el usuario `postgres`. NO LA OLVIDES. En serio, apúntala en algún lugar porque la vas a necesitar después. A mí se me olvidó la primera vez y tuve que desinstalar y volver a instalar todo jaja.

El puerto que usa por defecto es el 5432, dejalo así nomás.

### 2. Conectando DBeaver con PostgreSQL

Ahora abre DBeaver. Si es tu primera vez usándolo, la interfaz puede parecer medio rara pero te acostumbras rápido.

1. Busca el ícono de enchufe con un signo de más (Nueva Conexión)
2. Selecciona PostgreSQL de la lista
3. Llena los datos así:
   ```
   Host: localhost
   Puerto: 5432
   Base de datos: postgres
   Usuario: postgres
   Contraseña: la que pusiste cuando instalaste
   ```
4. D3. Crear la base de datos

Ahora si, vamos a crear nuestra base de datos. En DBeaver:

1. Click derecho sobre tu conexión de PostgreSQL
2. Buscas algo que diga "SQL Editor" y le das "New SQL Script"
3. Copias y pegas este comando:

```sql
CREATE DATABASE myvet_db;
```

4. Presionas Ctrl + Enter (o el botoncito de play que está arriba)
5. Si no te salta ningún error, ya está lista la base de datos
6. Refresca la lista (F5 o el botón de actualizar) y deberías ver `myvet_db`

### 4. Cambiarse a la base de datos nueva

Esto es importante: ahora tenemos que decirle a DBeaver que queremos trabajar con `myvet_db` en vez de `postgres`.

1. Click derecho en tu conexión → "Edit Connection"  
2. Donde dice "Database" cambias de `postgres` a `myvet_db`
3. Guardas y listo

Puede que te pida reconectar, solo dale que sí.

### 5. Cargar las tablas y datos (la parte importante)
# Navega al directorio del proyecto
cd "c:\Users\Jupiter\Desktop\MyVetV1"

# Ejecuta el script SQL
psql6. Revisar que todo se haya creado bien

Para asegurarte que funcionó:

1. En DBeaver, expandí tu conexión `myvet_db` (el triángulo al lado)
2. Expandí "Schemas" → "public" → "Tables"
3. Deberías ver como 10 tablas ahí:
   - clientes
   - veterinarias
   - servicios
   - mascotas
   - visitas
   - emergencias
   - emergency_messages
   - veterinaria_servicios
   - guarderias
   - refugios

Si no ves todas esas tablas, algo falló en el paso anterior. Revisá los mensajes de error.

### 7. Probar que los datos de prueba se cargaron

El archivo SQL ya trae datos de ejemplo (clientes, mascotas, veterinarias, etc.) para que puedas probar la aplicación sin tener que crear todo manualmente.

Para verificar que están ahí, abrí un nuevo SQL Editor y ejecutá estas consultas
   - `veterinaria_servicios`
ver los clientes de prueba
SELECT * FROM clientes;

-- ver las veterinarias
SELECT * FROM veterinarias;

-- ver las mascotas
SELECT * FROM mascotas;

-- esto es interesante, ver qué servicios ofrece cada veterinaria
SELECT 
    v.nombre AS veterinaria,
    s.nombre AS servicio
FROM veterinaria_servicios vs
JOIN veterinarias v ON v.id_veterinaria = vs.id_veterinaria
JOIN servicios s ON s.id_servicio = vs.id_servicio
ORDER BY v.nombre;
```

Si te devuelve datos en cada consulta, felicidades! La base de datos está lista.

## Configurar el proyecto

Bien, ya tenemos la BD lista. Ahora hay que configurar Node.js y todo eso.

### Variables de entorno (el archivo .env)

Este paso es SUPER importante, sin esto no va a conectar con la base de datos.

copy .env.example .env
```

Ahora abrí ese archivo `.env` nuevo con cualquier editor (Notepad++, VSCode, lo que uses) y cambiá la contraseña:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=myvet_db
DB_USER=postgres
DB_PASSWORD=tu_contraseña_real_aqui    # <--- acá ponés TU contraseña de postgres

PORT=3000
```

No compartas este archivo con nadie porque tiene tu contraseña. Por eso está en el .gitignore.

### Instalar las dependencias

Abrí una terminal en la carpeta del proyecto (PowerShell, CMD, o la terminal de VSCode, lo que prefieras) y ejecutá:
DB_PASSWORD=TU_CONTRASEÑA_AQUI

# Configuración del Servidor
PORT=3000
```

**IMPORTANTE:** Reemplaza `xmn250803*` con la contraseña real de tu usuario postgres.

### Paso 2: Instalar Dependencias
npm install
```

Esto va a bajar un montón de paquetes. Puede tardar un rato dependiendo de tu internet. Es normal.

### Probar que la conexión funciona

Antes de correr la aplicación completa, hay un script que hice para probar la conexión a la BD:

```bash
node test-connection.js
```

Si todo está bien configurado, deberías ver algo así

Si todo está bien, verás un mensaje como:

```
DATABASE CONNECTION TEST
Testing connection...
Connection established successfully
veterinarias
  - mascotas
  (y más...)

Testing data reading...
Clients: 4
Clinics: 8
Pets: 5

ALL TESTS PASSED ✓
```

Si ves "ALL TESTS PASSED", estás listo. Si sale algún error, revisá el .env o que PostgreSQL esté corriendo.

## Correr la aplicación

### Levantar el servidor

## 🚀 Ejecutar el Proyecto

### Iniciar el Backend

```bash
# Iniciar el servidor Node.js
npm start

npm start
```

Vas a ver un mensaje diciendo que el servidor está corriendo en `http://localhost:3000`. No cierres esa terminal.

### Abrir el frontend

Para ver la aplicación andando, simplemente abrí el archivo `index.html` en tu navegador. Podés:

1. Hacer doble click en el archivo `index.html` del proyecto
2. O arrastrarlo a tu navegador
3. O desde el navegador, File → Open y buscar el archivo

La aplicación debería abrirse y si hacés click en "Clínicas" o "Emergencias", va a consultar a la API que está corriendo en el puerto 3000.

**Pro tip:** Si usás VS Code, instalate la extensión "Live Server". Con eso podés hacer click derecho en el index.html → "Open with Live Server" y es más cómodo para desarrollar porque recarga automáticamente cuando guardás cambios
### Desde DBeaver o SQL Editor:

```sql
-- Ver todas las tablas
SELComandos que pueden servir

Por si necesitás hacer alguna cosa rápida con la BD:

###listar todas las tablas que tenés
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- contar cuántos registros hay en cada tabla
SELECT 'clientes' as tabla, COUNT(*) FROM clientes
UNION ALL
SELECT 'veterinarias', COUNT(*) FROM veterinarias
UNION ALL
SELECT 'mascotas', COUNT(*) FROM mascotas;

-- borrar todos los datos de una tabla (cuidado con esto)
TRUNCATE TABLE nombre_tabla CASCADE;

-- si la cagaste y querés empezar de cero (esto BORRA TODO)
DROP DATABASE myvet_db;
CREATE DATABASE myvet_db;
-- después tendrías que volver a correr el db.sql
```

### Si usás psql desde terminal
psql -U postgres

# Listar bases de datos
\l

psql -U postgres     # conectar

\l                   # listar bases de datos
\c myvet_db          # conectarse a myvet_db
\dt                  # ver tablas
\d nombre_tabla      # ver estructura de una tabla
\q                   # salir
```

## Cómo está armada la base de didos (vacunación, cirugía, etc.)
- **mascotas**: Mascotas de los clientes
- **visitas**: Historial de visitas veterinarias
- **emergencias**: Registro de emergencias
- **emergency_messages**: Mensajes de emergencia enviados

### Relaciones:

```
clientes (1) ──→ (N) mascotas
mascotas (1) ──→ (N) visitas
mascotas (1) ──→ (N) emergencias
veterinarias (1) ──→ (N) visitas
veterinarias (1) ──→ (N) emergencias
veterinarias (N) ←→ (N) servicios (tabla intermedia: veterinaria_servicios)
```

Por si te da curiosidad, estas son las tablas principales:

- **clientes** - los dueños de mascotas que se registran
- **veterinarias** - las clínicas registradas en el sistema
- **servicios** - servicios que pueden ofrecer (vacunas, cirugías, etc)
- **mascotas** - las mascotas de cada cliente
- **visitas** - historial de cuando una mascota va al veterinario
- **emergencias** - registro de emergencias
- **emergency_messages** - mensajes de emergencia que se envían

Las relaciones básicamente son:
- Un cliente puede tener muchas mascotas
- Una mascota puede tener muchas visitas y emergencias
- Las veterinarias se relacionan muchos-a-muchos con los servicios (una veterinaria ofrece varios servicios y un servicio lo ofrecen varias veterinarias)

## Problemas comunes que me encontré
```sql
CREATE USER postgres WITH SUPERUSER PASSWORD 'tu_contraseña';
```

### Error: "Puerto 3000 ya está en uso"

```bash
**"No se puede conectar" o "Connection refused"**

Probablemente PostgreSQL no está corriendo. En Windows abrí Services (buscalo en el inicio) y buscá algo que diga PostgreSQL. Si está "Stopped", dale Start. También podés revisar desde PowerShell:

```bash
Get-Service -Name postgresql*
```

**"La base de datos myvet_db no existe"**

Olvidaste crear la base de datos. Volvé al paso 3 y ejecutá el `CREATE DATABASE myvet_db;`

**"El rol postgres no existe"**

Esto es raro pero a veces pasa. Significa que cuando instalaste PostgreSQL no se creó el usuario por defecto. Desde DBeaver conectate como superusuario y ejecutá:

```sql
CREATE USER postgres WITH SUPERUSER PASSWORD 'tu_contraseña';
```

**"El puerto 3000 ya está en uso"**

Tenés algo más corriendo en el puerto 3000. Cambiá el puerto en el .env:

```env
PORT=3001
```

**Las consultas no traen datos**

Probablemente el archivo db.sql no se ejecutó completo o falló en alguna parte. Revisá los mensajes en DBeaver cuando lo ejecutaste. Si hay errores, a veces es más fácil dropear la BD y empezar de nuevo (obvio guardá tus cambios antes).*Backend:** Node.js + Express
- **Base de Datos:** PostgreSQL
- **Frontend:** HTML5 + CSS3 + JavaScript (Vanilla)
- **Estilos:** Tailwind CSS (CDN)
Datos de prueba

El proyecto ya trae datos de ejemplo para que puedas probar sin tener que crear todo a mano:

**Usuarios para login:**
- andres.restrepo@gmail.com / 123456
- camila.montoya@hotmail.com / 123456
- juangomez94@gmail.com / 123456
- nherrera.med@outlook.com / 123456

(sí, todas las contraseñas son 123456 jaja, es solo para pruebas)

**Mascotas:**
- Bruno (Golden Retriever)
- Mochi (Gato Persa)
- Coco (French Bulldog)
- Nina (Gato Siamés)
- Dante (Labrador)

Y hay como 8 veterinarias cargadas en Medellín (El Poblado, Laureles, Envigado, etc).

## Con qué está hecho

Por si te interesa:

- Backend: Node.js con Express
- Base de datos: PostgreSQL
- Frontend: JavaScript vanilla, HTML, CSS
- Estilos: Tailwind CSS (vía CDN, no está instalado local)

Nada muy rebuscado, traté de mantenerlo simple.

## Checklist si algo no funciona

Antes de desesperarte, revisá:

- [ ] PostgreSQL instalado y corriendo
- [ ] Base de datos `myvet_db` creada
- [ ] Archivo `.env` con tu contraseña de postgres
- [ ] `npm install` ejecutado
- [ ] `test-connection.js` corre sin errores
- [ ] Backend corriendo (`npm start`)

Si todo eso está bien y sigue sin funcionar, abrí un issue o revisá la consola del navegador (F12) para ver qué error está tirando.

---

Hecho para ayudar con la gestión de clínicas veterinarias en Medellín 🐕🐈