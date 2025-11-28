const express = require("express");
const multer = require("multer");
const ArticuloController = require("../controllers/ArticuloController");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images/articulos/');
    },

    filename: (req, file, cb) => {
        cb(null, "articulo" + Date.now() + file.originalname);
    }
});

let subidas = multer({storage: storage});




//Rutas de pruebas
router.get("/ruta-de-pruebas", ArticuloController.prueba);
router.get("/curso", ArticuloController.curso);


//Ruta util
router.post("/crear", ArticuloController.crear);

router.get("/articulos", ArticuloController.listar); //Ademas de ser una ruta absoluta, tambien representa parametros 
                                                    // opcionales indirectamente, ya no se usa ? para indicarlo.

//todo, Ruta con parametro obligatorio: 
router.get("/articulos/:ultimos", ArticuloController.listar);

router.get("/articulo/:id", ArticuloController.uno);

router.delete("/articulo/:id", ArticuloController.eliminar);

router.put("/articulo/:id", ArticuloController.editar);

router.post("/subir-imagen/:id", [subidas.single("file")], ArticuloController.subir);

router.get("/verImagen/:file", ArticuloController.verImagen);

router.get("/buscar/:busqueda", ArticuloController.buscar);

module.exports = router;
