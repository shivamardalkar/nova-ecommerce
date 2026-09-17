import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UiState {
    isLoading: boolean;
    error: string | null;
    isMobileMenuOpen: boolean;
}

const initialState: UiState = {
    isLoading: false,
    error: null,
    isMobileMenuOpen: false,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },

        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },

        clearError: (state) => {
            state.error = null;
        },

        toggleMobileMenu: (state) => {
            state.isMobileMenuOpen = !state.isMobileMenuOpen;
        },

        closeMobileMenu: (state) => {
            state.isMobileMenuOpen = false;
        },
    },
});

export const {
    setLoading,
    setError,
    clearError,
    toggleMobileMenu,
    closeMobileMenu,
} = uiSlice.actions;

export default uiSlice.reducer;