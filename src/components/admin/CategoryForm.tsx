import { useEffect, useState } from 'react';

import type { Category, CategoryStatus } from '@/types';

interface CategoryFormProps {
  initialCategory?: Category | null;
  isSubmitting?: boolean;
  onSubmit: (data: { name: string; description: string; status: CategoryStatus }) => void;
  onCancel: () => void;
}

interface CategoryFormState {
  name: string;
  description: string;
  status: CategoryStatus;
}

const getInitialFormState = (category?: Category | null): CategoryFormState => ({
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
  const [formData, setFormData] = useState<CategoryFormState>(getInitialFormState(initialCategory));

  const [errors, setErrors] = useState<Partial<Record<keyof CategoryFormState, string>>>({});

  useEffect(() => {
    setFormData(getInitialFormState(initialCategory));
    setErrors({});
  }, [initialCategory]);

  const handleChange = (field: keyof CategoryFormState, value: string) => {
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
      nextErrors.name = 'Category name must be at least 2 characters.';
    } else if (trimmedName.length > 50) {
      nextErrors.name = 'Category name cannot exceed 50 characters.';
    }

    if (!trimmedDescription) {
      nextErrors.description = 'Description is required.';
    } else if (trimmedDescription.length > 200) {
      nextErrors.description = 'Description cannot exceed 200 characters.';
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
      className="space-y-6 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm"
    >
      <div>
        <h2 className="text-xl font-bold text-neutral-900">
          {isEditMode ? 'Edit Category' : 'Add Category'}
        </h2>

        <p className="mt-1 text-sm text-neutral-500">
          {isEditMode
            ? 'Update the category information below.'
            : 'Create a new category for your product catalog.'}
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label
            htmlFor="category-name"
            className="mb-2 block text-sm font-semibold text-neutral-700"
          >
            Category Name
          </label>

          <input
            id="category-name"
            type="text"
            value={formData.name}
            onChange={(event) => handleChange('name', event.target.value)}
            placeholder="e.g. Smartphones"
            disabled={isSubmitting}
            className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 disabled:bg-neutral-100"
          />

          {errors.name && <p className="mt-1.5 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label
            htmlFor="category-description"
            className="mb-2 block text-sm font-semibold text-neutral-700"
          >
            Description
          </label>

          <textarea
            id="category-description"
            value={formData.description}
            onChange={(event) => handleChange('description', event.target.value)}
            placeholder="Describe this product category..."
            rows={4}
            disabled={isSubmitting}
            className="w-full resize-y rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 disabled:bg-neutral-100"
          />

          <div className="mt-1.5 flex justify-between gap-4">
            {errors.description ? (
              <p className="text-sm text-red-600">{errors.description}</p>
            ) : (
              <span />
            )}

            <span className="text-xs text-neutral-400">{formData.description.length}/200</span>
          </div>
        </div>

        <div>
          <label
            htmlFor="category-status"
            className="mb-2 block text-sm font-semibold text-neutral-700"
          >
            Status
          </label>

          <select
            id="category-status"
            value={formData.status}
            onChange={(event) => handleChange('status', event.target.value as CategoryStatus)}
            disabled={isSubmitting}
            className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 disabled:bg-neutral-100"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-neutral-200 pt-5 sm:flex-row sm:justify-end">
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
          {isSubmitting ? 'Saving...' : isEditMode ? 'Update Category' : 'Create Category'}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
