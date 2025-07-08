import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { SendEmailComponent } from './features/send/send-email.component';
import { EmailLogComponent } from './features/logs/email-log.component';
import { EmailTemplateListComponent } from './features/templates/template-list/template-list.component';
import { EmailTemplateFormComponent } from './features/templates/template-form/template-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'send', component: SendEmailComponent },
  { path: 'logs', component: EmailLogComponent },
  { path: 'templates', component: EmailTemplateListComponent },
  { path: 'templates/new', component: EmailTemplateFormComponent },
  { path: 'templates/edit/:id', component: EmailTemplateFormComponent },
  { path: 'notifications', loadChildren: () => import('./features/notifications/notifications.module').then(m => m.NotificationsModule) }
];
