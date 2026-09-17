import type { Product } from './product.types';

export interface WishlistItem {
    product: Product;
    addedAt: string;
}

export interface WishlistState {
    items: WishlistItem[];
}