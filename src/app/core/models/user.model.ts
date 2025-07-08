export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: string; // hoặc object nếu cần
  enabled: boolean;
  createdAt: string; // ISO date
} 