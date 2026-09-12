# HealthQuest Backend

REST API backend for **HealthQuest**, a rehabilitation-oriented application that connects the game/client layer with a MySQL database.

This repository contains the Node.js/Express API used to manage authentication, patients, rehabilitation sessions, and session results.

> **Project status:** Practice / project backend. The API is functional for the HealthQuest workflow, but it is not presented as production-ready. Authentication, authorization, validation, and deployment security still require hardening before real-world use.

## Project Focus

- REST API development with Node.js and Express.
- MySQL database integration using `mysql2`.
- Environment-based configuration with `dotenv`.
- CORS configuration for client applications.
- Creation and configuration of rehabilitation sessions.
- Retrieval and creation of patient records.
- Storage of session performance results.
- Integration point between the HealthQuest client applications and the database.

## API Routes

| Method | Route | Purpose |
|---|---|---|
| `POST` | `/login` | Authenticates a user using email and password. |
| `GET` | `/pacientes/:fisioterapeuta_id` | Retrieves patient records for the patient-management flow. |
| `POST` | `/pacientes/nuevo` | Creates a new patient record. |
| `POST` | `/sessions` | Creates a rehabilitation session with its configuration. |
| `PUT` | `/resultados/:id` | Stores the performance results of an existing session. |

## Technical Implementation

### Express API

`server.js` initializes the Express application, loads environment variables, enables JSON request parsing and CORS, and mounts the route modules.

The API is organized by feature instead of placing every endpoint in a single server file:

- `Routes/login.js`
- `Routes/pacientes.js`
- `Routes/sessions.js`
- `Routes/resultados.js`

### MySQL Integration

`db.js` creates a MySQL connection pool using environment variables such as host, port, user, password, and database name.

The route modules use parameterized SQL queries when sending request values to MySQL. This keeps request data separate from the SQL statements.

### Session Flow

A client can create a rehabilitation session through `/sessions` by sending values such as:

- Patient ID
- Session duration
- Number of enemies
- Cadence
- Speed

The backend inserts the configuration into `Sesiones_Simple` and returns the generated session ID.

### Results Flow

After a session is completed, `/resultados/:id` updates the corresponding record with:

- Left-side score
- Right-side score
- Precision

The route returns `404` when the requested session does not exist.

## Project Structure

```text
HealthQuest-Backend/
├── Routes/
│   ├── login.js
│   ├── pacientes.js
│   ├── resultados.js
│   └── sessions.js
├── db.js
├── server.js
├── package.json
└── .env
```

> The `.env` file in the repository has been sanitized and contains local placeholders. Environment files should not contain real production credentials.

## Technologies

- Node.js
- Express 5
- MySQL
- mysql2
- dotenv
- CORS
- REST API

## Running Locally

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a local `.env` file with the database configuration required by your MySQL instance.

Example:

```env
PORT=3000
MYSQLHOST=localhost
MYSQLPORT=3306
MYSQLUSER=root
MYSQLPASSWORD=
MYSQLDATABASE=HealthQuest
```

### 3. Start the API

```bash
npm start
```

The server uses port `3000` by default when `PORT` is not provided.

## Current Status and Limitations

This backend is functional as part of the HealthQuest project, but several areas would need additional work for a production deployment:

- Passwords should be stored and verified using a secure password-hashing strategy instead of direct comparison.
- Authentication should be extended with a proper session or token mechanism and authorization rules.
- Request validation should be added to the API endpoints.
- Rate limiting and additional API security controls should be considered.
- Error handling could be centralized instead of being handled independently in each route.
- Patient access should be restricted according to the authenticated physiotherapist instead of relying only on the route parameter.
- Database credentials must remain outside the repository and should be rotated if they have previously been exposed.

These limitations are documented intentionally to distinguish the current project implementation from a production-ready backend.

## Development Context

HealthQuest is a larger rehabilitation project involving a game/client layer, web functionality, and a MySQL database. This repository focuses specifically on the backend API responsible for connecting those components with persistent data.

---

# HealthQuest Backend — Español

API REST desarrollada con **Node.js y Express** para **HealthQuest**, una aplicación orientada a rehabilitación que conecta la capa de juego/cliente con una base de datos MySQL.

Este repositorio contiene la API utilizada para gestionar autenticación, pacientes, sesiones de rehabilitación y resultados.

> **Estado del proyecto:** Backend de práctica / proyecto. La API es funcional dentro del flujo de HealthQuest, pero no se presenta como un backend listo para producción. La autenticación, autorización, validación y seguridad del despliegue requieren endurecimiento antes de un uso real.

## Enfoque del proyecto

- Desarrollo de una API REST con Node.js y Express.
- Integración con MySQL mediante `mysql2`.
- Configuración mediante variables de entorno con `dotenv`.
- Configuración de CORS para clientes externos.
- Creación y configuración de sesiones de rehabilitación.
- Consulta y creación de pacientes.
- Almacenamiento de resultados de las sesiones.
- Integración entre las aplicaciones cliente de HealthQuest y la base de datos.

## Rutas de la API

| Método | Ruta | Propósito |
|---|---|---|
| `POST` | `/login` | Autentica un usuario mediante correo y contraseña. |
| `GET` | `/pacientes/:fisioterapeuta_id` | Consulta registros de pacientes para el flujo de gestión. |
| `POST` | `/pacientes/nuevo` | Crea un nuevo registro de paciente. |
| `POST` | `/sessions` | Crea una sesión de rehabilitación con su configuración. |
| `PUT` | `/resultados/:id` | Guarda los resultados de una sesión existente. |

## Implementación técnica

### API con Express

`server.js` inicializa Express, carga las variables de entorno, habilita el procesamiento de JSON y CORS, y registra los módulos de rutas.

Las rutas están separadas por funcionalidad:

- `Routes/login.js`
- `Routes/pacientes.js`
- `Routes/sessions.js`
- `Routes/resultados.js`

### Integración con MySQL

`db.js` crea un pool de conexiones MySQL utilizando variables de entorno para host, puerto, usuario, contraseña y base de datos.

Las rutas utilizan consultas SQL parametrizadas para enviar los valores provenientes de las solicitudes a MySQL.

### Flujo de sesiones

El cliente puede crear una sesión mediante `/sessions`, enviando datos como:

- ID del paciente
- Duración
- Cantidad de enemigos
- Cadencia
- Velocidad

El backend almacena la configuración en `Sesiones_Simple` y devuelve el ID generado.

### Flujo de resultados

Al terminar una sesión, `/resultados/:id` actualiza el registro correspondiente con:

- Puntaje izquierdo
- Puntaje derecho
- Precisión

La ruta devuelve `404` cuando no encuentra la sesión indicada.

## Tecnologías

- Node.js
- Express 5
- MySQL
- mysql2
- dotenv
- CORS
- REST API

## Ejecución local

```bash
npm install
npm start
```

Configura previamente un archivo `.env` local con las credenciales de tu instancia MySQL.

## Estado y limitaciones

El backend funciona como parte del proyecto HealthQuest, pero todavía existen aspectos que deberían mejorarse antes de un despliegue de producción:

- Utilizar hashing seguro para las contraseñas.
- Implementar autenticación mediante sesiones o tokens y reglas de autorización.
- Agregar validación de entradas.
- Incorporar rate limiting y controles adicionales de seguridad.
- Centralizar el manejo de errores.
- Restringir el acceso a pacientes según el fisioterapeuta autenticado.
- Mantener las credenciales de base de datos fuera del repositorio y rotarlas si fueron expuestas previamente.

Estas limitaciones se documentan de forma explícita para diferenciar el estado actual del proyecto de un backend listo para producción.
