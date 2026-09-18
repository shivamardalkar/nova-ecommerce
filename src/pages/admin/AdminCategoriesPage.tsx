import { useState } from 'react';

import CategoryForm from '@/components/admin/CategoryForm';
import { mockApi } from '@/services/api';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectCategories,
  selectCategoriesError,
  selectCategoriesLoading,
} from '@/store/selectors/categorySelectors';
import { fetchCategories } from '@/store/slices/categorySlice';
import type { Category, CategoryStatus } from '@/types';

const AdminCategoriesPage = () => {
  const dispatch = useAppDispatch();

  const categories = useAppSelector(selectCategories);
  const isLoading = useAppSelector(selectCategoriesLoading);
  const error = useAppSelector(selectCategoriesError);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleCreateCategory = async (data: {
    name: string;
    description: string;
    status: CategoryStatus;
  }) => {
    setIsSubmitting(true);
    setFormError(null);
    setSuccessMessage(null);

    try {
      const normalizedName = data.name.trim().toLowerCase();

      const categoryAlreadyExists = categories.some(
        (category) => category.name.trim().toLowerCase() === normalizedName,
      );

      if (categoryAlreadyExists) {
        throw new Error('A category with this name already exists.');
      }

      const now = new Date().toISOString();

      const newCategory: Category = {
        id: `category-${Date.now()}`,
        name: data.name,
        description: data.description,
        image: `https://placehold.co/600x400?text=${encodeURIComponent(data.name)}`,
        status: data.status,
        createdAt: now,
        updatedAt: now,
      };

      const response = await mockApi.createCategory(newCategory);

      if (!response.success) {
        throw new Error(response.message ?? 'Unable to create category.');
      }

      await dispatch(fetchCategories()).unwrap();

      setIsFormOpen(false);
      setSuccessMessage(response.message ?? 'Category created successfully.');
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Unable to create category.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateCategory = async (data: {
    name: string;
    description: string;
    status: CategoryStatus;
  }) => {
    if (!editingCategory) {
      return;
    }

    setIsSubmitting(true);
    setFormError(null);
    setSuccessMessage(null);

    try {
      const normalizedName = data.name.trim().toLowerCase();

      const categoryAlreadyExists = categories.some(
        (category) =>
          category.id !== editingCategory.id &&
          category.name.trim().toLowerCase() === normalizedName,
      );

      if (categoryAlreadyExists) {
        throw new Error('A category with this name already exists.');
      }

      const updatedCategory: Category = {
        ...editingCategory,
        name: data.name,
        description: data.description,
        status: data.status,
        updatedAt: new Date().toISOString(),
      };

      const response = await mockApi.updateCategory(updatedCategory);

      if (!response.success) {
        throw new Error(response.message ?? 'Unable to update category.');
      }

      await dispatch(fetchCategories()).unwrap();

      setIsFormOpen(false);
      setEditingCategory(null);

      setSuccessMessage(response.message ?? 'Category updated successfully.');
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Unable to update category.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = async (category: Category) => {
    const confirmed = window.confirm(`Are you sure you want to delete "${category.name}"?`);

    if (!confirmed) {
      return;
    }

    setFormError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      const response = await mockApi.deleteCategory(category.id);

      if (!response.success) {
        throw new Error(response.message ?? 'Unable to delete category.');
      }

      await dispatch(fetchCategories()).unwrap();

      setSuccessMessage(response.message ?? 'Category deleted successfully.');
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Unable to delete category.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (isSubmitting) {
      return;
    }

    setIsFormOpen(false);
    setEditingCategory(null);
    setFormError(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-neutral-500">Catalog</p>

          <h1 className="mt-1 text-3xl font-bold text-neutral-900">Categories</h1>

          <p className="mt-2 text-neutral-600">
            Create and manage product categories for your store.
          </p>
        </div>

        {!isFormOpen && (
          <button
            type="button"
            onClick={() => {
              setSuccessMessage(null);
              setFormError(null);
              setEditingCategory(null);
              setIsFormOpen(true);
            }}
            className="rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-700"
          >
            Add Category
          </button>
        )}
      </div>

      {successMessage && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          {successMessage}
        </div>
      )}

      {formError && !isFormOpen && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {formError}
        </div>
      )}

      {isFormOpen && (
        <div>
          {formError && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {formError}
            </div>
          )}

          <CategoryForm
            initialCategory={editingCategory}
            isSubmitting={isSubmitting}
            onSubmit={editingCategory ? handleUpdateCategory : handleCreateCategory}
            onCancel={handleCancel}
          />
        </div>
      )}

      <section className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
        {isLoading ? (
          <div className="p-10 text-center">
            <p className="text-sm text-neutral-500">Loading categories...</p>
          </div>
        ) : error ? (
          <div className="p-10 text-center">
            <p className="text-sm font-medium text-red-600">{error}</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-sm text-neutral-500">No categories found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="border-b border-neutral-200 bg-neutral-50">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    Category
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    Description
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
                {categories.map((category) => (
                  <tr key={category.id} className="transition hover:bg-neutral-50">
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-semibold text-neutral-900">{category.name}</p>

                        <p className="mt-1 text-xs text-neutral-500">{category.id}</p>
                      </div>
                    </td>

                    <td className="max-w-md px-5 py-4 text-sm text-neutral-600">
                      {category.description}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                          category.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-neutral-100 text-neutral-600'
                        }`}
                      >
                        {category.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setSuccessMessage(null);
                            setFormError(null);
                            setEditingCategory(category);
                            setIsFormOpen(true);
                          }}
                          className="rounded-lg border border-neutral-300 px-3 py-2 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-100"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteCategory(category)}
                          disabled={isSubmitting}
                          className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Delete
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

export default AdminCategoriesPage;
