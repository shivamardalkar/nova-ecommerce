import type { RootState } from '@/store';

export const selectCategories = (state: RootState) =>
    state.categories.items;

export const selectSelectedCategory = (state: RootState) =>
    state.categories.selectedCategory;

export const selectCategoriesLoading = (state: RootState) =>
    state.categories.isLoading;

export const selectCategoriesError = (state: RootState) =>
    state.categories.error;

export const selectActiveCategories = (state: RootState) =>
    state.categories.items.filter(
        (category) => category.status === 'active',
    );