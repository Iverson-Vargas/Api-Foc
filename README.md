## API FOC - Gestión de Inventarios y Usuarios

Este proyecto es una API RESTful desarrollada con **Node.js** y **Express** para gestionar usuarios, roles, categorías, almacenes, áreas y productos. Utiliza **Prisma** como ORM para interactuar con una base de datos **PostgreSQL** y sigue una arquitectura por capas para asegurar un código mantenible y escalable.

**Autores**:
- Iverson Vargas
- Anthony Azuaje
- Sebastian Dorante
- Johan Torres

---

## ⚙️ Configuración y Puesta en Marcha

### 1. Instrucciones de Instalación

1. **Instalar dependencias**:
```bash
npm install
```

2. **Configurar variables de entorno**:
   - Copiar el archivo `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```
   - Editar el archivo `.env` y ajustar las variables según tu configuración
   - Ver sección "Variables de entorno" más abajo

3. **Generar el cliente de Prisma**:
```bash
npm run prisma:generate
```

4. **Ejecutar migraciones**:
```bash
npm run prisma:migrate
```

5. **Iniciar en modo desarrollo**:
```bash
npm run start:dev
```

La API estará disponible en `http://localhost:3800`

### Comandos principales

- **Desarrollo**: `npm run start:dev` (inicia la API con recarga automática)
- **Producción**: `npm start` (inicia la API en modo producción)
- **Prisma Studio**: `npm run prisma:studio` (visualizar datos en la BD)

---

## Requisitos

- **Node.js** >= 18
- **npm** (incluido con Node)
- **PostgreSQL** (puede ser local o remoto)
- **Docker Desktop** (opcional, solo si usas Docker para PostgreSQL)

---

## Instalación

```bash
npm install
```

---

## Ejecución

- **Modo normal**:

```bash
npm start
```

- **Modo desarrollo** (con recarga automática vía `nodemon`):

```bash
npm run start:dev
```

El servidor se levantará por defecto en el puerto **3800** o en el que definas en la variable de entorno `API_PORT`.

Ejemplo:

```bash
API_PORT=4000 npm start
```

---

## Estructura del proyecto

```text
src/
  app.js                # Punto de entrada: instancia y arranca el servidor
  servidor/
    server.js           # Configuración de Express, middlewares y registro de rutas
  rutas/                # Definición de endpoints HTTP
    users.rutas.js
    roles.rutas.js
    test.rutas.js
  controladores/        # Lógica que maneja req/res y llama a servicios
    users.controladores.js
    roles.controladores.js
    test.controladores.js
  servicios/            # Lógica de negocio y acceso a datos con Prisma
    users.servicios.js
    roles.servicios.js
    test.servicios.js
  validators/           # Validaciones de entrada con express-validator
    test.validator.js
  middlewares/          # Middlewares personalizados
    validate-fields.middleware.js
  config/               # Configuraciones de la aplicación
    prisma.config.js    # Cliente de Prisma
  public/
    index.html          # Recurso estático de ejemplo
```

---

## Endpoints disponibles

Suponiendo que el servidor corre en `http://localhost:3800` y el prefijo de API es `/api/v1`:

### Test
- `GET /api/v1/test` → Lista todos los registros de test
- `GET /api/v1/test/:id` → Obtiene un registro por ID
- `POST /api/v1/test` → Crea un nuevo registro (con validaciones)
- `PUT /api/v1/test/:id` → Actualiza un registro existente (con validaciones)
- `DELETE /api/v1/test/:id` → Elimina un registro (soft delete)

### Roles
- `GET /api/v1/roles` → Lista todos los roles
- `GET /api/v1/roles/:id` → Obtiene un rol por ID
- `POST /api/v1/roles` → Crea un nuevo rol
- `PUT /api/v1/roles/:id` → Actualiza un rol existente
- `DELETE /api/v1/roles/:id` → Elimina un rol (soft delete)

### Users
- `GET /api/v1/users` → Lista todos los usuarios
- `GET /api/v1/users/:id` → Obtiene un usuario por ID
- `POST /api/v1/users` → Crea un nuevo usuario
- `PUT /api/v1/users/:id` → Actualiza un usuario existente
- `DELETE /api/v1/users/:id` → Elimina un usuario (soft delete)

---

## Configuración de Base de Datos

La aplicación utiliza **Prisma** como ORM para conectarse a **PostgreSQL**. 

**⚠️ IMPORTANTE**: Todas las tablas de la base de datos deben definirse en el archivo `prisma/schema.prisma`. Este archivo contiene la definición de todos los modelos usando la sintaxis de Prisma.

### Variables de entorno

1. **Copiar el archivo de ejemplo**:
```bash
cp .env.example .env
```

2. **Editar el archivo `.env`** y ajustar las variables:

```env
# Configuración de la API
API_PORT=3800

# Configuración de la Base de Datos
DATABASE_URL="postgresql://usuario:password@localhost:5432/nombre_bd?schema=public"
```

**Nota**: Ajusta `usuario`, `password`, `localhost`, `5432` y `nombre_bd` según tu configuración de PostgreSQL.

**Importante**: El archivo `.env` no debe subirse al repositorio (está en `.gitignore`). Solo el archivo `.env.example` se incluye como plantilla.

### Configuración inicial (Primera vez)

1. **Asegúrate de tener PostgreSQL corriendo** (local o remoto)

2. **Definir las tablas en Prisma**:
   - Editar el archivo `prisma/schema.prisma`
   - Agregar todos los modelos (tablas) necesarios
   - Ver el modelo de datos en el `ENUNCIADO.md` para referencia

3. **Generar el cliente de Prisma**:
```bash
npm run prisma:generate
```

4. **Ejecutar migraciones** (crea las tablas en la base de datos):
```bash
npm run prisma:migrate
```

**Nota**: Cada vez que modifiques `prisma/schema.prisma`, debes ejecutar `npm run prisma:generate` y luego `npm run prisma:migrate` para aplicar los cambios.

### Comandos útiles

- **Abrir Prisma Studio** (visualizar datos):
```bash
npm run prisma:studio
```

- **Resetear la base de datos** (elimina todos los datos):
```bash
npm run prisma:reset
```

### Docker (Opcional)

Si prefieres usar Docker para PostgreSQL, puedes usar `docker-compose.yml`:

```bash
# Levantar la base de datos
docker compose up -d

# Detener la base de datos
docker compose down
```

**Nota**: Docker es opcional. Puedes usar cualquier instancia de PostgreSQL (local o remota).

## Tecnologías utilizadas

- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **Prisma** - ORM para PostgreSQL
- **PostgreSQL** - Base de datos relacional
- **express-validator** - Validaciones de entrada
- **dotenv** - Gestión de variables de entorno

---

## Scripts disponibles

### Desarrollo

- `npm run start:dev` → Arranca la API con `nodemon` para desarrollo (recarga automática)
- `npm start` → Arranca la API en modo producción

### Prisma

- `npm run prisma:generate` → Genera el cliente de Prisma
- `npm run prisma:migrate` → Ejecuta las migraciones de Prisma
- `npm run prisma:studio` → Abre Prisma Studio para visualizar datos
- `npm run prisma:reset` → Resetea la base de datos (elimina todos los datos)
