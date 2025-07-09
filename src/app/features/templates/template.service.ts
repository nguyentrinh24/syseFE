import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { EmailTemplate } from '../../core/models/email-template.model';
import { PaginationResponse, PaginationParams } from '../../core/models/pagination.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmailTemplateService {
  private url = '/api/email-templates';
  constructor(private api: ApiService) {}
  
  getAll(): Observable<EmailTemplate[]> {
    return this.api.get<EmailTemplate[]>(this.url);
  }
  
  getWithPagination(params: PaginationParams): Observable<PaginationResponse<EmailTemplate>> {
    const queryParams = new URLSearchParams();
    
    if (params.page !== undefined) queryParams.set('page', params.page.toString());
    if (params.size !== undefined) queryParams.set('size', params.size.toString());
    if (params.sortBy) queryParams.set('sortBy', params.sortBy);
    if (params.sortDir) queryParams.set('sortDir', params.sortDir);
    if (params.status !== undefined) queryParams.set('status', params.status.toString());
    if (params.createdBy !== undefined) queryParams.set('createdBy', params.createdBy.toString());
    if (params.code) queryParams.set('code', params.code);
    if (params.search) queryParams.set('search', params.search);
    
    const queryString = queryParams.toString();
    const url = queryString ? `${this.url}?${queryString}` : this.url;
    
    return this.api.get<PaginationResponse<EmailTemplate>>(url);
  }
  
  get(id: number): Observable<EmailTemplate> {
    return this.api.get<EmailTemplate>(`${this.url}/${id}`);
  }
  
  create(t: EmailTemplate): Observable<EmailTemplate> {
    return this.api.post<EmailTemplate>(this.url, t);
  }
  
  update(t: EmailTemplate): Observable<EmailTemplate> {
    return this.api.put<EmailTemplate>(`${this.url}/${t.id}`, t);
  }
  
  delete(id: number): Observable<void> {
    return this.api.delete<void>(`${this.url}/${id}`);
  }
} 