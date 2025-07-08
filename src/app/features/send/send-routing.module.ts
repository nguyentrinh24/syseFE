import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendEmailComponent } from './send-email.component';

const routes: Routes = [
  { path: '', component: SendEmailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SendRoutingModule {} 