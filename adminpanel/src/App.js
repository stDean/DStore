import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components";
import {
  BlogCategoryListPage,
  BlogListPage,
  CustomersPage,
  DashboardPage,
  EnquiriesPage,
  ForgetPasswordPage,
  LoginPage,
  OrdersPage,
  ProductListPage,
  ResetPasswordPage,
  BrandListPage,
  CategoryListPage,
  ColorListPage,
  CouponListPage,
  AddBlogPage,
  AddBlogCategoryPage,
  AddColorPage,
  AddCategoryPage,
  AddBrandPage,
  AddProductPage,
  AddCouponPage,
  OrderEnq,
  ViewEnq,
} from "./pages";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector(({ auth }) => auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/admin" /> : <LoginPage />}
        />
        <Route
          path="/reset-password/admin/:token"
          element={user ? <Navigate to="/admin" /> : <ResetPasswordPage />}
        />
        <Route
          path="/forget"
          element={user ? <Navigate to="/admin" /> : <ForgetPasswordPage />}
        />
        <Route path="/admin" element={<Layout />}>
          <Route
            index
            element={!user ? <Navigate to="/" /> : <DashboardPage />}
          />
          <Route
            path="enquiries"
            element={!user ? <Navigate to="/" /> : <EnquiriesPage />}
          />
          <Route
            path="enquiries/:id"
            element={!user ? <Navigate to="/" /> : <ViewEnq />}
          />
          <Route
            path="blog-list"
            element={!user ? <Navigate to="/" /> : <BlogListPage />}
          />
          <Route
            path="blog-category-list"
            element={!user ? <Navigate to="/" /> : <BlogCategoryListPage />}
          />
          <Route
            path="orders"
            element={!user ? <Navigate to="/" /> : <OrdersPage />}
          />
          <Route
            path="orders/:id/:orderId"
            element={!user ? <Navigate to="/" /> : <OrderEnq />}
          />
          <Route
            path="customers"
            element={!user ? <Navigate to="/" /> : <CustomersPage />}
          />
          <Route
            path="list-product"
            element={!user ? <Navigate to="/" /> : <ProductListPage />}
          />
          <Route
            path="list-brand"
            element={!user ? <Navigate to="/" /> : <BrandListPage />}
          />
          <Route
            path="list-category"
            element={!user ? <Navigate to="/" /> : <CategoryListPage />}
          />
          <Route
            path="list-color"
            element={!user ? <Navigate to="/" /> : <ColorListPage />}
          />
          <Route
            path="coupon-list"
            element={!user ? <Navigate to="/" /> : <CouponListPage />}
          />
          <Route
            path="blog"
            element={!user ? <Navigate to="/" /> : <AddBlogPage />}
          />
          <Route
            path="blog/:id"
            element={!user ? <Navigate to="/" /> : <AddBlogPage />}
          />
          <Route
            path="blog-category"
            element={!user ? <Navigate to="/" /> : <AddBlogCategoryPage />}
          />
          <Route
            path="blog-category/:id"
            element={!user ? <Navigate to="/" /> : <AddBlogCategoryPage />}
          />
          <Route
            path="color"
            element={!user ? <Navigate to="/" /> : <AddColorPage />}
          />
          <Route
            path="color/:id"
            element={!user ? <Navigate to="/" /> : <AddColorPage />}
          />
          <Route
            path="category"
            element={!user ? <Navigate to="/" /> : <AddCategoryPage />}
          />
          <Route
            path="category/:id"
            element={!user ? <Navigate to="/" /> : <AddCategoryPage />}
          />
          <Route
            path="brand"
            element={!user ? <Navigate to="/" /> : <AddBrandPage />}
          />
          <Route
            path="brand/:id"
            element={!user ? <Navigate to="/" /> : <AddBrandPage />}
          />
          <Route
            path="product"
            element={!user ? <Navigate to="/" /> : <AddProductPage />}
          />
          <Route
            path="product/:id"
            element={!user ? <Navigate to="/" /> : <AddProductPage />}
          />
          <Route
            path="coupon"
            element={!user ? <Navigate to="/" /> : <AddCouponPage />}
          />
          <Route
            path="coupon/:id"
            element={!user ? <Navigate to="/" /> : <AddCouponPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
