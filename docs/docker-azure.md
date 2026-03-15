# Despliegue con Docker y Azure

Este documento explica cómo empaquetar la app en un contenedor Docker y subirla a Azure App Service. La base de datos ya está en Azure PostgreSQL, así que solo hay que desplegar el servidor Node.

---

## Requisitos previos

- Tener instalado **Docker Desktop** → https://www.docker.com/products/docker-desktop
- Tener una cuenta en **Docker Hub** → https://hub.docker.com (es gratis)
- Tener acceso al portal de **Azure** → https://portal.azure.com

---

## Paso 1 — Construir la imagen localmente

Desde la raíz del proyecto (donde está el `Dockerfile`):

```bash
docker build -t paws-app .
```

Eso crea una imagen llamada `paws-app`. La primera vez tarda un poco porque descarga la imagen base de Node.

Para verificar que se creó bien:

```bash
docker images
```

Debería aparecer `paws-app` en la lista.

---

## Paso 2 — Probar el contenedor en local

Antes de subir a Azure, conviene verificar que funciona en local pasándole las variables de entorno a mano:

```bash
docker run -p 3000:3000 \
  -e DB_HOST=paws-db-server-final.postgres.database.azure.com \
  -e DB_PORT=5432 \
  -e DB_NAME=paws_db \
  -e DB_USER=pawsadmin \
  -e DB_PASSWORD=TuPasswordSeguro123! \
  -e DB_SSL=true \
  -e PORT=3000 \
  paws-app
```

Si todo va bien, abrir `http://localhost:3000` en el navegador debería mostrar la app.

> En Windows con PowerShell, reemplazar los `\` por `` ` `` al final de cada línea.

---

## Paso 3 — Subir la imagen a Docker Hub

Primero hay que etiquetar la imagen con el nombre de usuario de Docker Hub:

```bash
docker tag paws-app TU_USUARIO/paws-app:latest
```

Luego iniciar sesión y subir:

```bash
docker login
docker push TU_USUARIO/paws-app:latest
```

Reemplazar `TU_USUARIO` con el nombre de usuario de Docker Hub. Una vez subida, la imagen queda en `https://hub.docker.com/r/TU_USUARIO/paws-app`.

---

## Paso 4 — Crear el App Service en Azure

1. Entrar al portal de Azure → https://portal.azure.com
2. Buscar **App Services** y hacer clic en **Crear**
3. Rellenar los campos:
   - **Suscripción**: la que tengan activa
   - **Grupo de recursos**: crear uno nuevo o usar uno existente
   - **Nombre**: el que quieran (ej. `paws-app`) — este será parte de la URL
   - **Publicar**: seleccionar **Contenedor Docker**
   - **Sistema operativo**: Linux
   - **Región**: la misma que la base de datos (probablemente East US o similar)
   - **Plan de tarifa**: F1 (gratis) sirve para pruebas; B1 para algo más estable

4. En la pestaña **Docker**:
   - **Origen**: Docker Hub
   - **Tipo de acceso**: Público
   - **Imagen y etiqueta**: `TU_USUARIO/paws-app:latest`

5. Hacer clic en **Revisar y crear** → **Crear**

---

## Paso 5 — Configurar las variables de entorno en Azure

La imagen no lleva el archivo `.env` por seguridad, así que hay que configurar las variables directamente en Azure.

Dentro del App Service creado:

1. Ir a **Configuración** → **Variables de entorno** (o "Application settings" en la versión en inglés)
2. Agregar cada una de estas variables:

| Nombre | Valor |
|--------|-------|
| `DB_HOST` | `paws-db-server-final.postgres.database.azure.com` |
| `DB_PORT` | `5432` |
| `DB_NAME` | `paws_db` |
| `DB_USER` | `pawsadmin` |
| `DB_PASSWORD` | `TuPasswordSeguro123!` |
| `DB_SSL` | `true` |
| `PORT` | `3000` |

3. Guardar los cambios. Azure reinicia el contenedor automáticamente.

---

## Paso 6 — Verificar el despliegue

Una vez que el servicio esté corriendo, la URL pública será algo como:

```
https://paws-app.azurewebsites.net
```

Para confirmar que la API responde:

```
https://paws-app.azurewebsites.net/api/health
```

Respuesta esperada:

```json
{ "ok": true, "message": "PAWS API running" }
```

Si hay algún error, los logs se pueden ver en Azure desde **Herramientas de desarrollo** → **Flujo de registro** (Log stream).

---

## Actualizar la app después de cambios

Cada vez que se haga un cambio en el código hay que repetir los pasos 1 y 3:

```bash
docker build -t paws-app .
docker tag paws-app TU_USUARIO/paws-app:latest
docker push TU_USUARIO/paws-app:latest
```

Luego en Azure, ir al App Service → **Centro de implementación** → **Sincronizar** para que tome la nueva imagen.

---

## Resumen de archivos creados

| Archivo | Para qué sirve |
|---------|----------------|
| `Dockerfile` | Instrucciones para construir la imagen del contenedor |
| `.dockerignore` | Le dice a Docker qué archivos ignorar (node_modules, .env, etc.) |
