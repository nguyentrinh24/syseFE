import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private url = '/api/send-email';
  constructor(private api: ApiService) {}
  send(data: {templateCode: string, to: string, variables: any}): Observable<any> {
    return this.api.post<any>(this.url, data);
  }
} 