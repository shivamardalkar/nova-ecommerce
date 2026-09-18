import { mockApi } from '@/services/api';
import { storageService, STORAGE_KEYS } from '@/services/storage';

import type {
    AuthSession,
    LoginCredentials,
    RegisterPayload,
    User,
    UserRole,
} from '@/types';

const createAuthSession = (user: User): AuthSession => ({
    user,
    isAuthenticated: true,
});

export const authService = {
    async login(
        credentials: LoginCredentials,
        expectedRole?: UserRole,
    ): Promise<User> {
        const response = await mockApi.getUsers();

        const normalizedEmail = credentials.email.trim().toLowerCase();

        const user = response.data.find(
            (item) =>
                item.email.toLowerCase() === normalizedEmail &&
                item.password === credentials.password,
        );

        if (!user) {
            throw new Error('Invalid email or password.');
        }

        if (expectedRole && user.role !== expectedRole) {
            throw new Error('You do not have permission to access this area.');
        }

        const session = createAuthSession(user);

        storageService.setItem(STORAGE_KEYS.AUTH_SESSION, session);

        return user;
    },

    async register(payload: RegisterPayload): Promise<User> {
        const response = await mockApi.getUsers();

        const normalizedEmail = payload.email.trim().toLowerCase();

        const emailAlreadyExists = response.data.some(
            (item) => item.email.toLowerCase() === normalizedEmail,
        );

        if (emailAlreadyExists) {
            throw new Error('An account with this email already exists.');
        }

        const newUser: User = {
            id: `user-${Date.now()}`,
            name: payload.name.trim(),
            email: normalizedEmail,
            password: payload.password,
            role: 'customer',
            createdAt: new Date().toISOString(),
        };

        const updatedUsers = [...response.data, newUser];

        storageService.setItem(STORAGE_KEYS.USERS, updatedUsers);

        const session = createAuthSession(newUser);

        storageService.setItem(STORAGE_KEYS.AUTH_SESSION, session);

        return newUser;
    },

    getSession(): AuthSession | null {
        return storageService.getItem<AuthSession | null>(
            STORAGE_KEYS.AUTH_SESSION,
            null,
        );
    },

    clearSession(): void {
        storageService.removeItem(STORAGE_KEYS.AUTH_SESSION);
    },
};