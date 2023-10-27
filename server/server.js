require("dotenv").config();
require("express-async-errors");

const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const connectDB = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan("tiny"));

// add routes
const AuthRouter = require("./routes/auth.route");
const UserRouter = require("./routes/user.route");
const ProductRouter = require("./routes/product.route");
const AUTH_MIDDLEWARE = require("./middleware/auth.middleware");

app.use("/api/auth", AuthRouter);
app.use("/api", AUTH_MIDDLEWARE, UserRouter);
app.use("/api/product", AUTH_MIDDLEWARE, ProductRouter);

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
