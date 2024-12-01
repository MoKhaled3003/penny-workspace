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
        tap(() => {
          // Navigate to dashboard upon successful sign-in
          this.router.navigate(['/dashboard']);
        })
      ),
    { dispatch: false } // This effect is only for side effects, no action dispatched
  );
  signout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signout),
      tap(() => {
        localStorage.removeItem('user');
        this.router.navigate(['/signin']);
      })
    ),
    { dispatch: false }
  );
}
