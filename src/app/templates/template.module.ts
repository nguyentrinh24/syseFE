import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmailTemplateListComponent } from './template-list.component';
import { EmailTemplateFormComponent } from './template-form.component';
import { EmailTemplateService } from './template.service';

@NgModule({
  declarations: [EmailTemplateListComponent, EmailTemplateFormComponent],
  imports: [CommonModule, FormsModule],
  providers: [EmailTemplateService],
  exports: [EmailTemplateListComponent, EmailTemplateFormComponent]
})
export class TemplateModule {} 