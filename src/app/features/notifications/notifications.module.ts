import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { NotificationFormComponent } from './notification-form/notification-form.component';
import { NotificationDetailComponent } from './notification-detail/notification-detail.component';
import { NotificationsRoutingModule } from './notifications-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NotificationListComponent,
    NotificationFormComponent,
    NotificationDetailComponent,
    NotificationsRoutingModule,
    ReactiveFormsModule
  ]
})
export class NotificationsModule {} 