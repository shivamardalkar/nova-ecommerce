import type { Order } from '@/types';

export const mockOrders: Order[] = [
    {
        id: 'ORD-1001',
        customerId: 'user-001',
        customerName: 'Aarav Mehta',
        items: [
            {
                productId: 'product-001',
                productName: 'Premium Wireless Headphones',
                productImage:
                    'https://placehold.co/600x600?text=Headphones',
                quantity: 1,
                unitPrice: 4999,
                totalPrice: 4999,
            },
            {
                productId: 'product-005',
                productName: 'USB-C Fast Charging Cable',
                productImage:
                    'https://placehold.co/600x600?text=USB-C+Cable',
                quantity: 2,
                unitPrice: 799,
                totalPrice: 1598,
            },
        ],
        subtotal: 6597,
        discount: 500,
        total: 6097,
        shippingAddress: {
            fullName: 'Aarav Mehta',
            phone: '9876543210',
            addressLine1: 'Baner Road',
            addressLine2: 'Near Balewadi High Street',
            city: 'Pune',
            state: 'Maharashtra',
            postalCode: '411045',
            country: 'India',
        },
        paymentMethod: 'Credit Card',
        status: 'delivered',
        createdAt: '2026-09-10T10:30:00.000Z',
    },

    {
        id: 'ORD-1002',
        customerId: 'user-002',
        customerName: 'Priya Sharma',
        items: [
            {
                productId: 'product-010',
                productName: 'Smart Fitness Watch',
                productImage:
                    'https://placehold.co/600x600?text=Fitness+Watch',
                quantity: 1,
                unitPrice: 6999,
                totalPrice: 6999,
            },
        ],
        subtotal: 6999,
        discount: 0,
        total: 6999,
        shippingAddress: {
            fullName: 'Priya Sharma',
            phone: '9876543211',
            addressLine1: 'Viman Nagar',
            city: 'Pune',
            state: 'Maharashtra',
            postalCode: '411014',
            country: 'India',
        },
        paymentMethod: 'UPI',
        status: 'shipped',
        createdAt: '2026-09-12T14:15:00.000Z',
    },

    {
        id: 'ORD-1003',
        customerId: 'user-003',
        customerName: 'Rahul Patil',
        items: [
            {
                productId: 'product-015',
                productName: 'Mechanical Gaming Keyboard',
                productImage:
                    'https://placehold.co/600x600?text=Gaming+Keyboard',
                quantity: 1,
                unitPrice: 3499,
                totalPrice: 3499,
            },
            {
                productId: 'product-018',
                productName: 'Wireless Gaming Mouse',
                productImage:
                    'https://placehold.co/600x600?text=Gaming+Mouse',
                quantity: 1,
                unitPrice: 2499,
                totalPrice: 2499,
            },
        ],
        subtotal: 5998,
        discount: 599,
        total: 5399,
        shippingAddress: {
            fullName: 'Rahul Patil',
            phone: '9876543212',
            addressLine1: 'Kharadi',
            addressLine2: 'EON IT Park Road',
            city: 'Pune',
            state: 'Maharashtra',
            postalCode: '411014',
            country: 'India',
        },
        paymentMethod: 'Cash on Delivery',
        status: 'processing',
        createdAt: '2026-09-15T09:45:00.000Z',
    },

    {
        id: 'ORD-1004',
        customerId: 'user-001',
        customerName: 'Aarav Mehta',
        items: [
            {
                productId: 'product-020',
                productName: 'Portable Bluetooth Speaker',
                productImage:
                    'https://placehold.co/600x600?text=Bluetooth+Speaker',
                quantity: 2,
                unitPrice: 2199,
                totalPrice: 4398,
            },
        ],
        subtotal: 4398,
        discount: 399,
        total: 3999,
        shippingAddress: {
            fullName: 'Aarav Mehta',
            phone: '9876543210',
            addressLine1: 'Baner Road',
            city: 'Pune',
            state: 'Maharashtra',
            postalCode: '411045',
            country: 'India',
        },
        paymentMethod: 'UPI',
        status: 'confirmed',
        createdAt: '2026-09-17T16:20:00.000Z',
    },

    {
        id: 'ORD-1005',
        customerId: 'user-002',
        customerName: 'Priya Sharma',
        items: [
            {
                productId: 'product-025',
                productName: 'Ergonomic Office Chair',
                productImage:
                    'https://placehold.co/600x600?text=Office+Chair',
                quantity: 1,
                unitPrice: 8999,
                totalPrice: 8999,
            },
        ],
        subtotal: 8999,
        discount: 1000,
        total: 7999,
        shippingAddress: {
            fullName: 'Priya Sharma',
            phone: '9876543211',
            addressLine1: 'Kalyani Nagar',
            city: 'Pune',
            state: 'Maharashtra',
            postalCode: '411006',
            country: 'India',
        },
        paymentMethod: 'Credit Card',
        status: 'pending',
        createdAt: '2026-09-18T11:10:00.000Z',
    },
];