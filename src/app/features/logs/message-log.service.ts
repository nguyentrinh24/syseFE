import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { MessageLog } from '../../core/models/message-log.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessageLogService {
  private url = '/api/message-logs';
  constructor(private api: ApiService) {}
  getAll(): Observable<MessageLog[]> {
    return this.api.get<MessageLog[]>(this.url);
  }
} 