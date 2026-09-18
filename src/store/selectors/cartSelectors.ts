import { mockCoupons } from '@/data';

import type { RootState } from '@/store';

export const selectCartItems = (state: RootState) =>
    state.cart.items;

export const selectCartItemCount = (state: RootState) =>
    state.cart.items.reduce(
        (total, item) => total + item.quantity,
        0,
    );

export const selectCartSubtotal = (state: RootState) =>
    state.cart.items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0,
    );

export const selectAppliedCouponCode = (state: RootState) =>
    state.cart.appliedCouponCode;

export const selectAppliedCoupon = (state: RootState) => {
    const couponCode = state.cart.appliedCouponCode;

    if (!couponCode) {
        return null;
    }

    return (
        mockCoupons.find(
            (coupon) =>
                coupon.code.toLowerCase() === couponCode.toLowerCase(),
        ) ?? null
    );
};

export const selectCartDiscount = (state: RootState) => {
    const subtotal = selectCartSubtotal(state);
    const coupon = selectAppliedCoupon(state);

    if (!coupon || !coupon.active) {
        return 0;
    }

    const isExpired =
        new Date(coupon.expiresAt).getTime() < Date.now();

    if (isExpired) {
        return 0;
    }

    if (subtotal < coupon.minimumOrderValue) {
        return 0;
    }

    if (coupon.type === 'percentage') {
        return Math.min(
            subtotal * (coupon.value / 100),
            subtotal,
        );
    }

    return Math.min(coupon.value, subtotal);
};

export const selectCartTotal = (state: RootState) => {
    const subtotal = selectCartSubtotal(state);
    const discount = selectCartDiscount(state);

    return Math.max(subtotal - discount, 0);
};