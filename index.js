const { conexion } = require("./database/conexion");
const express = require("express");
const cors = require("cors");

// Inicializar app
console.log("App de node iniciada");


//Conectar a la base de datos
conexion();


//Crear servidor Node
const app = express();
const puerto = 3900;

//TODO el codigo "app.use()" sirve para ejecutar middlewares y crear rutas

//* El middleware es una capa de software que se sitúa entre el sistema operativo y las aplicaciones para
//* gestionar la comunicación y las tareas, mientras que CORS (Cross-Origin Resource Sharing) es una 
//* tecnología de seguridad basada en encabezados HTTP que permite a las aplicaciones web solicitar recursos 
//* de un dominio diferente al suyo.

//Configurar CORS
app.use(cors());

//Convertir body a objeto js
app.use(express.json()); // Para recibir datos con content-type: application/json
app.use(express.urlencoded({extended:true})); // Para recibir datos de tipo form-urlencoded, es decir, en formato normal


//RUTAS
const rutas_articulo = require("./routers/ArticuloRouter");


//Cargo las rutas
app.use("/api", rutas_articulo);


//!INICIO Rutas pruebas Hardcodeadas-----------------------------------------------------------------------------

app.get("/probando", (req, res) => {

    console.log("Se ha ejecutado el endpoint probando");

    //*Con send() puedo devolver lo que quiera, con json() devuelvo un objeto json estrictamente

    //TODO Devolver usando send():

    /*return res.status(200).send({
        curso: "Master en React",
        modulo: "MERN",
        proyecto:"Api Rest con  Node.js"

    });*/

    //TODO Devolver un objeto json:

    /*return res.status(200).json({
        curso: "Master en React",
        modulo: "MERN",
        proyecto:"Api Rest con  Node.js"

    });*/

    //TODO Devolver varios objetos json, que es como trabajan actualmente con las apis:
    
    return res.status(200).json([
        {
            curso: "Master en React",
            modulo: "MERN",
            proyecto:"Api Rest con  Node.js"

        },
        {
            curso: "Master en React2",
            modulo: "MERN2",
            proyecto:"Api Rest con  Node.js2"

        },

    ]);

});


app.get("/", (req, res) => {

    return res.status(200).send(
        "<h1>Empezando a crear un api rest con node</h1>"
    );

});

//!FIN Rutas pruebas Hardcodeadas----------------------------------------------------------------------------------

//Crear servidor y escuchar peticiones http
app.listen(puerto, () => {
    console.log("Servidor corriendo en el puerto "+puerto);
});
