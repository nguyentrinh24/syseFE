import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  get<T>(url: string, options?: any): Observable<T> {
    return this.http.get<T>(url, this.addAuth(options));
  }
  post<T>(url: string, body: any, options?: any): Observable<T> {
    return this.http.post<T>(url, body, this.addAuth(options));
  }
  put<T>(url: string, body: any, options?: any): Observable<T> {
    return this.http.put<T>(url, body, this.addAuth(options));
  }
  delete<T>(url: string, options?: any): Observable<T> {
    return this.http.delete<T>(url, this.addAuth(options));
  }
  private addAuth(options?: any) {
    const token = localStorage.getItem('token');
    let headers = options && options.headers ? options.headers : new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return { ...options, headers };
  }
} 