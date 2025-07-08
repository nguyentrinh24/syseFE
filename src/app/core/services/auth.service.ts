import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = '/api/auth';

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((res: any) => {
        this.storageService.setItem('token', res.token);
        this.storageService.setItem('role', res.role);
      })
    );
  }

  logout() {
    this.storageService.removeItem('token');
    this.storageService.removeItem('role');
  }

  getToken(): string | null {
    return this.storageService.getItem('token');
  }

  getRole(): string | null {
    return this.storageService.getItem('role');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }
} 