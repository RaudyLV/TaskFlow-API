🚀 TaskFlow API

TaskFlow es una API REST construida con TypeScript, Express y MongoDB, diseñada para la gestión de tareas y usuarios.
La arquitectura está organizada en capas para mantener el código limpio, escalable y fácil de mantener.

📂 Estructura del proyecto
src/
 ┣ config/         # Configuración de base de datos y entorno
 ┣ controllers/    # Controladores que manejan la lógica de las rutas
 ┣ middlewares/    # Middlewares (auth, validaciones, errores)
 ┣ models/         # Modelos de datos (MongoDB con Mongoose)
 ┣ repositories/   # Acceso a datos, abstracción sobre los modelos
 ┣ routes/         # Definición de rutas de la API
 ┣ schemas/        # Validación de datos (ej. Zod)
 ┣ services/       # Lógica de negocio
 ┣ utils/          # Funciones de utilidad
 ┗ index.ts        # Punto de entrada de la aplicación

 📌 Endpoints principales
🔑 Autenticación

POST /auth/register → Registro de usuario

POST /auth/login → Inicio de sesión

👤 Users
GET /users/id → Obtener usuario por id (protegido)

GET /users → Obtener todos los usuarios (protegido)

PATCH /users/id → Actualizar usuario (protegido)

DELETE /users/id → Eliminar usuario (protegido)

📋 Tasks

GET /tasks → Obtener todos los usuarios (protegido, permite filtrado)

POST /tasks → Crear task (protegido)

PATCH /tasks/id → Actualizar usuario (protegido)

DELETE /tasks/id → Eliminar usuario (protegido)

🛠️ Tecnologías utilizadas

Node.js

Express

TypeScript

MongoDB + Mongoose

Zod (para validaciones de schemas)

