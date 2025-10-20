export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  skills?: string[];
  bio?: string;
  role?: 'admin' | 'user';
  createdAt?: Date;
}
