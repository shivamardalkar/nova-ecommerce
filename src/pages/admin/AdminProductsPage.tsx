import { useState } from 'react';

import { Link } from 'react-router-dom';

import { mockBrands, mockCategories } from '@/data';

import { mockApi } from '@/services/api';

import { useAppDispatch, useAppSelector } from '@/store/hooks';

import {
  selectProducts,
  selectProductsError,
  selectProductsLoading,
} from '@/store/selectors/productSelectors';

import { fetchProducts } from '@/store/slices/productSlice';

import type { Product } from '@/types';

const AdminProductsPage = () => {
  const dispatch = useAppDispatch();

  const products = useAppSelector(selectProducts);
  const isLoading = useAppSelector(selectProductsLoading);
  const apiError = useAppSelector(selectProductsError);

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [deletingProductId, setDeletingProductId] =
    useState<string | null>(null);

  const getBrandName = (brandId: string) => {
    return (
      mockBrands.find((brand) => brand.id === brandId)?.name ??
      'Unknown Brand'
    );
  };

  const getCategoryName = (categoryId: string) => {
    return (
      mockCategories.find((category) => category.id === categoryId)
        ?.name ?? 'Unknown Category'
    );
  };

  const handleDeleteProduct = async (product: Product) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?`,
    );

    if (!confirmed) {
      return;
    }

    setError(null);
    setSuccessMessage(null);
    setDeletingProductId(product.id);

    try {
      const response = await mockApi.deleteProduct(product.id);

      if (!response.success) {
        throw new Error(
          response.message ?? 'Unable to delete product.',
        );
      }

      await dispatch(fetchProducts()).unwrap();

      setSuccessMessage(
        response.message ?? 'Product deleted successfully.',
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Unable to delete product.',
      );
    } finally {
      setDeletingProductId(null);
    }
  };

  const activeProducts = products.filter(
    (product) => product.status === 'active',
  ).length;

  const inactiveProducts = products.length - activeProducts;

  const lowStockProducts = products.filter(
    (product) => product.stock > 0 && product.stock < 10,
  ).length;

  const outOfStockProducts = products.filter(
    (product) => product.stock === 0,
  ).length;

  return (
    <div className="space-y-8">
      {/* Page heading */}
      <section>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-400">
              Catalog
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
              Products
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600 sm:text-base">
              Manage product information, inventory, pricing, and
              availability.
            </p>
          </div>

          <Link
            to="/admin/products/new"
            className="inline-flex w-fit items-center gap-2 rounded-lg bg-neutral-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-950/20"
          >
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>

            Add Product
          </Link>
        </div>
      </section>

      {/* Feedback */}
      {successMessage && (
        <div
          role="status"
          className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
        >
          <svg
            aria-hidden="true"
            className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="m5 12 4 4L19 6" />
          </svg>

          <span className="font-medium">{successMessage}</span>
        </div>
      )}

      {(error || apiError) && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <svg
            aria-hidden="true"
            className="mt-0.5 h-5 w-5 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v5M12 16h.01" />
          </svg>

          <span className="font-medium">
            {error ?? apiError}
          </span>
        </div>
      )}

      {/* Product overview */}
      {!isLoading && !apiError && (
        <section
          aria-label="Product overview"
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-neutral-500">
              Total Products
            </p>

            <p className="mt-2 text-2xl font-bold tracking-tight text-neutral-950">
              {products.length}
            </p>

            <p className="mt-1 text-xs text-neutral-500">
              All catalog products
            </p>
          </div>

          <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-neutral-500">
              Active
            </p>

            <p className="mt-2 text-2xl font-bold tracking-tight text-emerald-700">
              {activeProducts}
            </p>

            <p className="mt-1 text-xs text-neutral-500">
              Available products
            </p>
          </div>

          <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-neutral-500">
              Low Stock
            </p>

            <p className="mt-2 text-2xl font-bold tracking-tight text-amber-600">
              {lowStockProducts}
            </p>

            <p className="mt-1 text-xs text-neutral-500">
              Less than 10 units
            </p>
          </div>

          <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-neutral-500">
              Out of Stock
            </p>

            <p className="mt-2 text-2xl font-bold tracking-tight text-red-600">
              {outOfStockProducts}
            </p>

            <p className="mt-1 text-xs text-neutral-500">
              {inactiveProducts} inactive product
              {inactiveProducts === 1 ? '' : 's'}
            </p>
          </div>
        </section>
      )}

      {/* Products table */}
      <section className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-neutral-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-400">
              Catalog inventory
            </p>

            <h2 className="mt-1 text-lg font-bold text-neutral-950">
              All Products
            </h2>
          </div>

          {!isLoading && !apiError && (
            <span className="w-fit rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-600">
              {products.length}{' '}
              {products.length === 1 ? 'product' : 'products'}
            </span>
          )}
        </div>

        {isLoading ? (
          <div className="px-6 py-14 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-900" />

            <p className="mt-4 text-sm text-neutral-500">
              Loading products...
            </p>
          </div>
        ) : apiError || error ? (
          <div className="px-6 py-14 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v5M12 16h.01" />
              </svg>
            </div>

            <p className="mt-4 text-sm font-semibold text-neutral-900">
              Unable to load products
            </p>

            <p className="mt-1 text-sm text-red-600">
              {error ?? apiError}
            </p>

            <button
              type="button"
              onClick={() => dispatch(fetchProducts())}
              className="mt-5 rounded-lg border border-neutral-300 px-4 py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
            >
              Try again
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="px-6 py-14 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
              <svg
                aria-hidden="true"
                className="h-5 w-5 text-neutral-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
                <path d="m4.5 7.5 7.5 4 7.5-4M12 12v9" />
              </svg>
            </div>

            <p className="mt-4 text-sm font-semibold text-neutral-900">
              No products found
            </p>

            <p className="mt-1 text-sm text-neutral-500">
              Add your first product to start building the catalog.
            </p>

            <Link
              to="/admin/products/new"
              className="mt-5 inline-flex rounded-lg bg-neutral-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              Add Product
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px]">
              <thead className="border-b border-neutral-200 bg-neutral-50">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-neutral-500">
                    Product
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-neutral-500">
                    Brand
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-neutral-500">
                    Category
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-neutral-500">
                    Price
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-neutral-500">
                    Stock
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-neutral-500">
                    Status
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-neutral-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-neutral-100">
                {products.map((product) => {
                  const isDeleting =
                    deletingProductId === product.id;

                  return (
                    <tr
                      key={product.id}
                      className="group transition hover:bg-neutral-50/80"
                    >
                      {/* Product */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="h-full w-full object-cover transition group-hover:scale-105"
                              onError={(event) => {
                                event.currentTarget.src =
                                  'https://placehold.co/100x100?text=NOVA';
                              }}
                            />
                          </div>

                          <div className="min-w-0">
                            <p className="max-w-xs truncate text-sm font-semibold text-neutral-950">
                              {product.name}
                            </p>

                            <p className="mt-1 text-xs text-neutral-400">
                              {product.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Brand */}
                      <td className="px-5 py-4">
                        <span className="text-sm text-neutral-700">
                          {getBrandName(product.brandId)}
                        </span>
                      </td>

                      {/* Category */}
                      <td className="px-5 py-4">
                        <span className="text-sm text-neutral-700">
                          {getCategoryName(product.categoryId)}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-5 py-4">
                        <p className="text-sm font-semibold text-neutral-950">
                          ₹{product.price.toLocaleString('en-IN')}
                        </p>

                        {product.originalPrice > product.price && (
                          <p className="mt-0.5 text-xs text-neutral-400 line-through">
                            ₹
                            {product.originalPrice.toLocaleString(
                              'en-IN',
                            )}
                          </p>
                        )}
                      </td>

                      {/* Stock */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`h-2 w-2 rounded-full ${
                              product.stock === 0
                                ? 'bg-red-500'
                                : product.stock < 10
                                  ? 'bg-amber-500'
                                  : 'bg-emerald-500'
                            }`}
                          />

                          <span
                            className={`text-sm font-semibold ${
                              product.stock === 0
                                ? 'text-red-600'
                                : product.stock < 10
                                  ? 'text-amber-600'
                                  : 'text-neutral-700'
                            }`}
                          >
                            {product.stock}
                          </span>
                        </div>

                        <p className="mt-0.5 text-xs text-neutral-400">
                          {product.stock === 0
                            ? 'Out of stock'
                            : product.stock < 10
                              ? 'Low stock'
                              : 'In stock'}
                        </p>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                            product.status === 'active'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-neutral-100 text-neutral-600'
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              product.status === 'active'
                                ? 'bg-emerald-500'
                                : 'bg-neutral-400'
                            }`}
                          />

                          {product.status}
                        </span>
                      </td>

                      {/* Actions */}
{/* Actions */}
<td className="px-5 py-4">
  <div className="flex justify-end gap-2">
    <Link
      to={`/admin/products/${product.id}/edit`}
      className="inline-flex h-9 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-3.5 text-sm font-semibold text-neutral-700 transition hover:border-neutral-400 hover:bg-neutral-50 hover:text-neutral-950 focus:outline-none focus:ring-2 focus:ring-neutral-950/10"
    >
      <svg
        aria-hidden="true"
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="m4 16-.7 4.7L8 20l11-11a2.8 2.8 0 0 0-4-4L4 16Z" />
        <path d="m13.5 6.5 4 4" />
      </svg>

      Edit
    </Link>

    <button
      type="button"
      onClick={() => {
        setError(null);
        setSuccessMessage(null);
        void handleDeleteProduct(product);
      }}
      disabled={isDeleting}
      className="inline-flex h-9 items-center gap-2 rounded-lg border border-red-200 bg-white px-3.5 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isDeleting ? (
        <>
          <span
            aria-hidden="true"
            className="h-4 w-4 animate-spin rounded-full border-2 border-red-200 border-t-red-600"
          />
          Deleting
        </>
      ) : (
        <>
          <svg
            aria-hidden="true"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M4 7h16M10 11v6M14 11v6M6 7l1 14h10l1-14M9 7V4h6v3" />
          </svg>

          Delete
        </>
      )}
    </button>
  </div>
</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminProductsPage;