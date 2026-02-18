# 🐾 MyVet App

# 📥 Instalación y Ejecución LOGIN - REGISTER

## 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/TU-USUARIO/TU-REPO.git
cd TU-REPO
```

---

## 2️⃣ Instalar dependencias

Este proyecto NO incluye la carpeta `node_modules`.

Para instalar todas las dependencias automáticamente:

```bash
npm install
```

---

## 3️⃣ Crear archivo `.env`

El archivo `.env` no se sube por seguridad.

Debes crear manualmente un archivo llamado `.env` en la raíz del proyecto con el siguiente contenido:

```
GOOGLE_CLIENT_ID=tu_google_client_id
GOOGLE_CLIENT_SECRET=tu_google_client_secret
```

Estos valores se obtienen desde Google Cloud Console.

⚠️ Configurar la URL de redirección en Google como:

```
http://localhost:4000/auth/google/callback
```

---

## 4️⃣ Ejecutar el servidor

```bash
node server.js
```

Deberías ver:

```
Servidor corriendo en http://localhost:4000
```

---

## 5️⃣ Ejecutar el Frontend

Abrir el proyecto con Live Server (recomendado en VS Code).

El frontend debe correr en algo como:

```
http://127.0.0.1:5500/index.html
```

⚠️ No abrir el archivo con doble clic (file://), puede causar errores de CORS.

---

# 🔐 Sistema de Autenticación

## Registro
- Validación de campos
- Validación de contraseñas
- Hash de contraseña con bcrypt
- Guardado en `users.json`

## Login
- Validación de credenciales
- Comparación con bcrypt
- Manejo de errores
- Guardado en:
  - localStorage (si "Recordarme")
  - sessionStorage (si no)

## Recordarme
- Activado → sesión persiste aunque se cierre el navegador
- No activado → sesión termina al cerrar navegador

## Protección de rutas
- Si no existe usuario en storage → redirige a login
- Se valida rol para dashboards

## Logout
- Limpia localStorage
- Limpia sessionStorage
- Redirige a login

## Google OAuth
- Autenticación con Google
- Registro automático si el usuario no existe
- Persistencia de sesión con Passport

---

# ⚠️ Archivos ignorados por seguridad

En `.gitignore`:

```
node_modules/
.env
```

### ¿Por qué?

- `node_modules` se reconstruye con `npm install`
- `.env` contiene credenciales privadas

---

# 🧠 Si clonas el proyecto en otro computador

Debes ejecutar:

```bash
npm install
```

Y crear manualmente el archivo `.env`.

Sin el `.env`, Google Login no funcionará.

---

# 🔒 Seguridad

- Contraseñas protegidas con bcrypt
- Validación backend
- Protección básica de rutas frontend


