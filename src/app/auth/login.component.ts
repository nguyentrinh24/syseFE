import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, CommonModule],
  standalone: true
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