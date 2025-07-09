import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService, ApiResponse } from '../notification.service';
import { AuthService } from '../../../core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NotificationDetailComponent } from '../notification-detail/notification-detail.component';
import { NotificationFormComponent } from '../notification-form/notification-form.component';

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
  // Pagination
  page = 0;
  size = 10;
  totalPages = 0;
  totalItems = 0;
  sortBy = 'id';
  sortDir = 'asc';

  constructor(public router: Router, private notificationService: NotificationService, private auth: AuthService, private dialog: MatDialog) {}

  ngOnInit() {
    this.isAdmin = this.auth.isAdmin();
    this.loadNotifications();
  }

  loadNotifications() {
    this.loading = true;
    this.error = '';
    const params: any = {
      page: this.page,
      size: this.size,
      sortBy: this.sortBy,
      sortDir: this.sortDir,
      code: this.filterCode,
      status: this.filterStatus !== '' ? (this.filterStatus === 'ACTIVE' ? true : false) : undefined
    };
    this.notificationService.getPage(params).subscribe({
      next: (res: ApiResponse<any>) => {
        if (res.success) {
          this.notifications = res.data.content || [];
          this.totalPages = res.data.totalPages || 0;
          this.totalItems = res.data.totalItems || 0;
          this.size = res.data.size || this.size;
          this.page = res.data.currentPage || this.page;
        } else {
          this.error = res.message || 'Không thể tải danh sách notifications.';
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = error?.error?.message || 'Không thể tải danh sách notifications: ' + error.message;
        this.loading = false;
      }
    });
  }

  onPageChange(newPage: number) {
    this.page = newPage;
    this.loadNotifications();
  }

  onPageSizeChange(newSize: number) {
    this.size = newSize;
    this.page = 0;
    this.loadNotifications();
  }

  onSortChange(sortBy: string) {
    this.sortBy = sortBy;
    this.loadNotifications();
  }

  onFilter() {
    this.page = 0;
    this.loadNotifications();
  }

  edit(n: any) {
    const dialogRef = this.dialog.open(NotificationFormComponent, {
      width: '800px',
      data: { id: n.id }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'updated') {
        this.loadNotifications();
      }
    });
  }

  create() {
    const dialogRef = this.dialog.open(NotificationFormComponent, {
      width: '800px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'created') {
        this.loadNotifications();
      }
    });
  }

  delete(id: number) {
    if (confirm('Delete this notification?')) {
      this.notificationService.delete(id).subscribe({
        next: (res) => {
          if (res.success) {
            this.loadNotifications();
          } else {
            alert(res.message || 'Lỗi khi xóa notification');
          }
        },
        error: (error) => {
          alert(error?.error?.message || 'Lỗi khi xóa notification: ' + error.message);
        }
      });
    }
  }

  viewDetail(n: any) {
    this.dialog.open(NotificationDetailComponent, {
      width: '800px',
      data: { id: n.id }
    });
  }
} 