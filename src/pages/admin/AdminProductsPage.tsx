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
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);

  const getBrandName = (brandId: string) => {
    return mockBrands.find((brand) => brand.id === brandId)?.name ?? 'Unknown Brand';
  };

  const getCategoryName = (categoryId: string) => {
    return (
      mockCategories.find((category) => category.id === categoryId)?.name ?? 'Unknown Category'
    );
  };

  const handleDeleteProduct = async (product: Product) => {
    const confirmed = window.confirm(`Are you sure you want to delete "${product.name}"?`);

    if (!confirmed) {
      return;
    }

    setError(null);
    setSuccessMessage(null);
    setDeletingProductId(product.id);

    try {
      const response = await mockApi.deleteProduct(product.id);

      if (!response.success) {
        throw new Error(response.message ?? 'Unable to delete product.');
      }

      await dispatch(fetchProducts()).unwrap();

      setSuccessMessage(response.message ?? 'Product deleted successfully.');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unable to delete product.');
    } finally {
      setDeletingProductId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-neutral-500">Catalog</p>

          <h1 className="mt-1 text-3xl font-bold text-neutral-900">Products</h1>

          <p className="mt-2 text-neutral-600">
            Manage product information, inventory, pricing, and availability.
          </p>
        </div>

        {successMessage && (
          <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        <Link
          to="/admin/products/new"
          className="inline-flex items-center justify-center rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-700"
        >
          Add Product
        </Link>
      </div>

      <section className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
        {isLoading ? (
          <div className="p-10 text-center">
            <p className="text-sm text-neutral-500">Loading products...</p>
          </div>
        ) : apiError || error ? (
          <div className="p-10 text-center">
            <p className="text-sm font-medium text-red-600">{error ?? apiError}</p>
          </div>
        ) : products.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-sm text-neutral-500">No products found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px]">
              <thead className="border-b border-neutral-200 bg-neutral-50">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    Product
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    Brand
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    Category
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    Price
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    Stock
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    Status
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-neutral-200">
                {products.map((product) => (
                  <tr key={product.id} className="transition hover:bg-neutral-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-12 w-12 rounded-lg border border-neutral-200 object-cover"
                        />

                        <div className="min-w-0">
                          <p className="max-w-xs truncate font-semibold text-neutral-900">
                            {product.name}
                          </p>

                          <p className="mt-1 text-xs text-neutral-500">{product.id}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-neutral-600">
                      {getBrandName(product.brandId)}
                    </td>

                    <td className="px-5 py-4 text-sm text-neutral-600">
                      {getCategoryName(product.categoryId)}
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-neutral-900">
                        ₹{product.price.toLocaleString('en-IN')}
                      </p>

                      {product.originalPrice > product.price && (
                        <p className="text-xs text-neutral-400 line-through">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </p>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`text-sm font-medium ${
                          product.stock === 0
                            ? 'text-red-600'
                            : product.stock < 10
                              ? 'text-amber-600'
                              : 'text-neutral-700'
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                          product.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-neutral-100 text-neutral-600'
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/admin/products/${product.id}/edit`}
                          className="rounded-lg border border-neutral-300 px-3 py-2 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-100"
                        >
                          Edit
                        </Link>

                        <button
                          type="button"
                          onClick={() => {
                            setError(null);
                            setSuccessMessage(null);
                            void handleDeleteProduct(product);
                          }}
                          disabled={deletingProductId === product.id}
                          className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {deletingProductId === product.id ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminProductsPage;
