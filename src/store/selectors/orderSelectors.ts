import type { RootState } from '@/store';

export const selectOrders = (state: RootState) =>
    state.orders.items;

export const selectSelectedOrder = (state: RootState) =>
    state.orders.selectedOrder;

export const selectOrderCount = (state: RootState) =>
    state.orders.items.length;

export const selectOrderById = (
    state: RootState,
    orderId: string,
) =>
    state.orders.items.find(
        (order) => order.id === orderId,
    ) ?? null;