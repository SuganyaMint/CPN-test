const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");


router.get("/", userController.get_AllUser);
router.get("/:username", userController.get_UserByUserName);
router.post("/", userController.post_User);
router.post("/register", userController.register_User);




module.exports = router;