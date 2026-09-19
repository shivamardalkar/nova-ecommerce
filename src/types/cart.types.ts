import type { Product } from './product.types';

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface CartState {
    items: CartItem[];
    appliedCouponCode: string | null;
}