import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendRoutingModule } from './send-routing.module';
import { SendEmailComponent } from './send-email.component';

@NgModule({
  imports: [CommonModule, SendRoutingModule, SendEmailComponent]
})
export class SendModule {} 