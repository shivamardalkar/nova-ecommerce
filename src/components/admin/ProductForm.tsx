import { useState, type FormEvent } from 'react';

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

const getInitialFormData = (
  product?: Product | null,
): ProductFormData => ({
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
  const [formData, setFormData] = useState<ProductFormData>(
    getInitialFormData(initialProduct),
  );

  const [errors, setErrors] = useState<
    Partial<Record<keyof ProductFormData, string>>
  >({});

  const handleChange = (
    field: keyof ProductFormData,
    value: string | boolean,
  ) => {
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
      specifications: current.specifications.map(
        (specification, specificationIndex) =>
          specificationIndex === index
            ? {
                ...specification,
                [field]: value,
              }
            : specification,
      ),
    }));

    setErrors((current) => ({
      ...current,
      specifications: undefined,
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
    const nextErrors: Partial<
      Record<keyof ProductFormData, string>
    > = {};

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
      nextErrors.name =
        'Product name must be at least 2 characters.';
    } else if (name.length > 120) {
      nextErrors.name =
        'Product name cannot exceed 120 characters.';
    }

    if (!formData.brandId) {
      nextErrors.brandId = 'Please select a brand.';
    }

    if (!formData.categoryId) {
      nextErrors.categoryId = 'Please select a category.';
    }

    if (!description) {
      nextErrors.description =
        'Product description is required.';
    }

    if (
      !formData.price ||
      !Number.isFinite(price) ||
      price <= 0
    ) {
      nextErrors.price =
        'Enter a valid price greater than 0.';
    }

    if (
      !formData.originalPrice ||
      !Number.isFinite(originalPrice) ||
      originalPrice <= 0
    ) {
      nextErrors.originalPrice =
        'Enter a valid original price greater than 0.';
    } else if (originalPrice < price) {
      nextErrors.originalPrice =
        'Original price cannot be lower than the selling price.';
    }

    if (
      !formData.stock ||
      !Number.isInteger(stock) ||
      stock < 0
    ) {
      nextErrors.stock =
        'Stock must be a whole number greater than or equal to 0.';
    }

    if (images.length === 0) {
      nextErrors.images =
        'Add at least one product image URL.';
    }

    const hasInvalidSpecification =
      formData.specifications.some(
        (specification) =>
          !specification.key.trim() ||
          !specification.value.trim(),
      );

    if (hasInvalidSpecification) {
      nextErrors.specifications =
        'Complete or remove all specification rows.';
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
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

  const fieldClass =
    'w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 disabled:bg-neutral-100 disabled:text-neutral-500';

  const errorClass =
    'mt-1.5 text-sm font-medium text-red-600';

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Basic Information */}
      <section className="rounded-xl border border-neutral-200 bg-white shadow-sm">
        <div className="border-b border-neutral-200 px-5 py-5 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-400">
            Product details
          </p>

          <h2 className="mt-1 text-xl font-bold tracking-tight text-neutral-950">
            {isEditMode ? 'Edit Product' : 'Add Product'}
          </h2>

          <p className="mt-1.5 text-sm leading-6 text-neutral-500">
            {isEditMode
              ? 'Update the product information below.'
              : 'Add a new product to your store catalog.'}
          </p>
        </div>

        <div className="p-5 sm:p-6">
          <div className="grid gap-5 md:grid-cols-2">
            {/* Product Name */}
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
                onChange={(event) =>
                  handleChange('name', event.target.value)
                }
                placeholder="e.g. NOVA X1 Pro"
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.name)}
                className={`${fieldClass} ${
                  errors.name
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10'
                    : ''
                }`}
              />

              <div className="mt-1.5 flex justify-between gap-3">
                {errors.name ? (
                  <p className={errorClass}>
                    {errors.name}
                  </p>
                ) : (
                  <p className="text-xs text-neutral-400">
                    Use a clear, customer-friendly product name.
                  </p>
                )}

                <span className="shrink-0 text-xs text-neutral-400">
                  {formData.name.length}/120
                </span>
              </div>
            </div>

            {/* Brand */}
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
                onChange={(event) =>
                  handleChange('brandId', event.target.value)
                }
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.brandId)}
                className={`${fieldClass} ${
                  errors.brandId
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10'
                    : ''
                }`}
              >
                <option value="">Select brand</option>

                {mockBrands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>

              {errors.brandId && (
                <p className={errorClass}>
                  {errors.brandId}
                </p>
              )}
            </div>

            {/* Category */}
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
                onChange={(event) =>
                  handleChange(
                    'categoryId',
                    event.target.value,
                  )
                }
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.categoryId)}
                className={`${fieldClass} ${
                  errors.categoryId
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10'
                    : ''
                }`}
              >
                <option value="">Select category</option>

                {mockCategories.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>

              {errors.categoryId && (
                <p className={errorClass}>
                  {errors.categoryId}
                </p>
              )}
            </div>

            {/* Description */}
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
                onChange={(event) =>
                  handleChange(
                    'description',
                    event.target.value,
                  )
                }
                placeholder="Describe the product..."
                rows={5}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.description)}
                className={`${fieldClass} resize-y ${
                  errors.description
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10'
                    : ''
                }`}
              />

              {errors.description ? (
                <p className={errorClass}>
                  {errors.description}
                </p>
              ) : (
                <p className="mt-1.5 text-xs text-neutral-400">
                  Include the key benefits and important product
                  details.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & Inventory */}
      <section className="rounded-xl border border-neutral-200 bg-white shadow-sm">
        <div className="border-b border-neutral-200 px-5 py-5 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-400">
            Commercial
          </p>

          <h3 className="mt-1 text-lg font-bold text-neutral-950">
            Pricing & Inventory
          </h3>

          <p className="mt-1.5 text-sm text-neutral-500">
            Configure pricing and available stock.
          </p>
        </div>

        <div className="p-5 sm:p-6">
          <div className="grid gap-5 sm:grid-cols-3">
            {/* Selling Price */}
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
                onChange={(event) =>
                  handleChange('price', event.target.value)
                }
                placeholder="49999"
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.price)}
                className={`${fieldClass} ${
                  errors.price
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10'
                    : ''
                }`}
              />

              {errors.price && (
                <p className={errorClass}>
                  {errors.price}
                </p>
              )}
            </div>

            {/* Original Price */}
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
                onChange={(event) =>
                  handleChange(
                    'originalPrice',
                    event.target.value,
                  )
                }
                placeholder="59999"
                disabled={isSubmitting}
                aria-invalid={Boolean(
                  errors.originalPrice,
                )}
                className={`${fieldClass} ${
                  errors.originalPrice
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10'
                    : ''
                }`}
              />

              {errors.originalPrice && (
                <p className={errorClass}>
                  {errors.originalPrice}
                </p>
              )}
            </div>

            {/* Stock */}
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
                onChange={(event) =>
                  handleChange('stock', event.target.value)
                }
                placeholder="50"
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.stock)}
                className={`${fieldClass} ${
                  errors.stock
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10'
                    : ''
                }`}
              />

              {errors.stock && (
                <p className={errorClass}>
                  {errors.stock}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Images */}
      <section className="rounded-xl border border-neutral-200 bg-white shadow-sm">
        <div className="border-b border-neutral-200 px-5 py-5 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-400">
            Media
          </p>

          <h3 className="mt-1 text-lg font-bold text-neutral-950">
            Product Images
          </h3>

          <p className="mt-1.5 text-sm text-neutral-500">
            Add one image URL per line.
          </p>
        </div>

        <div className="p-5 sm:p-6">
          <textarea
            id="product-images"
            value={formData.images}
            onChange={(event) =>
              handleChange('images', event.target.value)
            }
            placeholder={
              'https://placehold.co/600x400?text=Product+Image\nhttps://placehold.co/600x400?text=Product+Back'
            }
            rows={5}
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.images)}
            className={`${fieldClass} resize-y font-mono text-xs ${
              errors.images
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10'
                : ''
            }`}
          />

          {errors.images ? (
            <p className={errorClass}>
              {errors.images}
            </p>
          ) : (
            <p className="mt-1.5 text-xs text-neutral-400">
              The first URL will be used as the primary product
              image.
            </p>
          )}
        </div>
      </section>

      {/* Specifications */}
      <section className="rounded-xl border border-neutral-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-neutral-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-400">
              Technical details
            </p>

            <h3 className="mt-1 text-lg font-bold text-neutral-950">
              Specifications
            </h3>

            <p className="mt-1.5 text-sm text-neutral-500">
              Add details such as display, storage, battery, or
              dimensions.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddSpecification}
            disabled={isSubmitting}
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-3.5 text-sm font-semibold text-neutral-700 transition hover:border-neutral-400 hover:bg-neutral-50 hover:text-neutral-950 focus:outline-none focus:ring-2 focus:ring-neutral-950/10 disabled:cursor-not-allowed disabled:opacity-50"
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

            Add Specification
          </button>
        </div>

        <div className="p-5 sm:p-6">
          {formData.specifications.length === 0 ? (
            <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50/50 px-6 py-10 text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100">
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 text-neutral-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M4 6h16M4 12h16M4 18h10" />
                </svg>
              </div>

              <p className="mt-3 text-sm font-semibold text-neutral-800">
                No specifications added
              </p>

              <p className="mt-1 text-xs text-neutral-500">
                Add technical details to help customers understand
                the product.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {formData.specifications.map(
                (specification, index) => (
                  <div
                    key={`${index}-${specification.key}`}
                    className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-4"
                  >
                    <div className="grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
                      <div>
                        <label
                          htmlFor={`spec-key-${index}`}
                          className="mb-2 block text-xs font-bold uppercase tracking-wider text-neutral-500"
                        >
                          Specification
                        </label>

                        <input
                          id={`spec-key-${index}`}
                          type="text"
                          value={specification.key}
                          onChange={(event) =>
                            handleSpecificationChange(
                              index,
                              'key',
                              event.target.value,
                            )
                          }
                          placeholder="e.g. RAM"
                          disabled={isSubmitting}
                          className={fieldClass}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor={`spec-value-${index}`}
                          className="mb-2 block text-xs font-bold uppercase tracking-wider text-neutral-500"
                        >
                          Value
                        </label>

                        <input
                          id={`spec-value-${index}`}
                          type="text"
                          value={specification.value}
                          onChange={(event) =>
                            handleSpecificationChange(
                              index,
                              'value',
                              event.target.value,
                            )
                          }
                          placeholder="e.g. 16 GB"
                          disabled={isSubmitting}
                          className={fieldClass}
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveSpecification(index)
                        }
                        disabled={isSubmitting}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-3.5 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                      >
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

                        Remove
                      </button>
                    </div>
                  </div>
                ),
              )}
            </div>
          )}

          {errors.specifications && (
            <p className={`${errorClass} mt-3`}>
              {errors.specifications}
            </p>
          )}
        </div>
      </section>

      {/* Publishing */}
      <section className="rounded-xl border border-neutral-200 bg-white shadow-sm">
        <div className="border-b border-neutral-200 px-5 py-5 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-400">
            Visibility
          </p>

          <h3 className="mt-1 text-lg font-bold text-neutral-950">
            Publishing
          </h3>

          <p className="mt-1.5 text-sm text-neutral-500">
            Control product visibility and featured placement.
          </p>
        </div>

        <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
          {/* Status */}
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
              onChange={(event) =>
                handleChange(
                  'status',
                  event.target.value as ProductStatus,
                )
              }
              disabled={isSubmitting}
              className={fieldClass}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <p className="mt-1.5 text-xs text-neutral-400">
              Inactive products will not be available to customers.
            </p>
          </div>

          {/* Featured */}
          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-neutral-200 bg-neutral-50/50 p-4 transition hover:border-neutral-300 hover:bg-neutral-50">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(event) =>
                handleChange(
                  'featured',
                  event.target.checked,
                )
              }
              disabled={isSubmitting}
              className="mt-0.5 h-4 w-4 rounded border-neutral-300"
            />

            <span>
              <span className="block text-sm font-semibold text-neutral-900">
                Featured Product
              </span>

              <span className="mt-1 block text-xs leading-5 text-neutral-500">
                Show this product in the featured section of the
                storefront.
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
          className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-5 text-sm font-semibold text-neutral-700 transition hover:border-neutral-400 hover:bg-neutral-50 hover:text-neutral-950 focus:outline-none focus:ring-2 focus:ring-neutral-950/10 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-neutral-950 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-950/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting && (
            <span
              aria-hidden="true"
              className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
            />
          )}

          {isSubmitting
            ? 'Saving...'
            : isEditMode
              ? 'Update Product'
              : 'Create Product'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;