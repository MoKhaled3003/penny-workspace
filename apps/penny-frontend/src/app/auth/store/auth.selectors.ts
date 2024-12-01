import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

// Create feature selector to select the auth state
export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsLoading = createSelector(
    selectAuthState,
    (state: AuthState) => state.isLoading
  );
  
  export const selectAuthError = createSelector(
    selectAuthState,
    (state: AuthState) => state.authError
  );

  export const selectIsAuthenticated = createSelector(
    selectAuthState,
    (state: AuthState) => !!state.accessToken // Returns true if accessToken exists
  );
  