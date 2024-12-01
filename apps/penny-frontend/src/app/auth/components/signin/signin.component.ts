import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth.actions';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { selectAuthError, selectIsLoading } from '../../store/auth.selectors';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class SigninComponent {
  signinForm: FormGroup;
  isLoading$: Observable<boolean>;
  authError$: Observable<string | null>;

  constructor(private fb: FormBuilder, private store: Store) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.isLoading$ = this.store.select(selectIsLoading);
    this.authError$ = this.store.select(selectAuthError);
  }

  onSignin() {
    if (this.signinForm.valid) {
      const { email, password } = this.signinForm.value;
      this.store.dispatch(AuthActions.signinStart({ email, password }));
    }
  }
}
