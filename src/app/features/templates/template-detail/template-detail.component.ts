import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TemplateService, ApiResponse } from '../template.service';
import { EmailTemplateDetail } from '../../../core/models/email-template.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-template-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './template-detail.component.html',
  styleUrls: ['./template-detail.component.scss']
})
export class TemplateDetailComponent implements OnInit {
  templateDetail: EmailTemplateDetail | null = null;
  loading = false;
  error = '';
  public Object = Object;

  constructor(
    private route: ActivatedRoute, 
    private service: TemplateService, 
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TemplateDetailComponent>
  ) {}

  ngOnInit() {
    const id = this.data?.id || this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadTemplateDetail(+id);
    }
  }

  loadTemplateDetail(id: number) {
    this.loading = true;
    this.error = '';
    this.service.getDetailWithRender(id).subscribe({
      next: (res: ApiResponse<EmailTemplateDetail>) => {
        if (res.success) {
          this.templateDetail = res.data;
        } else {
          this.error = res.message || 'Không thể tải thông tin template.';
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = error?.error?.message || 'Không thể tải thông tin template: ' + error.message;
        this.loading = false;
      }
    });
  }

  goBack() {
    this.dialogRef.close();
  }
} 