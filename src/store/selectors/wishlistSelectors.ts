import type { RootState } from '@/store';

export const selectWishlistItems = (state: RootState) =>
    state.wishlist.items;

export const selectWishlistCount = (state: RootState) =>
    state.wishlist.items.length;

export const selectIsProductInWishlist = (
    state: RootState,
    productId: string,
) =>
    state.wishlist.items.some(
        (item) => item.product.id === productId,
    );