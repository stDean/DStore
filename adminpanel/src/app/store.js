import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import customerSlice from "../features/customer/customerSlice";
import productSlice from "../features/product/productSlice";
import brandSlice from "../features/brand/brandSlice";
import colorSlice from "../features/color/colorSlice";
import productCategorySlice from "../features/category/categorySlice";
import blogCategorySlice from "../features/blogCat/blogCategorySlice";
import blogSlice from "../features/blog/blogSlice";
import couponSlice from "../features/coupon/couponSlice";
import orderSlice from "../features/order/orderSlice";
import enquirySlice from "../features/enquiry/enquirySlice";
import imageSlice from "../features/upload/uploadSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerSlice,
    product: productSlice,
    brand: brandSlice,
    color: colorSlice,
    productCategory: productCategorySlice,
    blogCategory: blogCategorySlice,
    blog: blogSlice,
    coupon: couponSlice,
    order: orderSlice,
    enquiry: enquirySlice,
    image: imageSlice
  },
});
