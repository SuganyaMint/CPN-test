const express = require("express");
const router = express.Router();

const favoritesController = require("../controllers/favorites.controller");


router.post("/add", favoritesController.add_favorite);
router.post("/remove", favoritesController.remove_favorite);

module.exports = router;