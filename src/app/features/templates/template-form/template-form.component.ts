import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TemplateService, ApiResponse } from '../template.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
})
export class TemplateFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  id: number | null = null;
  placeholders: { [key: string]: string } = {};
  variables: { [k: string]: string } = {};
  previewHtml = '';
  newPlaceholder = '';
  loading = false;
  error = '';
  fieldErrors: {[key: string]: string} = {};

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private templateService: TemplateService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      code: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      subject: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
      content: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10000)]],
      placeholders: ['[]'],
      status: [true]
    });
  }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.isEdit = true;
      this.loadTemplate();
    }
    this.setupFormListeners();
  }

  loadTemplate() {
    this.loading = true;
    this.templateService.getById(this.id!).subscribe({
      next: (res: ApiResponse<any>) => {
        if (res.success) {
          const data = res.data;
          this.form.patchValue(data);
          this.placeholders = data.placeholders || {};
          this.form.get('placeholders')?.setValue(this.placeholders);
          Object.keys(this.placeholders).forEach(p => this.variables[p] = this.placeholders[p] || '');
          this.renderPreview();
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

  setupFormListeners() {
    this.form.get('placeholders')?.valueChanges.subscribe(val => {
      this.placeholders = val || {};
      this.variables = {};
      Object.keys(this.placeholders).forEach(p => this.variables[p] = this.placeholders[p] || '');
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
      subject: this.form.get('subject')?.value,
      content: this.form.get('content')?.value,
      placeholders: this.placeholders,
      status: this.form.get('status')?.value
    };

    if (this.isEdit && this.id) {
      this.templateService.update(this.id, data).subscribe({
        next: (res: ApiResponse<any>) => {
          if (res.success) {
            this.router.navigate(['/templates']);
          } else {
            this.error = res.message || 'Lỗi khi cập nhật template.';
            if (res.data?.fieldErrors) {
              this.fieldErrors = res.data.fieldErrors;
            }
          }
          this.loading = false;
        },
        error: (error) => {
          this.error = error?.error?.message || 'Lỗi khi cập nhật template: ' + error.message;
          if (error?.error?.data?.fieldErrors) {
            this.fieldErrors = error.error.data.fieldErrors;
          }
          this.loading = false;
        }
      });
    } else {
      this.templateService.create(data).subscribe({
        next: (res: ApiResponse<any>) => {
          if (res.success) {
            this.router.navigate(['/templates']);
          } else {
            this.error = res.message || 'Lỗi khi tạo template.';
            if (res.data?.fieldErrors) {
              this.fieldErrors = res.data.fieldErrors;
            }
          }
          this.loading = false;
        },
        error: (error) => {
          this.error = error?.error?.message || 'Lỗi khi tạo template: ' + error.message;
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
    if (val && !(val in this.placeholders)) {
      this.placeholders[val] = '';
      this.form.get('placeholders')?.setValue(this.placeholders);
    }
    this.newPlaceholder = '';
  }

  removePlaceholder(key: string) {
    delete this.placeholders[key];
    this.form.get('placeholders')?.setValue(this.placeholders);
  }
} 