import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  template: `
    <ng-container *ngIf="auth.isLoggedIn(); else loginBlock">
      <nav style="background: #f8f9fa; padding: 1rem; margin-bottom: 1rem;">
        <a *ngIf="auth.isUser()" routerLink="/send" style="margin-right: 1rem; color: #667eea ; text-decoration: none;">Gửi Email</a>
        <a *ngIf="auth.isUser()" routerLink="/logs" style="margin-right: 1rem; color: #667eea ; text-decoration: none;">Lịch sử</a>
        <a *ngIf="auth.isAdmin()" routerLink="/templates" style="margin-right: 1rem; color: #667eea ; text-decoration: none;">Templates Email</a>
        <a *ngIf="auth.isAdmin()" routerLink="/notifications" style="margin-right: 1rem; color: #667eea ; text-decoration: none;">Notifications</a>
        <a (click)="logoutAndReload()" style="float:right; margin-right: 1rem; cursor: pointer; color: #667eea ; text-decoration: none;">Đăng xuất</a>
      </nav>
      <div style="padding: 0 1rem;">
      <router-outlet></router-outlet>
        <div *ngIf="!auth.isAdmin() && !auth.isUser()" style="margin-top:2rem; text-align:center; font-size:1.5rem;">
          Wellcome, {{auth.getUsername()}}!
        </div> 
      </div>
    </ng-container>
    <ng-template #loginBlock>
      <router-outlet></router-outlet>
    </ng-template>
  `,
  imports: [RouterOutlet, RouterLink, CommonModule],
  standalone: true,
  providers: [AuthService]
})
export class AppComponent {
  auth = inject(AuthService);
  router = inject(Router);
  logoutAndReload() {
      debugger;
    this.auth.logout();
    this.router.navigate(['/login']);
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
