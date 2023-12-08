import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import { Layout } from "./components";
import {
  AboutPage,
  HomePage,
  ContactPage,
  StorePage,
  BlogPage,
  CompareProductPage,
  WishlistPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  SingleBlogPage,
  SingleProductPage,
  TnCPage,
  ShippingPolicyPage,
  RefundPolicyPage,
  PrivacyPolicyPage,
  CartPage,
  CheckoutPage,
} from "./pages";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Blogs } from "./feature/blog/blogSlice";
import { Products } from "./feature/products/productSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Blogs());
    dispatch(Products());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="store" element={<StorePage />} />
          <Route path="blogs" element={<BlogPage />} />
          <Route path="compare" element={<CompareProductPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="blog/:id" element={<SingleBlogPage />} />
          <Route path="store/:id" element={<SingleProductPage />} />
          <Route path="privacy" element={<PrivacyPolicyPage />} />
          <Route path="refund" element={<RefundPolicyPage />} />
          <Route path="shipping" element={<ShippingPolicyPage />} />
          <Route path="terms&condition" element={<TnCPage />} />
          <Route path="cart" element={<CartPage />} />
        </Route>
        <Route path="checkout" element={<CheckoutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
