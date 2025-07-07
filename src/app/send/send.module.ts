import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SendEmailComponent } from './send-email.component';
import { MessageService } from './message.service';

@NgModule({
  declarations: [SendEmailComponent],
  imports: [CommonModule, FormsModule],
  providers: [MessageService],
  exports: [SendEmailComponent]
})
export class SendModule {} 