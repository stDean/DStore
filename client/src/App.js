import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { Layout } from "./components";
import { Blogs } from "./feature/blog/blogSlice";
import { Products } from "./feature/products/productSlice";
import {
  AboutPage,
  BlogPage,
  CartPage,
  CheckoutPage,
  CompareProductPage,
  ContactPage,
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  OrderPage,
  PrivacyPolicyPage,
  ProfilePage,
  RefundPolicyPage,
  RegisterPage,
  ResetPasswordPage,
  ShippingPolicyPage,
  SingleBlogPage,
  SingleProductPage,
  StorePage,
  TnCPage,
  WishlistPage,
} from "./pages";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Blogs());
    dispatch(Products());
  }, [dispatch]);

  const { currentUser } = useSelector(({ auth }) => auth);

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
          <Route
            path="wishlist"
            element={currentUser ? <WishlistPage /> : <Navigate to="/login" />}
          />
          <Route
            path="login"
            element={currentUser ? <Navigate to="/" /> : <LoginPage />}
          />
          <Route
            path="signup"
            element={currentUser ? <Navigate to="/" /> : <RegisterPage />}
          />
          <Route
            path="forgot-password"
            element={currentUser ? <Navigate to="/" /> : <ForgotPasswordPage />}
          />
          <Route
            path="reset-password/:token"
            element={currentUser ? <Navigate to="/" /> : <ResetPasswordPage />}
          />
          <Route path="blog/:id" element={<SingleBlogPage />} />
          <Route path="store/:id" element={<SingleProductPage />} />
          <Route path="privacy" element={<PrivacyPolicyPage />} />
          <Route path="refund" element={<RefundPolicyPage />} />
          <Route
            path="shipping"
            element={
              !currentUser ? <Navigate to="/" /> : <ShippingPolicyPage />
            }
          />
          <Route path="terms&condition" element={<TnCPage />} />
          <Route
            path="cart"
            element={currentUser ? <CartPage /> : <Navigate to="/login" />}
          />
          <Route
            path="my-orders"
            element={currentUser ? <OrderPage /> : <Navigate to="/login" />}
          />
          <Route
            path="profile"
            element={currentUser ? <ProfilePage /> : <Navigate to="/login" />}
          />
        </Route>
        <Route
          path="checkout"
          element={currentUser ? <CheckoutPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
