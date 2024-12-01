import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { selectIsAuthenticated } from './store/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectIsAuthenticated).pipe(
      take(1), // Complete the observable after the first value is emitted
      map((isAuthenticated) => {
        if (!isAuthenticated) {
          this.router.navigate(['/signin']); // Redirect to signin if not authenticated
          return false;
        }
        return true; // Allow access if authenticated
      })
    );
  }
}
