export interface MessageLog {
  id: number;
  to: string;
  templateName: string;
  status: 'SENT' | 'FAILED';
  sentAt: string; // ISO date
} 