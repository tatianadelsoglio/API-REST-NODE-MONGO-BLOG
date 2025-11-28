# 📘 API REST con Node.js, Express y MongoDB – Blog MERN

API REST creada con Node.js, Express y MongoDB para gestionar artículos de un blog.  
Forma parte de un proyecto MERN, donde este backend provee el CRUD de artículos, manejo de imágenes y conexión con la base de datos MongoDB.

---

## 🚀 Tecnologías utilizadas

- **Node.js**
- **Express 5**
- **MongoDB + Mongoose**
- **Multer** (subida de archivos)
- **Validator** (validaciones)
- **CORS**
- **Nodemon** (desarrollo)

---

## 🗄️ Base de datos

- **Nombre:** `mi_blog`
- **Colección:** `articulos`

### Ejemplo de documento:

```json
{
  "titulo": "Crear Api Rest para Blog MERN",
  "contenido": "Contenido del articulo...",
  "imagen": "default.png",
  "date": "2025-11-16T20:53:09.190Z",
  "__v": 0
}

##▶️ Scripts disponibles

En package.json:

"scripts": {
  "start": "nodemon index.js"
}

Ejecutar la API: npm start


##📡 Endpoints principales

📌 Los nombres pueden variar según tu router; ajustalo si hiciste cambios.

📍 GET /api/articulos, Obtiene todos los artículos.

📍 GET /api/articulo/:id, Obtiene un artículo por ID.

📍 GET /api/articulos/:ultimos, Obtiene los últimos 3 artículos.

📍 GET /api/verImagen/:file, Sirve la imagen almacenada.

📍 GET /api/buscar/:busqueda, Obtiene articulos que contienen la palabra buscada.

📍 POST /api/crear, Crea un nuevo artículo.

📍 POST /api/subir-imagen/:id, Sube la imagen asociada a un artículo.

📍 PUT /api/articulo/:id, Actualiza un artículo.

📍 DELETE /api/articulo/:id, Elimina un artículo.


##🛠️ Dependencias

"dependencies": {
  "cors": "^2.8.5",
  "express": "^5.1.0",
  "mongoose": "^8.19.4",
  "multer": "^2.0.2",
  "validator": "^13.15.23"
},
"devDependencies": {
  "nodemon": "^3.1.11"
}

##👩‍💻 Autora
Tatiana Delsoglio
Full Stack Developer | React.js · Node.js · MySQL · MongoDB · API REST | Android Developer (Kotlin)
