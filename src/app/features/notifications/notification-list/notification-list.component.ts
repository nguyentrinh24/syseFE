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
  constructor(public router: Router, private notificationService: NotificationService, private auth: AuthService) {}
  ngOnInit() {
    this.isAdmin = this.auth.isAdmin();
    this.notificationService.getAll().subscribe((data: any[]) => this.notifications = data);
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
      this.notificationService.delete(id).subscribe(() => {
        this.notifications = this.notifications.filter(x => x.id !== id);
      });
    }
  }
  viewDetail(n: any) {
    this.router.navigate(['/notifications/detail', n.id]);
  }
} 