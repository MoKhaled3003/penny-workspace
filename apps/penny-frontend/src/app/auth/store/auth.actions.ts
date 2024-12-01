import { createAction, props } from '@ngrx/store';

// Signup Actions
export const signupStart = createAction('[Auth] Signup Start', props<{ email: string; password: string }>());
export const signupSuccess = createAction('[Auth] Signup Success', props<{ user: any }>());
export const signupFailure = createAction('[Auth] Signup Failure', props<{ error: string }>());

// Signin Actions
export const signinStart = createAction(
    '[Auth] Signin Start',
    props<{ email: string; password: string }>()
  );
  
  export const signinSuccess = createAction(
    '[Auth] Signin Success',
    props<{ accessToken: string }>() // Include the access token
  );
  
  export const signinFail = createAction(
    '[Auth] Signin Fail',
    props<{ error: string }>()
  );
  

// Signout Actions
export const signout = createAction('[Auth] Signout');

