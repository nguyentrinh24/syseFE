import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmailTemplateService } from '../templates/template.service';
import { MessageService } from './message.service';
import { EmailTemplate } from '../shared/models';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss'],
  imports: [FormsModule, CommonModule],
  standalone: true
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