import {
    createAsyncThunk,
    createSlice,
    type PayloadAction,
} from '@reduxjs/toolkit';

import { mockApi } from '@/services/api';
import { storageService, STORAGE_KEYS } from '@/services/storage';

import type {
    LoginCredentials,
    RegisterPayload,
    User,
} from '@/types';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isInitialized: boolean;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isInitialized: false,
    isLoading: false,
    error: null,
};

export const register = createAsyncThunk<
    User,
    RegisterPayload,
    { rejectValue: string }
>('auth/register', async (payload, { rejectWithValue }) => {
    try {
        const response = await mockApi.getUsers();

        const emailExists = response.data.some(
            (item) =>
                item.email.toLowerCase() === payload.email.toLowerCase().trim(),
        );

        if (emailExists) {
            return rejectWithValue('An account with this email already exists.');
        }

        const newUser: User = {
            id: `user-${Date.now()}`,
            name: payload.name.trim(),
            email: payload.email.toLowerCase().trim(),
            password: payload.password,
            role: 'customer',
            createdAt: new Date().toISOString(),
        };

        const users = [...response.data, newUser];

        storageService.setItem(STORAGE_KEYS.USERS, users);
        storageService.setItem(STORAGE_KEYS.AUTH_SESSION, newUser);

        return newUser;
    } catch {
        return rejectWithValue('Unable to register. Please try again.');
    }
});

export const login = createAsyncThunk<
    User,
    LoginCredentials,
    { rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
    try {
        const response = await mockApi.getUsers();

        const user = response.data.find(
            (item) =>
                item.email.toLowerCase() === credentials.email.toLowerCase().trim() &&
                item.password === credentials.password,
        );

        if (!user) {
            return rejectWithValue('Invalid email or password.');
        }

        storageService.setItem(STORAGE_KEYS.AUTH_SESSION, user);

        return user;
    } catch {
        return rejectWithValue('Unable to login. Please try again.');
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        },

        clearUser: (state) => {
            storageService.removeItem(STORAGE_KEYS.AUTH_SESSION);

            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
        },

        setInitialized: (state, action: PayloadAction<boolean>) => {
            state.isInitialized = action.payload;
        },

        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },

        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },

        clearError: (state) => {
            state.error = null;
        },
        restoreSession: (state) => {
            const session = storageService.getItem<User | null>(
                STORAGE_KEYS.AUTH_SESSION,
                null,
            );

            if (session) {
                state.user = session;
                state.isAuthenticated = true;
            }

            state.isInitialized = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.isInitialized = true;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? 'Unable to login.';
            })
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.isInitialized = true;
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? 'Unable to register.';
            })
    },
});

export const {
    setUser,
    clearUser,
    setInitialized,
    setLoading,
    setError,
    clearError,
    restoreSession,
} = authSlice.actions;

export default authSlice.reducer;