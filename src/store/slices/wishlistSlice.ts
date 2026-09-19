import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { storageService, STORAGE_KEYS } from '@/services/storage';
import type { Product, WishlistItem } from '@/types';

interface WishlistState {
    items: WishlistItem[];
    userId: string | null;
}

const getWishlistStorageKey = (userId: string) => {
    return `${STORAGE_KEYS.WISHLIST}_${userId}`;
};

const getInitialWishlistState = (): WishlistState => {
    return {
        items: [],
        userId: null,
    };
};

const persistWishlist = (state: WishlistState) => {
    if (!state.userId) {
        return;
    }

    storageService.setItem(
        getWishlistStorageKey(state.userId),
        state.items,
    );
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: getInitialWishlistState(),

    reducers: {
        /**
         * Load wishlist for the currently authenticated user.
         */
        loadUserWishlist: (state, action: PayloadAction<string>) => {
            const userId = action.payload;

            const storedWishlist = storageService.getItem<WishlistItem[]>(
                getWishlistStorageKey(userId),
                [],
            );

            state.userId = userId;
            state.items = storedWishlist;
        },

        /**
         * Clear the Redux wishlist when the user logs out.
         */
        clearUserWishlist: (state) => {
            state.userId = null;
            state.items = [];
        },

        addToWishlist: (state, action: PayloadAction<Product>) => {
            if (!state.userId) {
                return;
            }

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

            persistWishlist(state);
        },

        removeFromWishlist: (state, action: PayloadAction<string>) => {
            if (!state.userId) {
                return;
            }

            state.items = state.items.filter(
                (item) => item.product.id !== action.payload,
            );

            persistWishlist(state);
        },

        clearWishlist: (state) => {
            if (!state.userId) {
                return;
            }

            state.items = [];

            persistWishlist(state);
        },

        setWishlistItems: (
            state,
            action: PayloadAction<WishlistItem[]>,
        ) => {
            if (!state.userId) {
                return;
            }

            state.items = action.payload;

            persistWishlist(state);
        },
    },
});

export const {
    loadUserWishlist,
    clearUserWishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    setWishlistItems,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;