import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailLogComponent } from './email-log.component';

const routes: Routes = [
  { path: '', component: EmailLogComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogsRoutingModule {} 