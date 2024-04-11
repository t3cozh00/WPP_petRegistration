require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const petRouter = require("./routes/petRoute.js");
const userRouter = require("./routes/userRoute.js");
//const petImageRouter = require("./routes/petImageRoute.js");

const swaggerDocs = require("./swagger");
const fileUpload = require("express-fileupload");
// const swaggerDocs = require("./swagger");

const app = express(); // Create an instance of Express
const PORT = process.env.PORT || 3001;
const SERVER = process.env.SERVER || "http://localhost";
console.log(`Server will start on port ${PORT}`);

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(express.static("public"));

swaggerDocs(app);

// const BASE_URI = "/api/v1";
app.use("/", petRouter);
app.use("/", userRouter);
//app.use("/", petImageRouter);

app.listen(PORT, () => {
  console.log(`PetLove API server listens on port ${PORT} (${SERVER}:${PORT})`);
});
