import { useState } from 'react';
import { AlertCircle, ArrowLeft, PackagePlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import ProductForm from '@/components/admin/ProductForm';
import { mockApi } from '@/services/api';
import { useAppDispatch } from '@/store/hooks';
import { fetchProducts } from '@/store/slices/productSlice';
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

const AdminProductCreatePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateProduct = async (formData: ProductFormData) => {
    setError('');
    setIsSubmitting(true);

    try {
      const existingProductsResponse = await mockApi.getProducts();

      const normalizedName = formData.name.trim().toLowerCase();

      const duplicateProduct = existingProductsResponse.data.find(
        (product) => product.name.trim().toLowerCase() === normalizedName,
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

      const now = new Date().toISOString();

      const newProduct: Product = {
        id: `product-${Date.now()}`,
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
        reviews: [],
        rating: 0,
        status: formData.status,
        featured: formData.featured,
        createdAt: now,
        updatedAt: now,
      };

      await mockApi.createProduct(newProduct);

      await dispatch(fetchProducts()).unwrap();

      navigate('/admin/products', {
        replace: true,
        state: {
          successMessage: 'Product created successfully.',
        },
      });
    } catch (createError) {
      console.error('Failed to create product:', createError);
      setError('Unable to create the product. Please try again.');
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
            <PackagePlus className="h-6 w-6" />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
              Catalog
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-neutral-950 sm:text-3xl">
              Add Product
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
              Create a new product and configure its pricing, inventory,
              images, specifications, and publishing settings.
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
            <p className="font-semibold">Unable to create product</p>
            <p className="mt-0.5 text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Product Form */}
      <ProductForm
        onSubmit={handleCreateProduct}
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default AdminProductCreatePage;