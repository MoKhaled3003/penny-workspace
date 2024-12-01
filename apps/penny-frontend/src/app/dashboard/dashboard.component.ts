import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from '../auth/store/auth.actions';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class DashboardComponent {
  constructor(private store: Store) {}

  onSignout() {
    this.store.dispatch(AuthActions.signout());
  }
}