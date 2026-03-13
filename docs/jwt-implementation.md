# Autenticación (JWT + Cookies) — Resumen rápido

Este documento describe brevemente los cambios realizados para añadir autenticación con JWT usando cookies httpOnly y refresh tokens persistidos en la base de datos.

Estado
- Access token: cookie httpOnly `access_token` (vida corta, p. ej. 15m)
- Refresh token: cookie httpOnly `refresh_token` (vida larga, p. ej. 7d) y almacenado en la tabla `refresh_tokens` para permitir revocación

Archivos principales añadidos / modificados
- `backend/controllers/authController.js` — login / refresh / logout / me
- `backend/routes/auth.js` — rutas montadas en `/api/auth`
- `backend/middleware/auth.js` — middleware que acepta token desde header `Authorization` o cookie `access_token`
- `backend/storage/authStorage.js` — helpers para persistir refresh tokens
- `backend/storage.js` — `createCliente` ahora hashea contraseñas con `bcryptjs`
- `backend/scripts/hash-seed-passwords.js` — script para hashear contraseñas semilla en la BD
- `database/db.sql` — añadida la tabla `refresh_tokens`
- `frontend/src/views/login.js` — login hace POST a `/api/auth/login` con `credentials: 'include'` y guarda sólo `user`
- `frontend/src/utils.js` — `authFetch` usa `credentials: 'include'`; `logoutUser()` disponible
- `package.json` — dependencias y script `hash-passwords`

Endoints (resumen)
- POST `/api/auth/login` — body: `{ email, password }`. Responde `{ user }` y setea cookies httpOnly `access_token` y `refresh_token`.
- POST `/api/auth/refresh` — usa cookie `refresh_token`; si válido emite nuevo `access_token` cookie.
- POST `/api/auth/logout` — elimina refresh token de la DB y borra cookies.
- GET `/api/auth/me` — protegido por middleware; devuelve el usuario actual.

Variables de entorno importantes
- `JWT_SECRET` — secreto para firmar access tokens (obligatorio en producción)
- `REFRESH_SECRET` — (opcional) secreto para refresh tokens; si no existe se usa `JWT_SECRET`
- Variables de conexión a la BD: `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`

Comandos útiles
- Instalar dependencias:
```bash
npm install
```
- Hashear contraseñas semilla (ejecutar una vez si la BD tiene contraseñas en texto claro):
```bash
npm run hash-passwords
```
- Ejecutar servidor en desarrollo:
```bash
npm run dev
```

Pruebas rápidas con curl
- Login (guarda cookies en `cookies.txt`):
```bash
curl -i -c cookies.txt -H "Content-Type: application/json" \
  -X POST -d '{"email":"andres.restrepo@gmail.com","password":"123456"}' \
  http://localhost:3000/api/auth/login
```
- Llamar endpoint protegido `/api/auth/me` usando las cookies:
```bash
curl -i -b cookies.txt http://localhost:3000/api/auth/me
```
- Refrescar `access_token` (usa `refresh_token` cookie):
```bash
curl -i -b cookies.txt -c cookies.txt -X POST http://localhost:3000/api/auth/refresh
```
- Logout:
```bash
curl -i -b cookies.txt -c cookies.txt -X POST http://localhost:3000/api/auth/logout
```

Notas de seguridad y recomendaciones
- En producción siempre usar `JWT_SECRET` y `REFRESH_SECRET` fuertes y distintos.
- Habilitar `secure: true` en cookies (ya condicionado por `NODE_ENV === 'production'`).
- Considerar protección CSRF para operaciones sensibles (double-submit cookie o tokens CSRF).
- Opcional: implementar rotación de refresh tokens (emitir un nuevo refresh al usar `/refresh` y revocar el anterior).
- Limitar el número de refresh tokens por usuario si no deseas múltiples sesiones por usuario.

Siguientes pasos sugeridos
- Proteger rutas específicas (por ejemplo: crear mascotas, reservar citas) usando `authenticateToken`.
- Implementar rotación de refresh tokens y refresco automático desde frontend al recibir 401.
- Añadir tests automáticos para el flujo de autenticación.

---
Documento corto creado para la carpeta `docs` con la descripción de la integración de autenticación.
