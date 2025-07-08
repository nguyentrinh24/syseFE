import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogsRoutingModule } from './logs-routing.module';
import { EmailLogComponent } from './email-log.component';

@NgModule({
  imports: [CommonModule, LogsRoutingModule, EmailLogComponent]
})
export class LogsModule {} 