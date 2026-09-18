import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { STORAGE_KEYS, storageService } from '@/services/storage';
import type { CartItem, Product } from '@/types';

interface CartState {
    items: CartItem[];
    appliedCouponCode: string | null;
}

const getInitialCartState = (): CartState => {
    const storedCart = storageService.getItem<CartState | null>(
        STORAGE_KEYS.CART,
        null,
    );

    return {
        items: storedCart?.items ?? [],
        appliedCouponCode: storedCart?.appliedCouponCode ?? null,
    };
};

const persistCart = (state: CartState) => {
    storageService.setItem(STORAGE_KEYS.CART, {
        items: state.items,
        appliedCouponCode: state.appliedCouponCode,
    });
};

const initialState: CartState = getInitialCartState();

const cartSlice = createSlice({
    name: 'cart',
    initialState,

    reducers: {
        addToCart: (
            state,
            action: PayloadAction<{
                product: Product;
                quantity?: number;
            }>,
        ) => {
            const { product, quantity = 1 } = action.payload;

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
            state.items = state.items.filter(
                (item) => item.product.id !== action.payload,
            );

            persistCart(state);
        },

        increaseQuantity: (state, action: PayloadAction<string>) => {
            const item = state.items.find(
                (cartItem) => cartItem.product.id === action.payload,
            );

            if (item && item.quantity < item.product.stock) {
                item.quantity += 1;
            }

            persistCart(state);
        },

        decreaseQuantity: (state, action: PayloadAction<string>) => {
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
            state.items = [];
            state.appliedCouponCode = null;

            persistCart(state);
        },

        applyCoupon: (state, action: PayloadAction<string>) => {
            state.appliedCouponCode = action.payload.trim().toUpperCase();

            persistCart(state);
        },

        removeCoupon: (state) => {
            state.appliedCouponCode = null;

            persistCart(state);
        },

        setCartItems: (state, action: PayloadAction<CartItem[]>) => {
            state.items = action.payload;

            persistCart(state);
        },
    },
});

export const {
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