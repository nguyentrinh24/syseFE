import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EmailTemplateService } from './template.service';
import { EmailTemplate } from '../../core/models/email-template.model';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss'],
  imports: [FormsModule, CommonModule],
  standalone: true
})
export class EmailTemplateFormComponent {
  @Input() template: EmailTemplate = {id: 0, name: '', code: '', subject: '', placeholders: '[]', content: '', status: true};
  get placeholdersStr() {
    try {
      const arr = JSON.parse(this.template.placeholders || '[]');
      return Array.isArray(arr) ? arr.join(',') : '';
    } catch {
      return '';
    }
  }
  set placeholdersStr(val: string) {
    const arr = val.split(',').map(s => s.trim()).filter(Boolean);
    this.template.placeholders = JSON.stringify(arr);
  }
  constructor(private service: EmailTemplateService, private router: Router) {}
  save() {
    if (this.template.id) {
      this.service.update(this.template).subscribe();
    } else {
      this.service.create(this.template).subscribe();
    }
  }

  goBack() {
    this.router.navigate(['/templates']);
  }
} 