const express = require("express");
const router = express.Router();

const propertiesController = require("../controllers/properties.controller");


router.get("/", propertiesController.getProperties);

module.exports = router;