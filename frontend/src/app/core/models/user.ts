export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  skills?: string[];
  bio?: string;
  role?: 'admin' | 'user';
  createdAt?: Date;
}
