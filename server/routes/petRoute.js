const BASE_URI = "/api/v1";

const express = require("express");
const petRouter = express.Router();

const {
  onPetRegistrationCreate,
  onGetPetData,
} = require("../controllers/petController.js");

//Create pet registration record in the pet table
petRouter.post(`${BASE_URI}/pet-registration`, onPetRegistrationCreate);

//Find all pet records from pet table
petRouter.get(`${BASE_URI}/pet`, onGetPetData);

//Delete pet record from pet table (id will be passed as a path param)
//petRouter.delete(`${BASE_URI}/petDelete/:id`, onDeletePetData);

module.exports = petRouter;
