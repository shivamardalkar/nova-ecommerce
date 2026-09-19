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
      setFormError(
        error instanceof Error ? error.message : 'Unable to create category.',
      );
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
      setFormError(
        error instanceof Error ? error.message : 'Unable to update category.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = async (category: Category) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${category.name}"?`,
    );

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
      setFormError(
        error instanceof Error ? error.message : 'Unable to delete category.',
      );
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

  const openCreateForm = () => {
    setSuccessMessage(null);
    setFormError(null);
    setEditingCategory(null);
    setIsFormOpen(true);
  };

  const openEditForm = (category: Category) => {
    setSuccessMessage(null);
    setFormError(null);
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Page heading */}
      <section>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-400">
              Catalog
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
              Categories
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600 sm:text-base">
              Create and manage product categories for your store.
            </p>
          </div>

          {!isFormOpen && (
            <button
              type="button"
              onClick={openCreateForm}
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-neutral-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-950/20"
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
              Add Category
            </button>
          )}
        </div>
      </section>

      {/* Feedback */}
      {successMessage && (
        <div
          role="status"
          className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
        >
          <svg
            aria-hidden="true"
            className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="m5 12 4 4L19 6" />
          </svg>

          <span className="font-medium">{successMessage}</span>
        </div>
      )}

      {formError && !isFormOpen && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <svg
            aria-hidden="true"
            className="mt-0.5 h-5 w-5 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v5M12 16h.01" />
          </svg>

          <span className="font-medium">{formError}</span>
        </div>
      )}

      {/* Category form */}
      {isFormOpen && (
        <section className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4 sm:px-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-400">
                {editingCategory ? 'Edit category' : 'New category'}
              </p>

              <h2 className="mt-1 text-lg font-bold text-neutral-950">
                {editingCategory
                  ? 'Update category'
                  : 'Create a category'}
              </h2>
            </div>

            <button
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting}
              aria-label="Close category form"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-950 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          {formError && (
            <div
              role="alert"
              className="mx-5 mt-5 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 sm:mx-6"
            >
              <svg
                aria-hidden="true"
                className="mt-0.5 h-5 w-5 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v5M12 16h.01" />
              </svg>

              <span className="font-medium">{formError}</span>
            </div>
          )}

          <div className="p-5 sm:p-6">
            <CategoryForm
              key={editingCategory?.id ?? 'new'}
              initialCategory={editingCategory}
              isSubmitting={isSubmitting}
              onSubmit={
                editingCategory
                  ? handleUpdateCategory
                  : handleCreateCategory
              }
              onCancel={handleCancel}
            />
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-neutral-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-400">
              Catalog structure
            </p>

            <h2 className="mt-1 text-lg font-bold text-neutral-950">
              All Categories
            </h2>
          </div>

          {!isLoading && !error && (
            <span className="w-fit rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-600">
              {categories.length}{' '}
              {categories.length === 1 ? 'category' : 'categories'}
            </span>
          )}
        </div>

        {isLoading ? (
          <div className="p-12 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-900" />
            <p className="mt-4 text-sm text-neutral-500">
              Loading categories...
            </p>
          </div>
        ) : error ? (
          <div className="px-6 py-14 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v5M12 16h.01" />
              </svg>
            </div>

            <p className="mt-4 text-sm font-semibold text-neutral-900">
              Unable to load categories
            </p>

            <p className="mt-1 text-sm text-red-600">{error}</p>

            <button
              type="button"
              onClick={() => dispatch(fetchCategories())}
              className="mt-5 rounded-lg border border-neutral-300 px-4 py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
            >
              Try again
            </button>
          </div>
        ) : categories.length === 0 ? (
          <div className="px-6 py-14 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
              <svg
                aria-hidden="true"
                className="h-5 w-5 text-neutral-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect x="4" y="4" width="6" height="6" rx="1" />
                <rect x="14" y="4" width="6" height="6" rx="1" />
                <rect x="4" y="14" width="6" height="6" rx="1" />
                <rect x="14" y="14" width="6" height="6" rx="1" />
              </svg>
            </div>

            <p className="mt-4 text-sm font-semibold text-neutral-900">
              No categories found
            </p>

            <p className="mt-1 text-sm text-neutral-500">
              Create your first category to organize your products.
            </p>

            {!isFormOpen && (
              <button
                type="button"
                onClick={openCreateForm}
                className="mt-5 rounded-lg bg-neutral-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                Add Category
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px]">
              <thead className="border-b border-neutral-200 bg-neutral-50">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-neutral-500">
                    Category
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-neutral-500">
                    Description
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-neutral-500">
                    Status
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-neutral-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-neutral-100">
                {categories.map((category) => (
                  <tr
                    key={category.id}
                    className="group transition hover:bg-neutral-50/80"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-sm font-bold text-neutral-600">
                          {category.name.charAt(0).toUpperCase()}
                        </div>

                        <div className="min-w-0">
                          <p className="font-semibold text-neutral-950">
                            {category.name}
                          </p>

                          <p className="mt-0.5 text-xs text-neutral-400">
                            {category.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="max-w-md px-5 py-4">
                      <p className="line-clamp-2 text-sm leading-6 text-neutral-600">
                        {category.description}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                          category.status === 'active'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-neutral-100 text-neutral-600'
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            category.status === 'active'
                              ? 'bg-emerald-500'
                              : 'bg-neutral-400'
                          }`}
                        />
                        {category.status}
                      </span>
                    </td>

<td className="px-5 py-4">
  <div className="flex justify-end gap-2">
    <button
      type="button"
      onClick={() => openEditForm(category)}
      disabled={isSubmitting}
      className="inline-flex h-9 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-3.5 text-sm font-semibold text-neutral-700 transition hover:border-neutral-400 hover:bg-neutral-50 hover:text-neutral-950 focus:outline-none focus:ring-2 focus:ring-neutral-950/10 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <svg
        aria-hidden="true"
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="m4 16-.7 4.7L8 20l11-11a2.8 2.8 0 0 0-4-4L4 16Z" />
        <path d="m13.5 6.5 4 4" />
      </svg>

      Edit
    </button>

    <button
      type="button"
      onClick={() => handleDeleteCategory(category)}
      disabled={isSubmitting}
      className="inline-flex h-9 items-center gap-2 rounded-lg border border-red-200 bg-white px-3.5 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
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