import {
    createAsyncThunk,
    createSlice,
    type PayloadAction,
} from '@reduxjs/toolkit';

import { authService } from '@/services/auth';

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

export const login = createAsyncThunk<
    User,
    LoginCredentials,
    { rejectValue: string }
>(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            return await authService.login(credentials);
        } catch (error) {
            return rejectWithValue(
                error instanceof Error
                    ? error.message
                    : 'Unable to login. Please try again.',
            );
        }
    },
);

export const register = createAsyncThunk<
    User,
    RegisterPayload,
    { rejectValue: string }
>(
    'auth/register',
    async (payload, { rejectWithValue }) => {
        try {
            return await authService.register(payload);
        } catch (error) {
            return rejectWithValue(
                error instanceof Error
                    ? error.message
                    : 'Unable to register. Please try again.',
            );
        }
    },
);

const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },

        clearUser: (state) => {
            authService.clearSession();

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
            const session = authService.getSession();

            if (session?.user) {
                state.user = session.user;
                state.isAuthenticated = true;
            } else {
                state.user = null;
                state.isAuthenticated = false;
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
                state.error = null;
            })

            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error =
                    action.payload ?? 'Unable to login. Please try again.';
            })

            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })

            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            })

            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error =
                    action.payload ?? 'Unable to register. Please try again.';
            });
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