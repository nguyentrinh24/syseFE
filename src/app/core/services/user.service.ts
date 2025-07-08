import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private adminApi = '/api/admin';

  constructor(private api: ApiService) {}

  getUsers(): Observable<User[]> {
    return this.api.get<User[]>(`${this.adminApi}/users`);
  }

  getRoles(): Observable<string[]> {
    return this.api.get<string[]>(`${this.adminApi}/roles`);
  }

  updateUserRole(userId: number, role: string): Observable<any> {
    return this.api.post(`${this.adminApi}/users/${userId}/role`, { role });
  }
} 