import { Role } from './role.model';

export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: Role;
  enabled: boolean;
  createdAt: string; // ISO date
} 