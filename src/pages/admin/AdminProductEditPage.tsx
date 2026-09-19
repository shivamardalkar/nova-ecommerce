import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ProductForm from '@/components/admin/ProductForm';
import { mockApi } from '@/services/api';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectProductsLoading, selectSelectedProduct } from '@/store/selectors/productSelectors';
import { clearSelectedProduct, fetchProductById, fetchProducts } from '@/store/slices/productSlice';
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

const AdminProductEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const product = useAppSelector(selectSelectedProduct);
  const isLoading = useAppSelector(selectProductsLoading);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Product ID is missing.');
      return;
    }

    dispatch(fetchProductById(id));

    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id]);

  const handleUpdateProduct = async (data: ProductFormData) => {
    if (!product) {
      setError('Product could not be found.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const productsResponse = await mockApi.getProducts();

      if (!productsResponse.success) {
        throw new Error(productsResponse.message ?? 'Unable to validate product.');
      }

      const normalizedName = data.name.trim().toLowerCase();

      const productAlreadyExists = productsResponse.data.some(
        (item) => item.id !== product.id && item.name.trim().toLowerCase() === normalizedName,
      );

      if (productAlreadyExists) {
        throw new Error('A product with this name already exists.');
      }

      const price = Number(data.price);
      const originalPrice = Number(data.originalPrice);

      const discountPercentage =
        originalPrice > 0 ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

      const updatedProduct: Product = {
        ...product,
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
        status: data.status,
        featured: data.featured,
        updatedAt: new Date().toISOString(),
      };

      const response = await mockApi.updateProduct(updatedProduct);

      if (!response.success) {
        throw new Error(response.message ?? 'Unable to update product.');
      }

      await dispatch(fetchProducts()).unwrap();

      navigate('/admin/products', {
        replace: true,
        state: {
          successMessage: response.message ?? 'Product updated successfully.',
        },
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unable to update product.');
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

  if (isLoading && !product) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-neutral-500">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => navigate('/admin/products')}
          className="text-sm font-semibold text-neutral-600 hover:text-neutral-900"
        >
          ← Back to Products
        </button>

        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <h1 className="text-lg font-bold text-red-800">Product not found</h1>

          <p className="mt-1 text-sm text-red-700">
            {error ?? 'The requested product does not exist.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <button
          type="button"
          onClick={handleCancel}
          className="mb-4 text-sm font-semibold text-neutral-600 hover:text-neutral-900"
        >
          ← Back to Products
        </button>

        <p className="text-sm font-medium text-neutral-500">Catalog</p>

        <h1 className="mt-1 text-3xl font-bold text-neutral-900">Edit Product</h1>

        <p className="mt-2 text-neutral-600">
          Update product information, pricing, inventory, and availability.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      <ProductForm
        initialProduct={product}
        isSubmitting={isSubmitting}
        onSubmit={handleUpdateProduct}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default AdminProductEditPage;
