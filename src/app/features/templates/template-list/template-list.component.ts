import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmailTemplateService } from '../template.service';
import { AuthService } from '../../../core/services/auth.service';
import { EmailTemplate } from '../../../core/models/email-template.model';
import { PaginationResponse, PaginationParams } from '../../../core/models/pagination.model';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss'],
  imports: [FormsModule, CommonModule, PaginationComponent],
  standalone: true
})
export class EmailTemplateListComponent implements OnInit {
  templates: EmailTemplate[] = [];
  paginationData: PaginationResponse<EmailTemplate> | null = null;
  loading = false;
  
  // Filter properties
  filterCode = '';
  filterStatus: boolean | null = null;
  filterSearch = '';
  filterCreatedBy: number | null = null;
  
  // Pagination properties
  currentPage = 0;
  pageSize = 10;
  sortBy = 'id';
  sortDir: 'asc' | 'desc' = 'desc';
  
  // Search debounce
  private searchSubject = new Subject<string>();
  
  isAdmin = false;
  
  constructor(
    private service: EmailTemplateService, 
    private auth: AuthService, 
    private router: Router
  ) {
    // Setup search debounce
    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.filterSearch = searchTerm;
      this.currentPage = 0; // Reset to first page when searching
      this.loadTemplates();
    });
  }
  
  ngOnInit() {
    this.isAdmin = this.auth.isAdmin();
    this.loadTemplates();
  }
  
  loadTemplates() {
    this.loading = true;
    
    const params: PaginationParams = {
      page: this.currentPage,
      size: this.pageSize,
      sortBy: this.sortBy,
      sortDir: this.sortDir,
      code: this.filterCode || undefined,
      status: this.filterStatus !== null ? this.filterStatus : undefined,
      search: this.filterSearch || undefined,
      createdBy: this.filterCreatedBy || undefined
    };
    
    this.service.getWithPagination(params).subscribe({
      next: (response) => {
        this.paginationData = response;
        this.templates = response.content;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading templates:', error);
        this.loading = false;
      }
    });
  }
  
  onPageChange(page: number) {
    this.currentPage = page;
    this.loadTemplates();
  }
  
  onSearchChange(searchTerm: string) {
    this.searchSubject.next(searchTerm);
  }
  
  onFilterChange() {
    this.currentPage = 0; // Reset to first page when filtering
    this.loadTemplates();
  }
  
  onSortChange(sortBy: string) {
    if (this.sortBy === sortBy) {
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = sortBy;
      this.sortDir = 'desc';
    }
    this.loadTemplates();
  }
  
  clearFilters() {
    this.filterCode = '';
    this.filterStatus = null;
    this.filterSearch = '';
    this.filterCreatedBy = null;
    this.currentPage = 0;
    this.sortBy = 'id';
    this.sortDir = 'desc';
    this.loadTemplates();
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
        this.loadTemplates(); // Reload current page
      });
    }
  }
  
  viewDetail(t: EmailTemplate) {
    this.router.navigate(['/templates/detail', t.id]);
  }
} 