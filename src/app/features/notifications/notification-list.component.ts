import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification-list',
  template: `
    <h2>Notification Templates</h2>
    <button (click)="router.navigate(['/notifications/new'])">Add New</button>
    <table *ngIf="notifications.length > 0; else emptyBlock">
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Subject</th>
        <th>Actions</th>
      </tr>
      <tr *ngFor="let n of notifications">
        <td>{{n.id}}</td>
        <td>{{n.name}}</td>
        <td>{{n.subject}}</td>
        <td>
          <button (click)="router.navigate(['/notifications/edit', n.id])">Edit</button>
          <button (click)="delete(n.id)">Delete</button>
        </td>
      </tr>
    </table>
    <ng-template #emptyBlock><p>No notifications found.</p></ng-template>
  `,
  standalone: true,
  imports: [CommonModule, HttpClientModule],
})
export class NotificationListComponent implements OnInit {
  notifications: any[] = [];
  constructor(public router: Router, private notificationService: NotificationService) {}
  ngOnInit() {
    this.load();
  }
  load() {
    this.notificationService.getAll().subscribe((data: any[]) => this.notifications = data);
  }
  delete(id: number) {
    if (confirm('Delete this notification?')) {
      this.notificationService.delete(id).subscribe(() => this.load());
    }
  }
} 