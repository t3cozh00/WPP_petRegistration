const BASE_URI = "/api/v1";

const express = require("express");
const userRouter = express.Router();

const {
  onUserLogin,
  onGetUserData,
} = require("../controllers/userController.js");

//Create pet registration record in the pet table
userRouter.post(`${BASE_URI}/user-login`, onUserLogin);

//Find all pet records from pet table
userRouter.get(`${BASE_URI}/user/userData`, onGetUserData);

module.exports = userRouter;
