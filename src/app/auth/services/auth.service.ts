import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { AuthResponse, User } from '../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _apiUrl: string = environment.apiUrl;
  private _user!: User;

  get user() {
    return { ...this._user };
  }

  setPhotoUrl(photoUrl: string) {
    this._user.photoUrl = photoUrl;
  }

  constructor(private http: HttpClient) {}

  register(name: string, email: string, password: string) {
    return this.http
      .post<AuthResponse>(`${this._apiUrl}/auth/signup`, {
        name,
        email,
        password,
      })
      .pipe(
        tap((res) => {
          if (res.ok) {
            localStorage.setItem('x-access-token', res.token);
          }
        }),
        map((res) => res.ok),
        catchError((res) => of(res.error.message))
      );
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post<AuthResponse>(`${this._apiUrl}/auth/signin`, {
        email,
        password,
      })
      .pipe(
        tap((res) => {
          if (res.ok) {
            localStorage.setItem('x-access-token', res.token);
          }
        }),
        map((res) => res.ok),
        catchError((res) => of(res.error.message))
      );
  }

  validateToken(): Observable<boolean> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('x-access-token')}`
    );

    return this.http
      .get<AuthResponse>(`${this._apiUrl}/auth/renew`, { headers })
      .pipe(
        map((res) => {
          localStorage.setItem('x-access-token', res.token);

          const { id, name, email, photoUrl } = res;

          this._user = {
            id,
            name,
            email,
            photoUrl,
          };

          return res.ok;
        }),
        catchError((res) => of(false))
      );
  }

  logout() {
    localStorage.clear();
  }
}
