import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmailLogComponent } from './email-log.component';
import { MessageLogService } from './message-log.service';

@NgModule({
  declarations: [EmailLogComponent],
  imports: [CommonModule, FormsModule],
  providers: [MessageLogService],
  exports: [EmailLogComponent]
})
export class LogsModule {} 