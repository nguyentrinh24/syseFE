import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplatesRoutingModule } from './templates-routing.module';
import { EmailTemplateListComponent } from './template-list/template-list.component';
import { EmailTemplateFormComponent } from './template-form/template-form.component';

@NgModule({
  imports: [CommonModule, TemplatesRoutingModule, EmailTemplateListComponent, EmailTemplateFormComponent]
})
export class TemplatesModule {} 