import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TemplateService, ApiResponse } from '../template.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-template-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './template-detail.component.html',
  styleUrls: ['./template-detail.component.scss']
})
export class TemplateDetailComponent implements OnInit {
  template: any = null;
  placeholders: { [key: string]: string } = {};
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
      this.loadTemplate(+id);
    }
  }

  loadTemplate(id: number) {
    this.loading = true;
    this.error = '';
    this.service.getById(id).subscribe({
      next: (res: ApiResponse<any>) => {
        if (res.success) {
          this.template = res.data;
          this.placeholders = res.data.placeholders || {};
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