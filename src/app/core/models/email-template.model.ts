import { User } from './user.model';

export interface EmailTemplate {
  id: number;
  name: string;
  code: string;
  subject: string;
  content: string;
  placeholders: { [key: string]: string };
  status: boolean;
  createdBy?: User;
  createdAt?: string;
}

export interface EmailTemplateDetail {
  template: EmailTemplate;
  renderedContent: string;
  renderedSubject: string;
  placeholders: { [key: string]: string };
  availablePlaceholders: { [key: string]: string };
} 