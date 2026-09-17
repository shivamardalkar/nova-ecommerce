export type UserRole = 'customer' | 'admin';

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt: string;
}

export interface AuthSession {
    user: User;
    isAuthenticated: boolean;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}