import type { CartItem } from './cart.types';

export type OrderStatus =
    | 'pending'
    | 'confirmed'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'cancelled';

export interface ShippingAddress {
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

export interface OrderItem {
    productId: string;
    productName: string;
    productImage: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}

export interface Order {
    id: string;
    customerId: string;
    customerName: string;
    items: OrderItem[];
    subtotal: number;
    discount: number;
    total: number;
    shippingAddress: ShippingAddress;
    paymentMethod: string;
    status: OrderStatus;
    createdAt: string;
}

export interface CreateOrderPayload {
    customerId: string;
    customerName: string;
    items: CartItem[];
    subtotal: number;
    discount: number;
    total: number;
    shippingAddress: ShippingAddress;
    paymentMethod: string;
}