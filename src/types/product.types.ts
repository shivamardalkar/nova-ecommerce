export type ProductStatus = 'active' | 'inactive';

export interface ProductSpecification {
    key: string;
    value: string;
}

export interface ProductReview {
    id: string;
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    createdAt: string;
}

export interface Product {
    id: string;
    name: string;
    brandId: string;
    categoryId: string;
    description: string;
    price: number;
    originalPrice: number;
    discountPercentage: number;
    stock: number;
    images: string[];
    specifications: ProductSpecification[];
    reviews: ProductReview[];
    rating: number;
    status: ProductStatus;
    featured: boolean;
    createdAt: string;
    updatedAt: string;
}