import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ProductForm from '@/components/admin/ProductForm';
import { mockApi } from '@/services/api';
import { useAppDispatch } from '@/store/hooks';
import { fetchProducts } from '@/store/slices/productSlice';
import type { Product, ProductSpecification } from '@/types';

type ProductFormData = {
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
};

const AdminProductCreatePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateProduct = async (data: ProductFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const productsResponse = await mockApi.getProducts();

      if (!productsResponse.success) {
        throw new Error(productsResponse.message ?? 'Unable to validate product.');
      }

      const normalizedName = data.name.trim().toLowerCase();

      const productAlreadyExists = productsResponse.data.some(
        (product) => product.name.trim().toLowerCase() === normalizedName,
      );

      if (productAlreadyExists) {
        throw new Error('A product with this name already exists.');
      }

      const price = Number(data.price);
      const originalPrice = Number(data.originalPrice);

      const discountPercentage =
        originalPrice > 0 ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

      const now = new Date().toISOString();

      const newProduct: Product = {
        id: `product-${Date.now()}`,
        name: data.name,
        brandId: data.brandId,
        categoryId: data.categoryId,
        description: data.description,
        price,
        originalPrice,
        discountPercentage,
        stock: Number(data.stock),
        images: data.images
          .split('\n')
          .map((image) => image.trim())
          .filter(Boolean),
        specifications: data.specifications,
        reviews: [],
        rating: 0,
        status: data.status,
        featured: data.featured,
        createdAt: now,
        updatedAt: now,
      };

      const response = await mockApi.createProduct(newProduct);

      if (!response.success) {
        throw new Error(response.message ?? 'Unable to create product.');
      }

      await dispatch(fetchProducts()).unwrap();

      navigate('/admin/products', {
        replace: true,
        state: {
          successMessage: response.message ?? 'Product created successfully.',
        },
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unable to create product.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <button
          type="button"
          onClick={() => navigate('/admin/products')}
          className="mb-4 text-sm font-semibold text-neutral-600 hover:text-neutral-900"
        >
          ← Back to Products
        </button>

        <p className="text-sm font-medium text-neutral-500">Catalog</p>

        <h1 className="mt-1 text-3xl font-bold text-neutral-900">Add Product</h1>

        <p className="mt-2 text-neutral-600">Create a new product for your store catalog.</p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      <ProductForm
        isSubmitting={isSubmitting}
        onSubmit={handleCreateProduct}
        onCancel={() => navigate('/admin/products')}
      />
    </div>
  );
};

export default AdminProductCreatePage;
