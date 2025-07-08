import { User } from './user.model';

export interface MessageLog {
  id: number;
  user?: User;
  channel: string;
  templateCode: string;
  content: string;
  status: string;
  sentAt: string; 
} 