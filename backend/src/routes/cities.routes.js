const express = require("express");
const router = express.Router();
const controllers = require("../controllers/cities.controller");

router.get("/nearby", controllers.getNearbyCities);
router.get("/regions", controllers.getRegions);

module.exports = router;