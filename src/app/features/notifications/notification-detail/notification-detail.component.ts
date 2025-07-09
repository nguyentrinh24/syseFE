import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationService, ApiResponse } from '../notification.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-notification-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-detail.component.html',
  styleUrls: ['./notification-detail.component.scss']
})
export class NotificationDetailComponent implements OnInit {
  public Object = Object;
  notification: any = null;
  placeholders: { [key: string]: string } = {};
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute, 
    private service: NotificationService, 
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<NotificationDetailComponent>
  ) {}

  ngOnInit() {
    const id = this.data?.id || this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadNotification(+id);
    }
  }

  loadNotification(id: number) {
    this.loading = true;
    this.error = '';
    this.service.getById(id).subscribe({
      next: (res: ApiResponse<any>) => {
        if (res.success) {
          this.notification = res.data;
          this.placeholders = res.data.placeholders || {};
        } else {
          this.error = res.message || 'Không thể tải thông tin notification.';
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = error?.error?.message || 'Không thể tải thông tin notification: ' + error.message;
        this.loading = false;
      }
    });
  }

  goBack() {
    this.dialogRef.close();
  }
} 