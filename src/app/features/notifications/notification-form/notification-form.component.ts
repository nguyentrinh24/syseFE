import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../notification.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private notificationService: NotificationService
  ) {
    this.form = this.fb.group({
      name: [''],
      subject: [''],
      content: [''],
      placeholders: ['[]']
    });
  }
  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.isEdit = true;
      this.notificationService.getById(this.id).subscribe(data => {
        this.form.patchValue(data);
        this.placeholders = data.placeholders ? JSON.parse(data.placeholders) : [];
        this.form.get('placeholders')?.setValue(JSON.stringify(this.placeholders));
        this.placeholders.forEach(p => this.variables[p] = '');
        this.renderPreview();
      });
    }
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
    const data = {...this.form.value, placeholders: JSON.stringify(this.placeholders)};
    if (this.isEdit && this.id) {
      this.notificationService.update(this.id, data).subscribe(() => this.router.navigate(['/notifications']));
    } else {
      this.notificationService.create(data).subscribe(() => this.router.navigate(['/notifications']));
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