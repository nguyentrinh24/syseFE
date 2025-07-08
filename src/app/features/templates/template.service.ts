import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { EmailTemplate } from '../../core/models/email-template.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmailTemplateService {
  private url = '/api/email-templates';
  constructor(private api: ApiService) {}
  getAll(): Observable<EmailTemplate[]> {
    return this.api.get<EmailTemplate[]>(this.url);
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