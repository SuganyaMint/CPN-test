const express = require("express");
const router = express.Router();

const propertiesController = require("../controllers/properties.controller");


//  Car Internal
// router.post("/create/carinternal/list", internalController.createInternalWeight);
// router.get("/get/internal/checked/list", internalController.getInternalListWeight);
// router.get("/masterinternallist/checkin", internalController.getMasterInternalList_checkin);

router.get("/", propertiesController.getProperties);



module.exports = router;