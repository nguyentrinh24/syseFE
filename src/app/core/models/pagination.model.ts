export interface PaginationResponse<T> {
  content: T[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
  size: number;
  hasNext: boolean;
  hasPrevious: boolean;
  isFirst: boolean;
  isLast: boolean;
}

export interface PaginationParams {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
  status?: boolean;
  createdBy?: number;
  code?: string;
  search?: string;
} 