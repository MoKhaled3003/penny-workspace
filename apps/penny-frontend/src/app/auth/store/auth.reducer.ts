import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  accessToken: string | null;  // Store the access token here
  authError: string | null;
  isLoading: boolean;
}

export const initialState: AuthState = {
  accessToken: null,
  authError: null,
  isLoading: false,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.signupSuccess, (state, action) => ({
    ...state,
    user: action.user,
    error: null,
  })),
  on(AuthActions.signinStart, (state) => ({
    ...state,
    isLoading: true,
    authError: null,
  })),
  on(AuthActions.signinSuccess, (state, { accessToken }) => ({
    ...state,
    accessToken,
    isLoading: false,
    authError: null,
  })),
  on(AuthActions.signinFail, (state, { error }) => ({
    ...state,
    isLoading: false,
    authError: error,
  })),
  on(AuthActions.signout, (state) => ({
    ...state,
    accessToken: null,
    authError: null,
  }))
);
