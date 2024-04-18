const BASE_URI = "/api/v1";

const express = require("express");
const router = express.Router();

const { onPetRegistrationCreate } = require("../controllers/petController.js");

//Create pet registration record in the pet table
router.post(`${BASE_URI}/pet-registration`, onPetRegistrationCreate);

module.exports = router;
