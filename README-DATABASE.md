# 🗄️ Configuración de Base de Datos PostgreSQL

## 📋 Requisitos Previos

1. **Instalar PostgreSQL**
   - Descarga desde: https://www.postgresql.org/download/
   - Durante la instalación, recuerda la contraseña del usuario `postgres`

2. **Verificar instalación**
   ```bash
   psql --version
   ```

## 🚀 Configuración Initial

### 1. Crear la Base de Datos

```bash
# Opción 1: Usando createdb
createdb -U postgres myvet_db

# Opción 2: Usando psql
psql -U postgres
CREATE DATABASE myvet_db;
\q
```

### 2. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```bash
cp .env.example .env
```

Edita `.env` con tus credenciales:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=myvet_db
DB_USER=postgres
DB_PASSWORD=tu_contraseña_aqui
PORT=3000
```

### 3. Inicializar el Schema

El schema se crea automáticamente al iniciar la aplicación, pero también puedes hacerlo manualmente:

```bash
# Ejecutar el schema SQL
psql -U postgres -d myvet_db -f database/db.sql
```

### 4. Instalar Dependencias

```bash
npm install
```

## 🧪 Probar la Conexión

Ejecuta el script de prueba:

```bash
node test-connection.js
```

Deberías ver:
```
========================================
🔍 PRUEBA DE CONEXIÓN A BASE DE DATOS
========================================

1️⃣  Probando conexión...
   ✅ Conexión establecida correctamente

2️⃣  Verificando tablas...
   ✅ Se encontraron 9 tablas:
      - clientes
      - veterinarias
      - servicios
      - ...

3️⃣  Probando lectura de datos...
   📊 Clientes: 2
   📊 Veterinarias: 3
   📊 Mascotas: 2
   ✅ Lectura de datos exitosa

4️⃣  Cerrando conexión...
   ✅ Conexión cerrada correctamente

========================================
✨ TODAS LAS PRUEBAS PASARON
========================================
```

## 🏃 Iniciar la Aplicación

```bash
# Modo desarrollo con auto-reload
npm run dev

# Modo producción
npm start
```

La aplicación estará disponible en: http://localhost:3000

## 📊 Estructura de la Base de Datos

### Tablas Principales

- **clientes**: Usuarios del sistema
- **veterinarias**: Clínicas veterinarias
- **servicios**: Servicios ofrecidos
- **mascotas**: Mascotas de los clientes
- **visitas**: Historial de visitas
- **emergencias**: Registro de emergencias
- **veterinaria_servicios**: Relación N:N entre veterinarias y servicios
- **guarderias**: Guarderías disponibles
- **refugios**: Refugios de animales

## 🔧 Comandos Útiles de PostgreSQL

### Conectar a la base de datos
```bash
psql -U postgres -d myvet_db
```

### Listar tablas
```sql
\dt
```

### Ver estructura de una tabla
```sql
\d clientes
```

### Ver datos de una tabla
```sql
SELECT * FROM clientes;
SELECT * FROM veterinarias;
SELECT * FROM mascotas;
```

### Resetear la base de datos
```bash
# Eliminar y recrear
dropdb -U postgres myvet_db
createdb -U postgres myvet_db
psql -U postgres -d myvet_db -f database/db.sql
```

## 🐛 Solución de Problemas

### Error: "FATAL: password authentication failed"
- Verifica que la contraseña en `.env` sea correcta
- Intenta: `psql -U postgres` para confirmar credenciales

### Error: "database myvet_db does not exist"
- Crea la base de datos: `createdb -U postgres myvet_db`

### Error: "relation clientes does not exist"
- Ejecuta el schema: `psql -U postgres -d myvet_db -f database/db.sql`

### El servidor PostgreSQL no está corriendo
```bash
# Windows (si está instalado como servicio)
net start postgresql-x64-15

# Linux/Mac
sudo service postgresql start
# o
brew services start postgresql
```

## 📚 Recursos Adicionales

- [Documentación PostgreSQL](https://www.postgresql.org/docs/)
- [Tutorial PostgreSQL](https://www.postgresqltutorial.com/)
- [Guía de instalación](https://www.postgresql.org/download/)
