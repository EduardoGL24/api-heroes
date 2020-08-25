const mongoose = require("mongoose");
const app = require("./app");
const port = 3700;
const PASSWORD = "96oBEwi3PD11Kt99";
const DB = "api-heroes";

mongoose.Promise = global.Promise;
try {
  mongoose
    .connect(
      `mongodb+srv://admin-dev-eduardo:${PASSWORD}@cluster0.7ykhl.mongodb.net/${DB}?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
      console.log("[servidor] Conexión establecida...");

      //Cración de servidor
      app.listen(port, () => {
        console.log("[servidor] Servidor corriendo en la url: localhost:3700");
      });
    });
} catch (error) {
  console.log("could not connect");
}
