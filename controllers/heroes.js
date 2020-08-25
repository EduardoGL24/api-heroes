const Hero = require("../models/heroes");
const fs = require("fs");
const path = require("path");

const controller = {
  addHero: function (req, res) {
    let hero = new Hero();
    let params = req.body;
    hero.name = params.name;
    hero.alias = params.alias;
    hero.company = params.company;
    hero.gender = params.gender;
    hero.species = params.species;
    hero.image = params.image;
    hero.side = params.side;
    hero.powers = params.powers;

    hero.save((err, hero) => {
      if (err)
        return res.status(500).send({ message: "Error al guardar héroe" });

      if (!hero)
        return res
          .status(400)
          .send({ message: "No se ha podido guardar el héroe" });

      return res
        .status(200)
        .send({ message: "El héroe se ha guardado con éxito" });
    });
  },

  uploadImage: function (req, res) {
    let heroId = req.params.id;
    let fileName = "Imagen no subida...";

    if (req.files) {
      let filePath = req.files.image.path;
      let fileName = filePath.split("/")[2];
      let fileExt = fileName.split(".")[1];

      if (
        fileExt == "png" ||
        fileExt == "jpg" ||
        fileExt == "jpeg" ||
        fileExt == "gif"
      ) {
        Hero.findByIdAndUpdate(
          heroId,
          { image: fileName },
          { new: true },
          (err, heroUpdate) => {
            if (err)
              return res
                .status(500)
                .send({ message: "Error al subir la imagen" });

            if (!heroUpdate)
              return res.status(400).send({ message: "El heroe no existe" });

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
    let pathFile = `./images/heroes/${file}`;

    // Para comprobar si existe el archivo
    fs.exists(pathFile, (exists) => {
      if (exists) {
        res.sendFile(path.resolve(pathFile));
      } else {
        return res.status(400).send({ message: "no existe la imagen" });
      }
    });
  },

  getHeroes: function (req, res) {
    Hero.find({}).exec((err, heroes) => {
      if (err)
        return res.status(500).send({ message: "Error al obtener heroes" });

      if (!heroes)
        return res
          .status(400)
          .send({ message: "No se han podido obtener los heroes" });
      return res.status(200).send({ heroes });
    });
  },

  getHero: function (req, res) {
    let heroId = req.params.id;

    Hero.findById(heroId, (err, hero) => {
      if (err)
        return res.status(500).send({ message: "Error al obtener héroe" });

      if (!hero) return res.status(400).send({ message: "El héroe no existe" });

      return res.status(200).send({ hero });
    });
  },

  editHeroe: function (req, res) {
    let heroId = req.params.id;
    let update = req.body;

    Hero.findByIdAndUpdate(heroId, update, { new: true }, (err, heroUpdate) => {
      if (err)
        return res.status(500).send({ message: "Error al actualiar héroe" });

      if (!heroUpdate)
        return res.status(400).send({ message: "El héroe no existe" });

      return res.status(200).send({ message: "Héroe actualizado" });
    });
  },

  deleteHeroe: function (req, res) {
    let heroId = req.params.id;

    Hero.findByIdAndDelete(heroId, (err, heroDeleted) => {
      if (err)
        return res.status(500).send({ message: "Error al eliminar héroe" });

      if (!heroDeleted)
        return res.status(400).send({ message: "El héroe no existe" });

      return res.status(200).send({ message: "Héroe borrado con exito" });
    });
  },
};

module.exports = controller;
