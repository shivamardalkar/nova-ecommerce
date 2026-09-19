import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import AdminLoginPage from '@/pages/auth/AdminLoginPage';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import StorefrontLayout from '@/layouts/StorefrontLayout';
import HomePage from '@/pages/storefront/HomePage';
import ShopPage from '@/pages/storefront/ShopPage';
import ProductDetailsPage from '@/pages/storefront/ProductDetailsPage';
import CartPage from '@/pages/customer/CartPage';
import WishlistPage from '@/pages/customer/WishlistPage';
import CheckoutPage from '@/pages/customer/CheckoutPage';
import OrderSuccessPage from '@/pages/customer/OrderSuccessPage';
import OrdersPage from '@/pages/customer/OrdersPage';
import OrderDetailsPage from '@/pages/customer/OrderDetailsPage';
import AboutPage from '@/pages/storefront/AboutPage';
import FAQPage from '@/pages/storefront/FAQPage';
import SupportPage from '@/pages/storefront/SupportPage';

import AdminRoute from './AdminRoute';
import ProtectedRoute from './ProtectedRoute';

import AdminLayout from '@/layouts/admin/AdminLayout';
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import AdminCategoriesPage from '@/pages/admin/AdminCategoriesPage';
import AdminProductsPage from '@/pages/admin/AdminProductsPage';
import AdminProductCreatePage from '@/pages/admin/AdminProductCreatePage';
import AdminProductEditPage from '@/pages/admin/AdminProductEditPage';
import AdminOrdersPage from '@/pages/admin/AdminOrdersPage';

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

          <Route path="/shop" element={<ShopPage />} />

          <Route path="/products/:id" element={<ProductDetailsPage />} />

          <Route path="/about" element={<AboutPage />} />

          <Route path="/faq" element={<FAQPage />} />

          <Route path="/support" element={<SupportPage />} />

          {/* Protected customer routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/orders/:id" element={<OrderDetailsPage />} />
          </Route>
        </Route>

        {/* Customer authentication */}
        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        {/* Admin authentication */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Protected admin routes */}
        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboardPage />} />

            <Route path="/admin/categories" element={<AdminCategoriesPage />} />

            <Route path="/admin/products" element={<AdminProductsPage />} />

            <Route path="/admin/products/new" element={<AdminProductCreatePage />} />

            <Route path="/admin/products/:id/edit" element={<AdminProductEditPage />} />

            <Route path="/admin/orders" element={<AdminOrdersPage />} />
          </Route>
        </Route>

        {/* Other routes */}
        <Route path="/order-success/:id" element={<OrderSuccessPage />} />

        <Route path="/unauthorized" element={<PlaceholderPage title="Unauthorized" />} />

        <Route path="/404" element={<PlaceholderPage title="404 - Not Found" />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
