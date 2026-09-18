import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Product, WishlistItem } from '@/types';
import { storageService, STORAGE_KEYS } from '@/services/storage';

interface WishlistState {
    items: WishlistItem[];
}

const getInitialWishlist = (): WishlistItem[] => {
    return storageService.getItem<WishlistItem[]>(
        STORAGE_KEYS.WISHLIST,
        [],
    );
};

const initialState: WishlistState = {
    items: getInitialWishlist(),
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,

    reducers: {
        addToWishlist: (state, action: PayloadAction<Product>) => {
            const product = action.payload;

            const alreadyExists = state.items.some(
                (item) => item.product.id === product.id,
            );

            if (alreadyExists) {
                return;
            }

            state.items.push({
                product,
                addedAt: new Date().toISOString(),
            });

            storageService.setItem(
                STORAGE_KEYS.WISHLIST,
                state.items,
            );
        },

        removeFromWishlist: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(
                (item) => item.product.id !== action.payload,
            );

            storageService.setItem(
                STORAGE_KEYS.WISHLIST,
                state.items,
            );
        },

        clearWishlist: (state) => {
            state.items = [];

            storageService.setItem(
                STORAGE_KEYS.WISHLIST,
                state.items,
            );
        },

        setWishlistItems: (
            state,
            action: PayloadAction<WishlistItem[]>,
        ) => {
            state.items = action.payload;

            storageService.setItem(
                STORAGE_KEYS.WISHLIST,
                state.items,
            );
        },
    },
});

export const {
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    setWishlistItems,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;