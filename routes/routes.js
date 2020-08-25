const express = require("express");
const heroesController = require("../controllers/heroes");
const router = express.Router();

//MiddleWare
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart({ uploadDir: "./images/heroes" });

//post
router.post("/add-hero", heroesController.addHero);
router.post(
  "/upload-image/:id",
  multipartMiddleware,
  heroesController.uploadImage
);

//get
router.get("/heroes", heroesController.getHeroes);
router.get("/heroes/:id", heroesController.getHero);
router.get("/get-image/:image", heroesController.getImage);

//put
router.put("/hero-update/:id", heroesController.editHeroe);

//Delete
router.delete("/hero-delete/:id", heroesController.deleteHeroe);

module.exports = router;
