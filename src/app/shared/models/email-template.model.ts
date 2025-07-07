export interface EmailTemplate {
  id: number;
  name: string;
  code: string;
  subject: string;
  placeholders: string[];
  content: string;
  status: 'ACTIVE' | 'INACTIVE';
} 