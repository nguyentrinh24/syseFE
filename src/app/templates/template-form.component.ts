import { Component, Input } from '@angular/core';
import { EmailTemplateService } from './template.service';
import { EmailTemplate } from '../shared/models';

@Component({
  selector: 'app-template-form',
  template: `
    <form (ngSubmit)="save()" #f="ngForm">
      <h2>{{template?.id ? 'Sửa' : 'Tạo'}} Email Template</h2>
      <input name="name" [(ngModel)]="template.name" placeholder="Tên" required />
      <input name="code" [(ngModel)]="template.code" placeholder="Mã" required [readonly]="!!template.id" />
      <input name="subject" [(ngModel)]="template.subject" placeholder="Tiêu đề" required />
      <input name="placeholders" [(ngModel)]="placeholdersStr" placeholder="Placeholders (phẩy)" />
      <textarea name="content" [(ngModel)]="template.content" placeholder="Nội dung HTML" rows="6"></textarea>
      <select name="status" [(ngModel)]="template.status">
        <option value="ACTIVE">Bật</option>
        <option value="INACTIVE">Tắt</option>
      </select>
      <button type="submit">Lưu</button>
    </form>
  `
})
export class EmailTemplateFormComponent {
  @Input() template: EmailTemplate = {id: 0, name: '', code: '', subject: '', placeholders: [], content: '', status: 'ACTIVE'};
  get placeholdersStr() { return this.template.placeholders.join(','); }
  set placeholdersStr(val: string) { this.template.placeholders = val.split(',').map(s => s.trim()).filter(Boolean); }
  constructor(private service: EmailTemplateService) {}
  save() {
    if (this.template.id) {
      this.service.update(this.template).subscribe();
    } else {
      this.service.create(this.template).subscribe();
    }
  }
} 