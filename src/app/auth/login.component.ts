import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <form (ngSubmit)="login()" #loginForm="ngForm">
      <h2>Đăng nhập</h2>
      <input name="username" [(ngModel)]="username" placeholder="Username" required />
      <input name="password" [(ngModel)]="password" type="password" placeholder="Password" required />
      <button type="submit">Đăng nhập</button>
      <div *ngIf="error" style="color:red">{{error}}</div>
    </form>
  `
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';
  constructor(private auth: AuthService, private router: Router) {}
  login() {
    this.auth.login(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/']),
      error: err => this.error = 'Sai tài khoản hoặc mật khẩu!'
    });
  }
} 