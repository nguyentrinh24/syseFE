import { Component, OnInit } from '@angular/core';
import { EmailTemplateService } from './template.service';
import { AuthService } from '../shared/auth.service';
import { EmailTemplate } from '../shared/models';

@Component({
  selector: 'app-template-list',
  template: `
    <h2>Danh sách Email Template</h2>
    <input [(ngModel)]="filterCode" placeholder="Lọc theo code..." />
    <select [(ngModel)]="filterStatus">
      <option value="">Tất cả</option>
      <option value="ACTIVE">Bật</option>
      <option value="INACTIVE">Tắt</option>
    </select>
    <table>
      <thead>
        <tr>
          <th>Tên</th><th>Mã</th><th>Trạng thái</th><th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let t of filteredTemplates()">
          <td>{{t.name}}</td>
          <td>{{t.code}}</td>
          <td>{{t.status}}</td>
          <td>
            <button *ngIf="isAdmin" (click)="edit(t)">Sửa</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button *ngIf="isAdmin" (click)="create()">Tạo mới</button>
  `
})
export class EmailTemplateListComponent implements OnInit {
  templates: EmailTemplate[] = [];
  filterCode = '';
  filterStatus = '';
  isAdmin = false;
  constructor(private service: EmailTemplateService, private auth: AuthService) {}
  ngOnInit() {
    this.isAdmin = this.auth.isAdmin();
    this.service.getAll().subscribe((t: EmailTemplate[]) => this.templates = t);
  }
  filteredTemplates() {
    return this.templates.filter(t =>
      (!this.filterCode || t.code.includes(this.filterCode)) &&
      (!this.filterStatus || t.status === this.filterStatus)
    );
  }
  edit(t: EmailTemplate) {/* TODO: chuyển sang form */}
  create() {/* TODO: chuyển sang form tạo mới */}
} 