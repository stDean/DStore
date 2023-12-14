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

  const { currentUser } = useSelector(({ auth }) => auth);

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
          <Route
            path="wishlist"
            element={
              currentUser?.user ? <WishlistPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="login"
            element={currentUser?.user ? <Navigate to="/" /> : <LoginPage />}
          />
          <Route
            path="signup"
            element={currentUser?.user ? <Navigate to="/" /> : <RegisterPage />}
          />
          <Route
            path="forgot-password"
            element={
              currentUser?.user ? <Navigate to="/" /> : <ForgotPasswordPage />
            }
          />
          <Route
            path="reset-password/:token"
            element={
              currentUser?.user ? <Navigate to="/" /> : <ResetPasswordPage />
            }
          />
          <Route path="blog/:id" element={<SingleBlogPage />} />
          <Route path="store/:id" element={<SingleProductPage />} />
          <Route path="privacy" element={<PrivacyPolicyPage />} />
          <Route path="refund" element={<RefundPolicyPage />} />
          <Route
            path="shipping"
            element={
              !currentUser?.user ? <Navigate to="/" /> : <ShippingPolicyPage />
            }
          />
          <Route path="terms&condition" element={<TnCPage />} />
          <Route
            path="cart"
            element={
              currentUser?.user ? <CartPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="my-orders"
            element={
              currentUser?.user ? <OrderPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="profile"
            element={
              currentUser?.user ? <ProfilePage /> : <Navigate to="/login" />
            }
          />
        </Route>
        <Route
          path="checkout"
          element={
            currentUser?.user ? <CheckoutPage /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
