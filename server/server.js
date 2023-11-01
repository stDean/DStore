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
const BlogRouter = require("./routes/blog.route");
const ProductCategoryRouter = require("./routes/product_category.route");
const BlogCategoryRouter = require("./routes/blog_category.route");
const BrandRouter = require("./routes/brand.route");
const CouponRouter = require("./routes/coupon.route");
const CartRouter = require("./routes/cart.route");
const OrderRouter = require("./routes/order.route");
const ColorRouter = require("./routes/color.route");
const EnquiryRouter = require("./routes/enquiry.route");

const AUTH_MIDDLEWARE = require("./middleware/auth.middleware");

app.use("/api/auth", AuthRouter);
app.use("/api/blog", BlogRouter);
app.use("/api/product", ProductRouter);
app.use("/api/product-category", ProductCategoryRouter);
app.use("/api/blog-category", BlogCategoryRouter);
app.use("/api/brand", BrandRouter);
app.use("/api/color", ColorRouter);
app.use("/api/enquiry", EnquiryRouter);
app.use("/api", AUTH_MIDDLEWARE, UserRouter);
app.use("/api/coupon", AUTH_MIDDLEWARE, CouponRouter);
app.use("/api/cart", AUTH_MIDDLEWARE, CartRouter);
app.use("/api/order", AUTH_MIDDLEWARE, OrderRouter);

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
