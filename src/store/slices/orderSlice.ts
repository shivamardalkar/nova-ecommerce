import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Order } from '@/types';
import { mockOrders } from '@/data';
import { storageService, STORAGE_KEYS } from '@/services/storage';

interface OrderState {
    items: Order[];
    selectedOrder: Order | null;
}

const getInitialOrders = (): Order[] => {
    const storedOrders = storageService.getItem<Order[] | null>(
        STORAGE_KEYS.ORDERS,
        null,
    );

    if (storedOrders !== null) {
        return storedOrders;
    }

    storageService.setItem(STORAGE_KEYS.ORDERS, mockOrders);

    return mockOrders;
};

const initialState: OrderState = {
    items: getInitialOrders(),
    selectedOrder: null,
};

const orderSlice = createSlice({
    name: 'orders',
    initialState,

    reducers: {
        addOrder: (state, action: PayloadAction<Order>) => {
            state.items.unshift(action.payload);

            storageService.setItem(
                STORAGE_KEYS.ORDERS,
                state.items,
            );
        },

        setOrders: (state, action: PayloadAction<Order[]>) => {
            state.items = action.payload;

            storageService.setItem(
                STORAGE_KEYS.ORDERS,
                state.items,
            );
        },

        setSelectedOrder: (
            state,
            action: PayloadAction<Order | null>,
        ) => {
            state.selectedOrder = action.payload;
        },

        clearSelectedOrder: (state) => {
            state.selectedOrder = null;
        },

        clearOrders: (state) => {
            state.items = [];
            state.selectedOrder = null;

            storageService.setItem(
                STORAGE_KEYS.ORDERS,
                state.items,
            );
        },
    },
});

export const {
    addOrder,
    setOrders,
    setSelectedOrder,
    clearSelectedOrder,
    clearOrders,
} = orderSlice.actions;

export default orderSlice.reducer;