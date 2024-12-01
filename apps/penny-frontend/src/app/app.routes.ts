import { Routes } from '@angular/router';
import { SignupComponent } from './auth/components/signup/signup.component';
import { SigninComponent } from './auth/components/signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
];
