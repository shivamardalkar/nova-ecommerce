import {
    createAsyncThunk,
    createSlice,
    type PayloadAction,
} from '@reduxjs/toolkit';

import { mockApi } from '@/services/api';

import type { Product } from '@/types';

interface ProductState {
    items: Product[];
    selectedProduct: Product | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    items: [],
    selectedProduct: null,
    isLoading: false,
    error: null,
};

export const fetchProducts = createAsyncThunk<
    Product[],
    void,
    { rejectValue: string }
>('products/fetchProducts', async (_, { rejectWithValue }) => {
    try {
        const response = await mockApi.getProducts();

        if (!response.success) {
            return rejectWithValue(
                response.message ?? 'Unable to load products.',
            );
        }

        return response.data;
    } catch {
        return rejectWithValue('Unable to load products.');
    }
});

export const fetchProductById = createAsyncThunk<
    Product,
    string,
    { rejectValue: string }
>('products/fetchProductById', async (productId, { rejectWithValue }) => {
    try {
        const response = await mockApi.getProductById(productId);

        if (!response.success || response.data === null) {
            return rejectWithValue('Product not found.');
        }

        return response.data;
    } catch {
        return rejectWithValue('Unable to load product.');
    }
});

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearSelectedProduct: (state) => {
            state.selectedProduct = null;
        },

        clearProductError: (state) => {
            state.error = null;
        },

        setSelectedProduct: (state, action: PayloadAction<Product>) => {
            state.selectedProduct = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? 'Unable to load products.';
            })

            .addCase(fetchProductById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.selectedProduct = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? 'Unable to load product.';
            });
    },
});

export const {
    clearSelectedProduct,
    clearProductError,
    setSelectedProduct,
} = productSlice.actions;

export default productSlice.reducer;