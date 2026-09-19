import { useState } from 'react';

import type { Category, CategoryStatus } from '@/types';

interface CategoryFormProps {
  initialCategory?: Category | null;
  isSubmitting?: boolean;
  onSubmit: (data: {
    name: string;
    description: string;
    status: CategoryStatus;
  }) => void;
  onCancel: () => void;
}

interface CategoryFormState {
  name: string;
  description: string;
  status: CategoryStatus;
}

const getInitialFormState = (
  category?: Category | null,
): CategoryFormState => ({
  name: category?.name ?? '',
  description: category?.description ?? '',
  status: category?.status ?? 'active',
});

const CategoryForm = ({
  initialCategory,
  isSubmitting = false,
  onSubmit,
  onCancel,
}: CategoryFormProps) => {
  const [formData, setFormData] = useState<CategoryFormState>(() =>
    getInitialFormState(initialCategory),
  );

  const [errors, setErrors] = useState<
    Partial<Record<keyof CategoryFormState, string>>
  >({});

  const handleChange = (
    field: keyof CategoryFormState,
    value: string,
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

  const validate = (): boolean => {
    const nextErrors: typeof errors = {};

    const trimmedName = formData.name.trim();
    const trimmedDescription = formData.description.trim();

    if (!trimmedName) {
      nextErrors.name = 'Category name is required.';
    } else if (trimmedName.length < 2) {
      nextErrors.name =
        'Category name must be at least 2 characters.';
    } else if (trimmedName.length > 50) {
      nextErrors.name =
        'Category name cannot exceed 50 characters.';
    }

    if (!trimmedDescription) {
      nextErrors.description =
        'Description is required.';
    } else if (trimmedDescription.length > 200) {
      nextErrors.description =
        'Description cannot exceed 200 characters.';
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    onSubmit({
      name: formData.name.trim(),
      description: formData.description.trim(),
      status: formData.status,
    });
  };

  const isEditMode = Boolean(initialCategory);

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-7"
    >
      {/* Form introduction */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-400">
            {isEditMode ? 'Edit category' : 'New category'}
          </p>

          <h2 className="mt-1 text-xl font-bold tracking-tight text-neutral-950">
            {isEditMode
              ? 'Update category details'
              : 'Create a new category'}
          </h2>

          <p className="mt-1.5 text-sm leading-6 text-neutral-500">
            {isEditMode
              ? 'Update the information used to organize products in your catalog.'
              : 'Add a category to help customers discover products more easily.'}
          </p>
        </div>

        <span className="w-fit rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-600">
          {isEditMode ? 'Editing' : 'New'}
        </span>
      </div>

      {/* Fields */}
      <div className="grid gap-6">
        {/* Name */}
        <div>
          <label
            htmlFor="category-name"
            className="mb-2 block text-sm font-semibold text-neutral-800"
          >
            Category Name
            <span className="ml-1 text-red-500">*</span>
          </label>

          <input
            id="category-name"
            type="text"
            value={formData.name}
            onChange={(event) =>
              handleChange('name', event.target.value)
            }
            placeholder="e.g. Smartphones"
            autoComplete="off"
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={
              errors.name
                ? 'category-name-error'
                : 'category-name-help'
            }
            className={`w-full rounded-lg border bg-white px-4 py-3 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:ring-4 disabled:cursor-not-allowed disabled:bg-neutral-100 ${
              errors.name
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10'
                : 'border-neutral-300 focus:border-neutral-950 focus:ring-neutral-950/5'
            }`}
          />

          {errors.name ? (
            <p
              id="category-name-error"
              role="alert"
              className="mt-2 flex items-center gap-1.5 text-sm text-red-600"
            >
              <svg
                aria-hidden="true"
                className="h-4 w-4 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v5M12 16h.01" />
              </svg>

              {errors.name}
            </p>
          ) : (
            <p
              id="category-name-help"
              className="mt-2 text-xs text-neutral-400"
            >
              Use a clear and recognizable category name.
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <div className="mb-2 flex items-center justify-between gap-4">
            <label
              htmlFor="category-description"
              className="text-sm font-semibold text-neutral-800"
            >
              Description
              <span className="ml-1 text-red-500">*</span>
            </label>

            <span
              className={`text-xs ${
                formData.description.length > 180
                  ? 'font-semibold text-amber-600'
                  : 'text-neutral-400'
              }`}
            >
              {formData.description.length}/200
            </span>
          </div>

          <textarea
            id="category-description"
            value={formData.description}
            onChange={(event) =>
              handleChange(
                'description',
                event.target.value,
              )
            }
            placeholder="Describe this product category..."
            rows={5}
            maxLength={200}
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.description)}
            aria-describedby={
              errors.description
                ? 'category-description-error'
                : 'category-description-help'
            }
            className={`w-full resize-y rounded-lg border bg-white px-4 py-3 text-sm leading-6 text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:ring-4 disabled:cursor-not-allowed disabled:bg-neutral-100 ${
              errors.description
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10'
                : 'border-neutral-300 focus:border-neutral-950 focus:ring-neutral-950/5'
            }`}
          />

          {errors.description ? (
            <p
              id="category-description-error"
              role="alert"
              className="mt-2 flex items-center gap-1.5 text-sm text-red-600"
            >
              <svg
                aria-hidden="true"
                className="h-4 w-4 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v5M12 16h.01" />
              </svg>

              {errors.description}
            </p>
          ) : (
            <p
              id="category-description-help"
              className="mt-2 text-xs text-neutral-400"
            >
              Keep the description short and useful for catalog
              management.
            </p>
          )}
        </div>

        {/* Status */}
        <div>
          <label
            htmlFor="category-status"
            className="mb-2 block text-sm font-semibold text-neutral-800"
          >
            Status
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <label
              className={`relative flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition ${
                formData.status === 'active'
                  ? 'border-neutral-950 bg-neutral-50'
                  : 'border-neutral-200 bg-white hover:border-neutral-300'
              }`}
            >
              <input
                type="radio"
                name="category-status"
                value="active"
                checked={formData.status === 'active'}
                onChange={(event) =>
                  handleChange(
                    'status',
                    event.target.value,
                  )
                }
                disabled={isSubmitting}
                className="sr-only"
              />

              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full ${
                  formData.status === 'active'
                    ? 'bg-emerald-100 text-emerald-600'
                    : 'bg-neutral-100 text-neutral-400'
                }`}
              >
                <span className="h-2.5 w-2.5 rounded-full bg-current" />
              </span>

              <span>
                <span className="block text-sm font-semibold text-neutral-900">
                  Active
                </span>

                <span className="mt-0.5 block text-xs text-neutral-500">
                  Available in the catalog
                </span>
              </span>
            </label>

            <label
              className={`relative flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition ${
                formData.status === 'inactive'
                  ? 'border-neutral-950 bg-neutral-50'
                  : 'border-neutral-200 bg-white hover:border-neutral-300'
              }`}
            >
              <input
                type="radio"
                name="category-status"
                value="inactive"
                checked={formData.status === 'inactive'}
                onChange={(event) =>
                  handleChange(
                    'status',
                    event.target.value,
                  )
                }
                disabled={isSubmitting}
                className="sr-only"
              />

              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full ${
                  formData.status === 'inactive'
                    ? 'bg-neutral-200 text-neutral-600'
                    : 'bg-neutral-100 text-neutral-400'
                }`}
              >
                <span className="h-2.5 w-2.5 rounded-full bg-current" />
              </span>

              <span>
                <span className="block text-sm font-semibold text-neutral-900">
                  Inactive
                </span>

                <span className="mt-0.5 block text-xs text-neutral-500">
                  Hidden from active catalog
                </span>
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 border-t border-neutral-200 pt-6 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="rounded-lg border border-neutral-300 px-5 py-2.5 text-sm font-semibold text-neutral-700 transition hover:border-neutral-400 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-950/10 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-950/20 disabled:cursor-not-allowed disabled:opacity-50"
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
              ? 'Update Category'
              : 'Create Category'}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;