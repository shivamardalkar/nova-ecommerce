import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { STORAGE_KEYS, storageService } from '@/services/storage';
import type { CartItem, Product } from '@/types';

interface CartState {
    items: CartItem[];
    appliedCouponCode: string | null;
    userId: string | null;
}

interface StoredCart {
    items: CartItem[];
    appliedCouponCode: string | null;
}

const getCartStorageKey = (userId: string) => {
    return `${STORAGE_KEYS.CART}_${userId}`;
};

const getInitialCartState = (): CartState => {
    return {
        items: [],
        appliedCouponCode: null,
        userId: null,
    };
};

const persistCart = (state: CartState) => {
    if (!state.userId) {
        return;
    }

    const storedCart: StoredCart = {
        items: state.items,
        appliedCouponCode: state.appliedCouponCode,
    };

    storageService.setItem(getCartStorageKey(state.userId), storedCart);
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: getInitialCartState(),

    reducers: {
        /**
         * Load cart for the currently authenticated user.
         */
        loadUserCart: (state, action: PayloadAction<string>) => {
            const userId = action.payload;

            const storedCart = storageService.getItem<StoredCart | null>(
                getCartStorageKey(userId),
                null,
            );

            state.userId = userId;
            state.items = storedCart?.items ?? [];
            state.appliedCouponCode = storedCart?.appliedCouponCode ?? null;
        },

        /**
         * Clear the Redux cart when the user logs out.
         */
        clearUserCart: (state) => {
            state.userId = null;
            state.items = [];
            state.appliedCouponCode = null;
        },

        addToCart: (
            state,
            action: PayloadAction<{
                product: Product;
                quantity?: number;
            }>,
        ) => {
            const { product, quantity = 1 } = action.payload;

            if (!state.userId) {
                return;
            }

            const existingItem = state.items.find(
                (item) => item.product.id === product.id,
            );

            if (existingItem) {
                existingItem.quantity = Math.min(
                    existingItem.quantity + quantity,
                    product.stock,
                );
            } else if (product.stock > 0) {
                state.items.push({
                    product,
                    quantity: Math.min(quantity, product.stock),
                });
            }

            persistCart(state);
        },

        removeFromCart: (state, action: PayloadAction<string>) => {
            if (!state.userId) {
                return;
            }

            state.items = state.items.filter(
                (item) => item.product.id !== action.payload,
            );

            persistCart(state);
        },

        increaseQuantity: (state, action: PayloadAction<string>) => {
            if (!state.userId) {
                return;
            }

            const item = state.items.find(
                (cartItem) => cartItem.product.id === action.payload,
            );

            if (item && item.quantity < item.product.stock) {
                item.quantity += 1;
            }

            persistCart(state);
        },

        decreaseQuantity: (state, action: PayloadAction<string>) => {
            if (!state.userId) {
                return;
            }

            const item = state.items.find(
                (cartItem) => cartItem.product.id === action.payload,
            );

            if (!item) {
                return;
            }

            if (item.quantity > 1) {
                item.quantity -= 1;
            }

            persistCart(state);
        },

        clearCart: (state) => {
            if (!state.userId) {
                return;
            }

            state.items = [];
            state.appliedCouponCode = null;

            persistCart(state);
        },

        applyCoupon: (state, action: PayloadAction<string>) => {
            if (!state.userId) {
                return;
            }

            state.appliedCouponCode = action.payload.trim().toUpperCase();

            persistCart(state);
        },

        removeCoupon: (state) => {
            if (!state.userId) {
                return;
            }

            state.appliedCouponCode = null;

            persistCart(state);
        },

        setCartItems: (state, action: PayloadAction<CartItem[]>) => {
            if (!state.userId) {
                return;
            }

            state.items = action.payload;

            persistCart(state);
        },
    },
});

export const {
    loadUserCart,
    clearUserCart,
    addToCart,
    removeFromCart,
    increaseQuantity,   
    decreaseQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
    setCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;