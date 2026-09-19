import {
    createAsyncThunk,
    createSlice,
    type PayloadAction,
} from '@reduxjs/toolkit';

import { mockApi } from '@/services/api';

import type { Category } from '@/types';

interface CategoryState {
    items: Category[];
    selectedCategory: Category | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: CategoryState = {
    items: [],
    selectedCategory: null,
    isLoading: false,
    error: null,
};

export const fetchCategories = createAsyncThunk<
    Category[],
    void,
    { rejectValue: string }
>('categories/fetchCategories', async (_, { rejectWithValue }) => {
    try {
        const response = await mockApi.getCategories();

        if (!response.success) {
            return rejectWithValue(
                response.message ?? 'Unable to load categories.',
            );
        }

        return response.data;
    } catch {
        return rejectWithValue('Unable to load categories.');
    }
});

const categorySlice = createSlice({
    name: 'categories',
    initialState,

    reducers: {
        setSelectedCategory: (
            state,
            action: PayloadAction<Category>,
        ) => {
            state.selectedCategory = action.payload;
        },

        clearSelectedCategory: (state) => {
            state.selectedCategory = null;
        },

        clearCategoryError: (state) => {
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })

            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })

            .addCase(fetchCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.error =
                    action.payload ?? 'Unable to load categories.';
            });
    },
});

export const {
    setSelectedCategory,
    clearSelectedCategory,
    clearCategoryError,
} = categorySlice.actions;

export default categorySlice.reducer;