import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationListComponent } from './notification-list.component';
import { NotificationFormComponent } from './notification-form.component';
import { NotificationsRoutingModule } from './notifications-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NotificationListComponent,
    NotificationFormComponent,
    NotificationsRoutingModule,
    ReactiveFormsModule
  ]
})
export class NotificationsModule {} 