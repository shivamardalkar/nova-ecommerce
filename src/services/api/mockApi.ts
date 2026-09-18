import {
    mockBrands,
    mockCategories,
    mockCoupons,
    mockFAQs,
    mockProducts,
    mockUsers,
} from '@/data';
import { storageService, STORAGE_KEYS } from '@/services/storage';

import type {
    Brand,
    Category,
    Coupon,
    FAQ,
    Product,
    User,
} from '@/types';

import { createApiResponse } from './apiClient';

const API_DELAY = 300;

const delay = (milliseconds: number): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
    });
};

const getPersistedData = <T>(
    key: string,
    fallbackData: T[],
): T[] => {
    const storedData = storageService.getItem<T[] | null>(key, null);

    if (storedData !== null) {
        return storedData;
    }

    storageService.setItem(key, fallbackData);

    return fallbackData;
};

const saveData = <T>(key: string, data: T[]): T[] => {
    storageService.setItem(key, data);

    return data;
};

export const mockApi = {
    // -------------------------
    // Products
    // -------------------------

    async getProducts() {
        await delay(API_DELAY);

        const products = getPersistedData<Product>(
            STORAGE_KEYS.PRODUCTS,
            mockProducts,
        );

        return createApiResponse<Product[]>(products);
    },

    async getProductById(productId: string) {
        await delay(API_DELAY);

        const products = getPersistedData<Product>(
            STORAGE_KEYS.PRODUCTS,
            mockProducts,
        );

        const product = products.find((item) => item.id === productId);

        return createApiResponse<Product | null>(product ?? null);
    },

    async createProduct(product: Product) {
        await delay(API_DELAY);

        const products = getPersistedData<Product>(
            STORAGE_KEYS.PRODUCTS,
            mockProducts,
        );

        const updatedProducts = [...products, product];

        saveData(STORAGE_KEYS.PRODUCTS, updatedProducts);

        return createApiResponse<Product>(
            product,
            'Product created successfully.',
        );
    },

    async updateProduct(product: Product) {
        await delay(API_DELAY);

        const products = getPersistedData<Product>(
            STORAGE_KEYS.PRODUCTS,
            mockProducts,
        );

        const productExists = products.some(
            (item) => item.id === product.id,
        );

        if (!productExists) {
            throw new Error('Product not found.');
        }

        const updatedProducts = products.map((item) =>
            item.id === product.id ? product : item,
        );

        saveData(STORAGE_KEYS.PRODUCTS, updatedProducts);

        return createApiResponse<Product>(
            product,
            'Product updated successfully.',
        );
    },

    async deleteProduct(productId: string) {
        await delay(API_DELAY);

        const products = getPersistedData<Product>(
            STORAGE_KEYS.PRODUCTS,
            mockProducts,
        );

        const productExists = products.some(
            (item) => item.id === productId,
        );

        if (!productExists) {
            throw new Error('Product not found.');
        }

        const updatedProducts = products.filter(
            (item) => item.id !== productId,
        );

        saveData(STORAGE_KEYS.PRODUCTS, updatedProducts);

        return createApiResponse<string>(
            productId,
            'Product deleted successfully.',
        );
    },

    // -------------------------
    // Categories
    // -------------------------

    async getCategories() {
        await delay(API_DELAY);

        const categories = getPersistedData<Category>(
            STORAGE_KEYS.CATEGORIES,
            mockCategories,
        );

        return createApiResponse<Category[]>(categories);
    },

    async createCategory(category: Category) {
        await delay(API_DELAY);

        const categories = getPersistedData<Category>(
            STORAGE_KEYS.CATEGORIES,
            mockCategories,
        );

        const updatedCategories = [...categories, category];

        saveData(STORAGE_KEYS.CATEGORIES, updatedCategories);

        return createApiResponse<Category>(
            category,
            'Category created successfully.',
        );
    },

    async updateCategory(category: Category) {
        await delay(API_DELAY);

        const categories = getPersistedData<Category>(
            STORAGE_KEYS.CATEGORIES,
            mockCategories,
        );

        const categoryExists = categories.some(
            (item) => item.id === category.id,
        );

        if (!categoryExists) {
            throw new Error('Category not found.');
        }

        const updatedCategories = categories.map((item) =>
            item.id === category.id ? category : item,
        );

        saveData(STORAGE_KEYS.CATEGORIES, updatedCategories);

        return createApiResponse<Category>(
            category,
            'Category updated successfully.',
        );
    },

    async deleteCategory(categoryId: string) {
        await delay(API_DELAY);

        const categories = getPersistedData<Category>(
            STORAGE_KEYS.CATEGORIES,
            mockCategories,
        );

        const categoryExists = categories.some(
            (item) => item.id === categoryId,
        );

        if (!categoryExists) {
            throw new Error('Category not found.');
        }

        const updatedCategories = categories.filter(
            (item) => item.id !== categoryId,
        );

        saveData(STORAGE_KEYS.CATEGORIES, updatedCategories);

        return createApiResponse<string>(
            categoryId,
            'Category deleted successfully.',
        );
    },

    // -------------------------
    // Read-only data
    // -------------------------

    async getBrands() {
        await delay(API_DELAY);

        return createApiResponse<Brand[]>([...mockBrands]);
    },

    async getCoupons() {
        await delay(API_DELAY);

        return createApiResponse<Coupon[]>([...mockCoupons]);
    },

    async getFAQs() {
        await delay(API_DELAY);

        return createApiResponse<FAQ[]>([...mockFAQs]);
    },

    async getUsers() {
        await delay(API_DELAY);

        const users = getPersistedData<User>(
            STORAGE_KEYS.USERS,
            mockUsers,
        );

        return createApiResponse<User[]>(users);
    },
};