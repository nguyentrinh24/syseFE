import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
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
