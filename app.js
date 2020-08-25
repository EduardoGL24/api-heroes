//CONFIGURACIÓN DE EXPRESS Y BODY PARSER

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

//cargar archivos rutas
const routes = require("./routes/routes");

//middlewares
//Hace que cualquier petición que me llegue la convierta en formato json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); //cuando publique la página se reemplaza el asterisco por la url de la página donde se vaya a llamar
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//Rutas
app.use("/", routes);

//exportar
module.exports = app;
