import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-notification-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="notification-list-container">
      <button class="action-btn" (click)="goBack()" style="margin-bottom:1rem">Quay lại</button>
      <h2>Chi tiết Notification</h2>
      <div *ngIf="notification">
        <div><b>Tên:</b> <span class="name-text">{{notification.name}}</span></div>
        <div><b>Mã:</b> <span class="code-badge">{{notification.code}}</span></div>
        <div><b>Trạng thái:</b> <span class="status-badge" [ngClass]="{'active': notification.status, 'inactive': !notification.status}">{{ notification.status ? 'BẬT' : 'TẮT' }}</span></div>
        <div><b>Tiêu đề:</b> {{notification.subject}}</div>
        <div><b>Biến động:</b>
          <span *ngFor="let p of placeholders" class="code-badge">{{p}}</span>
        </div>
        <div><b>Nội dung:</b></div>
        <div style="white-space:pre-line; border:1px solid #eee; border-radius:8px; padding:1rem; margin-top:0.5rem">{{notification.content}}</div>
        <div *ngIf="notification.createdBy">
          <b>Người tạo:</b> {{notification.createdBy.fullName || notification.createdBy.username}}
        </div>
        <div *ngIf="notification.createdAt">
          <b>Ngày tạo:</b> {{notification.createdAt | date:'dd/MM/yyyy HH:mm'}}
        </div>
      </div>
      <div *ngIf="!notification" class="empty-state">
        <span class="empty-icon">📭</span>
        <h3>Không tìm thấy notification.</h3>
        <p>Notification không tồn tại hoặc đã bị xóa.</p>
      </div>
    </div>
  `,
  styleUrls: ['../notification-list/notification-list.component.scss']
})
export class NotificationDetailComponent implements OnInit {
  notification: any = null;
  placeholders: string[] = [];
  constructor(private route: ActivatedRoute, private service: NotificationService, private router: Router) {}
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.getById(+id).subscribe(n => {
        this.notification = n;
        this.placeholders = n.placeholders ? JSON.parse(n.placeholders) : [];
      });
    }
  }
  goBack() {
    this.router.navigate(['/notifications']);
  }
} 