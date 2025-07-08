import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmailTemplateService } from '../template.service';
import { AuthService } from '../../../core/services/auth.service';
import { EmailTemplate } from '../../../core/models/email-template.model';
import { Router } from '@angular/router';

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
  constructor(private service: EmailTemplateService, private auth: AuthService, private router: Router) {}
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
  edit(t: EmailTemplate) {
    this.router.navigate(['/templates/edit', t.id]);
  }
  create() {
    this.router.navigate(['/templates/create']);
  }
  delete(t: EmailTemplate) {
    if (confirm('Bạn có chắc chắn muốn xóa template này?')) {
      this.service.delete(t.id!).subscribe(() => {
        this.templates = this.templates.filter(x => x.id !== t.id);
      });
    }
  }
  viewDetail(t: EmailTemplate) {
    this.router.navigate(['/templates/detail', t.id]);
  }
} 