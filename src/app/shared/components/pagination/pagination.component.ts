import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
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