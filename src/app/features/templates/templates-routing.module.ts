import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadComponent: () => import('./template-list/template-list.component').then(m => m.EmailTemplateListComponent) },
  { path: 'create', loadComponent: () => import('./template-form/template-form.component').then(m => m.EmailTemplateFormComponent) },
  { path: 'edit/:id', loadComponent: () => import('./template-form/template-form.component').then(m => m.EmailTemplateFormComponent) },
  { path: 'detail/:id', loadComponent: () => import('./template-detail/template-detail.component').then(m => m.EmailTemplateDetailComponent) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplatesRoutingModule {} 