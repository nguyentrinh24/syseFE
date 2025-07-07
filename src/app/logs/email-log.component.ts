import { Component, OnInit } from '@angular/core';
import { MessageLogService } from './message-log.service';
import { MessageLog } from '../shared/models';

@Component({
  selector: 'app-email-log',
  template: `
    <h2>Lịch sử gửi email</h2>
    <input [(ngModel)]="filterTemplate" placeholder="Lọc theo template..." />
    <input [(ngModel)]="fromDate" type="date" />
    <input [(ngModel)]="toDate" type="date" />
    <table>
      <thead>
        <tr>
          <th>Email nhận</th><th>Template</th><th>Trạng thái</th><th>Thời gian</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let l of filteredLogs()">
          <td>{{l.to}}</td>
          <td>{{l.templateName}}</td>
          <td>{{l.status}}</td>
          <td>{{l.sentAt | date:'short'}}</td>
        </tr>
      </tbody>
    </table>
  `
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
      (!this.filterTemplate || l.templateName.includes(this.filterTemplate)) &&
      (!this.fromDate || l.sentAt >= this.fromDate) &&
      (!this.toDate || l.sentAt <= this.toDate)
    );
  }
} 