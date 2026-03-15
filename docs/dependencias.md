# Dependencias del proyecto PAWS

## Para qué sirve cada paquete

El proyecto usa Node.js con Express en el backend y Vanilla JS en el frontend. No tiene framework de frontend ni bundler, así que las dependencias son pocas y bastante estándar.

| Paquete | Versión | Para qué se usa |
|---------|---------|-----------------|
| `express` | ^4.18.2 | El servidor web. Maneja todas las rutas de la API y sirve el frontend. |
| `pg` | ^8.11.3 | El cliente de PostgreSQL. Es el que abre la conexión a la base de datos y ejecuta los queries. |
| `dotenv` | ^16.3.1 | Carga las variables de entorno desde el archivo `.env` (credenciales de la DB, puerto, etc.). |
| `cors` | ^2.8.5 | Permite que el frontend pueda hacer peticiones a la API aunque estén en orígenes distintos. |
| `nodemon` | ^3.0.1 | Solo para desarrollo. Reinicia el servidor automáticamente cuando se guarda un archivo. |

---

## Cómo instalar

Solo hace falta correr esto en la raíz del proyecto:

```bash
npm install
```

Eso descarga los cinco paquetes. No hay nada extra que configurar después.

---

## Configurar el archivo `.env`

Antes de arrancar el servidor se necesita un archivo `.env` en la raíz del proyecto. Ya existe uno de ejemplo llamado `.env.example`. Copiarlo y rellenar los datos:

```bash
cp .env.example .env
```

Variables que hay que ajustar:

```
DB_HOST=localhost          # o la dirección del servidor PostgreSQL
DB_PORT=5432
DB_NAME=paws_db
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_SSL=false               # true si es Azure u otro servidor cloud
PORT=3000
```

---

## Validar que todo quedó bien

Después de `npm install`, correr:

```bash
npm run dev
```

Si arranca sin errores, en la consola debería aparecer algo así:

```
========================================
 PAWS server started
 URL: http://localhost:3000
 API: http://localhost:3000/api/health
========================================
```

Para confirmar que la API responde, abrir en el navegador o con curl:

```
http://localhost:3000/api/health
```

Respuesta esperada:

```json
{ "ok": true, "message": "PAWS API running" }
```

Si la conexión a la base de datos también está bien, el servidor inicializa las tablas automáticamente en el primer arranque (lee el archivo `database/db.sql`).

---

## Estructura de scripts disponibles

```bash
npm start      # producción — corre con node
npm run dev    # desarrollo — corre con nodemon (reinicio automático)
```
