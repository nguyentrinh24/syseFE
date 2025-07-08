import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationListComponent } from './notification-list.component';
import { NotificationFormComponent } from './notification-form.component';

const routes: Routes = [
  { path: '', component: NotificationListComponent },
  { path: 'new', component: NotificationFormComponent },
  { path: 'edit/:id', component: NotificationFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule {} 