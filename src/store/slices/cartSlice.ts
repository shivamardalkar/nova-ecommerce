import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { CartItem, Product } from '@/types';

interface CartState {
    items: CartItem[];
    appliedCouponCode: string | null;
}

const initialState: CartState = {
    items: [],
    appliedCouponCode: null,
};

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
                existingItem.quantity += quantity;
            } else {
                state.items.push({
                    product,
                    quantity,
                });
            }
        },

        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(
                (item) => item.product.id !== action.payload,
            );
        },

        increaseQuantity: (state, action: PayloadAction<string>) => {
            const item = state.items.find(
                (cartItem) => cartItem.product.id === action.payload,
            );

            if (item) {
                item.quantity += 1;
            }
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
        },

        clearCart: (state) => {
            state.items = [];
            state.appliedCouponCode = null;
        },

        applyCoupon: (state, action: PayloadAction<string>) => {
            state.appliedCouponCode = action.payload;
        },

        removeCoupon: (state) => {
            state.appliedCouponCode = null;
        },

        setCartItems: (state, action: PayloadAction<CartItem[]>) => {
            state.items = action.payload;
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