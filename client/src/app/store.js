import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../feature/auth/authSlice";
import productSlice from "../feature/products/productSlice";
import blogSlice from "../feature/blog/blogSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    product: productSlice,
    blog: blogSlice,
  },
});
