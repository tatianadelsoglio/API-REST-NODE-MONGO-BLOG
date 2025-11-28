/*Ejemplo generico

    const  controller = {

        propiedad: () => {

        }
    }
*/

const fs = require("fs");
const path = require("path");
const { validarArticulo } = require("../helpers/Validar");
const ArticuloModel = require("../models/ArticuloModel");

//! INICIO Acciones de prueba/ejemplos ---------------------------------------------------------------------------------

const prueba = (req, res) => {
  return res.status(200).json({
    mensaje: "Soy una acción de prueba en mi controlador de artículos",
  });
};

const curso = (req, res) => {
  console.log("Se ha ejecutado el endpoint curso");

  return res.status(200).json([
    {
      curso: "Master en React",
      modulo: "MERN",
      proyecto: "Api Rest con  Node.js",
    },
    {
      curso: "Master en React2",
      modulo: "MERN2",
      proyecto: "Api Rest con  Node.js2",
    },
  ]);
};

//! FIN Acciones de prueba/ejemplos ---------------------------------------------------------------------------------

//* Acciones útiles

const crear = async (req, res) => {
  //*Obtener parametros por post a guardar
  let parametros = req.body;
  //console.log(parametros);

  //*Validar los datos
  try {
    validarArticulo(parametros);
  } catch (error) {
    return res.status(400).json({
      status: "Error",
      mensaje: "Faltan datos por enviar",
    });
  }

  //! Crear instancia/objeto del modelo al guardar usando asignación automática
  //* El constructor de ArticuloModel recibe los parámetros y asigna los valores.
  const articulo = new ArticuloModel(parametros);

  //! Si quisieras asignar los valores del objeto del modelo de forma manual deberia ser asi:
  //* const articulo = new ArticuloModel();
  //* articulo.titulo = parametros.titulo;
  //* articulo.contenido = parametros.contenido;
  //* ...

  //Guardar el articulo en la base de datos
  try {
    const articuloGuardado = await articulo.save();

    //Devolver resultado
    return res.status(200).json({
      status: "Success",
      mensaje: "Se ha guardado el artículo correctamente!",
      articulo: articuloGuardado,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Error",
      mensaje: "No se ha guardado el artículo",
      error: error.message,
    });
  }
};

const listar = async (req, res) => {
  //* El metodo ".find()" sirve tambien para buscar aplicando filtros o no.

  try {
    //* Para obtener o listar todos los registros, se utiliza el método ".find()" sin
    //* pasarle parámetros (opciones). Esto devuelve todos los documentos de la colección:
    //* const articulos = await ArticuloModel.find({});

    ////----------------------------------------------------------------------------------

    //Todo, para ordenar se usa ".find({}).sort({campo:valor})", el valor normal usa 1, para el inverso -1.
    //todo, por ejemplo, ordenar por fecha desc (más nuevo a más viejo), orden inverso -1:
    //todo, const articulos = await ArticuloModel.find({}).sort({date: -1});

    /////---------------------------------------------------------------------------------------

    //* no se puede concatenar consultas en esta version de mongoose, asi que, para agregar un filtro
    //* hay que hacerlo desde el inicio/cero como en los dos ejemplos anteriores:
    //* const articulos = await ArticuloModel.find({}).sort({date: -1}).limit(3);

    ////-------------------------------------------------------------------------------------------

    let consulta = ArticuloModel.find({});

    //* si la consulta viene con parametro opcional: ultimos, le aplico un limite de 3
    if (req.params.ultimos === "ultimos") {
      consulta = consulta.limit(3);
    }

    const articulos = await consulta;

    // Validar resultados
    if (!articulos || articulos.length === 0) {
      return res.status(404).json({
        status: "Error",
        mensaje: "No se han encontrado artículos",
      });
    }

    // Respuesta exitosa
    return res.status(200).json({
      status: "Success",
      parametro: req.params.ultimos,
      contador: articulos.length,
      articulos,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      mensaje: "Error al obtener los artículos",
      error: error.message,
    });
  }
};

const uno = async (req, res) => {
  try {
    //obtener id por la url
    let id = req.params.id;

    //Buscar el articulo
    const articulo = await ArticuloModel.findById(id);

    // Si no existe, devolver error
    if (!articulo) {
      return res.status(404).json({
        status: "Error",
        mensaje: "No se ha encontrado el artículo",
      });
    }

    // Devolver resultado
    return res.status(200).json({
      status: "Success",
      articulo,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      mensaje: "Error al obtener los artículos",
      error: error.message,
    });
  }
};

const eliminar = async (req, res) => {
  try {
    //obtener id por la url
    let id = req.params.id;

    //Buscar el articulo
    const articulo = await ArticuloModel.findByIdAndDelete(id);

    // Si no existe, devolver error
    if (!articulo) {
      return res.status(404).json({
        status: "Error",
        mensaje: "No se ha encontrado el artículo",
      });
    }

    // Devolver resultado
    return res.status(200).json({
      status: "Success",
      mensaje: "El articulo ha sido eliminado",
      articulo,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      mensaje: "Error al obtener los artículos",
      error: error.message,
    });
  }
};

const editar = async (req, res) => {
  try {
    //obtener id por la url
    let id = req.params.id;

    //obtener datos del body
    let parametros = req.body;

    //*Validar los datos
    try {
      validarArticulo(parametros);
    } catch (error) {
      return res.status(400).json({
        status: "Error",
        mensaje: "Faltan datos por enviar",
      });
    }

    //Buscar el articulo
    const articulo = await ArticuloModel.findByIdAndUpdate(id, parametros, {
      new: true, //devuelve el actualizado
      runValidators: true, //aplica validaciones del schema
    });

    // Si no existe, devolver error
    if (!articulo) {
      return res.status(404).json({
        status: "Error",
        mensaje: "Error al actualizar o no se ha encontrado el artículo",
      });
    }

    // Devolver resultado
    return res.status(200).json({
      status: "Success",
      mensaje: "El articulo ha sido actualizado",
      articulo,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      mensaje: "Error al obtener los artículos",
      error: error.message,
    });
  }
};

const subir = async (req, res) => {
  // Configurar multer, Multer es un middleware

  // Obtener el fichero de imagen subido
  if (!req.file && !req.files) {
    return res.status(400).json({
      status: "error",
      mensaje: "Petición invalida",
    });
  }
  //console.log(req.file);

  //Nombre del archivo
  let nombreArchivo = req.file.originalname;

  //Obtener extension del archivo
  let archivoSplit = nombreArchivo.split(".");
  let archivoExtension = archivoSplit[1];

  // Comprobar extension correcta
  if (
    archivoExtension != "png" &&
    archivoExtension != "jpg" &&
    archivoExtension != "jpeg" &&
    archivoExtension != "gif"
  ) {
    //Borrar Archivo y dar respuesta
    fs.unlink(req.file.path, (error) => {
      return res.status(400).json({
        status: "error",
        mensaje: "Tipo de archivo invalido",
      });
    });
  } else {
    //Si todo ok, actualizamos el archivo

    //obtener id por la url
    let id = req.params.id;

    //Buscar el articulo
    const articulo = await ArticuloModel.findByIdAndUpdate(
      id,
      { imagen: req.file.filename },
      {
        new: true, //devuelve el actualizado
        runValidators: true, //aplica validaciones del schema
      }
    );

    // Si no existe, devolver error
    if (!articulo) {
      return res.status(404).json({
        status: "Error",
        mensaje: "Error al actualizar o no se ha encontrado el artículo",
      });
    }

    // Devolver resultado
    return res.status(200).json({
      status: "Success",
      mensaje: "El articulo ha sido actualizado",
      articulo,
      archivoSplit: archivoSplit,
      extension: archivoExtension,
      files: req.file,
    });
  }
};

const verImagen = (req, res) => {
    let file = req.params.file;
    let ruta_fisica = "./images/articulos/"+file;

    fs.stat(ruta_fisica, (error, existe) => {
        if(existe){
            return res.sendFile(path.resolve(ruta_fisica));
        }else{
            return res.status(404).json({
                status: "error",
                mensaje: "La imagen no existe"
            })
        }
    })
}

const buscar = async (req, res) => {
    try {
        const busqueda = req.params.busqueda;

        // Buscar por titulo o contenido (insensible a may/min)
        const articulosEncontrados = await ArticuloModel.find({
            $or: [
                { titulo: { $regex: busqueda, $options: "i" } },
                { contenido: { $regex: busqueda, $options: "i" } }
            ]
        })
        .sort({ date: -1 });

        if (!articulosEncontrados || articulosEncontrados.length === 0) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se han encontrado artículos"
            });
        }

        return res.status(200).json({
            status: "success",
            articulos: articulosEncontrados
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Error al buscar artículos",
            error: error.message
        });
    }
};


module.exports = {
  //nombre_de_metodo
  prueba,
  curso,
  crear,
  listar,
  uno,
  eliminar,
  editar,
  subir,
  verImagen,
  buscar
};
