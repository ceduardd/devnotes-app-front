import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth/services/auth.service';
import {
  BodyProfile,
  VerifyResponse,
  CloudinaryResponse,
} from '../interfaces/settings.interfaces';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private _apiUrl: string = environment.apiUrl;
  private _cloudinaryUrl: string = environment.cloudinaryUrl;

  get headers() {
    return new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('x-access-token')}`
    );
  }

  constructor(private http: HttpClient, private authService: AuthService) {}

  get user() {
    return this.authService.user;
  }

  updateProfile(body: BodyProfile): Observable<boolean> {
    return this.http
      .put<VerifyResponse>(`${this._apiUrl}/users/${this.user.id}`, body, {
        headers: this.headers,
      })
      .pipe(
        map((res) => res.ok),
        catchError((res) => of(res.error.message))
      );
  }

  verifyCurrentPassword(password: string): Observable<VerifyResponse> {
    return this.http.post<VerifyResponse>(
      `${this._apiUrl}/users/verifyPassword`,
      { password },
      { headers: this.headers }
    );
  }

  verifyEmailTaken(email: string): Observable<VerifyResponse> {
    return this.http.post<VerifyResponse>(
      `${this._apiUrl}/users/verifyEmail`,
      { email },
      { headers: this.headers }
    );
  }

  uploadImageAPI(photoUrl: string) {
    return this.http
      .post<VerifyResponse>(
        `${this._apiUrl}/users/upload`,
        { photoUrl },
        { headers: this.headers }
      )
      .pipe(
        map((res) => res.ok),
        catchError((res) => of(res.error.message))
      );
  }

  uploadImage(file: File): Observable<boolean> {
    const formData = new FormData();
    formData.append('upload_preset', 'devnotes-images');
    formData.append('file', file);

    return this.http
      .post<CloudinaryResponse>(`${this._cloudinaryUrl}/upload`, formData)
      .pipe(
        tap((res) => this.authService.setPhotoUrl(res.secure_url)),
        switchMap((res) => this.uploadImageAPI(res.secure_url))
      );
  }

  removePhoto(): Observable<VerifyResponse> {
    return this.http
      .post<VerifyResponse>(
        `${this._apiUrl}/users/removePhoto`,
        {},
        { headers: this.headers }
      )
      .pipe(tap((_) => this.authService.setPhotoUrl('')));
  }
}
