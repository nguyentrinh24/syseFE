import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TemplateService, ApiResponse } from '../template.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
  public Object = Object;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private templateService: TemplateService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TemplateFormComponent>
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      code: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      subject: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
      content: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10000)]],
      status: [true]
    });
  }

  ngOnInit() {
    this.id = this.data?.id ?? Number(this.route.snapshot.paramMap.get('id'));
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
          Object.keys(this.placeholders).forEach(p => this.variables[p] = this.placeholders[p] || '');
          this.renderPreview();
          
          // Disable code field when editing
          this.form.get('code')?.disable();
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
    this.form.get('content')?.valueChanges.subscribe(() => {
      this.extractPlaceholders();
      this.renderPreview();
    });
    this.form.get('subject')?.valueChanges.subscribe(() => {
      this.extractPlaceholders();
    });
  }

  extractPlaceholders() {
    const content = this.form.get('content')?.value || '';
    const subject = this.form.get('subject')?.value || '';
    
    // Extract placeholders from content and subject
    const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/g;
    const foundPlaceholders = new Set<string>();
    
    let match;
    while ((match = placeholderRegex.exec(content)) !== null) {
      foundPlaceholders.add(match[1]);
    }
    while ((match = placeholderRegex.exec(subject)) !== null) {
      foundPlaceholders.add(match[1]);
    }
    
    // Update placeholders object
    const newPlaceholders: { [key: string]: string } = {};
    foundPlaceholders.forEach(key => {
      newPlaceholders[key] = this.placeholders[key] || '';
    });
    
    this.placeholders = newPlaceholders;
    this.variables = { ...this.placeholders };
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

    const formData = this.form.getRawValue(); // Get all values including disabled fields
    const data = {
      name: formData.name,
      code: formData.code,
      subject: formData.subject,
      content: formData.content,
      placeholders: this.variables, // Sử dụng giá trị user nhập cho từng placeholder
      status: formData.status
    };

    if (this.isEdit && this.id) {
      this.templateService.update(this.id, data).subscribe({
        next: (res: ApiResponse<any>) => {
          if (res.success) {
            // Show success message briefly before closing
            this.error = '';
            setTimeout(() => {
              this.dialogRef.close('updated');
            }, 500);
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
            // Show success message briefly before closing
            this.error = '';
            setTimeout(() => {
              this.dialogRef.close('created');
            }, 500);
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
      this.variables[val] = '';
      this.renderPreview();
    }
    this.newPlaceholder = '';
  }

  removePlaceholder(key: string) {
    delete this.placeholders[key];
    delete this.variables[key];
    this.renderPreview();
  }

  updatePlaceholderValue(key: string, value: string) {
    this.variables[key] = value;
    this.renderPreview();
  }

  closeDialog() {
    this.dialogRef.close();
  }
} 