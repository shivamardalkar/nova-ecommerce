import { useEffect, useState, type FormEvent } from 'react';

import { mockBrands, mockCategories } from '@/data';
import type { Product, ProductSpecification, ProductStatus } from '@/types';

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
  status: ProductStatus;
  featured: boolean;
}

interface ProductFormProps {
  initialProduct?: Product | null;
  isSubmitting?: boolean;
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
}

const getInitialFormData = (product?: Product | null): ProductFormData => ({
  name: product?.name ?? '',
  brandId: product?.brandId ?? '',
  categoryId: product?.categoryId ?? '',
  description: product?.description ?? '',
  price: product?.price?.toString() ?? '',
  originalPrice: product?.originalPrice?.toString() ?? '',
  stock: product?.stock?.toString() ?? '',
  images: product?.images.join('\n') ?? '',
  specifications: product?.specifications ?? [],
  status: product?.status ?? 'active',
  featured: product?.featured ?? false,
});

const ProductForm = ({
  initialProduct,
  isSubmitting = false,
  onSubmit,
  onCancel,
}: ProductFormProps) => {
  const [formData, setFormData] = useState<ProductFormData>(getInitialFormData(initialProduct));

  const [errors, setErrors] = useState<Partial<Record<keyof ProductFormData, string>>>({});

  useEffect(() => {
    setFormData(getInitialFormData(initialProduct));
    setErrors({});
  }, [initialProduct]);

  const handleChange = (field: keyof ProductFormData, value: string | boolean) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));
  };

  const handleAddSpecification = () => {
    setFormData((current) => ({
      ...current,
      specifications: [
        ...current.specifications,
        {
          key: '',
          value: '',
        },
      ],
    }));
  };

  const handleSpecificationChange = (
    index: number,
    field: keyof ProductSpecification,
    value: string,
  ) => {
    setFormData((current) => ({
      ...current,
      specifications: current.specifications.map((specification, specificationIndex) =>
        specificationIndex === index
          ? {
              ...specification,
              [field]: value,
            }
          : specification,
      ),
    }));
  };

  const handleRemoveSpecification = (index: number) => {
    setFormData((current) => ({
      ...current,
      specifications: current.specifications.filter(
        (_, specificationIndex) => specificationIndex !== index,
      ),
    }));
  };

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof ProductFormData, string>> = {};

    const name = formData.name.trim();
    const description = formData.description.trim();
    const price = Number(formData.price);
    const originalPrice = Number(formData.originalPrice);
    const stock = Number(formData.stock);
    const images = formData.images
      .split('\n')
      .map((image) => image.trim())
      .filter(Boolean);

    if (!name) {
      nextErrors.name = 'Product name is required.';
    } else if (name.length < 2) {
      nextErrors.name = 'Product name must be at least 2 characters.';
    } else if (name.length > 120) {
      nextErrors.name = 'Product name cannot exceed 120 characters.';
    }

    if (!formData.brandId) {
      nextErrors.brandId = 'Please select a brand.';
    }

    if (!formData.categoryId) {
      nextErrors.categoryId = 'Please select a category.';
    }

    if (!description) {
      nextErrors.description = 'Product description is required.';
    }

    if (!formData.price || !Number.isFinite(price) || price <= 0) {
      nextErrors.price = 'Enter a valid price greater than 0.';
    }

    if (!formData.originalPrice || !Number.isFinite(originalPrice) || originalPrice <= 0) {
      nextErrors.originalPrice = 'Enter a valid original price greater than 0.';
    } else if (originalPrice < price) {
      nextErrors.originalPrice = 'Original price cannot be lower than the selling price.';
    }

    if (!formData.stock || !Number.isInteger(stock) || stock < 0) {
      nextErrors.stock = 'Stock must be a whole number greater than or equal to 0.';
    }

    if (images.length === 0) {
      nextErrors.images = 'Add at least one product image URL.';
    }

    const hasInvalidSpecification = formData.specifications.some(
      (specification) => !specification.key.trim() || !specification.value.trim(),
    );

    if (hasInvalidSpecification) {
      nextErrors.specifications = 'Complete or remove all specification rows.';
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    onSubmit({
      ...formData,
      name: formData.name.trim(),
      description: formData.description.trim(),
      images: formData.images
        .split('\n')
        .map((image) => image.trim())
        .filter(Boolean)
        .join('\n'),
    });
  };

  const isEditMode = Boolean(initialProduct);

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm"
    >
      {/* Basic Information */}

      <section>
        <div className="mb-5">
          <h2 className="text-xl font-bold text-neutral-900">
            {isEditMode ? 'Edit Product' : 'Add Product'}
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            {isEditMode
              ? 'Update the product information below.'
              : 'Add a new product to your store catalog.'}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label
              htmlFor="product-name"
              className="mb-2 block text-sm font-semibold text-neutral-700"
            >
              Product Name
            </label>

            <input
              id="product-name"
              type="text"
              value={formData.name}
              onChange={(event) => handleChange('name', event.target.value)}
              placeholder="e.g. NOVA X1 Pro"
              disabled={isSubmitting}
              className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 disabled:bg-neutral-100"
            />

            {errors.name && <p className="mt-1.5 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label
              htmlFor="product-brand"
              className="mb-2 block text-sm font-semibold text-neutral-700"
            >
              Brand
            </label>

            <select
              id="product-brand"
              value={formData.brandId}
              onChange={(event) => handleChange('brandId', event.target.value)}
              disabled={isSubmitting}
              className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 disabled:bg-neutral-100"
            >
              <option value="">Select brand</option>

              {mockBrands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>

            {errors.brandId && <p className="mt-1.5 text-sm text-red-600">{errors.brandId}</p>}
          </div>

          <div>
            <label
              htmlFor="product-category"
              className="mb-2 block text-sm font-semibold text-neutral-700"
            >
              Category
            </label>

            <select
              id="product-category"
              value={formData.categoryId}
              onChange={(event) => handleChange('categoryId', event.target.value)}
              disabled={isSubmitting}
              className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 disabled:bg-neutral-100"
            >
              <option value="">Select category</option>

              {mockCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {errors.categoryId && (
              <p className="mt-1.5 text-sm text-red-600">{errors.categoryId}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="product-description"
              className="mb-2 block text-sm font-semibold text-neutral-700"
            >
              Description
            </label>

            <textarea
              id="product-description"
              value={formData.description}
              onChange={(event) => handleChange('description', event.target.value)}
              placeholder="Describe the product..."
              rows={5}
              disabled={isSubmitting}
              className="w-full resize-y rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 disabled:bg-neutral-100"
            />

            {errors.description && (
              <p className="mt-1.5 text-sm text-red-600">{errors.description}</p>
            )}
          </div>
        </div>
      </section>

      {/* Pricing & Inventory */}

      <section className="border-t border-neutral-200 pt-8">
        <div className="mb-5">
          <h3 className="text-lg font-bold text-neutral-900">Pricing & Inventory</h3>

          <p className="mt-1 text-sm text-neutral-500">Configure pricing and available stock.</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label
              htmlFor="product-price"
              className="mb-2 block text-sm font-semibold text-neutral-700"
            >
              Selling Price (₹)
            </label>

            <input
              id="product-price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(event) => handleChange('price', event.target.value)}
              placeholder="49999"
              disabled={isSubmitting}
              className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 disabled:bg-neutral-100"
            />

            {errors.price && <p className="mt-1.5 text-sm text-red-600">{errors.price}</p>}
          </div>

          <div>
            <label
              htmlFor="product-original-price"
              className="mb-2 block text-sm font-semibold text-neutral-700"
            >
              Original Price (₹)
            </label>

            <input
              id="product-original-price"
              type="number"
              min="0"
              step="0.01"
              value={formData.originalPrice}
              onChange={(event) => handleChange('originalPrice', event.target.value)}
              placeholder="59999"
              disabled={isSubmitting}
              className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 disabled:bg-neutral-100"
            />

            {errors.originalPrice && (
              <p className="mt-1.5 text-sm text-red-600">{errors.originalPrice}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="product-stock"
              className="mb-2 block text-sm font-semibold text-neutral-700"
            >
              Stock
            </label>

            <input
              id="product-stock"
              type="number"
              min="0"
              step="1"
              value={formData.stock}
              onChange={(event) => handleChange('stock', event.target.value)}
              placeholder="50"
              disabled={isSubmitting}
              className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 disabled:bg-neutral-100"
            />

            {errors.stock && <p className="mt-1.5 text-sm text-red-600">{errors.stock}</p>}
          </div>
        </div>
      </section>

      {/* Images */}

      <section className="border-t border-neutral-200 pt-8">
        <div className="mb-5">
          <h3 className="text-lg font-bold text-neutral-900">Product Images</h3>

          <p className="mt-1 text-sm text-neutral-500">Add one image URL per line.</p>
        </div>

        <textarea
          id="product-images"
          value={formData.images}
          onChange={(event) => handleChange('images', event.target.value)}
          placeholder={
            'https://placehold.co/600x400?text=Product+Image\nhttps://placehold.co/600x400?text=Product+Back'
          }
          rows={4}
          disabled={isSubmitting}
          className="w-full resize-y rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 disabled:bg-neutral-100"
        />

        {errors.images && <p className="mt-1.5 text-sm text-red-600">{errors.images}</p>}
      </section>

      {/* Specifications */}

      <section className="border-t border-neutral-200 pt-8">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="text-lg font-bold text-neutral-900">Specifications</h3>

            <p className="mt-1 text-sm text-neutral-500">
              Add technical details such as display, storage, battery, or dimensions.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddSpecification}
            disabled={isSubmitting}
            className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            + Add Specification
          </button>
        </div>

        {formData.specifications.length === 0 ? (
          <div className="rounded-lg border border-dashed border-neutral-300 p-6 text-center">
            <p className="text-sm text-neutral-500">No specifications added yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {formData.specifications.map((specification, index) => (
              <div
                key={`${index}-${specification.key}`}
                className="flex flex-col gap-3 rounded-lg border border-neutral-200 p-4 sm:flex-row sm:items-start"
              >
                <div className="flex-1">
                  <label
                    htmlFor={`spec-key-${index}`}
                    className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-500"
                  >
                    Specification
                  </label>

                  <input
                    id={`spec-key-${index}`}
                    type="text"
                    value={specification.key}
                    onChange={(event) =>
                      handleSpecificationChange(index, 'key', event.target.value)
                    }
                    placeholder="e.g. RAM"
                    disabled={isSubmitting}
                    className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 disabled:bg-neutral-100"
                  />
                </div>

                <div className="flex-1">
                  <label
                    htmlFor={`spec-value-${index}`}
                    className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-500"
                  >
                    Value
                  </label>

                  <input
                    id={`spec-value-${index}`}
                    type="text"
                    value={specification.value}
                    onChange={(event) =>
                      handleSpecificationChange(index, 'value', event.target.value)
                    }
                    placeholder="e.g. 16 GB"
                    disabled={isSubmitting}
                    className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 disabled:bg-neutral-100"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveSpecification(index)}
                  disabled={isSubmitting}
                  className="mt-6 rounded-lg border border-red-200 px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 sm:mt-7"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
      {errors.specifications && (
        <p className="mt-3 text-sm text-red-600">{errors.specifications}</p>
      )}

      {/* Status */}

      <section className="border-t border-neutral-200 pt-8">
        <div className="mb-5">
          <h3 className="text-lg font-bold text-neutral-900">Publishing</h3>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="product-status"
              className="mb-2 block text-sm font-semibold text-neutral-700"
            >
              Status
            </label>

            <select
              id="product-status"
              value={formData.status}
              onChange={(event) => handleChange('status', event.target.value as ProductStatus)}
              disabled={isSubmitting}
              className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 disabled:bg-neutral-100"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-neutral-200 p-4">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(event) => handleChange('featured', event.target.checked)}
              disabled={isSubmitting}
              className="h-4 w-4 rounded border-neutral-300"
            />

            <span>
              <span className="block text-sm font-semibold text-neutral-900">Featured Product</span>

              <span className="mt-1 block text-xs text-neutral-500">
                Show this product in the featured section.
              </span>
            </span>
          </label>
        </div>
      </section>

      {/* Actions */}

      <div className="flex flex-col-reverse gap-3 border-t border-neutral-200 pt-6 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="rounded-lg border border-neutral-300 px-5 py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : isEditMode ? 'Update Product' : 'Create Product'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
