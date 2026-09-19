import type { RootState } from '@/store';

export const selectProducts = (state: RootState) =>
    state.products.items;

export const selectSelectedProduct = (state: RootState) =>
    state.products.selectedProduct;

export const selectProductsLoading = (state: RootState) =>
    state.products.isLoading;

export const selectProductsError = (state: RootState) =>
    state.products.error;

export const selectActiveProducts = (state: RootState) =>
    state.products.items.filter(
        (product) => product.status === 'active',
    );