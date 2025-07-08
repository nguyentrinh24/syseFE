import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageLogService } from './message-log.service';
import { MessageLog } from '../../core/models/message-log.model';

@Component({
  selector: 'app-email-log',
  templateUrl: './email-log.component.html',
  styleUrls: ['./email-log.component.scss'],
  imports: [FormsModule, CommonModule],
  standalone: true
})
export class EmailLogComponent implements OnInit {
  logs: MessageLog[] = [];
  filterTemplate = '';
  fromDate = '';
  toDate = '';
  constructor(private service: MessageLogService) {}
  ngOnInit() {
    this.service.getAll().subscribe((l: MessageLog[]) => this.logs = l);
  }
  filteredLogs() {
    return this.logs.filter(l =>
      (!this.filterTemplate || l.templateCode.includes(this.filterTemplate)) &&
      (!this.fromDate || l.sentAt >= this.fromDate) &&
      (!this.toDate || l.sentAt <= this.toDate)
    );
  }

  getStatusClass(status: string): string {
    switch (status?.toLowerCase()) {
      case 'success':
      case 'sent':
        return 'success';
      case 'failed':
      case 'error':
        return 'failed';
      case 'pending':
        return 'pending';
      default:
        return 'sent';
    }
  }

  getStatusText(status: string): string {
    switch (status?.toLowerCase()) {
      case 'success':
      case 'sent':
        return 'Thành công';
      case 'failed':
      case 'error':
        return 'Thất bại';
      case 'pending':
        return 'Đang xử lý';
      default:
        return 'Đã gửi';
    }
  }

  getSuccessCount(): number {
    return this.filteredLogs().filter(l => 
      l.status?.toLowerCase() === 'success' || l.status?.toLowerCase() === 'sent'
    ).length;
  }

  getFailureCount(): number {
    return this.filteredLogs().filter(l => 
      l.status?.toLowerCase() === 'failed' || l.status?.toLowerCase() === 'error'
    ).length;
  }
} 