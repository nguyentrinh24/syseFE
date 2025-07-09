import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadComponent: () => import('./template-list/template-list.component').then(m => m.TemplateListComponent) },
  { path: 'create', loadComponent: () => import('./template-form/template-form.component').then(m => m.TemplateFormComponent) },
  { path: 'edit/:id', loadComponent: () => import('./template-form/template-form.component').then(m => m.TemplateFormComponent) },
  { path: 'detail/:id', loadComponent: () => import('./template-detail/template-detail.component').then(m => m.TemplateDetailComponent) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplatesRoutingModule {} 