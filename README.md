# Sistema Backend de Turnos y Reservas - Pre-entrega 5

## Descripción
API REST desarrollada con Node.js, Express y FileSystem para gestionar servicios y reservas. El proyecto está refactorizado bajo una arquitectura profesional de 5 capas.

## Arquitectura del Proyecto
El código separa las responsabilidades en las siguientes capas:
- **`routes/`**: Define los endpoints de la API y deriva las peticiones a los controllers.
- **`controllers/`**: Reciben los objetos `req` y `res`, llaman a la capa de servicios y devuelven la respuesta HTTP.
- **`services/`**: Contienen la lógica de negocio y validaciones (como el cálculo de cantidades en las reservas).
- **`repositories/`**: Capa intermediaria que se comunica con el DAO para el acceso a datos.
- **`dao/`**: Capa encargada de la lectura y escritura directa en los archivos JSON (`FileSystem`).
- **`data/`**: Almacena los archivos físicos de persistencia (`services.json` y `bookings.json`).

## Estructura de Carpetas
src/
config/
env.config.js
controllers/
services.controller.js
bookings.controller.js
services/
services.service.js
bookings.service.js
repositories/
services.repository.js
bookings.repository.js
dao/
services.dao.js
bookings.dao.js
routes/
services.router.js
bookings.router.js
data/
services.json
bookings.json
app.js
server.js
package.json
.env.example
.gitignore
README.md


## Instalación y Ejecución
1. Clonar el repositorio.
2. Instalar las dependencias:
   ```bash
   npm install

   Configurar el archivo .env basándose en .env.example.

Ejecutar el proyecto en modo desarrollo:

Bash
npm run dev
Endpoints Principales
Servicios (/api/services): Permite listar (con filtros opcionales de categoría y disponibilidad), buscar por ID, crear, actualizar y eliminar servicios.

Reservas (/api/bookings): Permite crear reservas, consultarlas por ID y agregarles servicios mediante la ruta /api/bookings/:bid/services/:sid (incrementando la cantidad si el servicio ya fue añadido).