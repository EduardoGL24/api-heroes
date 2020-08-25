const Villain = require("../models/villains");
const fs = require("fs");
const path = require("path");

const controller = {
  addVillain: function (req, res) {
    let villain = new Villain();
    let params = req.body;
    villain.name = params.name;
    villain.alias = params.alias;
    villain.company = params.company;
    villain.gender = params.gender;
    villain.species = params.species;
    villain.image = params.image;
    villain.side = params.side;
    villain.powers = params.powers;

    villain.save((err, villain) => {
      if (err)
        return res.status(500).send({ message: "Error al guardar villano" });

      if (!villain)
        return res
          .status(400)
          .send({ message: "No se ha podido guardar el villano" });

      return res
        .status(200)
        .send({ message: "El villano se ha guardado con éxito" });
    });
  },

  uploadImage: function (req, res) {
    let villainId = req.params.id;
    let fileName = "Imagen no subida...";

    if (req.files) {
      let filePath = req.files.image.path;
      let fileName = filePath.split("/")[2];
      let fileExt = fileName.split(".")[1];

      if (fileExt == "png" || fileExt == "jpg" || fileExt == "jpeg") {
        Villain.findByIdAndUpdate(
          villainId,
          { image: fileName },
          (err, villainUpdate) => {
            if (err)
              return res
                .status(500)
                .send({
                  message:
                    "Error al subir la imagen, por favor utilice .jpg, .jpeg o .png",
                });

            if (!villainUpdate)
              return res.status(400).send({ message: "El villano no existe" });

            return res.status(200).send({ message: "Imagen subida con éxito" });
          }
        );
      } else {
        fs.unlink(filePath, (err) => {
          return res.status(200).send({ message: "Extensión no válida" });
        });
      }
    } else {
      return res.status(200).send({ message: fileName });
    }
  },

  getImage: function (req, res) {
    let file = req.params.image;
    let pathFile = `./images/villains/${file}`;

    // Para comprobar si existe el archivo
    fs.exists(pathFile, (exists) => {
      if (exists) {
        res.sendFile(path.resolve(pathFile));
      } else {
        return res.status(400).send({ message: "No existe la imagen" });
      }
    });
  },

  getVillains: function (req, res) {
    Villain.find({}).exec((err, villains) => {
      if (err)
        return res.status(500).send({ message: "Error al obtener villanos" });

      if (!villains)
        return res
          .status(400)
          .send({ message: "No se han podido obtener los villanos" });
      return res.status(200).send({ villains });
    });
  },

  getVillain: function (req, res) {
    let villainId = req.params.id;

    Villain.findById(villainId, (err, villain) => {
      if (err)
        return res.status(500).send({ message: "Error al obtener villano" });

      if (!villain)
        return res.status(400).send({ message: "El villano no existe" });

      return res.status(200).send({ villain });
    });
  },

  editVillain: function (req, res) {
    let villainId = req.params.id;
    let update = req.body;

    Villain.findByIdAndUpdate(villainId, update, (err, villainUpdate) => {
      if (err)
        return res.status(500).send({ message: "Error al actualiar villano" });

      if (!villainUpdate)
        return res.status(400).send({ message: "El villano no existe" });

      return res.status(200).send({ message: "Villano actualizado" });
    });
  },

  deleteVillain: function (req, res) {
    let villainId = req.params.id;

    Villain.findByIdAndDelete(villainId, (err, villainDeleted) => {
      if (err)
        return res.status(500).send({ message: "Error al eliminar villano" });

      if (!villainDeleted)
        return res.status(400).send({ message: "El villano no existe" });

      return res.status(200).send({ message: "Villano borrado con exito" });
    });
  },
};

module.exports = controller;
