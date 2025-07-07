import { Component, OnInit } from '@angular/core';
import { EmailTemplateService } from '../templates/template.service';
import { MessageService } from './message.service';
import { EmailTemplate } from '../shared/models';

@Component({
  selector: 'app-send-email',
  template: `
    <h2>Gửi Email</h2>
    <select [(ngModel)]="selectedCode" (change)="onTemplateChange()">
      <option *ngFor="let t of templates" [value]="t.code">{{t.name}}</option>
    </select>
    <div *ngIf="placeholders.length">
      <div *ngFor="let p of placeholders">
        <input [(ngModel)]="variables[p]" [placeholder]="p" />
      </div>
    </div>
    <input [(ngModel)]="to" placeholder="Email người nhận" />
    <button (click)="send()">Gửi</button>
    <div *ngIf="msg">{{msg}}</div>
  `
})
export class SendEmailComponent implements OnInit {
  templates: EmailTemplate[] = [];
  selectedCode = '';
  placeholders: string[] = [];
  variables: {[k: string]: string} = {};
  to = '';
  msg = '';
  constructor(private templateService: EmailTemplateService, private messageService: MessageService) {}
  ngOnInit() {
    this.templateService.getAll().subscribe((t: EmailTemplate[]) => this.templates = t);
  }
  onTemplateChange() {
    const t = this.templates.find(t => t.code === this.selectedCode);
    this.placeholders = t ? t.placeholders : [];
    this.variables = {};
    this.placeholders.forEach(p => this.variables[p] = '');
  }
  send() {
    this.messageService.send({
      templateCode: this.selectedCode,
      to: this.to,
      variables: this.variables
    }).subscribe({
      next: () => this.msg = 'Gửi thành công!',
      error: () => this.msg = 'Gửi thất bại!'
    });
  }
} 