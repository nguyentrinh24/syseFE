import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-notification-form',
  template: `
    <h2>{{isEdit ? 'Edit' : 'Add'}} Notification Template</h2>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <label>Name: <input formControlName="name"></label><br>
      <label>Subject: <input formControlName="subject"></label><br>
      <label>Content: <textarea formControlName="content"></textarea></label><br>
      <button type="submit">{{isEdit ? 'Update' : 'Create'}}</button>
      <button type="button" (click)="router.navigate(['/notifications'])">Cancel</button>
    </form>
  `,
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class NotificationFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  id: number | null = null;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private notificationService: NotificationService
  ) {
    this.form = this.fb.group({
      name: [''],
      subject: [''],
      content: ['']
    });
  }
  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.isEdit = true;
      this.notificationService.getById(this.id).subscribe(data => this.form.patchValue(data));
    }
  }
  onSubmit() {
    if (this.form.invalid) return;
    if (this.isEdit && this.id) {
      this.notificationService.update(this.id, this.form.value).subscribe(() => this.router.navigate(['/notifications']));
    } else {
      this.notificationService.create(this.form.value).subscribe(() => this.router.navigate(['/notifications']));
    }
  }
} 