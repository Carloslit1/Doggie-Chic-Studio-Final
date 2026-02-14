# Actividad 4 — Gestión de Productos (Node.js + Express + MongoDB + JWT + Jest + CI/CD + Vercel)

**Alumno:** Carlos Sanchez  
**Repositorio:** Doggie-Chic-Studio-Final  
**Deploy (Vercel):** https://doggie-chic-studio-final1.vercel.app

Aplicación web/API para **gestión de productos** con **autenticación JWT**. Incluye:
- Registro / Login / Logout (JWT)
- CRUD de productos (protegido)
- MongoDB (Mongoose)
- Pruebas unitarias/integración con Jest + Supertest
- CI/CD con GitHub Actions
- Despliegue en Vercel

---

## 1) Requerimientos

### 1.1 Requerimientos funcionales
1. Registrar usuarios con email y password.
2. Autenticar usuarios y generar token JWT.
3. Proteger rutas de productos para que solo usuarios autenticados accedan.
4. Crear producto.
5. Listar productos.
6. Obtener producto por ID.
7. Actualizar producto por ID.
8. Eliminar producto por ID.
9. Servir una vista estática (HTML) para login (carpeta `public/`).
10. Proveer endpoint de salud (`/health`) y versión (`/__version`) para verificación del deploy.

### 1.2 Requerimientos no funcionales
1. Seguridad: JWT en rutas protegidas; secretos en variables de entorno.
2. Persistencia: Base de datos MongoDB con Mongoose.
3. Calidad: pruebas automatizadas con Jest + Supertest.
4. CI/CD: pipeline automático en GitHub Actions.
5. Despliegue: SaaS (Vercel) con actualización automática desde GitHub.
6. Mantenibilidad: estructura por rutas/controladores/modelos y configuración por `.env`.

---

## 2) Tecnologías usadas
- Node.js
- Express.js
- MongoDB Atlas + Mongoose
- JWT (jsonwebtoken)
- Jest + Supertest
- GitHub Actions (CI)
- Vercel (deploy SaaS)

---

## 3) Estructura del proyecto (resumen)
- `server.js` → arranque del servidor (no levanta servidor en modo test)
- `src/app.js` → instancia de Express, middlewares, rutas, health, version, 404
- `src/db.js` → conexión a MongoDB (`connectDB`)
- `src/routes/*` → rutas auth y productos
- `src/models/*` → modelos Mongoose
- `public/` → vista estática (login)
- `tests/` → pruebas con Jest/Supertest
- `.github/workflows/ci.yml` → pipeline CI (GitHub Actions)

---

## 4) Variables de entorno (.env)
Crea un archivo `.env` en la raíz:

```env
PORT=3001
MONGO_URI=TU_URI_DE_MONGODB
JWT_SECRET=TU_SECRETO_JWT 

## 5) Instalación y ejecución local
5.1 Clonar e instalar dependencias

git clone https://github.com/Carloslit1/Doggie-Chic-Studio-Final.git
cd Doggie-Chic-Studio-Final
npm install

5.2 Ejecutar en desarrollo
npm run dev

5.3 Ejecutar en producción (local)
npm start

Servidor por defecto: http://localhost:3001

6) Endpoints disponibles
6.1 Health / Version

GET /health → Verifica que el servidor responde.

GET /__version → Muestra commit desplegado (útil para comprobar deploy Vercel).

Ejemplo (Vercel):
curl -s https://doggie-chic-studio-final1.vercel.app/health
curl -s https://doggie-chic-studio-final1.vercel.app/__version

7) Autenticación (JWT)
7.1 Registro

POST /auth/register

curl -s -X POST https://doggie-chic-studio-final1.vercel.app/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@demo.com","password":"123456"}'

7.2 Login

POST /auth/login
curl -s -X POST https://doggie-chic-studio-final1.vercel.app/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@demo.com","password":"123456"}'

El login regresa un token. Guárdalo para usarlo en rutas protegidas.

8) CRUD de Productos (rutas protegidas)

Todas las rutas de productos requieren header:
Authorization: Bearer <TOKEN>

8.1 Listar productos

GET /productos

TOKEN="PEGA_AQUI_TU_TOKEN"
curl -s https://doggie-chic-studio-final1.vercel.app/productos \
  -H "Authorization: Bearer $TOKEN"

8.2 Crear producto

POST /productos

TOKEN="PEGA_AQUI_TU_TOKEN"
curl -s -X POST https://doggie-chic-studio-final1.vercel.app/productos \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Shampoo Doggie","descripcion":"Prueba","precio":199,"stock":10}'

8.3 Actualizar producto

PUT /productos/:id

TOKEN="PEGA_AQUI_TU_TOKEN"
ID="PEGA_ID_PRODUCTO"
curl -s -X PUT https://doggie-chic-studio-final1.vercel.app/productos/$ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"precio":249,"stock":8}'

8.4 Eliminar producto

DELETE /productos/:id
TOKEN="PEGA_AQUI_TU_TOKEN"
ID="PEGA_ID_PRODUCTO"
curl -s -X DELETE https://doggie-chic-studio-final1.vercel.app/productos/$ID \
  -H "Authorization: Bearer $TOKEN"

9) Pruebas unitarias (Jest + Supertest)

Este proyecto incluye pruebas automatizadas para:

Auth (registro + login)

Productos (crear + listar) con rutas protegidas

Ejecutar tests:
npm test
Los tests usan NODE_ENV=test y cargan variables con dotenv para poder conectarse a MongoDB y ejecutar pruebas repetibles.

10) CI/CD — GitHub Actions (Pipeline)

Se incluye pipeline en:

.github/workflows/ci.yml

Flujo:

En cada push a main, GitHub Actions:

instala dependencias

ejecuta npm test

Si todo pasa, el build queda en verde (CI OK)

Para revisar:

En GitHub → pestaña Actions → workflow CI → debe aparecer Passed.

11) Deploy — Vercel (SaaS)

La aplicación está desplegada en Vercel:

https://doggie-chic-studio-final1.vercel.app

Verificación de deploy (commit actual):
curl -s https://doggie-chic-studio-final1.vercel.app/__version

Justificación (SaaS Vercel):

Facilita despliegue rápido y seguro de Node.js

Integración directa con GitHub para despliegue automático por commit

Manejo de variables de entorno por proyecto

Escalabilidad y disponibilidad sin administrar infraestructura (ideal para práctica CI/CD)

12) Evidencias sugeridas (para el entregable)

Captura de npm test en local (todo en verde)

Captura del workflow Actions (CI) Passed

Captura de endpoints en Vercel:

/health

/__version

Video mostrando:

register/login

token y CRUD de productos

tests

Actions en verde
