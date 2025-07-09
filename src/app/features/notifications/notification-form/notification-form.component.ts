import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService, ApiResponse } from '../notification.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification-form',
  templateUrl: './notification-form.component.html',
  styleUrls: ['./notification-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
})
export class NotificationFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  id: number | null = null;
  placeholders: string[] = [];
  variables: {[k: string]: string} = {};
  previewHtml = '';
  newPlaceholder = '';
  loading = false;
  error = '';
  fieldErrors: {[key: string]: string} = {};

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private notificationService: NotificationService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      code: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      content: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10000)]],
      placeholders: ['[]'],
      status: [true]
    });
  }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.isEdit = true;
      this.loadNotification();
    }
    this.setupFormListeners();
  }

  loadNotification() {
    this.loading = true;
    this.notificationService.getById(this.id!).subscribe({
      next: (res: ApiResponse<any>) => {
        if (res.success) {
          const data = res.data;
          this.form.patchValue(data);
          this.placeholders = data.placeholders ? JSON.parse(data.placeholders) : [];
          this.form.get('placeholders')?.setValue(JSON.stringify(this.placeholders));
          this.placeholders.forEach(p => this.variables[p] = '');
          this.renderPreview();
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

  setupFormListeners() {
    this.form.get('placeholders')?.valueChanges.subscribe(val => {
      try {
        this.placeholders = val ? JSON.parse(val) : [];
      } catch {
        this.placeholders = [];
      }
      this.variables = {};
      this.placeholders.forEach(p => this.variables[p] = '');
      this.renderPreview();
    });
    this.form.get('content')?.valueChanges.subscribe(() => this.renderPreview());
  }

  renderPreview() {
    let html = this.form.get('content')?.value || '';
    Object.keys(this.variables).forEach(key => {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
      html = html.replace(regex, this.variables[key] || '');
    });
    this.previewHtml = html;
  }

  onSubmit() {
    if (this.form.invalid) return;
    
    this.loading = true;
    this.error = '';
    this.fieldErrors = {};

    const data = {
      name: this.form.get('name')?.value,
      code: this.form.get('code')?.value,
      content: this.form.get('content')?.value,
      placeholders: JSON.stringify(this.placeholders),
      status: this.form.get('status')?.value
    };

    if (this.isEdit && this.id) {
      this.notificationService.update(this.id, data).subscribe({
        next: (res: ApiResponse<any>) => {
          if (res.success) {
            this.router.navigate(['/notifications']);
          } else {
            this.error = res.message || 'Lỗi khi cập nhật notification.';
            if (res.data?.fieldErrors) {
              this.fieldErrors = res.data.fieldErrors;
            }
          }
          this.loading = false;
        },
        error: (error) => {
          this.error = error?.error?.message || 'Lỗi khi cập nhật notification: ' + error.message;
          if (error?.error?.data?.fieldErrors) {
            this.fieldErrors = error.error.data.fieldErrors;
          }
          this.loading = false;
        }
      });
    } else {
      this.notificationService.create(data).subscribe({
        next: (res: ApiResponse<any>) => {
          if (res.success) {
            this.router.navigate(['/notifications']);
          } else {
            this.error = res.message || 'Lỗi khi tạo notification.';
            if (res.data?.fieldErrors) {
              this.fieldErrors = res.data.fieldErrors;
            }
          }
          this.loading = false;
        },
        error: (error) => {
          this.error = error?.error?.message || 'Lỗi khi tạo notification: ' + error.message;
          if (error?.error?.data?.fieldErrors) {
            this.fieldErrors = error.error.data.fieldErrors;
          }
          this.loading = false;
        }
      });
    }
  }

  addPlaceholder() {
    const val = this.newPlaceholder?.trim();
    if (val && !this.placeholders.includes(val)) {
      this.placeholders.push(val);
      this.form.get('placeholders')?.setValue(JSON.stringify(this.placeholders));
    }
    this.newPlaceholder = '';
  }

  removePlaceholder(i: number) {
    this.placeholders.splice(i, 1);
    this.form.get('placeholders')?.setValue(JSON.stringify(this.placeholders));
  }
} 