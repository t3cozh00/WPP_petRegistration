const express = require("express");
//const healthCheck = require("./healthCheckRoute.js");
//const petCategory = require("./petCategoryRoute");
const petRouter = require("./petRoute.js");
const petCategory = require("./petCategoryRoute.js");

//const request = require("./requestRoute");

const router = express.Router();

//router.use(healthCheck);
router.use(petCategory);
router.use(petRouter);
//router.use(request);

module.exports = router;
