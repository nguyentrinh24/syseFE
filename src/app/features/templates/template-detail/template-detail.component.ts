import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailTemplateService } from '../template.service';
import { EmailTemplate } from '../../../core/models/email-template.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-template-detail',
  templateUrl: './template-detail.component.html',
  styleUrls: ['./template-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class EmailTemplateDetailComponent implements OnInit {
  template?: EmailTemplate;
  placeholders: string[] = [];
  variables: {[k: string]: string} = {};
  previewHtml = '';

  constructor(private service: EmailTemplateService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.get(+id).subscribe(t => {
        this.template = t;
        this.placeholders = t.placeholders ? JSON.parse(t.placeholders) : [];
        this.placeholders.forEach(p => this.variables[p] = '');
        this.renderPreview();
      });
    }
  }

  renderPreview() {
    if (!this.template) return;
    let html = this.template.content;
    Object.keys(this.variables).forEach(key => {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
      html = html.replace(regex, this.variables[key] || '');
    });
    this.previewHtml = html;
  }

  goBack() {
    this.router.navigate(['/templates']);
  }
} 