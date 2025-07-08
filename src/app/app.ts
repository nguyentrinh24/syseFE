import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <nav style="background: #f8f9fa; padding: 1rem; margin-bottom: 1rem;">
      <a routerLink="/send" style="margin-right: 1rem;">Gửi Email</a>
      <a routerLink="/logs" style="margin-right: 1rem;">Lịch sử</a>
      <a routerLink="/templates" style="margin-right: 1rem;">Templates</a>
      <a routerLink="/login">Đăng nhập</a>
    </nav>
    <div style="padding: 0 1rem;">
      <router-outlet></router-outlet>
    </div>
  `,
  imports: [RouterOutlet, RouterLink],
  standalone: true
})
export class AppComponent {}
