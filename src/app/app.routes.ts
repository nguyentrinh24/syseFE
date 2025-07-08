import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { SendEmailComponent } from './send/send-email.component';
import { EmailLogComponent } from './logs/email-log.component';
import { EmailTemplateListComponent } from './templates/template-list.component';
import { EmailTemplateFormComponent } from './templates/template-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/send', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'send', component: SendEmailComponent },
  { path: 'logs', component: EmailLogComponent },
  { path: 'templates', component: EmailTemplateListComponent },
  { path: 'templates/new', component: EmailTemplateFormComponent },
  { path: 'templates/edit/:id', component: EmailTemplateFormComponent }
];
