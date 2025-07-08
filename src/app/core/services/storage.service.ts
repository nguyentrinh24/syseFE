import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class StorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  /**
   * Lấy giá trị từ localStorage một cách an toàn
   */
  getItem(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key);
    }
    return null;
  }

  /**
   * Lưu giá trị vào localStorage một cách an toàn
   */
  setItem(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, value);
    }
  }

  /**
   * Xóa giá trị khỏi localStorage một cách an toàn
   */
  removeItem(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
    }
  }

  /**
   * Xóa tất cả dữ liệu trong localStorage một cách an toàn
   */
  clear(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
  }

  /**
   * Kiểm tra xem có thể sử dụng localStorage không
   */
  isAvailable(): boolean {
    return isPlatformBrowser(this.platformId);
  }
} 