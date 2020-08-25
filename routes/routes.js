const express = require("express");
const heroesController = require("../controllers/heroes");
const villainsController = require("../controllers/villains");
const router = express.Router();

//MiddleWare
const multipart = require("connect-multiparty");
const mpMiddlewareHero = multipart({ uploadDir: "./images/heroes" });
const mpMiddlewareVillain = multipart({ uploadDir: "./images/villains" });

//post
router.post("/add-hero", heroesController.addHero);
router.post(
  "/upload-image-hero/:id",
  mpMiddlewareHero,
  heroesController.uploadImage
);
router.post("/add-villain", villainsController.addVillain);
router.post(
  "/upload-image-villain/:id",
  mpMiddlewareVillain,
  villainsController.uploadImage
);

//get
router.get("/heroes", heroesController.getHeroes);
router.get("/heroes/:id", heroesController.getHero);
router.get("/get-image-hero/:image", heroesController.getImage);
router.get("/get-image-villain/:image", villainsController.getImage);
router.get("/villains", villainsController.getVillains);
router.get("/villains/:id", villainsController.getVillain);

//put
router.put("/hero-update/:id", heroesController.editHeroe);
router.put("/villain-update/:id", villainsController.editVillain);

//Delete
router.delete("/hero-delete/:id", heroesController.deleteHeroe);
router.delete("/villain-delete/:id", villainsController.deleteVillain);

module.exports = router;
