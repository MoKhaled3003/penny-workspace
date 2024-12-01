import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private API_URL = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  signup(email: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/signup`, { email, password });
  }

  signin(email: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/signin`, { email, password });
  }

  signout(): void {
    localStorage.removeItem('user');
  }
}
