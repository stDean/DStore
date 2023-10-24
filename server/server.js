require("dotenv").config();
require("express-async-errors");

const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const connectDB = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Welcome to the home page" });
});

// add routes

// add middlewares
const NOT_FOUND_MIDDLEWARE = require("./middleware/route-not-found");
const ERROR_HANDLING_MIDDLEWARE = require("./middleware/error-handling");

app.use(NOT_FOUND_MIDDLEWARE);
app.use(ERROR_HANDLING_MIDDLEWARE);

const start = async () => {
  try {
    // connect to db
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server listening on port: ${PORT}`);
    });
  } catch (e) {
    console.log(e.message);
  }
};

start();
