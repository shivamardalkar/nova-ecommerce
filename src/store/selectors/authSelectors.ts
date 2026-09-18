import type { RootState } from '@/store';

export const selectCurrentUser = (state: RootState) =>
  state.auth.user;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export const selectIsAuthInitialized = (state: RootState) =>
  state.auth.isInitialized;

export const selectAuthLoading = (state: RootState) =>
  state.auth.isLoading;

export const selectAuthError = (state: RootState) =>
  state.auth.error;

export const selectIsAdmin = (state: RootState) =>
  state.auth.user?.role === 'admin';

export const selectIsCustomer = (state: RootState) =>
  state.auth.user?.role === 'customer';