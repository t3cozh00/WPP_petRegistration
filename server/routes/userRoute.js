const BASE_URI = "/api/v1";

const express = require("express");
const userRouter = express.Router();

const { onUserLogin } = require("../controllers/userController.js");

//Create pet registration record in the pet table
userRouter.post(`${BASE_URI}/user-login`, onUserLogin);

module.exports = userRouter;
