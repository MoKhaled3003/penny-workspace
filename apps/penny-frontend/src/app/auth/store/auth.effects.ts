import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import * as AuthActions from './auth.actions';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signupStart),
      switchMap(action => this.authService.signup(action.email, action.password).pipe(
        map(user => AuthActions.signupSuccess({ user })),
        catchError(error => of(AuthActions.signupFailure({ error: error.message })))
      ))
    )
  );

  signin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signinStart),
      mergeMap(({ email, password }) =>
        this.authService.signin(email, password).pipe(
          map((response) => {
            const accessToken = response.data.accessToken;
            return AuthActions.signinSuccess({ accessToken });
          }),
          catchError((error) => of(AuthActions.signinFail({ error: error.message || 'Unknown error' })))
        )
      )
    )
  );
  
  signinSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signinSuccess),
        tap(({ accessToken }) => {
          // Store the token in localStorage
          localStorage.setItem('accessToken', accessToken);
  
          // Navigate to the dashboard
          this.router.navigate(['/dashboard']);
        })
      ),
    { dispatch: false }
  );
    signout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signout),
      switchMap(() => {
        // Retrieve the token from localStorage or another state mechanism
        const token = localStorage.getItem('accessToken'); // Adjust based on your implementation
        if (!token) {
          console.log('no token')
          // If no token, directly dispatch success (user already logged out)
          return of(AuthActions.signoutSuccess());
        }
        return this.authService.signout(token).pipe(
          map(() => AuthActions.signoutSuccess()),
          catchError((error) => of(AuthActions.signoutFailure({ error })))
        );
      })
    )
  );
  
  signoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signoutSuccess),
        tap(() => {
          localStorage.removeItem('accessToken');
          this.router.navigate(['/signin']);
        })
      ),
    { dispatch: false }
  );
  
  signoutFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signoutFailure),
        tap((action) => {
          console.error('Sign Out Failed:', action.error);
        })
      ),
    { dispatch: false }
  );
}
