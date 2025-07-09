import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TemplateService, ApiResponse } from '../template.service';
import { AuthService } from '../../../core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TemplateDetailComponent } from '../template-detail/template-detail.component';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, NgForOf, NgIf],
})
export class TemplateListComponent implements OnInit {
  templates: any[] = [];
  filterCode = '';
  filterStatus = '';
  isAdmin = false;
  loading = false;
  error = '';
  // Pagination
  page = 0;
  size = 10;
  totalPages = 0;
  totalItems = 0;
  sortBy = 'id';
  sortDir = 'asc';

  constructor(public router: Router, private templateService: TemplateService, private auth: AuthService, private dialog: MatDialog) {}

  ngOnInit() {
    this.isAdmin = this.auth.isAdmin();
    this.loadTemplates();
  }

  loadTemplates() {
    this.loading = true;
    this.error = '';
    const params: any = {
      page: this.page,
      size: this.size,
      sortBy: this.sortBy,
      sortDir: this.sortDir,
      code: this.filterCode,
      status: this.filterStatus !== '' ? (this.filterStatus === 'ACTIVE' ? true : false) : undefined
    };
    this.templateService.getPage(params).subscribe({
      next: (res: ApiResponse<any>) => {
        if (res.success) {
          this.templates = res.data.content || [];
          this.totalPages = res.data.totalPages || 0;
          this.totalItems = res.data.totalItems || 0;
          this.size = res.data.size || this.size;
          this.page = res.data.currentPage || this.page;
        } else {
          this.error = res.message || 'Không thể tải danh sách templates.';
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = error?.error?.message || 'Không thể tải danh sách templates: ' + error.message;
        this.loading = false;
      }
    });
  }

  onPageChange(newPage: number) {
    this.page = newPage;
    this.loadTemplates();
  }

  onPageSizeChange(newSize: number) {
    this.size = newSize;
    this.page = 0;
    this.loadTemplates();
  }

  onSortChange(sortBy: string) {
    this.sortBy = sortBy;
    this.loadTemplates();
  }

  onFilter() {
    this.page = 0;
    this.loadTemplates();
  }

  edit(t: any) {
    this.router.navigate(['/templates/edit', t.id]);
  }

  create() {
    this.router.navigate(['/templates/create']);
  }

  delete(id: number) {
    if (confirm('Delete this template?')) {
      this.templateService.delete(id).subscribe({
        next: (res) => {
          if (res.success) {
            this.loadTemplates();
            alert(res.message || 'Xóa thành công!');
          } else {
            alert(res.message || 'Lỗi khi xóa template');
          }
        },
        error: (error) => {
          alert(error?.error?.message || 'Lỗi khi xóa template: ' + error.message);
        }
      });
    }
  }

  viewDetail(t: any) {
    this.dialog.open(TemplateDetailComponent, {
      width: '800px',
      data: { id: t.id }
    });
  }
} 