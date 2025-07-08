import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EmailTemplateService } from './template.service';
import { EmailTemplate } from '../shared/models';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss'],
  imports: [FormsModule, CommonModule],
  standalone: true
})
export class EmailTemplateFormComponent {
  @Input() template: EmailTemplate = {id: 0, name: '', code: '', subject: '', placeholders: [], content: '', status: 'ACTIVE'};
  get placeholdersStr() { return this.template.placeholders.join(','); }
  set placeholdersStr(val: string) { this.template.placeholders = val.split(',').map(s => s.trim()).filter(Boolean); }
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