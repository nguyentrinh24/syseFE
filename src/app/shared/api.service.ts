import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  get<T>(url: string, options?: any): Observable<T> {
    return this.http.get<T>(url, this.addAuth(options)) as Observable<T>;
  }
  post<T>(url: string, body: any, options?: any): Observable<T> {
    return this.http.post<T>(url, body, this.addAuth(options)) as Observable<T>;
  }
  put<T>(url: string, body: any, options?: any): Observable<T> {
    return this.http.put<T>(url, body, this.addAuth(options)) as Observable<T>;
  }
  delete<T>(url: string, options?: any): Observable<T> {
    return this.http.delete<T>(url, this.addAuth(options)) as Observable<T>;
  }
  private addAuth(options?: any): any {
    const token = this.storageService.getItem('token');
    
    let headers = options && options.headers ? options.headers : new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return { ...options, headers };
  }
} 