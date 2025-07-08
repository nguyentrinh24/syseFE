import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmailTemplateService } from './template.service';
import { AuthService } from '../../core/services/auth.service';
import { EmailTemplate } from '../../core/models/email-template.model';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss'],
  imports: [FormsModule, CommonModule],
  standalone: true
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
      (!this.filterStatus || (this.filterStatus === 'ACTIVE' ? t.status === true : t.status === false))
    );
  }
  edit(t: EmailTemplate) {/* TODO: chuyển sang form */}
  create() {/* TODO: chuyển sang form tạo mới */}
} 