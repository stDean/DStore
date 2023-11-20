import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/reset" element={<ResetPasswordPage />} />
        <Route path="/forget" element={<ForgetPasswordPage />} />
        <Route path="/admin" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="enquiries" element={<EnquiriesPage />} />
          <Route path="blog-list" element={<BlogListPage />} />
          <Route path="blog-category-list" element={<BlogCategoryListPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="list-product" element={<ProductListPage />} />
          <Route path="list-brand" element={<BrandListPage />} />
          <Route path="list-category" element={<CategoryListPage />} />
          <Route path="list-color" element={<ColorListPage />} />
          <Route path="coupon-list" element={<CouponListPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
