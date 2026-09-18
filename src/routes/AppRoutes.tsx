import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import AdminLoginPage from '@/pages/auth/AdminLoginPage';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import StorefrontLayout from '@/layouts/StorefrontLayout';
import HomePage from '@/pages/storefront/HomePage';

import AdminRoute from './AdminRoute';
import ProtectedRoute from './ProtectedRoute';

const PlaceholderPage = ({ title }: { title: string }) => {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-2xl font-bold">{title}</h1>
    </main>
  );
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Storefront routes */}
        <Route element={<StorefrontLayout />}>
          <Route path="/" element={<HomePage />} />

          <Route path="/shop" element={<PlaceholderPage title="Shop" />} />

          <Route path="/products/:id" element={<PlaceholderPage title="Product Details" />} />

          <Route path="/about" element={<PlaceholderPage title="About" />} />

          <Route path="/faq" element={<PlaceholderPage title="FAQ" />} />

          <Route path="/support" element={<PlaceholderPage title="Support" />} />

          {/* Protected customer routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/wishlist" element={<PlaceholderPage title="Wishlist" />} />

            <Route path="/cart" element={<PlaceholderPage title="Cart" />} />

            <Route path="/checkout" element={<PlaceholderPage title="Checkout" />} />
          </Route>
        </Route>

        {/* Customer authentication */}
        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        {/* Admin authentication */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Protected admin routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<PlaceholderPage title="Admin Dashboard" />} />

          <Route path="/admin/categories" element={<PlaceholderPage title="Admin Categories" />} />

          <Route path="/admin/products" element={<PlaceholderPage title="Admin Products" />} />

          <Route path="/admin/products/new" element={<PlaceholderPage title="Add Product" />} />

          <Route
            path="/admin/products/:id/edit"
            element={<PlaceholderPage title="Edit Product" />}
          />

          <Route path="/admin/orders" element={<PlaceholderPage title="Admin Orders" />} />
        </Route>

        {/* Other routes */}
        <Route path="/order-success/:id" element={<PlaceholderPage title="Order Success" />} />

        <Route path="/unauthorized" element={<PlaceholderPage title="Unauthorized" />} />

        <Route path="/404" element={<PlaceholderPage title="404 - Not Found" />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
