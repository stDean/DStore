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
  AddBlogPage,
  AddBlogCategoryPage,
  AddColorPage,
  AddCategoryPage,
  AddBrandPage,
  AddProductPage,
  AddCouponPage,
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
          <Route path="blog" element={<AddBlogPage />} />
          <Route path="blog/id" element={<AddBlogPage />} />
          <Route path="blog-category" element={<AddBlogCategoryPage />} />
          <Route path="blog-category/:id" element={<AddBlogCategoryPage />} />
          <Route path="color" element={<AddColorPage />} />
          <Route path="color/:id" element={<AddColorPage />} />
          <Route path="category" element={<AddCategoryPage />} />
          <Route path="category/:id" element={<AddCategoryPage />} />
          <Route path="brand" element={<AddBrandPage />} />
          <Route path="brand/:id" element={<AddBrandPage />} />
          <Route path="product" element={<AddProductPage />} />
          <Route path="product/:id" element={<AddProductPage />} />
          <Route path="coupon" element={<AddCouponPage />} />
          <Route path="coupon/:id" element={<AddCouponPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
