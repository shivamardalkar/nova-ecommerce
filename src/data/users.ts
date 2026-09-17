import type { User } from '@/types';

export const mockUsers: User[] = [
    {
        id: 'user-001',
        name: 'Aarav Mehta',
        email: 'aarav@example.com',
        password: 'password123',
        role: 'customer',
        createdAt: '2026-01-15T10:00:00.000Z',
    },
    {
        id: 'user-002',
        name: 'Priya Sharma',
        email: 'priya@example.com',
        password: 'password123',
        role: 'customer',
        createdAt: '2026-02-05T10:00:00.000Z',
    },
    {
        id: 'user-003',
        name: 'Rahul Patil',
        email: 'rahul@example.com',
        password: 'password123',
        role: 'customer',
        createdAt: '2026-02-18T10:00:00.000Z',
    },
    {
        id: 'admin-001',
        name: 'NOVA Administrator',
        email: 'admin@nova-store.com',
        password: 'admin123',
        role: 'admin',
        createdAt: '2026-01-01T10:00:00.000Z',
    },
];