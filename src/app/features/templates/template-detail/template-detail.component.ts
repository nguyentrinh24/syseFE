import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TemplateService, ApiResponse } from '../template.service';

@Component({
  selector: 'app-template-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './template-detail.component.html',
  styleUrls: ['./template-detail.component.scss']
})
export class TemplateDetailComponent implements OnInit {
  template: any = null;
  placeholders: string[] = [];
  loading = false;
  error = '';

  constructor(private route: ActivatedRoute, private service: TemplateService, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadTemplate(+id);
    }
  }

  loadTemplate(id: number) {
    this.loading = true;
    this.error = '';
    this.service.getById(id).subscribe({
      next: (res: ApiResponse<any>) => {
        if (res.success) {
          this.template = res.data;
          this.placeholders = res.data.placeholders ? JSON.parse(res.data.placeholders) : [];
        } else {
          this.error = res.message || 'Không thể tải thông tin template.';
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = error?.error?.message || 'Không thể tải thông tin template: ' + error.message;
        this.loading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/templates']);
  }
} 