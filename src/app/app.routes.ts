import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { SendEmailComponent } from './features/send/send-email.component';
import { EmailLogComponent } from './features/logs/email-log.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'send', component: SendEmailComponent },
  { path: 'logs', component: EmailLogComponent },
  { path: 'templates', loadChildren: () => import('./features/templates/templates.module').then(m => m.TemplatesModule) },
  { path: 'notifications', loadChildren: () => import('./features/notifications/notifications.module').then(m => m.NotificationsModule) }
];
