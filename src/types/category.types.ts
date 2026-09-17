export type CategoryStatus = 'active' | 'inactive';

export interface Category {
    id: string;
    name: string;
    description: string;
    image: string;
    status: CategoryStatus;
    createdAt: string;
    updatedAt: string;
}