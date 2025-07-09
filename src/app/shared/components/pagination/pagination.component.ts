import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pagination-container" 
         [class]="'theme-' + theme" 
         *ngIf="totalPages > 1">
      <!-- Main pagination navigation -->
      <nav aria-label="Page navigation">
        <ul class="pagination">
          <!-- Previous button -->
          <li class="page-item" [class.disabled]="currentPage === 0">
            <a class="page-link" href="javascript:void(0)" (click)="onPageChange(currentPage - 1)" 
               [class.disabled]="currentPage === 0">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          
          <!-- First page -->
          <li class="page-item" *ngIf="showFirstPage()">
            <a class="page-link" href="javascript:void(0)" (click)="onPageChange(0)">1</a>
          </li>
          
          <!-- Ellipsis -->
          <li class="page-item disabled" *ngIf="showFirstEllipsis()">
            <span class="page-link">...</span>
          </li>
          
          <!-- Page numbers -->
          <li class="page-item" *ngFor="let page of getVisiblePages()" 
              [class.active]="page === currentPage">
            <a class="page-link" href="javascript:void(0)" (click)="onPageChange(page)">
              {{ page + 1 }}
            </a>
          </li>
          
          <!-- Ellipsis -->
          <li class="page-item disabled" *ngIf="showLastEllipsis()">
            <span class="page-link">...</span>
          </li>
          
          <!-- Last page -->
          <li class="page-item" *ngIf="showLastPage()">
            <a class="page-link" href="javascript:void(0)" (click)="onPageChange(totalPages - 1)">
              {{ totalPages }}
            </a>
          </li>
          
          <!-- Next button -->
          <li class="page-item" [class.disabled]="currentPage === totalPages - 1">
            <a class="page-link" href="javascript:void(0)" (click)="onPageChange(currentPage + 1)"
               [class.disabled]="currentPage === totalPages - 1">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
      
      <!-- Page info -->
      <!-- <div class="page-info" *ngIf="showPageInfo">
        <p class="info-text">
          Hiển thị <span class="highlight">{{ (currentPage * size) + 1 }}</span> - 
          <span class="highlight">{{ Math.min((currentPage + 1) * size, totalItems) }}</span> 
          trong tổng số <span class="total">{{ totalItems }}</span> mục
        </p>
      </div>
    </div> -->
  `,
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() currentPage: number = 0;
  @Input() totalPages: number = 0;
  @Input() totalItems: number = 0;
  @Input() size: number = 10;
  @Input() theme: 'default' | 'minimal' | 'dark' | 'rounded' | 'compact' | 'gradient' | 'material' | 'neon' = 'default';
  @Input() showPageInfo: boolean = true;
  @Output() pageChange = new EventEmitter<number>();

  Math = Math;

  onPageChange(page: number): void {
    if (page >= 0 && page < this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }

  getVisiblePages(): number[] {
    const delta = 2;
    const range = [];
    const rangeWithDeltas = delta * 2 + 1;

    if (this.totalPages <= rangeWithDeltas) {
      for (let i = 0; i < this.totalPages; i++) {
        range.push(i);
      }
    } else {
      const leftBound = Math.max(0, this.currentPage - delta);
      const rightBound = Math.min(this.totalPages - 1, this.currentPage + delta);

      for (let i = leftBound; i <= rightBound; i++) {
        range.push(i);
      }
    }

    return range;
  }

  showFirstPage(): boolean {
    return this.getVisiblePages()[0] > 0;
  }

  showLastPage(): boolean {
    const visiblePages = this.getVisiblePages();
    return visiblePages[visiblePages.length - 1] < this.totalPages - 1;
  }

  showFirstEllipsis(): boolean {
    return this.getVisiblePages()[0] > 1;
  }

  showLastEllipsis(): boolean {
    const visiblePages = this.getVisiblePages();
    return visiblePages[visiblePages.length - 1] < this.totalPages - 2;
  }
} 