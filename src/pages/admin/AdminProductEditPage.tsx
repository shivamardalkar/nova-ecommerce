import { useEffect, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  Loader2,
  Package,
  RefreshCw,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import ProductForm from '@/components/admin/ProductForm';
import { mockApi } from '@/services/api';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectProductsError,
  selectProductsLoading,
  selectSelectedProduct,
} from '@/store/selectors/productSelectors';
import {
  clearSelectedProduct,
  fetchProductById,
  fetchProducts,
} from '@/store/slices/productSlice';
import type { Product, ProductSpecification } from '@/types';

interface ProductFormData {
  name: string;
  brandId: string;
  categoryId: string;
  description: string;
  price: string;
  originalPrice: string;
  stock: string;
  images: string;
  specifications: ProductSpecification[];
  status: Product['status'];
  featured: boolean;
}

const AdminProductEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const product = useAppSelector(selectSelectedProduct);
  const isLoading = useAppSelector(selectProductsLoading);
  const productsError = useAppSelector(selectProductsError);

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(fetchProductById(id));

    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id]);

  const handleUpdateProduct = async (formData: ProductFormData) => {
    if (!product) {
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      const existingProductsResponse = await mockApi.getProducts();

      const normalizedName = formData.name.trim().toLowerCase();

      const duplicateProduct = existingProductsResponse.data.find(
        (existingProduct) =>
          existingProduct.id !== product.id &&
          existingProduct.name.trim().toLowerCase() === normalizedName,
      );

      if (duplicateProduct) {
        setError('A product with this name already exists.');
        return;
      }

      const price = Number(formData.price);
      const originalPrice = Number(formData.originalPrice);
      const stock = Number(formData.stock);

      const discountPercentage =
        originalPrice > price
          ? Math.round(((originalPrice - price) / originalPrice) * 100)
          : 0;

      const images = formData.images
        .split('\n')
        .map((image) => image.trim())
        .filter(Boolean);

      const specifications = formData.specifications.filter(
        (specification) =>
          specification.key.trim() !== '' &&
          specification.value.trim() !== '',
      );

      const updatedProduct: Product = {
        ...product,
        name: formData.name.trim(),
        brandId: formData.brandId,
        categoryId: formData.categoryId,
        description: formData.description.trim(),
        price,
        originalPrice,
        discountPercentage,
        stock,
        images,
        specifications,
        status: formData.status,
        featured: formData.featured,
        updatedAt: new Date().toISOString(),
      };

      await mockApi.updateProduct(updatedProduct);

      await dispatch(fetchProducts()).unwrap();

      navigate('/admin/products', {
        replace: true,
        state: {
          successMessage: 'Product updated successfully.',
        },
      });
    } catch (updateError) {
      console.error('Failed to update product:', updateError);
      setError('Unable to update the product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (isSubmitting) {
      return;
    }

    navigate('/admin/products');
  };

  /*
   * Missing product ID
   */
  if (!id) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
            <AlertCircle className="h-6 w-6" />
          </div>

          <h1 className="mt-5 text-xl font-bold text-neutral-950">
            Product ID is missing
          </h1>

          <p className="mt-2 text-sm leading-6 text-neutral-600">
            We could not determine which product you want to edit.
          </p>

          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to Products
          </button>
        </div>
      </div>
    );
  }

  /*
   * Loading state
   */
  if (isLoading && !product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-neutral-700" />

          <p className="mt-4 text-sm font-medium text-neutral-800">
            Loading product...
          </p>

          <p className="mt-1 text-sm text-neutral-500">
            Please wait while we load the product details.
          </p>
        </div>
      </div>
    );
  }

  /*
   * Product loading error
   */
  if (productsError && !product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
            <AlertCircle className="h-6 w-6" />
          </div>

          <h1 className="mt-5 text-xl font-bold text-neutral-950">
            Unable to load product
          </h1>

          <p className="mt-2 text-sm leading-6 text-neutral-600">
            {productsError}
          </p>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => {
                setError('');
                dispatch(fetchProductById(id));
              }}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-300"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </button>

            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-300"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  /*
   * Product not found
   */
  if (!product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-700">
            <Package className="h-6 w-6" />
          </div>

          <h1 className="mt-5 text-xl font-bold text-neutral-950">
            Product not found
          </h1>

          <p className="mt-2 text-sm leading-6 text-neutral-600">
            The product you are trying to edit does not exist or may have been
            removed.
          </p>

          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <section className="space-y-5">
        <button
          type="button"
          onClick={handleCancel}
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3.5 py-2 text-sm font-medium text-neutral-700 transition hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-950 focus:outline-none focus:ring-2 focus:ring-neutral-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </button>

        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neutral-950 text-white shadow-sm">
            <Package className="h-6 w-6" />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
              Catalog
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-neutral-950 sm:text-3xl">
              Edit Product
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
              Update product information, pricing, inventory, images,
              specifications, and publishing settings.
            </p>
          </div>
        </div>
      </section>

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-800"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

          <div>
            <p className="font-semibold">Unable to update product</p>
            <p className="mt-0.5 text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Product Form */}
      <ProductForm
        key={product.id}
        initialProduct={product}
        onSubmit={handleUpdateProduct}
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default AdminProductEditPage;