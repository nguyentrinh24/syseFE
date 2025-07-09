import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';
import { AuthService } from '../../../core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, NgForOf, NgIf],
})
export class NotificationListComponent implements OnInit {
  notifications: any[] = [];
  filterCode = '';
  filterStatus = '';
  isAdmin = false;
  loading = false;
  error = '';

  constructor(public router: Router, private notificationService: NotificationService, private auth: AuthService) {}

  ngOnInit() {
    this.isAdmin = this.auth.isAdmin();
    this.loadNotifications();
  }

  loadNotifications() {
    this.loading = true;
    this.error = '';
    
    console.log('Loading notifications...');
    this.notificationService.getAll().subscribe({
      next: (data: any[]) => {
        console.log('Notifications loaded:', data);
        this.notifications = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading notifications:', error);
        this.error = 'Không thể tải danh sách notifications: ' + error.message;
        this.loading = false;
      }
    });
  }

  filteredNotifications() {
    return this.notifications.filter(n =>
      (!this.filterCode || n.code?.includes(this.filterCode)) &&
      (!this.filterStatus || (this.filterStatus === 'ACTIVE' ? n.status === true : n.status === false))
    );
  }

  edit(n: any) {
    this.router.navigate(['/notifications/edit', n.id]);
  }

  create() {
    this.router.navigate(['/notifications/new']);
  }

  delete(id: number) {
    if (confirm('Delete this notification?')) {
      this.notificationService.delete(id).subscribe({
        next: () => {
          this.notifications = this.notifications.filter(x => x.id !== id);
        },
        error: (error) => {
          console.error('Error deleting notification:', error);
          alert('Lỗi khi xóa notification: ' + error.message);
        }
      });
    }
  }

  viewDetail(n: any) {
    this.router.navigate(['/notifications/detail', n.id]);
  }
} 